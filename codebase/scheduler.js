/*
 * @Author: 蒋文斌
 * @Date: 2021-03-23 11:16:45
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-23 11:35:24
 * @Description: 自动生成
 */

class Scheduler {
    constructor(limit) {
        this.taskCountLimit = limit;
        this.taskCount = 0;
    }

    enter(pg) {
        if (this.taskCount === this.taskCountLimit) {
            throw new Error(`The number of concurrent tasks cannot exceed ${this.taskCountLimit}...`);
        } else {
            this.taskCount++;
            pg().finally(() => {
                this.taskCount--;
            });
        }
    }
}

// 测试代码
const s = new Scheduler(3);

// 进第1个任务
s.enter(
    () =>
        new Promise((resolve) =>
            setTimeout(() => {
                resolve(1);
            }, 3000)
        )
);

// 进第2个任务
s.enter(
    () =>
        new Promise((resolve) =>
            setTimeout(() => {
                resolve(2);
            }, 5000)
        )
);

// 进第3个任务
s.enter(
    () =>
        new Promise((resolve) =>
            setTimeout(() => {
                resolve(3);
            }, 8000)
        )
);

// 进第4个任务，抛出异常
s.enter(
    () =>
        new Promise((resolve) =>
            setTimeout(() => {
                resolve(4);
            }, 1000)
        )
);
