const area = document.getElementById('area');
const el = document.getElementsByClassName('el');
const currentPlayer = document.getElementById('curPlyr');
const but = document.getElementsByClassName('but');


let player = "x";

const PLAYER1       = "x";
const PLAYER2       = "o";
const WIN_VALUE     = 100;
const LOSS_VALUE    = -WIN_VALUE;
const DRAW_VALUE    = 0;

// 9 spaces
const initialPosition = "000000000";
const boardSize = Number.parseInt(Math.sqrt(initialPosition.length));

/**
 * switch player after move
 * @param {string} player 
 * @returns 
 */
function switchPlayer(player) {
    if(player == PLAYER1) {
        return PLAYER2;
    }
    return PLAYER1;
}

/**
 * Структура, представляющая позицию. Запоминает текущую позицию и очередь хода.
 * @param {string} board
 * @param {string} player 
 */
class Position{
    constructor(board, player) {
        this.board = board;
        this.player = player;
    }
    /**
     * создаем дочерние позиции, проставляя сивол игрока на пустые ячейки.
     * пример: для позиции (xoxxo0o00, x) => [(xoxxoxo00, o), (xoxxo0ox0, o), (xoxxo0o0x, o)]
     * @returns 
     */
    generateChildrens() {
        let result = [];
        for(i = 0; i < this.board.length; ++i) {
            if(this.board[i] == ' ') {
                let pos = this.board.substring(0, i) + this.player + this.board.substring(i+1);
                result[result.length] = new Position(pos, switchPlayer(this.player));
            }
        }
        return result;
    }

    /**
     * Отрисовываем текущую позицию
     */
    draw() {
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                let symbol = this.board.charAt(i * boardSize + j) == "0" ? " " : this.board.charAt(i * boardSize + j);
                area.innerHTML += "<div class='el' id=" + i + j + ">" + symbol + "</div>";
            }
        }
    }
}

let initPos = new Position(initialPosition, PLAYER1);
initPos.draw();

console.log(initPos.generateChildrens());

let data = {
    '00': " ",
    '01': " ",
    '02': " ",
    '10': " ",
    '11': " ",
    '12': " ",
    '20': " ",
    '21': " ",
    '22': " "
};

//for (let i = 0; i < 3; i++) {
//    for (let j = 0; j < 3; j++) {
//        area.innerHTML += "<div class='el' id=" + i + j + "></div>";
//    }
//}


for (var i = 0; i < but.length; i++) {
    but[i].addEventListener("click", choise, false);
}

function choise() {
    var b = this.innerHTML;
    alert(this.innerHTML);
    switch (b) {
        case 'Человек с человеком':
            console.log('Человек с человеком');
            break;
        case 'Компьютер с человеком':
            console.log('Компьютер с человеком');
            if (player == "x") {
                alert('Ходит компьютер');
            }

            break;
        case 'Компьютер с компьютером':
            console.log('Компьютер с компьютером');
            break;
        default:
            console.log('Пожалуйста, выберите режим игры!');
    }
}


for (var i = 0; i < el.length; i++) {
    el[i].addEventListener("click", elClick, false);
}

function elClick() {
    if (!this.innerHTML) {
        this.innerHTML = player;
        var a = this.getAttribute('id');
        data[a] = player;
    } else {
        alert("Ячейка занята");
        return;
    }

    if (checkWin() == "10" || checkWin() == "-10") {
        alert("Выграл: " + player);
    } else {
        pole();
    }

    player = player == "x" ? "o" : "x";
    currentPlayer.innerHTML = player.toUpperCase();
}

function checkWin() {

    // проверка по строкам выигрышь для х или о.
    for (let i = 0; i < 3; i++) {
        if (data[i + "0"] == data[i + "1"] && data[i + "1"] == data[i + "2"]) {
            if (data[i + "0"] == 'x')
                return +10;
            else if (data[i + "0"] == 'o')
                return -10;
        }
    }
    // проверка по столбцам выигрыш для х или о.
    for (let j = 0; j < 3; j++) {
        if (data["0" + j] == data["1" + j] && data["1" + j] == data["2" + j]) {
            if (data["0" + j] == 'x')
                return +10;
            else if (data["0" + j] == 'o')
                return -10;
        }
    }
    // проверка по диагоналям выигрыш для х или о.
    if (data["00"] == data["11"] && data["11"] == data["22"]) {
        if (data["00"] == 'x')
            return +10;
        else if (data["00"] == 'o')
            return -10;
    }
    if (data["02"] == data["11"] && data["11"] == data["20"]) {
        if (data["02"] == 'x')
            return +10;
        else if (data["02"] == 'o')
            return -10;
    }
    // В противном случае возвращаем 0, если никто не выиграл
    return 0;
}
var start = document.getElementById('start');
start.addEventListener("click", restart, false);

function pole() {
    var all = true;
    for (var i = 0; i < el.length; i++) {
        if (el[i].innerHTML == '') all = false;
    }
    if (all) {
        alert("Ничья");
    }
}

function restart() {
    for (let i = 0; i < el.length; i++) {
        el[i].innerHTML = '';
    }
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            data[i + "" + j] = " ";
        }
    }
    player = "x";
    currentPlayer.innerHTML = player.toUpperCase();
}

/*
 * стандартная позиция минимакса
 */
function minimax(node, depth, maximizingPlayer){
    let value = DRAW_VALUE;
    if (depth == 0 || checkWin() != 0) {
        return  value; // the heuristic value of node
    }
    if (maximizingPlayer) {
        value = LOSS_VALUE;
        let childrens = node.generateChildrens();
        for(let child of childrens) {
            value = max(value, minimax(child, depth - 1, FALSE));
        }
        return value;
    }
    else { //(* minimizing player *)
        value = WIN_VALUE;
        let childrens = node.generateChildrens();
        for(let child of childrens) {
            value = min(value, minimax(child, depth - 1, TRUE))
        }
        return value;
    }
}