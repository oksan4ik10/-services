/* eslint-disable strict */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');




    function getServer() {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', './cars2.json');
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send();
            xhr.addEventListener("readystatechange", () => {

                if (xhr.readyState === 4 && xhr.status === 200) resolve(JSON.parse(xhr.responseText));
                reject("Произошла ошибка");
            });


        });
    }

    select.addEventListener('change', () => {
        getServer()
            .then(data => {
                console.log(data);

                data.cars.forEach(item => {
                    if (item.brand === select.value) {
                        const { brand, model, price } = item;
                        output.innerHTML = `Тачка ${brand} ${model} <br>
                                Цена: ${price}$`;
                    }
                });

            })
            .catch(data => output.innerHTML = data);

    });


});
