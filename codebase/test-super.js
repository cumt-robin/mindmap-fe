class Father {
    constructor() {
        this.id = 1
    }
    
    getId() {
        return this.id;
    }
}

class Child extends Father{
    // constructor() {
    //     // console.log('super in child constructor: ', this)
    // }

    testSuperInMethod() {
        console.log('super in child method: ', this, this.__proto__.__proto__)
    }
}

let child = new Child();
child.testSuperInMethod();