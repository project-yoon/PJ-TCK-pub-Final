window.addEventListener('load', function () {
    let urlPageName = window.location.pathname.split("/").pop();
    let phoneNumberCheck = document.querySelector("input[type=tel]");
    let emailCheck = document.querySelector("input[type=email]");
    let siteMapMenu = document.querySelector("#header .user-menu .site-menu");
    let languageMenu = document.querySelector(".language-menu");
    let userMenuSitemap = document.querySelector("#header .user-menu .btn-sitemap");
    let wrap = document.querySelector("#wrap");

    fileChange();
    tabMenuResponsive();

    if (urlPageName !== 'main.html' && urlPageName !== 'video.html' && urlPageName !== 'privacy.html') {
        // subNaviMenu();
    } else if (urlPageName === 'main.html' || urlPageName === 'video.html' || urlPageName === 'privacy.html') {
        if (matchMedia('all and (max-width: 1024px)').matches) {
            wrap.style.overflow = 'hidden';
        } else {
            wrap.style.overflow = 'visible';
        }

        window.addEventListener('resize', function () {
            if (matchMedia('all and (max-width: 1024px)').matches) {
                wrap.style.overflow = 'hidden';
            } else {
                wrap.style.overflow = 'visible';
            }
        });
    } else {
        wrap.style.overflow = 'unset';
    }

    if (urlPageName === 'history.html') {
        if (matchMedia('all and (min-width: 1025px)').matches) {
            wrap.style.overflow = 'visible';
        } else {
            wrap.style.overflow = 'hidden';
        }
    }

    if (phoneNumberCheck !== null) {
        phoneNumberCheck.addEventListener('keyup', (e) => {
            regexPhoneNumber(e.target);
        });
    }

    if (emailCheck !== null && !fnEmailCheck(emailCheck.value)) {
        // 이메일 형식이 올바르지 않습니다.
    }
});

document.addEventListener('DOMContentLoaded', () => {
    let scrollPagePositionX;
    let scrollPageLeft;
    let isDown;
    $('.sub-navi > div').mousedown(function(e) {
        let subNaviDivScrollLeft = $('.sub-navi > div').scrollLeft(); // 현재 스크롤 위치

        e.preventDefault();
        localStorage.setItem('subMenuScrollMove', subNaviDivScrollLeft);
        $('.sub-navi .page-link ul li a').off('click');
        isDown = true;
        scrollPagePositionX = e.pageX;
        scrollPageLeft = $(this).scrollLeft();
    });

    $('.sub-navi > div').mousemove(function(e) {
        if (isDown) {
            let scrollPagePositionUpdateX = e.pageX;

            $('.sub-navi > div').scrollLeft(scrollPageLeft - scrollPagePositionUpdateX + scrollPagePositionX);
            $('.sub-navi .page-link ul li a').on('click', function(e) {
                e.preventDefault();
            });
        }
    });

    $('.sub-navi > div').mouseup(function() {
        isDown = false;
    });

    $('.sub-navi > div').animate({scrollLeft : localStorage.getItem('subMenuScrollMove')}, 250);
});

/* 사이트맵 대 메뉴 클릭 시 */
let intervalSiteMapMenu = setInterval(isSiteMapMenu, 1000);

function isSiteMapMenuClick() {
    $('.user-menu .site-menu dt a').click((e) => {
        $(e.target).parent('dt').next('dd').slideToggle().parent().siblings().find('.dd-box').not('.sns-group .dd-box').slideUp();
        $(e.target).toggleClass('active');
        $('.user-menu .site-menu dt a').not($(e.target)).removeClass('active');
    });
}
function isSiteMapMenu() {
    if (document.querySelector('.user-menu').classList.contains('active-click')) {
        isSiteMapMenuClick();
        clearInterval(intervalSiteMapMenu);
    }
}
/* 실시간 휴대전화번호 키 체크 & "-" 표시 */
function regexPhoneNumber(target) {
    target.value = target.value.replace(/[^0-9]/g, "").replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}
/* 이메일 정규식 체크 */
function fnEmailCheck(str) {
    let regEmail = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

    if (!regEmail.test(str)) {
        return false;
    } else {
        return true;
    }
}
/* 첨부파일 업로드 */
const fileChange = () => {
    let fileNameTarget = document.querySelector('#iqAttachment');

    if (document.querySelector('#iqfileBtn') !== null) {
        document.querySelector('#iqfileBtn').addEventListener('change', (e) => {
            if (window.FileReader) {
                let fileName = e.target.files[0].name; // 파일명 추출

                fileNameTarget.value = fileName; // 변경할때마다 파일명을 input에 insert
            }
        });
    }
};
/* PC 탭 & mobile 셀렉트박스 탭 메뉴 */
function tabMenuResponsive() {
    let mTabMenuDefalut = document.querySelector('.m-tab-menu-defalut');
    let mTabMenuUl = document.querySelector('.m-tab-menu ul');
    let $tabListItem = $('.tab-list li');
    let $mTabMenuSelect = $('.m-tab-menu .m-tab-menu-defalut ul li button');
    let $tabContents = $('.tab-contents');

    $tabContents.not(':first').hide();

    $tabListItem.find('a').on('click', function (e) {
        // pc
        let tabListTarget = $(this).attr('href');

        $mTabMenuSelect.val(tabListTarget);
        $tabContents.hide();
        $(tabListTarget).show();
        e.preventDefault();
    });

    if (mTabMenuDefalut !== null) {
        mTabMenuDefalut.addEventListener('click', () => {
            mTabMenuDefalut.classList.toggle('on');
        });

        mTabMenuUl.addEventListener('click', (e) => {
            let mTabMenuTarget = e.target.value;

            if (e.target.nodeName === 'BUTTON') {
                mTabMenuDefalut.innerText = e.target.innerText;
                mTabMenuDefalut.classList.remove('on');
            }

            $tabContents.hide();
            $(mTabMenuTarget).show();

            $('.scrollMotion:visible').each(function (q) {
                gsap.to($(this), {
                    scrollTrigger: {
                        trigger: $(this),
                        start: "top 83%",
                        end: "bottom center",
                        toggleClass: { targets: $(".scrollMotion:visible").eq(q), className: "sMotion" },
                        toggleActions: "play none none none",
                        once: true,
                        onUpdate: (self) => {
                            // console.log(self);
                        },
                        onEnter: selectTabTextListMotion,
                    },
                });
            });
        });
        $(document).mouseup(function (e) {
            if ($('.m-tab-menu').has(e.target).length === 0) {
                mTabMenuDefalut.classList.remove('on');
            }
        });
    }
}
function selectTabTextListMotion() {
    const textList = document.querySelectorAll('.text-group');
    const mapList = document.querySelectorAll('.center-group');

    textList.forEach((element, idx) => {
        const tl01 = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: "-5% 80%",
                end: "5% 50%",
                // markers: true,
            },
        });
        tl01.to(element, {
            ease: "easeIn",
            opacity: 1,
            y: 0,
        });
    });
    mapList.forEach((element, idx) => {
        const tl01 = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: "-5% 80%",
                end: "5% 50%",
                // markers: true,
                toggleActions: "play none none none",
            },
        });
        tl01.to(element, {
            ease: "easeIn",
            opacity: 1,
            y: 0,
        });
    });
}
