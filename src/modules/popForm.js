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

export default popForm;