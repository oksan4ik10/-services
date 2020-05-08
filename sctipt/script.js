'use strict';


    import callTimer from ".modules/callTimer";
    import callMenu from ".modules/callMenu";
    import popForm from ".modules/popForm";
    import showTabs from ".modules/showTabs";
    import playSlider from ".modules/playSlider";
    import ourComand from ".modules/ourComand";
    import numeralsForm from ".modules/numeralsForm";
    import calcForm from ".modules/calcForm";
    import sendForm from ".modules/sendForm";

    //таймер
    callTimer();
    //меню
    callMenu();
    //модульные окна
    popForm();
    //табы дизайн
    showTabs();
    //слайдер
    playSlider();
    //наша команда работа с дата-атрибутами (смена фото при наведении)
    ourComand();
    //разрешить ввод только цифр
    numeralsForm();
    //калькулятор для формы
    calcForm(100);
    //отправка ajax формы на шапке сайта
    sendForm();

