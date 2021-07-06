// https://leetcode-cn.com/leetbook/read/top-interview-questions-easy/x2zsx1/

/**
 * 买卖股票的最佳时机
 * 跌到底的时候买（账户扣钱），涨到顶的时候卖（账户加钱）
 * 如果一直跌，不买
 * 如果一直涨，最早的时候买，最后的时候卖
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    const len = prices.length;
    let trend = 0; // 0 持平，1涨，-1跌
    let money = 0;
    for (let i = 0, j = 1; j < len; j++) {
        if (prices[j] > prices[j - 1]) {
            // 涨
            if (trend !== 1) {
                // 如果之前的趋势不是涨，说明j是上涨的第一个节点，那么j-1就是低价，可以买入
                money -= prices[j - 1];
                trend = 1;
            } else {
                // 之前也是涨，说明是涨的路上
            }
        } else if (trend === 1) {
            // 不涨了，看前一个趋势是不是涨，前面是涨，现在不涨了，就在前面卖掉
            money += prices[j - 1]
        }
        
    }
};