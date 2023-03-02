var area = document.getElementById('area');
var el = document.getElementsByClassName('el');
var currentPlayer = document.getElementById('curPlyr');
var but = document.getElementsByClassName('but');


let player = "x";

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

for (var i = 0; i < 3; i++) {
	for (var j = 0; j < 3; j++) {
		area.innerHTML += "<div class='el' id=" + i + j + "></div>";
	}
}


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
            data[i+ "" +j] = " ";
        }
    }
    player = "x";
    currentPlayer.innerHTML = player.toUpperCase();
}