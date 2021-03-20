/*
 * @Author: 蒋文斌
 * @Date: 2021-03-16 13:48:19
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-20 22:35:49
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/find-winner-on-a-tic-tac-toe-game/

function checkWinner(chessboard) {
    const winModel = [
        [0,0], [0,1], [0,2],
        [1,0], [1,1], [1,2],
        [2,0], [2,1], [2,2],
        [0,0], [0,1], [0,2],
        [1,0], [1,1], [1,2],
        [2,0], [2,1], [2,2],
        [0,0], [1,1], [2,2],
        [2,0], [1,1], [0,2],
    ]
    for (let index = 0; index < winModel.length; index++) {
        const position = winModel[index]
        // if (chessboard[]) {

        // }
    }
}

/**
 * @param {number[][]} moves
 * @return {string}
 */
var tictactoe = function(moves) {
    const chessboard = [["", "", ""], ["", "", ""], ["", "", ""]];
    let role = 'A'
    for (let index = 0; index < moves.length; index++) {
        const move = moves[index];
        chessboard[move[0], move[1]] = role
        role === 'A' ? 'B' : 'A'
    }
    if (chessboard) {

    }
};