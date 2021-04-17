// 基本结构
```javascript
class Promise {
  static resolve(value) {}
  static reject(reason) {}
  static all(iterable) {}
  static race(iterable) {}
  
  constructor(resolveFn, rejectFn) {
    this.status = 'pending';
    this.resolveFn = resolveFn;
    this.rejectFn = rejectFn;
  }
  
  then(onFulfilled, onRejected) {
  
  }
  catch(onRejected) {
  
  }
  finally() {
  
  }
}
```

// 具体实现
```javascript
class Promise {
  static resolve(value) {}
  static reject(reason) {}
  static all(iterable) {}
  static race(iterable) {}
  
  constructor(resolveFn, rejectFn) {
    this.status = 'pending';
    this.resolveFn = resolveFn;
    this.rejectFn = rejectFn;
  }
  
  then(onFulfilled, onRejected) {
  
  }
  catch(onRejected) {
  
  }
  finally() {
  
  }
}
```