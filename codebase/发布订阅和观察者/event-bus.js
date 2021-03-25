/*
 * @Author: 蒋文斌
 * @Date: 2020-11-09 14:42:18
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-23 11:14:07
 * @Description: 自动生成
 */
class Listener {
    constructor(id, eventName, callback) {
        this.id = id;
        this.eventName = eventName;
        this.callback = callback;
    }
}

class EventBus {
    constructor() {
        this.events = {};
        this.autoIncreaseId = 1;
    }

    addListener(listener) {
        if (this.events[listener.eventName]) {
            this.events[listener.eventName].push(listener);
        } else {
            this.events[listener.eventName] = [listener];
        }
        return listener;
    }

    on(eventName, handler) {
        const listener = new Listener(this.autoIncreaseId++, eventName, handler);
        return this.addListener(listener);
    }

    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(({ callback }) => {
                callback(...args);
            });
        }
    }

    off(eventName, listener) {
        const listeners = this.events[eventName];
        if (listeners) {
            const index = listeners.findIndex((l) => l.id === listener.id);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }

    remove(eventName) {
        if (this.events[eventName]) {
            delete this.events[eventName];
        }
    }

    once(eventName, handler) {
        // 需要搞一个listener的概念
        const that = this;
        const id = this.autoIncreaseId++;
        const onceCallback = function () {
            handler(...arguments);
            const index = that.events[eventName].findIndex((l) => l.id === id);
            that.events[eventName].splice(index, 1);
        };
        const listener = new Listener(id, eventName, onceCallback);
        return this.addListener(listener);
    }
}

// 创建事件管理器实例
const ee = new EventBus();
// 注册一个chifan事件监听者
ee.on("chifan", function () {
    console.log("吃饭了，我们走！");
});
// 发布事件chifan
ee.emit("chifan");
// 也可以emit传递参数
ee.on("chifan", function (address, food) {
    console.log(`吃饭了，我们去${address}吃${food}！`);
});
ee.emit("chifan", "三食堂", "铁板饭"); // 此时会打印两条信息，因为前面注册了两个chifan事件的监听者

// 测试移除事件监听
const toBeRemovedListener = function () {
    console.log("我是一个可以被移除的监听者");
};
ee.on("testoff", toBeRemovedListener);
ee.emit("testoff");
ee.off("testoff", toBeRemovedListener);
ee.emit("testoff"); // 此时事件监听已经被移除，不会再有console.log打印出来了

// 测试once
ee.once('testOnce', () => console.log('once'))
ee.emit('testOnce');
ee.emit('testOnce'); // 没有回应了

// 测试移除chifan的所有事件监听
ee.remove("chifan");
console.log(ee); // 此时可以看到ee.listeners已经变成空对象了，再emit发送chifan事件也不会有反应了
