// 单参柯里化
function curry(fn, firstArg) {
  // 返回一个新函数
  return function() {
    // 新函数调用时会继续传参
    var restArgs = [].slice.call(arguments)
    // 参数合并，通过apply调用原函数
    return fn.apply(this, [firstArg, ...restArgs])
  }
}

// 灵活参数柯里化
function curry(fn) {
  // 保存预置参数
  var presetArgs = [].slice.call(arguments, 1)
  // 返回一个新函数
  return function() {
    // 新函数调用时会继续传参
    var restArgs = [].slice.call(arguments)
    // 参数合并，通过apply调用原函数
    return fn.apply(this, [...presetArgs, ...restArgs])
  }
}

// 支持基本的多次柯里化
function curry(fn) {
  // 获取原函数的参数长度
  const argLen = fn.length;
  // 保存预置参数
  const presetArgs = [].slice.call(arguments, 1)
  // 返回一个新函数
  return function() {
    // 新函数调用时会继续传参
    const restArgs = [].slice.call(arguments)
    const allArgs = [...presetArgs, ...restArgs]
    if (allArgs.length >= argLen) {
      // 如果参数够了，就执行原函数
      return fn.apply(this, allArgs)
    } else {
      // 否则继续柯里化
      return curry.call(null, fn, ...allArgs)
    }
  }
}

// 无限柯里化
function curry(fn) {
  // 保存预置参数
  const presetArgs = [].slice.call(arguments, 1)
  // 返回一个新函数
  function curried () {
    // 新函数调用时会继续传参
    const restArgs = [].slice.call(arguments)
    const allArgs = [...presetArgs, ...restArgs]
    return curry.call(null, fn, ...allArgs)
  }
  curried.toString = function() {
    return fn.apply(null, presetArgs)
  }
  return curried;
}