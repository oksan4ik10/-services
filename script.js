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

    //слайдер
    const playSlider = () => {
        const portfolioContent = document.querySelector(".portfolio-content"),
            portfolioItem = document.querySelectorAll(".portfolio-item"),
            portfolioDots = document.querySelector(".portfolio-dots");


        //создание точек в слайдере
        for (let i = 0; i < portfolioItem.length; i++) {
            const newLi = document.createElement("li");
            newLi.classList.add("dot");

            if (i === 0) newLi.classList.add("dot-active");
            portfolioDots.append(newLi);
        }

        const dot = portfolioDots.querySelectorAll(".dot");



        const addClassSlide = (item, index, strClass) => {
            item[index].classList.add(strClass);
        };

        const removeClassSlide = (item, index, strClass) => {
            item[index].classList.remove(strClass);
        };

        let count = 0;

        const autoPlaySlide = () => {
            removeClassSlide(portfolioItem, count, "portfolio-item-active");
            removeClassSlide(dot, count, "dot-active");
            count++;
            if (count >= portfolioItem.length) count = 0;
            addClassSlide(portfolioItem, count, "portfolio-item-active");
            addClassSlide(dot, count, "dot-active");
        };

        let idAnimate;
        function readyAnimateSlider(time = 3000) {
            idAnimate = setInterval(autoPlaySlide, time);

        }


        //по нажатию на стрелочки или на точки в слайдере
        portfolioContent.addEventListener("click", event => {
            event.preventDefault();

            const target = event.target;
            if (!target.matches(".portfolio-btn, .dot")) {
                return;
            }
            removeClassSlide(portfolioItem, count, "portfolio-item-active");
            removeClassSlide(dot, count, "dot-active");
            if (target.matches(".prev")) {
                count--;
            } else if (target.matches(".next")) {
                count++;
            } else if (target.matches(".dot")) {
                dot.forEach((elem, index) => {
                    if (elem === target) count = index;
                });

            }
            if (count < 0) count = portfolioItem.length - 1;
            if (count > portfolioItem.length - 1) count = 0;
            addClassSlide(portfolioItem, count, "portfolio-item-active");
            addClassSlide(dot, count, "dot-active");


        });

        //останавливать и запускать слайдер, когда наводим на слайдер мышью
        portfolioContent.addEventListener("mouseover", () => clearInterval(idAnimate));
        portfolioContent.addEventListener("mouseout", () =>  readyAnimateSlider(1000));




        readyAnimateSlider(1000);


    };

    playSlider();

    //наша команда работа с дата-атрибутами (смена фото при наведении)
    const ourComand = () => {
        const command = document.getElementById("command");

        command.addEventListener("mouseover", event => {
            const target = event.target;
            if (!target.classList.contains("command__photo")) return;
            target.setAttribute("src", target.dataset.img);
        });
        command.addEventListener("mouseout", event => {
            const target = event.target;
            if (!target.classList.contains("command__photo")) return;
            let imgSrc = target.getAttribute("src");

            imgSrc = imgSrc.replace("a.jpg", ".jpg");

            target.setAttribute("src", imgSrc);
        });

    };
    ourComand();




    //разрешить ввод только цифр
    const numeralsForm = () => {
        const calcForm = document.getElementById("calc");

        calcForm.addEventListener("input", event => {
            const target = event.target;
            let str = ""; //вспомогательная строка

            if (!target.type === "number") return;
            const symbol = event.data; //каждый символ, который вводит пользователь
            if (event.data) {
                str += event.data;
                if (/\D/.test(symbol)) {
                    str = str.slice(0, str.length - 1);
                    target.value = str;
                }
            }
            str = target.value;


        });

    };

    numeralsForm();

});

//калькулятор для формы
const calcForm = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
        calcSquare = document.querySelector(".calc-square"),
        calcCount = document.querySelector(".calc-count"),
        calcItem = document.querySelector(".calc-type"),
        totalId = document.getElementById("total"),
        calcDay = document.querySelector(".calc-day");



    calcBlock.addEventListener("change", () => {

        let total = 0, count, calcCountValue, calcDayValue, idAnimate, countAnimate = 0;
        const calcTotal = () => {
            if (!(calcSquare.value) || !(calcItem.value)) return;
            !(calcCount.value) ? calcCountValue = 1 : calcCountValue = calcCount.value;
            count = calcSquare.value * price * calcItem.value;

            count = (count / 10) * calcCountValue + (count - count / 10);

            !(calcDay.value) ? calcDayValue = 10 : calcDayValue = calcDay.value;
            if (calcDayValue < 5) count *= 2;
            else if (calcDayValue < 10) count *= 1.5;

            total = count;

            idAnimate = setInterval(showAnimate, 50);




        };

        calcTotal();


        //анимация для вывода стоимости
        function showAnimate() {
            totalId.textContent = countAnimate;
            if (countAnimate >= total) {
                countAnimate = 0;
                clearInterval(idAnimate);
            }
            countAnimate++;


        }

    










    });

};

calcForm(100);
