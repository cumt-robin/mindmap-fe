虽然**Promise**是开发过程中使用非常频繁的一个技术点，但是它的一些细节可能很多人都没有去关注过。我们都知道，`.then`, `.catch`, `.finally`都可以链式调用，其本质上是因为返回了一个新的**Promise**实例，而这些**Promise**实例现在的状态是什么或者将来会变成什么状态，很多人心里可能都没个底。我自己也意识到了这一点，于是我通过一些代码试验，发现了一些共性。如果您对这块内容还没有把握，不妨看看。

<!-- more -->

阅读本文前，您应该对**Promise**有一些基本认识，比如：

- `Promise`有`pending`, `fulfilled`, `rejected`三种状态，其决议函数`resolve()`能将`Promise`实例的状态由`pending`转为`fulfilled`，其决议函数`reject()`能将`Promise`实例的状态由`pending`转为`rejected`。
- `Promise`实例的状态一旦转变，不可再逆转。

本文会从一些测验代码入手，看看`Promise`的几个原型方法在处理`Promise`状态时的一些细节，最后对它们进行总结归纳，加深理解！

# 先考虑then的行为

`then`的语法形式如下：

```javascript
p.then(onFulfilled[, onRejected]);
```

`onFulfilled`可以接受一个`value`参数，作为`Promise`状态决议为`fulfilled`的结果，`onRejected`可以接受一个`reason`参数，作为`Promise`状态决议为`rejected`的原因。

- 如果`onFulfilled`或`onRejected`不返回值，那么`.then`返回的`Promise`实例的状态会变成`fulfilled`，但是伴随`fulfilled`的`value`会是`undefined`。

```javascript
new Promise((resolve, reject) => {
    resolve(1)
    // reject(2)
}).then(value => {
    console.log('resolution occurred, and the value is: ', value)
}, reason => {
    console.log('rejection occurred, and the reason is: ', reason)
}).then(value => {
    console.log('resolution of the returned promise occurred, and the value is: ', value)
}, reason => {
    console.log('rejection of the returned promise occurred, and the reason is: ', reason)
})
```

- 如果`onFulfilled`或`onRejected`返回一个值`x`，那么`.then`返回的`Promise`实例的状态会变成`fulfilled`，并且伴随`fulfilled`的`value`会是`x`。注意，一个非`Promise`的普通值在被返回时会被`Promise.resolve(x)`包装成为一个状态为`fulfilled`的`Promise`实例。

```javascript
new Promise((resolve, reject) => {
    reject(2)
}).then(value => {
    console.log('resolution occurred, and the value is: ', value)
}, reason => {
    console.log('rejection occurred, and the reason is: ', reason)
    return 'a new value'
}).then(value => {
    console.log('resolution of the returned promise occurred, and the value is: ', value)
}, reason => {
    console.log('rejection of the returned promise occurred, and the reason is: ', reason)
})
```

- 如果`onFulfilled`或`onRejected`中抛出一个异常，那么`.then`返回的`Promise`实例的状态会变成`rejected`，并且伴随`rejected`的`reason`是刚才抛出的异常的错误对象`e`。

```javascript
new Promise((resolve, reject) => {
    resolve(1)
}).then(value => {
    console.log('resolution occurred, and the value is: ', value)
    throw new Error('some error occurred.')
}, reason => {
    console.log('rejection occurred, and the reason is: ', reason)
}).then(value => {
    console.log('resolution of the returned promise occurred, and the value is: ', value)
}, reason => {
    console.log('rejection of the returned promise occurred, and the reason is: ', reason)
})
```

- 如果`onFulfilled`或`onRejected`返回一个`Promise`实例`p2`，那么不管`p2`的状态是什么，`.then`返回的新`Promise`实例`p1`的状态会取决于`p2`。如果`p2`现在或将来是`fulfilled`，那么`p1`的状态也随之变成`fulfilled`，并且伴随`fulfilled`的`value`也与`p2`进行`resolve(value)`决议时传递的`value`相同；

```javascript
new Promise((resolve, reject) => {
    resolve(1)
    // reject(2)
}).then(value => {
    console.log('resolution occurred, and the value is: ', value)
    // return Promise.resolve('a fulfilled promise')
    return Promise.reject('a rejected promise')
}, reason => {
    console.log('rejection occurred, and the reason is: ', reason)
    return Promise.resolve('a fulfilled promise')
    // return Promise.reject('a rejected promise')
}).then(value => {
    console.log('resolution of the returned promise occurred, and the value is: ', value)
}, reason => {
    console.log('rejection of the returned promise occurred, and the reason is: ', reason)
})
```

这个逻辑同样适用于`rejected`的场景。也就是说，如果`p2`的状态现在或将来是`rejected`，那么`p1`的状态也随之变成`rejected`，而`reason`也来源于`p1`进行`reject(reason)`决议时传递的`reason`。

```javascript
new Promise((resolve, reject) => {
    reject(1)
}).then(value => {
    console.log('resolution occurred, and the value is: ', value)
}, reason => {
    console.log('rejection occurred, and the reason is: ', reason)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('a promise rejected after 3 seconds.')
        }, 3000)
    })
}).then(value => {
    console.log('resolution of the returned promise occurred, and the value is: ', value)
}, reason => {
    console.log('rejection of the returned promise occurred, and the reason is: ', reason)
})
```

# 再考虑catch的行为

catch的语法形式如下：

```javascript
p.catch(onRejected);
```

`.catch`只会处理`rejected`的情况，并且也会返回一个新的`Promise`实例。

`.catch(onRejected)`与`then(undefined, onRejected)`在表现上是一致的。

> 事实上，catch(onRejected)从内部调用了then(undefined, onRejected)。

- 如果`.catch(onRejected)`的`onRejected`回调中返回了一个状态为`rejected`的`Promise`实例，那么`.catch`返回的`Promise`实例的状态也将变成`rejected`。

```javascript
new Promise((resolve, reject) => {
    reject(1)
}).catch(reason => {
    console.log('rejection occurred, and the reason is: ', reason)
    return Promise.reject('rejected')
}).then(value => {
    console.log('resolution of the returned promise occurred, and the value is: ', value)
}, reason => {
    console.log('rejection of the returned promise occurred, and the reason is: ', reason)
})
```

- 如果`.catch(onRejected)`的`onRejected`回调中抛出了异常，那么`.catch`返回的`Promise`实例的状态也将变成`rejected`。

```javascript
new Promise((resolve, reject) => {
    reject(1)
}).catch(reason => {
    console.log('rejection occurred, and the reason is: ', reason)
    throw 2
}).then(value => {
    console.log('resolution of the returned promise occurred, and the value is: ', value)
}, reason => {
    console.log('rejection of the returned promise occurred, and the reason is: ', reason)
})
```

- 其他情况下，`.catch`返回的`Promise`实例的状态将是`fulfilled`。

# then, catch 小结

综合以上来看，不管是`.then(onFulfilled, onRejected)`，还是`.catch(onRejected)`，它们返回的`Promise`实例的状态都取决于回调函数是否抛出异常，以及返回值是什么。

- 如果回调函数的返回值是一个状态为`rejected`的`Promise`实例，那么`.then`, `.catch`返回的`Promise`实例的状态就是`rejected`。

- 如果回调函数的返回值是一个还未决议的`Promise`实例`p2`，那么`.then`, `.catch`返回的`Promise`实例`p1`的状态取决于`p2`的决议结果。

- 如果回调函数中抛出了异常，那么`.then`, `.catch`返回的`Promise`实例的状态就是`rejected`，并且`reason`是所抛出异常的对象`e`。

- 其他情况下，`.then`, `.catch`返回的`Promise`实例的状态将是`fulfilled`。
# 最后看看finally

不管一个`Promise`的状态是`fulfilled`还是`rejected`，传递到`finally`方法的回调函数`onFinally`都会被执行。我们可以把一些公共行为放在`onFinally`执行，比如把`loading`状态置为`false`。

注意，`onFinally`不会接受任何参数，因为它从设计上并不关心`Promise`实例的状态是什么。

```javascript
p.finally(function() {
   // settled (fulfilled or rejected)
});
```

`finally`方法也会返回一个新的`Promise`实例，这个新的`Promise`实例的状态也取决于`onFinally`的返回值是什么，以及`onFinally`中是否抛出异常。

你可以通过修改以下代码中的注释部分来验证，不同的返回值对于`finally`返回的`Promise`实例的状态的影响。

```javascript
new Promise((resolve, reject) => {
    reject(1)
}).then(value => {
    console.log('resolution occurred, and the value is: ', value)
}, reason => {
    console.log('rejection occurred, and the reason is: ', reason)
    return Promise.resolve(2);
    // return Promise.reject(3)
}).finally(() => {
    // return Promise.resolve(4)
    // return Promise.reject(5)
    throw new Error('an error')
}).then(value => {
    console.log('resolution of the returned promise occurred, and the value is: ', value)
}, reason => {
    console.log('rejection of the returned promise occurred, and the reason is: ', reason)
})
```

经过测试，可以发现，不管当前Promise的状态是`fulfilled`还是`rejected`，只要在`onFinally`中没有发生以下任何一条情况，`finally`方法返回的新的`Promise`实例的状态就会与当前Promise的状态保持一致！这也意味着即使在`onFinally`中返回一个状态为`fulfilled`的`Promise`也不能阻止新的`Promise`实例采纳当前`Promise`的状态或值！

- 返回一个状态为或将为`rejected`的Promise
- 抛出错误

总的来说，在`finally`情况下，`rejected`优先！

# 如何理解then中抛出异常后会触发随后的catch

由于`.then`会返回一个新的`Promise`实例，而在`.then`回调中抛出了异常，导致这个新`Promise`的状态变成了`rejected`，而`.catch`正是用于处理这个新的`Promise`实例的`rejected`场景的。

```javascript
new Promise((resolve, reject) => {
    resolve(1)
}).then(value => {
    console.log('resolution of the returned promise occurred, and the value is: ', value)
    var a = b; // 未定义b
}).catch(reason => {
    console.log('caught the error occured in the callback of then method, and the reason is: ', reason)
})
```

最关键一点就是要理解：**每次`.then`, `.catch`, `.finally`都产生一个新的Promise**实例。

# Promise和jQuery的链式调用区别在哪？

上文也提到了，`.then`, `.catch`, `.finally`都产生一个新的Promise实例，所以这种链式调用的对象实例已经发生了变化。可以理解为：

```javascript
Promise.prototype.then = function() {
  // balabala
  return new Promise((resolve, reject) => {
    // if balabala
    // else if balabala
    // else balabala
  });
}
```

而jQuery链式调用是基于同一个jQuery实例的，可以简单表述为：

```javascript
jQuery.fn.css = function() {
  // balabala
  return this;
}
```

# 感谢阅读

本文主要是参考了**MDN**和《你不知道的JavaScript（下卷）》上关于Promise的知识点，简单分析了`.then`, `.catch`, `.finally`中回调函数的不同行为对于三者返回的Promise实例的影响，希望对大家有所帮助。