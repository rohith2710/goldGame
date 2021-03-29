function Game() {

}


var c = document.getElementById("myCanvas");
c.width = 700;
c.height = 500;
c.style.left = "100px";
c.style.top = "50px";
c.style.position = "relative";
var context = c.getContext("2d");

var ballCenter = {
    x: 80,
    y: 400,
    isFirstTime: true,
    barLength: 0,
    points: 0,
    playerId: 1,
}
// function setBallCenter() {

// }
// create bg
function drawBG() {
    context.beginPath();
    context.moveTo(350, 25);
    context.quadraticCurveTo(25, 25, 45, 120);
    context.stroke();
    context.quadraticCurveTo(70, 125, 5, 450);
    context.lineWidth = 1;
    context.quadraticCurveTo(400, 450, 360, 430);

    context.quadraticCurveTo(330, 110, 370, 110);

    context.quadraticCurveTo(390, 40, 350, 25);

    context.fillStyle = "#85c040";
    context.fill();
    context.stroke();
    context.closePath();
}

function init(x, y, r) {
    if (x == 80 && ballCenter.isFirstTime == false) {
        //debugger
        ballCenter.playerId = 2;
        ballCenter.x = x;
        ballCenter.y = y;
        ballCenter.points = 0;
        ballCenter.isFirstTime = true;
    }
    // draws intial background
    drawBG();
    //create white circle
    drawWhiteCircle();
    //create red hole
    drawHole();
    // create flag
    //create ball
    drawFlag();
    drawBall(x, y, r);
    if (ballCenter.isFirstTime) {
        distance(80, 400, 240, 130);
    } else {
        distance(x, y, 240, 130);
    }
    findPoints(ballCenter.x, ballCenter.y, 240, 130);
    result(ballCenter);
}
function drawBall(x, y, r) {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.fillStyle = "#000000";
    context.lineWidth = 1;
    context.fill();
    context.closePath();
}
// big circle 
function drawWhiteCircle() {
    context.beginPath();
    context.arc(220, 150, 50, 0, Math.PI * 2);
    context.fillStyle = "#ffffff";
    context.fill();
    context.closePath();
}
function drawHole() {
    context.beginPath();
    context.arc(240, 130, 10, 0, Math.PI * 2);
    context.fillStyle = "#ff0000";
    context.fill();
    context.closePath();
}

function drawFlag() {
    context.beginPath();
    context.moveTo(250, 110);
    context.lineTo(250, 40);
    context.lineTo(200, 70);
    context.lineTo(250, 70);
    context.fillStyle = "#ffffff";
    context.strokeStyle = "#ffffff";
    context.fill();
    context.stroke();
    context.closePath();
}

/////
elemLeft = c.offsetLeft,
    elemTop = c.offsetTop,
    // elements = [];

    // event listener for click event
    c.addEventListener('click', function (event) {
        var xVal = event.pageX - elemLeft,
            yVal = event.pageY - elemTop;
        console.log(xVal, yVal);
        // context.arc(80, 400, 10, 0, Math.PI * 2);
        if (Math.pow(xVal - ballCenter.x, 2) + Math.pow(yVal - ballCenter.y, 2) < Math.pow(10, 2)) {
            //alert('hi');
            moveBall();
        }
    }, false);


function moveBall() {
    console.log("newballpositions", xt, yt);
    if (xt >= ballCenter.x && yt <= ballCenter.y && xt <= 240 && yt >= 130) {
        ballCenter.isFirstTime = false;
        context.clearRect(0, 0, 500, 500);

        //setTimeout(function () {
        ballCenter.x = xt;
        ballCenter.y = yt;
        init(xt, yt, 10);
        //distance(x, y, 240, 130);
        //  }, 250);
        console.log('hi');
        //  updateCoordinates(xt, yt, 10);
    }
}

function distance(firstXValue, firstYValue, secondXValue, secondYValue) {
    var x1 = firstXValue, y1 = firstYValue, x2 = secondXValue, y2 = secondYValue;
    console.log('rohith', ballCenter.x, ballCenter.y);
    var xDiff = x2 - x1;
    var yDiff = y2 - y1;
    m = (y2 - y1) / (x2 - x1);
    alpha = Math.atan2(y2 - y1, x2 - x1);
    pointsDiff = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

    totalLineLength = Math.random() * 160;
    ballCenter.barLength = totalLineLength;
    ratio = totalLineLength / pointsDiff;
    //xt = ((1 - ratio) * x1 + ratio * x2);
    //yt = ((1 - ratio) * y1 + ratio * y2);
    // xt = x1 + ratio * (x2 - x1);
    // yt = y1 + ratio * (y2 - y1);
    xt = x1 + (totalLineLength * Math.cos(alpha))
    yt = y1 + (totalLineLength * Math.sin(alpha))
    console.log(ratio, xt, yt);
}
// distance(80, 400, 240, 130);
function findPoints(x1, y1, x2, y2) {
    var xD = x2 - x1, yD = y2 - y1;
    diffPoints = Math.sqrt(xD * xD + yD * yD);

    if (diffPoints > 300) {
        ballCenter.points = 5;
    } else if (diffPoints > 300) {
        ballCenter.points = 5;
    } else if (diffPoints > 250) {
        ballCenter.points = 4;
    } else if (diffPoints > 200) {
        ballCenter.points = 3;
    } else if (diffPoints > 150) {
        ballCenter.points = 2;
    } else if (diffPoints > 80) {
        ballCenter.points = 1;
    } else {
        ballCenter.points = 1;
    }
    console.log('pointvalue', diffPoints, ballCenter.points);
}
function updateCoordinates(x, y, r) {
    setTimeout(function () {
        ballCenter.x = x;
        ballCenter.y = y;
        //distance(x, y, 240, 130);
    }, 1000);
}