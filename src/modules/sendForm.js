const sendForm = () => {
    const errorMessage = "Что-то пошло не так",
        loadMessage = "Загрузка...",
        successMessage = "Спасибо! Мы скоро свяжемся с Вами";
    const form = document.getElementById("form1"),
        form2 = document.getElementById("form2"),
        form3 = document.getElementById("form3");

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = "font-size: 2rem; color: white;";
    statusMessage.textContent = "Тут будет сообщение";



    const formRead = forma => {
        forma.addEventListener("submit", event => {
            event.preventDefault();
            forma.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const body = {};
            const formData = new FormData(forma); //получаем данные с формы
            formData.forEach((val, key) => {
                body[key] = val;

            });


            postData(body)
                .then(response => {
                    if (response.status !== 200) throw new Error("Ошибка");
                    else {
                        statusMessage.textContent = successMessage;
                    }

                }


                )
                .catch(res => {
                    statusMessage.textContent = errorMessage;
                    console.error(res);

                });


            //очищене полей формы после отправки
            formData.forEach((val, key) => {
                const input = forma.querySelector(`[name=${key}]`);
                input.value = "";


            });

        });



    };

    formRead(form);
    formRead(form2);
    formRead(form3);



    const postData = body => fetch("server.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    //запрет ввод данных
    const nameWords = document.querySelectorAll("input[name=user_name]"),
        nameMessage = document.querySelectorAll("input[name=user_message]"),
        nameSum = document.querySelectorAll("input[name='user_phone']");


    nameWords.forEach(el => {
        el.addEventListener("input", e => {
            e.target.value = e.target.value.replace(/([^А-Я\s])/gi, "");
        });
    });
    nameMessage.forEach(el => {
        el.addEventListener("input", e => {
            e.target.value = e.target.value.replace(/([^А-Я\s])/gi, "");
        });
    });

    nameSum.forEach(el => {
        el.addEventListener("input", e => {
            e.target.value = e.target.value.replace(/([^\d\+])/gi, "");
        });
    });
};

export default sendForm;