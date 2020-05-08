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

export default ourComand;