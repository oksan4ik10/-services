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

export default playSlider;