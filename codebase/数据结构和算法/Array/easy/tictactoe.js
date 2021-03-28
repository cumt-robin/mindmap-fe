/*
 * @Author: 蒋文斌
 * @Date: 2021-03-16 13:48:19
 * @LastEditors: 蒋文斌
 * @LastEditTime: 2021-03-21 10:47:52
 * @Description: 自动生成
 */

// https://leetcode-cn.com/problems/find-winner-on-a-tic-tac-toe-game/

// 暴力解法
function checkWinner(chessboard) {
    const winModel = [
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]],
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
        [[0,0], [1,1], [2,2]],
        [[2,0], [1,1], [0,2]],
    ]
    let isWinnerA = false;
    let isWinnerB = false;
    for (let i = 0; i < winModel.length; i++) {
        const positions = winModel[i]
        isWinnerA = positions.every(p => {
            const value = chessboard[p[0]][p[1]]
            return value === 'A'
        })
        if (isWinnerA) {
            const p = positions[0]
            return chessboard[p[0]][p[1]]
        }
        isWinnerB = positions.every(p => {
            const value = chessboard[p[0]][p[1]]
            return value === 'B'
        })
        if (isWinnerB) {
            const p = positions[0]
            return chessboard[p[0]][p[1]]
        }
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
        chessboard[move[0]][move[1]] = role
        role = role === 'A' ? 'B' : 'A'
    }
    const winner = checkWinner(chessboard)
    if (winner) {
        return winner
    } else if (moves.length === 9) {
        return 'Draw'
    } else {
        return 'Pending'
    }
};