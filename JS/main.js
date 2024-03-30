// -----Array, Object, ID-----//
let circles = [];
let circle;
let id = 0;

//-----Buttons-----//
const btnStart = document.querySelector('#btnStart');
const btnPause = document.querySelector('#btnPause');
const btnCircle = document.querySelector('#btnCircle');
const btnReset = document.querySelector('#btnReset');
const btnClear = document.querySelector('#btnClear');

//-----Timer Blocks-----//
const hoursBlock = document.querySelector('#hoursBlock');
const minutesBlock = document.querySelector('#minutesBlock');
const secondsBlock = document.querySelector('#secondsBlock');
const millisecondsBlock = document.querySelector('#millisecondsBlock');

// Revrite array with Data from LocaleStorage
if(localStorage.getItem('circles')) {
    circles = JSON.parse(localStorage.getItem('circles'));
    circles.forEach(renderCircle);
}

//-----Time Units-----//
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

if (circles.length>=1) {
    id = circles.at(-1).id;
    hours = circles.at(-1).hours;
    minutes = circles.at(-1).minutes;
    seconds = circles.at(-1).seconds;
    milliseconds = circles.at(-1).milliseconds;

    assignValues();
} 

//-----IntervalID-----//
let intervalId;

//-----Events-----//
btnStart.addEventListener('click', function() {
    replaceButtons();
    
    intervalId = setInterval(startTimer, 10);
});

btnPause.addEventListener('click', function() {
    replaceButtons();

    clearInterval(intervalId);
});

btnReset.addEventListener('click', function() {
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;

    assignValues();
}); 

btnCircle.addEventListener('click', createCircle);

btnClear.addEventListener('click', clearCircles);

//-----Functions-----//
function startTimer() {
    milliseconds++;

    if (milliseconds > 99) {
        seconds++;
        milliseconds = 0;
    }

    if (seconds > 59) {
        minutes++;
        seconds = 0;
    } 

    if (minutes > 59) {
        hours++;
        minutes = 0;
    }

    assignValues();
}

function createCircle() {
    id++; 
    circle = {
        id: id,
        hours: hours,
        minutes:  minutes,
        seconds: seconds,
        milliseconds: milliseconds,
    }

    circles.push(circle);
    saveToLocalStorage();

    renderCircle(circle);
}

function clearCircles() {
    circles = [];
    saveToLocalStorage();

    id = 0;

    const circlesElements = circlesBlock.children;
    while(circlesElements.length) {
        for (item of circlesElements) {
            item.remove();
        }
    }

}

function replaceButtons() {
    btnStart.classList.toggle('none');
    btnReset.classList.toggle('none');
    btnPause.classList.toggle('none');
    btnCircle.classList.toggle('none');
}

function saveToLocalStorage() {
    localStorage.setItem('circles', JSON.stringify(circles));
}

function renderCircle(circle) {
    const time = `${circle.hours.toString().padStart(2, '0')} : ${circle.minutes.toString().padStart(2, '0')} : ${circle.seconds.toString().padStart(2, '0')} : ${circle.milliseconds.toString().padStart(2, '0')}`;
    const circleHTML = `<div class="circles__item">
                            <div class="circles__index">${circle.id}.</div>
                            <div class="circles__time">${time}</div>
                        </div>`;

    circlesBlock.insertAdjacentHTML('beforeend', circleHTML);
}

function assignValues() {
    hoursBlock.innerText = `${hours.toString().padStart(2, '0')}`;
    minutesBlock.innerText = `${minutes.toString().padStart(2, '0')}`;
    secondsBlock.innerText = `${seconds.toString().padStart(2, '0')}`;
    millisecondsBlock.innerText = `${milliseconds.toString().padStart(2, '0')}`;
}