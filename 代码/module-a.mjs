export let a = 1;
export const NAME = 'Jack'
export function add(a, b) {
    return a + b;
}
export const obj = {
    gender: 1,
    age: 18
}
function test() { return 'test' };
// export { test as default };
export default test
test = function() {
    return 'test changed'
}