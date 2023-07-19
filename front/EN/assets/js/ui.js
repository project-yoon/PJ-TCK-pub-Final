// gnb
function gnb() {
    $(".depth-01 > li").on({
        mouseenter: function(){
            activeNav($(".gnb-wrap"), $(this).children(".gnb-wrap"));
            $(this).addClass("active");
            $(this).closest("header:not(.sub-header)").addClass("on");
        },
        mouseleave: function(){
            hideNav($(this).children(".gnb-wrap"));
            $(this).removeClass("active");
            $(this).closest("header:not(.sub-header)").removeClass("on");
        }
    });
    $(".depth-01 > li > a").on({
        mouseenter: function(){
            activeNav($(".gnb-wrap"), $(this).closest("li").children(".gnb-wrap"));
            $(this).closest("header:not(.sub-header)").addClass("on");
        },
        mouseleave: function(){
            hideNav($(this).closest("li").children(".gnb-wrap"));
        },
        click: function(){
            $(this).off('mouseleave');
        }
    });
    $(".gnb-wrap").on({
        mouseenter: function(){
            activeNavWrap($(this));
        },
        mouseleave: function(){
            hideNav($(this));
        },
        click: function(){
            $(this).off('mouseleave');
        }
    });
    $(".depth-01 li:last-child .depth-02 li:last-child a").on("blur", function () {
        hideNav($(".gnb-wrap"));
        $(this).closest("header:not(.sub-header)").removeClass("on");
    });

    function activeNav(target, target2) {
        target.stop().hide().slideUp(150);
        target2.stop().slideDown(150);
    }
    function activeNavWrap(target) {
        target.stop().show();
    }
    function hideNav(target) {
        target.stop().slideUp(150);
    }

    // 2depth iamges change
    const deps = document.querySelectorAll(".depth-navi");

    deps.forEach((elm) => {
        const targetImg = elm.querySelector(".gnb-img img");
        const targetText = elm.querySelector(".gnb-img span");

        const defSrc = targetImg.getAttribute("src");
        const defText = targetText.innerHTML;

        const linkBtns = elm.querySelectorAll(".depth-02 li a");

        linkBtns.forEach((linkBtn) => {
            linkBtn.addEventListener("mouseenter", () => {
                targetImg.setAttribute("src", linkBtn.dataset.src || "");
                targetText.innerHTML = linkBtn.innerText || "";
            });

            linkBtn.addEventListener("mouseleave", () => {
                targetImg.setAttribute("src", defSrc);
                targetText.innerHTML = defText;
            });
        });
    });
}

// sitemap menu
function btnSitemap() {
    let btnSite = document.querySelector(".btn-sitemap");
    if (!btnSite) return;
    let siteMenu = document.querySelector(".site-menu");

    btnSite.addEventListener("click", function () {
        let urlPageNameCheck = window.location.pathname.split("/").pop();
        let mainPageCheck = urlPageNameCheck === "main.html";
        let historyPageCheck = urlPageNameCheck === "history.html";

        btnSite.classList.toggle('close');
        siteMenu.classList.toggle('on');

        if (matchMedia('all and (max-width: 1024px)').matches) {
            if (document.querySelector('.site-menu').classList.contains('on')) {
                document.querySelector('#wrap').style.height = '100vh';
                document.querySelector('.user-menu').style.cssText = `-webkit-box-pack: justify; -moz-justify-content: space-between; -ms-flex-pack: justify; justify-content: space-between;`;
                document.querySelector('.user-menu').classList.add('active-click');
                document.querySelector('.logo').style.display = 'none';
                // document.querySelector('.user-menu .btn-inquiry').style.display = 'none'; 다국어 문의 버튼 부재
                document.querySelector('.language-menu').style.display = 'block';

                if (mainPageCheck) {
                    document.querySelector('#header .user-menu .btn-sitemap.close').style.backgroundColor = '#333';
                    document.querySelector('.language-menu .btn-language').style.backgroundImage = 'url(../../assets/images/btn_lang_black.png)';
                }

                if (historyPageCheck) {
                    document.querySelector('#wrap').style.overflow = 'hidden';
                }
            } else {
                document.querySelector('#wrap').style.height = 'unset';
                document.querySelector('.user-menu').style.cssText = `-webkit-box-pack: end; -moz-box-justify-content: flex-end; -ms-flex-pack: end; justify-content: flex-end;`;
                document.querySelector('.user-menu').classList.remove('active-click');
                document.querySelector('.logo').style.display = 'block';
                // document.querySelector('.user-menu .btn-inquiry').style.display = 'block'; 다국어 문의 버튼 부재
                document.querySelector('.language-menu').style.display = 'none';

                if (mainPageCheck) {
                    document.querySelector('#header .user-menu .btn-sitemap').style.backgroundColor = 'transparent';
                    document.querySelector('.language-menu .btn-language').style.backgroundImage = 'url(../../assets/images/btn_lang_white.png)';
                }

                if (historyPageCheck) {
                    document.querySelector('#wrap').style.overflow = 'unset';
                }
            }
        }
    });
}

// language menu
function languageMenu() {
    let languageBtn = document.querySelector(".btn-language");
    if (!languageBtn) return;
    let languageList = document.querySelector(".lang-navi");
    let languageitems = document.querySelectorAll(".lang-navi > ul li a");
    let isMenuVisible = languageList.classList.contains("on");

    languageBtn.addEventListener("click", function (e) {
        e.preventDefault();
        isMenuVisible = !isMenuVisible;
        if (isMenuVisible) {
            showMenu(e.target.nextElementSibling);
        } else {
            hideMenu(e.target.nextElementSibling);
        }
    });
    languageList.parentElement.addEventListener("focusout", function (event) {
        if (!languageList.contains(event.relatedTarget) && event.target !== languageList) {
            isMenuVisible = !isMenuVisible;
            hideMenu(event.target);
        }
    });
    languageitems.forEach(function (languageitem) {
        languageitem.addEventListener("click", function (e) {
            this.closest(".lang-navi").classList.remove("on");
        });
    });
    function showMenu(val) {
        val = languageList.classList.add("on");
    }
    function hideMenu(val) {
        val = languageList.classList.remove("on");
    }
}
function scrollMoveBtn() {
    let targetElement = document.querySelector(".skip_navi");
    let flootingBtns = document.querySelector(".floating-btns");
    let endPoint = document.querySelector("#footer");
    let endPointHeight = endPoint.offsetHeight;

    function handleScroll() {
        const elementTop = targetElement.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        if (elementTop < viewportHeight && elementTop !== 0) {
            showFlootingBtn();
        } else if (elementTop === 0) {
            hideFlootingBtn();
            flootingBtns.style.transition = "";
        }
        flootingFixed();
    }

    function flootingFixed() {
        let sT = window.pageYOffset || document.documentElement.scrollTop;
        let val = document.documentElement.scrollHeight - window.innerHeight - endPointHeight;

        if (sT >= val) {
            flootingBtns.style.bottom = `${endPointHeight + 21}px`;
            flootingBtns.style.transition = "none";
            flootingBtns.style.position = "absolute";
        } else if (sT < val) {
            flootingBtns.style.bottom = "";
            flootingBtns.style.position = "";
            flootingBtns.style.transition = "0";
        }
    }

    function showFlootingBtn() {
        flootingBtns.classList.add("active");
    }

    function hideFlootingBtn() {
        flootingBtns.classList.remove("active");
    }

    function flootingBtn() {
        let plusBtn = document.querySelector(".btn.toggle");
        // 다국어 더보기 버튼 불필요
        /* let chatBtn = document.querySelector(".chat");

        plusBtn.addEventListener("click", function () {
            plusBtn.classList.toggle("active");
            chatBtn.classList.remove("on");
            if (plusBtn.classList.contains("active")) {
                chatBtn.classList.add("on");
            } else {
                chatBtn.classList.remove("on");
            }
        }); */
    }

    function MoveTop() {
        let topButton = document.querySelector(".btn.top");
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
        topButton.addEventListener("click", scrollToTop);
    }

    flootingBtn();
    MoveTop();
    window.addEventListener("scroll", handleScroll);
}

// form select
function formSelect() {
    let formSelector = document.querySelectorAll(".form-select");
    if (formSelector.length === 0) return;
    let selectBtn = document.querySelectorAll(".select");
    let dropMenu = document.querySelectorAll(".option-box");
    let option = document.querySelectorAll(".option-box > ul li a");
    let expanded = false;

    selectBtn.forEach((btn, index) => {
        let isOpen = formSelector[index].classList.contains("active");
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            expanded = !expanded;
            formSelector[index].classList.toggle("active");

            if (expanded) {
                formSelector[index].classList.add("active");
            } else {
                formSelector.classList.remove("active");
            }

            for (let i = 0; i < selectBtn.length; i++) {
                if (i !== index && formSelector[i].classList.contains("active")) {
                    formSelector[i].classList.remove("active");
                }
            }
            formSelector[index].classList.toggle("active", !isOpen);
        });
    });

    option.forEach(function (dropItem, index) {
        dropItem.addEventListener("click", function (e) {
            e.preventDefault();
            let itemTxt = this.textContent;
            let parent = this.closest(".form-select");
            let selects = document.querySelectorAll("input[type='button']");

            selects.forEach(function (selc, index) {
                if (parent.querySelector(".select") == selc) {
                    selc.value = itemTxt;
                    selc.classList.add("selected");
                }
            });
            parent.querySelector(".select").textContent = itemTxt;
            parent.classList.remove("active");

            expanded = false;
        });
    });

    dropMenu.forEach((dm, index) => {
        dm.parentElement.addEventListener("focusout", function (event) {
            if (!dm.contains(event.relatedTarget) && event.target !== dm) {
                formSelector.forEach((dd) => {
                    dd.classList.remove("active");
                });
            }
        });
    });

    option.forEach((dropItem) => {
        dropItem.addEventListener("click", function () {
            this.closest(".form-select").classList.remove("active");
        });
    });
}

// dropdown
function dropDown() {
    let dropdw = document.querySelectorAll(".drop-down");
    if (dropdw.length === 0) return;
    let ddBtn = document.querySelectorAll(".dd-btn");
    let dropMenu = document.querySelectorAll(".drop-menu");
    let dropItems = document.querySelectorAll(".drop-menu > ul li a");
    let expanded = false;

    ddBtn.forEach((btn, index) => {
        let isOpen = dropdw[index].classList.contains("active");
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            expanded = !expanded;
            dropdw[index].classList.toggle("active");

            if (expanded) {
                dropdw[index].classList.add("active");
            } else {
                dropdw.classList.remove("active");
            }

            for (let i = 0; i < ddBtn.length; i++) {
                if (i !== index && dropdw[i].classList.contains("active")) {
                    dropdw[i].classList.remove("active");
                }
            }
            dropdw[index].classList.toggle("active", !isOpen);
        });
    });

    dropMenu.forEach((dm, index) => {
        dm.parentElement.addEventListener("focusout", function (event) {
            if (!dm.contains(event.relatedTarget) && event.target !== dm) {
                dropdw.forEach((dd) => {
                    dd.classList.remove("active");
                });
            }
        });
    });

    dropItems.forEach((dropItem) => {
        dropItem.addEventListener("click", function () {
            this.closest(".drop-down").classList.remove("active");
        });
    });
}

// tab
function tabs() {
    let tabItems = document.querySelectorAll(".tab-item");
    if (tabItems.length === 0) return;
    let tabContentItems = document.querySelectorAll(".tab-content .tab-pane");

    tabItems.forEach((tab, index) => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();
            removeActiveTabItems();
            tab.classList.add("active");
            removeActiveTabContentItems();
            tabContentItems[index].classList.add("active");
        });
    });

    let subTabItems = document.querySelectorAll(".sub-tab-item");
    if (subTabItems.length === 0) return;
    let subTabContentItems = document.querySelectorAll(".sub-tab-pane");
    subTabItems.forEach((subTab, subIndex) => {
        subTab.addEventListener("click", (e) => {
            e.preventDefault();
            removeActiveSubTabItems();
            subTab.classList.add("active");
            removeActiveSubTabContentItems();
            subTabContentItems[subIndex].classList.add("active");
        });
    });

    function removeActiveTabItems() {
        tabItems.forEach((tab) => {
            tab.classList.remove("active");
        });
    }

    function removeActiveTabContentItems() {
        tabContentItems.forEach((tabContent) => {
            tabContent.classList.remove("active");
        });
    }

    function removeActiveSubTabItems() {
        subTabItems.forEach((subTab) => {
            subTab.classList.remove("active");
        });
    }

    function removeActiveSubTabContentItems() {
        subTabContentItems.forEach((subTabContent) => {
            subTabContent.classList.remove("active");
        });
    }
    subTabItems[0].classList.add("active");
    subTabContentItems[0].classList.add("active");
    tabContentItems[0].classList.add("active");
    tabItems[0].classList.add("active");
}

/* import */
// document.addEventListener("DOMContentLoaded", () => {
$(document).ready(function () {
    dropDown();
    formSelect();
    tabs();
    $("#header").load("../../@import/header.html", function () {
        gnb();
        btnSitemap();
        languageMenu();
    });
    $("#footer").load("../../@import/footer.html", function () {
        dropDown();
        scrollMoveBtn();
    });
});
