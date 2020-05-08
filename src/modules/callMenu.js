const callMenu = () => {


    const menu = document.querySelector("menu");

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

export default callMenu;