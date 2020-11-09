class EventEmitter {
    constructor() {
        // 维护事件及监听者
        this.listeners = {}
    }
    /**
     * 注册事件监听者
     * @param {String} type 事件类型
     * @param {Function} cb 回调函数
     */
    on(type, cb) {
        if (!this.listeners[type]) {
            this.listeners[type] = []
        }
        this.listeners[type].push(cb)
    }
    /**
     * 发布事件
     * @param {String} type 事件类型
     * @param  {...any} args 参数列表
     */
    emit(type, ...args) {
        if (this.listeners[type]) {
            this.listeners[type].forEach(cb => {
                cb(...args)
            })
        }
    }
    /**
     * 移除某个事件的一个监听者
     * @param {*} type 事件类型
     * @param {*} cb 回调函数
     */
    off(type, cb) {
        if (this.listeners[type]) {
            const targetIndex = this.listeners[type].findIndex(item => item === cb)
            if (targetIndex !== -1) {
                this.listeners[type].splice(targetIndex, 1)
            }
            if (this.listeners[type].length === 0) {
                delete this.listeners[type]
            }
        }
    }
    /**
     * 移除某个事件的所有监听者
     * @param {String} type 
     */
    offAll(type) {
        if (this.listeners[type]) {
            delete this.listeners[type]
        }
    }
}
// 创建事件管理器实例
const ee = new EventEmitter()
// 注册一个chifan事件监听者
ee.on('chifan', function() { console.log('吃饭了，我们走！') })
// 发布事件chifan
ee.emit('chifan')
// 也可以emit传递参数
ee.on('chifan', function(address, food) { console.log(`吃饭了，我们去${address}吃${food}！`) })
ee.emit('chifan', '三食堂', '铁板饭') // 此时会打印两条信息，因为前面注册了两个chifan事件的监听者

// 测试移除事件监听
const toBeRemovedListener = function() { console.log('我是一个可以被移除的监听者') }
ee.on('testoff', toBeRemovedListener)
ee.emit('testoff')
ee.off('testoff', toBeRemovedListener)
ee.emit('testoff') // 此时事件监听已经被移除，不会再有console.log打印出来了

// 测试移除chifan的所有事件监听
ee.offAll('chifan')
console.log(ee) // 此时可以看到ee.listeners已经变成空对象了，再emit发送chifan事件也不会有反应了