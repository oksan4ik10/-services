const calcForm = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block"),
        calcSquare = document.querySelector(".calc-square"),
        calcCount = document.querySelector(".calc-count"),
        calcItem = document.querySelector(".calc-type"),
        totalId = document.getElementById("total"),
        calcDay = document.querySelector(".calc-day");




        let change = false;
    calcBlock.addEventListener("change", () => {

        let total = 0, count, calcCountValue, calcDayValue, idAnimate, countAnimate = 0;
        const calcTotal = () => {          
            
            if (!(calcSquare.value) || !(calcItem.value)) {
                return;
            }
            !(calcCount.value) ? calcCountValue = 1 : calcCountValue = calcCount.value;
            count = calcSquare.value * price * calcItem.value;

            count = (count / 10) * calcCountValue + (count - count / 10);

            !(calcDay.value) ? calcDayValue = 10 : calcDayValue = calcDay.value;
            
            if (calcDayValue < 5) count *= 2;
            else if (calcDayValue < 10) count *= 1.5;

            total = count;

            idAnimate = requestAnimationFrame(showAnimate);
        };

        calcTotal();


        //анимация для вывода стоимости
        function showAnimate() {
            idAnimate = requestAnimationFrame(showAnimate);   
            totalId.textContent = countAnimate;
            if (!(calcSquare.value) || !(calcItem.value) || countAnimate >= total || calcDay.value === "0") {
                countAnimate = 0;
                cancelAnimationFrame(idAnimate);
            }
            countAnimate++;


        }

    });

};

export default calcForm;