
// https://leetcode-cn.com/problems/count-items-matching-a-rule/

/**
 * 题目不难，把ruleKey和下标的对应关系用map维护，然后根据ruleKey的值去匹配
 * 我这里习惯用filter的，不过filter看起来效率不高，算了，不想折腾了
 * @param {string[][]} items
 * @param {string} ruleKey
 * @param {string} ruleValue
 * @return {number}
 */
var countMatches = function(items, ruleKey, ruleValue) {
    const map = new Map([
        ['type', 0],
        ['color', 1],
        ['name', 2]
    ])
    const matchList = items.filter(item => item[map.get(ruleKey)] === ruleValue)
    return matchList.length;
};