function add() {
    var args = [].slice.call(arguments)
    return function() {
        var newArgs = [].slice.call(arguments)
        var allArg = args.concat(newArgs)
        return allArg.reduce((prev, curr) => {
            return prev + curr
        }, 0)
    }
}

add(1,2,3) // 6
add(1) // 1
add(1)(2) // 3
add(1)(2)(3) // 6
add(1, 2)(3) // 6

for (let index = 0; index < 5; index++) {
    function test() {
        return index;
    }
}
var result = test()
console.log(index)