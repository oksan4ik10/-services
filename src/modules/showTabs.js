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

export default showTabs;