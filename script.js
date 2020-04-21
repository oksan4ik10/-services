'use strict';
window.addEventListener("DOMContentLoaded", () => {

    //таймер
    const callTimer = () => {
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

    };
    callTimer();

    //меню
    const callMenu = () => {
        const menu = document.querySelector("menu"),
            btnMenu = document.querySelector(".menu"),
            closeBtn = document.querySelector(".close-btn"),
            menuItems = document.querySelectorAll("ul>li a[href*='#']");


        const handlerMenu = () =>  menu.classList.toggle("active-menu");

        btnMenu.addEventListener("click", handlerMenu);
        closeBtn.addEventListener("click", handlerMenu);
        menuItems.forEach(el => el.addEventListener("click", handlerMenu));

        //плавный переход
        // const=menuItems[0].getAttribute();


        function animateMenu(testItem) {
            let idAnimateMenu, count = 0;
            const testId = testItem.getAttribute("href"),
                top = document.querySelector(`${testId}`);
            function startAnimateMenu() {
                idAnimateMenu = requestAnimationFrame(startAnimateMenu);
                count++;
                const newCount = count * 20;
                if (newCount >= top.offsetTop) cancelAnimationFrame(idAnimateMenu);
                window.scrollTo(0, newCount);

            }
            idAnimateMenu = requestAnimationFrame(startAnimateMenu);
        }

        menuItems.forEach(el => {
            el.addEventListener("click", event => {
                event.preventDefault();
                animateMenu(el);

            });

        });






    };

    callMenu();

    //модульные окна
    const popForm = () => {
        const btnPop = document.querySelectorAll(".popup-btn"),
            popup = document.querySelector(".popup"),
            btnPopClose = document.querySelectorAll(".popup-close");

        btnPop.forEach(el => el.addEventListener("click", () => {
            popup.style.display = "block";
            popFormAnimate();
        }));

        btnPopClose.forEach(el => el.addEventListener("click", () => {
            popup.style.display = "none";
        }));


        const popFormAnimate = () => {
        //анимация для модульного окна
            const popupContent = document.querySelector(".popup-content");
            let idAnimatePop;
            popupContent.style.left = "0%";
            let count = 0;
            function animatePop() {
                idAnimatePop = requestAnimationFrame(animatePop);
                count++;
                const newCount = (count * 0.2);
                popupContent.style.left = newCount + "%";
                if (newCount === 38) cancelAnimationFrame(idAnimatePop);
            }
            idAnimatePop = requestAnimationFrame(animatePop);


        };
    };

    popForm();
});
