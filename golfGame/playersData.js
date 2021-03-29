var players = [{
    'Name': 'FirstName',
    'Number of Wins': 'Number of Wins',
    'Number of Losses': 'Number of Losses',
    'points': 'points for round'
}, {
    'FirstName': 'hi',
    'Wins': 0,
    'Losses': 0,
    'points': 0
}, {
    'FirstName': 'helo',
    'Wins': 0,
    'Losses': 0,
    'points': 0
}
];


var localData = JSON.parse(localStorage.getItem("playersData") || "[]");

if (localData.length == 0) {
    // setting first person name
    players[1].FirstName = prompt("Please enter your Player1 name", "Your name");
    console.log(players[0].FirstName);
    // setting second person name
    players[2].FirstName = prompt("Please enter your Player1 name", "Your name");
    console.log(players[0].SecondName);
    // set players name in local storage
    localStorage.setItem("playersData", JSON.stringify(players));
} else {
    players = localData;
}
// setting points to zero on every load
players[1].points = 0;
players[2].points = 0;
// add intail info to table
addTable();


function addTable() {
    //
    //removing intial/old table
    var myOldTable = document.querySelectorAll("table");
    if (myOldTable.length > 0)
        // document.body.remove(myOldTable[0]);
        myOldTable[0].remove();
    //new 
    var myTableDiv = document.getElementById("myDynamicTable");
    var table = document.createElement('TABLE');
    table.setAttribute("class", "dataTable");

    table.border = '1';

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    for (var i = 0; i < players.length; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        for (const prop in players[i]) {
            var td = document.createElement('TD');
            td.width = '120';
            td.appendChild(document.createTextNode(players[i][prop]));
            tr.appendChild(td);
        }
    }
    myTableDiv.appendChild(table);
}
// for number of rounds count, max 5
var p1data = 0;
var p2data = 0;
// game starts here
function startGame() {
    document.getElementById('messagebox').innerText = players[1].FirstName + '  turn';
    player1 = init(80, 400, 10, 1);
}
startGame(); // player1 , first turn
function result(d) {
    if (d.playerId == 1 && !d.isFirstTime) {
        p1data++;
        players[1].points += d.points;
        addTable();
        if (d.points == 1) {
            // debugger;
            players[1].points += d.points; // final player1 points
            //start 2nd player game
            addTable();
            player2Firstturn();
        }
        //player2Firstturn();
    } else if (d.playerId == 2 && !d.isFirstTime) {
        // debugger
        p2data++;
        players[2].points += d.points;
        addTable();
        if (d.points == 1) {
            players[2].points += d.points; // final player2 points
            addTable();
            gameover();
        }
    }
}
function player2Firstturn() {
    document.getElementById('messagebox').innerText = players[2].FirstName + '  turn';
    player2 = init(80, 400, 10);
}
function gameover() {
    // debugger
    if (players[1].points > players[2].points) {
        document.getElementById('messagebox').innerText = players[2].FirstName + '  Won the game';
        players[2].Wins = ++players[2].Wins;
        players[1].Losses = Math.abs(--players[1].Losses);
    } else {
        document.getElementById('messagebox').innerText = players[1].FirstName + '  Won the game';
        players[1].Wins = ++players[1].Wins;
        players[2].Losses = Math.abs(--players[2].Losses);
    }
    addTable();
    showRefreshButton();
}
function showRefreshButton() {
    document.getElementById('mybtn').style.visibility = 'visible';
}

function refreshPage() {
    localStorage.setItem("playersData", JSON.stringify(players));
    window.location.reload();
}
