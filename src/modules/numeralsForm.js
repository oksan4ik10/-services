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

export default numeralsForm;