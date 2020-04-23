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
            const timer = getTimer("5 may 2020");
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
            imgScroll = document.querySelector(" a[href='#service-block']"); //скролл в шапке

        const handlerMenu = () =>  menu.classList.toggle("active-menu");



        //плавный переход по клику на меню
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

        document.body.addEventListener("click", event => {
            const target = event.target;
            //клик по картинке с меню
            if (target.closest(".menu")) handlerMenu();


            if (target.closest("ul>li>a[href*='#']")) {
                //анимация по кнопке на шапке
                menu.classList.remove("active-menu");
                event.preventDefault();
                animateMenu(target);
            } else if ((target.closest(".close-btn")) || (menu.classList.contains("active-menu") && (!target.closest("menu") && (!target.closest(".menu"))))) {

                //клик мимо меню или по кнопке крестик
                menu.classList.remove("active-menu");
            }

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

        popup.addEventListener("click", even => {
            if ((!even.target.closest(".popup-content")) || even.target.classList.contains("popup-close")) {
                popup.style.display = "none";
            }
        });


        const popFormAnimate = () => {
        //анимация для модульного окна
            const popupContent = document.querySelector(".popup-content");
            let idAnimatePop;
            let count = 0;
            function animatePop() {
                idAnimatePop = requestAnimationFrame(animatePop);
                count++;
                const newCount = (count * 0.8);
                popupContent.style.left = newCount + "%";
                if (newCount >= 38)  cancelAnimationFrame(idAnimatePop);
            }
            if (document.documentElement.clientWidth >= 768) {
                popupContent.style.left = "0%";
                idAnimatePop = requestAnimationFrame(animatePop);
            }


        };
    };

    popForm();


    //табы дизайн
    const showTabs = () => {
        const serviceHeader = document.querySelector(".service-header"),
            serviceHeaderTab = document.querySelectorAll(".service-header-tab"),
            serviceTab = document.querySelectorAll(".service-tab");


        function openTab(item) {
            for (let i = 0; i < serviceHeaderTab.length; i++) {
                if (item === serviceHeaderTab[i]) {
                    serviceTab[i].classList.remove("d-none");
                    serviceHeaderTab[i].classList.add("active");
                } else {
                    serviceTab[i].classList.add("d-none");
                    serviceHeaderTab[i].classList.remove("active");
                }


            }
        }

        serviceHeader.addEventListener("click", even => {
            let target = even.target;
            do {
                if (target.classList.contains("service-header-tab")) {
                    openTab(target);
                    target = "";
                } else {
                    target = target.closest(".service-header-tab");
                }
            } while (target);


        });

    };

    showTabs();




});
