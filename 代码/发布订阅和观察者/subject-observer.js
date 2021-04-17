/*
 * @Author: 蒋文斌
 * @Date: 2020-11-09 14:42:18
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-23 11:09:22
 * @Description: 自动生成
 */
// 观察者
class Observer {
    static autoIncreaseId = 1

    constructor(callback) {
        this.id = Observer.autoIncreaseId++;
        this.callback = callback
    }

    // 暴露一个接口，让主题去调用，当然命名应该是约定好的
    complete(...args) {
        this.callback(...args);
    }
}

// 主题
class Subject {
    constructor(name) {
        this.name = name;
        this.observerList = [];
    }

    addObserver(observer) {
        this.observerList.push(observer)
    }

    removeObserver(observer) {
        const index = this.observerList.findIndex(item => item.id === observer.id)
        if (index !== -1) {
            this.observerList.splice(index, 1)
        }
    }

    notify(...args) {
        this.observerList.forEach(observer => {
            observer.complete(...args);
        })
    }
}

const observerCallback = function() {
    console.log('我被通知了')
}
const observer = new Observer(observerCallback)

const subject = new Subject();
subject.addObserver(observer);
subject.notify();