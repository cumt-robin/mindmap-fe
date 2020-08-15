// 实现call
// 处理this，考虑非严格模式下原始类型
// 处理参数
// 考虑调用方式，普通函数？成员方法？
// 作为成员方法调用时，如何避免覆盖对象原有属性？
Function.prototype.myCall = function() {
  // 由于目标函数的实参数量是不定的，这里就不写形参了
  // 实际上通过arugments对象，我们能拿到所有实参
  // 第一个参数是thisArg
  var thisArg = arguments[0];
  // 首先判断是不是严格模式
  var isStrict = (function(){return this === undefined}())
  if (!isStrict) {
    // 如果是其他原始值，需要通过构造函数包装成对象
    var thisArgType = typeof thisArg
    if (thisArgType === 'number') {
     thisArg = new Number(thisArg)
    } else if (thisArgType === 'string') {
      thisArg = new String(thisArg)
    } else if (thisArgType === 'boolean') {
      thisArg = new Boolean(thisArg)
    }
  }
  // 截取从索引1开始的剩余参数
  var invokeParams = [...arguments].slice(1);
  // 接下来要调用目标函数，那么如何获取到目标函数呢？
  // 实际上this就是目标函数，因为myCall是作为一个方法被调用的，this当然指向所属对象，而这个对象就是目标函数
  // 这里做这么一个赋值，是为了让语义更清晰一点
  var invokeFunc = this;
  // 此时如果thisArg对象是null或undefined，那么说明没有指定thisArg对象，此时将目标函数当成普通函数执行并返回其结果即可
  if (thisArg === null || thisArg === undefined) {
    return invokeFunc(...invokeParams)
  }
  // 否则，让目标函数成为thisArg对象的成员方法，然后调用它
  // 直观上来看，可以直接把目标函数赋值给对象属性，比如func属性，但是可能func属性本身就存在于thisArg对象上
  // 所以，为了防止覆盖掉thisArg对象的原有属性，必须创建一个唯一的属性名，可以用Symbol实现，如果环境不支持Symbol，可以通过uuid算法来构造一个唯一值。
  var uniquePropName = Symbol(thisArg)
  thisArg[uniquePropName] = invokeFunc
  // 返回目标函数执行的结果
  return thisArg[uniquePropName](...invokeParams)
}

// 实现apply
// 注意两个点，第二个参数是数组形式，可能存在不传第二个参数，或者第二个参数不是数组的情况
Function.prototype.myApply = function(thisArg, params) {
  var isStrict = (function(){return this === undefined}())
  if (!isStrict) {
    var thisArgType = typeof thisArg
    if (thisArgType === 'number') {
     thisArg = new Number(thisArg)
    } else if (thisArgType === 'string') {
      thisArg = new String(thisArg)
    } else if (thisArgType === 'boolean') {
      thisArg = new Boolean(thisArg)
    }
  }
  var invokeFunc = this;
  // 考虑调用时不传第二个参数的情况
  var invokeParams = Array.isArray(params) ? params : [];
  if (thisArg === null || thisArg === undefined) {
    return invokeFunc(...invokeParams)
  }
  var uniquePropName = Symbol(thisArg)
  thisArg[uniquePropName] = invokeFunc
  return thisArg[uniquePropName](...invokeParams)
}

// 简单版本bind
// 处理this，处理预置参数，与调用时传入的参数进行拼接，通过apply调用
Function.prototype.myBind = function() {
  var boundThis = arguments[0];
  var boundParams = [].slice.call(arguments, 1);
  var boundTargetFunc = this;
  if (typeof boundTargetFunc !== 'function') {
    throw new Error('绑定的目标必须是函数')
  }
  return function() {
    var restParams = [].slice.call(arguments);
    var allParams = boundParams.concat(restParams)
    return boundTargetFunc.apply(boundThis, allParams)
  }
}

// 支持new（存在bug，实例关系不对）
// 我首先想到的是，怎么判断函数是通过new调用的？这让我想了很久，后面想到在构造函数中，this是指向实例的，那么实例关系可以通过instanceof来检查
// 然后就可以判断，如果是通过构造函数的形式调用，则直接把参数处理好，调用new boundTargetFunc(...allParams)；如果是以普通的形式调用，则直接apply调用绑定的目标函数即可
Function.prototype.myBind = function() {
  var boundThis = arguments[0];
  var boundParams = [].slice.call(arguments, 1);
  var boundTargetFunc = this;
  if (typeof boundTargetFunc !== 'function') {
    throw new Error('绑定的目标必须是函数')
  }
  function fBound () {
    var restParams = [].slice.call(arguments);
    var allParams = boundParams.concat(restParams)
    var isConstructor = this instanceof fBound;
    if (isConstructor) {
      return new boundTargetFunc(...allParams)
    } else {
      return boundTargetFunc.apply(boundThis, allParams)
    }
  }
  return fBound
}

// 支持new（相对完善）
Function.prototype.myBind = function() {
  var boundTargetFunc = this;
  if (typeof boundTargetFunc !== 'function') {
    throw new Error('绑定的目标必须是函数')
  }
  var boundThis = arguments[0];
  var boundParams = [].slice.call(arguments, 1);
  function fBound () {
    var restParams = [].slice.call(arguments);
    var allParams = boundParams.concat(restParams)
    return boundTargetFunc.apply(this instanceof fBound ? this : boundThis, allParams)
  }
  fBound.prototype = Object.create(boundTargetFunc.prototype || Function.prototype)
  return fBound
}