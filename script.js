'use strict';
window.addEventListener("DOMContentLoaded", () => {


    function addZero(num) {
        if (num < 10) return ("0" + String(num));
        return num;
    }
    function getTimer(deadline) {
        const dayEnd = new Date(deadline);
        const dayNow = new Date();
        const timeMiliSecond = dayEnd - dayNow;

        let second = 0,
            minute = 0,
            hour = 0;
        if (timeMiliSecond > 0) {
            second = Math.floor(timeMiliSecond / 1000 % 60),
            minute = Math.floor((timeMiliSecond / 1000 / 60) % 60),
            hour = Math.floor(timeMiliSecond / 1000 / 60 / 60);
        }
        return { second, minute, hour, timeMiliSecond };

    }

    function setTimer() {
        const timerHours = document.querySelector("#timer-hours"),
            timerMinute = document.querySelector("#timer-minutes"),
            timerSecond = document.querySelector("#timer-seconds");
        const timer = getTimer("22 april 2020");
        timerHours.textContent = addZero(timer.hour);
        timerMinute.textContent = addZero(timer.minute);
        timerSecond.textContent = addZero(timer.second);
        if (timer.timeMiliSecond < 0) clearInterval(idTimer);

    }

    const idTimer = setInterval(setTimer, 1000);



});
