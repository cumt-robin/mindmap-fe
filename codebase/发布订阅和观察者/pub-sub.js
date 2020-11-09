class PubSub {
    constructor() {
        // 维护事件及订阅者
        this.events = {}
    }
    /**
     * 注册事件订阅者
     * @param {String} type 事件类型
     * @param {Function} cb 回调函数
     */
    subscribe(type, cb) {
        if (!this.events[type]) {
            this.events[type] = []
        }
        this.events[type].push(cb)
    }
    /**
     * 发布事件
     * @param {String} type 事件类型
     * @param  {...any} args 参数列表
     */
    publish(type, ...args) {
        if (this.events[type]) {
            this.events[type].forEach(cb => {
                cb(...args)
            })
        }
    }
    /**
     * 移除某个事件的一个订阅者
     * @param {*} type 事件类型
     * @param {*} cb 回调函数
     */
    unsubscribe(type, cb) {
        if (this.events[type]) {
            const targetIndex = this.events[type].findIndex(item => item === cb)
            if (targetIndex !== -1) {
                this.events[type].splice(targetIndex, 1)
            }
            if (this.events[type].length === 0) {
                delete this.events[type]
            }
        }
    }
    /**
     * 移除某个事件的所有订阅者
     * @param {String} type 
     */
    unsubscribeAll(type) {
        if (this.events[type]) {
            delete this.events[type]
        }
    }
}
// 创建发布订阅调度中心实例
const pubSub = new PubSub()
// 注册一个chifan事件订阅者
pubSub.subscribe('chifan', function() { console.log('吃饭了，我们走！') })
// 发布事件chifan
pubSub.publish('chifan')
// 也可以publish传递参数
pubSub.subscribe('chifan', function(address, food) { console.log(`吃饭了，我们去${address}吃${food}！`) })
pubSub.publish('chifan', '三食堂', '铁板饭') // 此时会打印两条信息，因为前面注册了两个chifan事件的订阅者

// 测试移除订阅者
const toBeRemovedSubscriber = function() { console.log('我是一个可以被移除的订阅者') }
pubSub.subscribe('testoff', toBeRemovedSubscriber)
pubSub.publish('testoff')
pubSub.unsubscribe('testoff', toBeRemovedSubscriber)
pubSub.publish('testoff') // 此时事件订阅者已经被移除，不会再有console.log打印出来了

// 测试移除chifan的所有事件订阅者
pubSub.unsubscribeAll('chifan')
console.log(pubSub) // 此时可以看到pubSub.events已经变成空对象了，再publish发送chifan事件也不会有反应了