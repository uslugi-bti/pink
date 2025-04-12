document.addEventListener("DOMContentLoaded", function () {
    function testWebP(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    testWebP(function (support) {
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });

    const body = document.querySelector("body");
    const headerTopLists = document.querySelectorAll(".header-top__list");
    const headerItems = document.querySelectorAll(".header-top__item");
    const dropdownList = document.querySelector(".header-dropdown__list");
    const dropdownBlock = document.querySelector(".header__dropdown");
    const search = document.querySelector(".header .search-group");
    const catalog = document.querySelector(".header-bottom__body .header-bottom__catalog");
    const cart = document.querySelector(".header-bottom__body .header-bottom__cart");
    const headerBody = document.querySelector(".header-bottom__body");
    const headerMenu = document.querySelector(".header-bottom__menu");
    const instagramButton = document.querySelector(".header-bottom__instagram");
    const headerDropdownItems = document.querySelector(".header-dropdown__items");
    const arrowBack = document.querySelector(".header .breadcrump-mobile__button");

    function move() {
        const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if (viewport_width < 970) {
            for (let i = 0; i < headerItems.length; i++) {
                dropdownList.insertBefore(headerItems[i], dropdownList.children[i]);
            }
            headerDropdownItems.insertBefore(search, headerDropdownItems.children[1]);
        } else {
            for (let i = 0; i < headerItems.length - 1; i++) {
                headerTopLists[0].insertBefore(headerItems[i], headerTopLists[0].children[i]);
            }
            headerTopLists[1].insertBefore(headerItems[headerItems.length - 1], headerTopLists[1][headerItems.length - 1]);
            headerBody.insertBefore(search, headerBody.children[1]);
        }
    }
    move();
    window.addEventListener("resize", move);

    headerMenu.addEventListener("click", function (event) {
        body.classList.toggle("header-lock");
        headerMenu.classList.toggle("active");
        instagramButton.classList.toggle("active");
        dropdownBlock.classList.toggle("active");
        cart.classList.toggle("active");
        catalog.classList.toggle("active");
    });

    arrowBack.addEventListener("click", function (event) {
        event.preventDefault();

        body.classList.remove("header-lock");
        headerMenu.classList.remove("active");
        instagramButton.classList.remove("active");
        dropdownBlock.classList.remove("active");
        cart.classList.remove("active");
        catalog.classList.remove("active");
    });

    let swipers = [];

    function destroySwipers() {
        swipers.forEach(swiper => {
            if (swiper && typeof swiper.destroy === 'function') {
                try {
                    swiper.destroy(true, true);
                } catch (error) {
                    console.error('Error destroying swiper:', error);
                }
            }
        });
        swipers = [];

        document.querySelectorAll('.categories-swiper').forEach(swiperElement => {
            swiperElement.classList.remove('swiper-initialized', 'swiper-horizontal', 'swiper-backface-hidden');
            const wrapper = swiperElement.querySelector('.swiper-wrapper');
            if (wrapper) {
                wrapper.removeAttribute('style');
            }
            const slides = swiperElement.querySelectorAll('.swiper-slide');
            slides.forEach(slide => {
                slide.removeAttribute('style');
            });
        });
    }

    function checkWidth() {
        return window.innerWidth < 575;
    }

    function initSwipers() {
        if (checkWidth()) {
            destroySwipers();
            const swiperElements = document.querySelectorAll('.categories-swiper');
            
            swiperElements.forEach((element, index) => {
                const newSwiper = new Swiper(element, {
                    loop: true,
                    pagination: {
                        el: element.querySelector('.swiper-pagination'),
                        clickable: true,
                    },
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    slidesPerView: 1,
                });
                swipers.push(newSwiper);
            });
        } else {
            destroySwipers();
        }
    }

    initSwipers();

    window.addEventListener('resize', () => {
        initSwipers();
    });

    if (document.querySelector(".popular__body.swiper")) {
        new Swiper(".popular__body.swiper", {
            breakpoints: {
                425: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                767: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                970: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
            },
            slidesPerView: 1,
            spaceBetween: 15,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".popular__pagination",
                clickable: true,
            },
        });
    }

    const instagramButtonFooter = document.querySelector(".footer-body__instagram");
    const footerBodyItem = document.querySelectorAll(".footer-body__item");
    const footerManager = document.querySelector(".footer-contact__manager");

    function moveInstagram() {
        const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if (viewport_width < 1410) {
            footerManager.insertBefore(instagramButtonFooter, footerManager.children[0]);
        } else {
            footerBodyItem[footerBodyItem.length - 1].insertBefore(instagramButtonFooter, footerBodyItem[footerBodyItem.length - 1].children[1]);
        }
    }
    moveInstagram();
    window.addEventListener("resize", moveInstagram);

    if (document.querySelector(".catalog-page")) {
        const filterCatButtons = document.querySelectorAll(".catalog-filters__group.cat>.form-group>label>span");
        const filterStarsFrom = document.querySelectorAll(".catalog-filters__group.rate>.form-group.from span");
        const filterStarsTo = document.querySelectorAll(".catalog-filters__group.rate>.form-group.to span");

        for (let i = 0; i < filterCatButtons.length; i++) {
            filterCatButtons[i].addEventListener("click", function () {
                if (filterCatButtons[i].classList.contains("active")) {
                    filterCatButtons[i].classList.remove("active");
                } else {
                    filterCatButtons[i].classList.add("active");
                }
            });
        }

        for (let i = 0; i < filterStarsFrom.length; i++) {
            filterStarsFrom[i].addEventListener("click", function () {
                for (let i = 0; i < filterStarsFrom.length; i++) {
                    filterStarsFrom[i].classList.remove("active");
                }
                for (let y = 0; y < (i + 1); y++) {
                    filterStarsFrom[y].classList.add("active");
                }
            });
        }

        for (let i = 0; i < filterStarsTo.length; i++) {
            filterStarsTo[i].addEventListener("click", function () {
                for (let i = 0; i < filterStarsTo.length; i++) {
                    filterStarsTo[i].classList.remove("active");
                }
                for (let y = 0; y < (i + 1); y++) {
                    filterStarsTo[y].classList.add("active");
                }
            });
        }

        const minSlider = document.getElementById('min');
        const maxSlider = document.getElementById('max');
        const rangeBetween = document.getElementById('range-between');

        function updateRange() {
            const minRange = parseInt(minSlider.min);
            const maxRange = parseInt(minSlider.max);

            let min = parseInt(minSlider.value);
            let max = parseInt(maxSlider.value);

            const minGap = 50;

            if (min > max - minGap) {
                min = max - minGap;
                minSlider.value = min;
            }

            if (max < min + minGap) {
                max = min + minGap;
                maxSlider.value = max;
            }

            const percentMin = ((min - minRange) / (maxRange - minRange)) * 100;
            const percentMax = ((max - minRange) / (maxRange - minRange)) * 100;

            rangeBetween.style.left = percentMin + "%";
            rangeBetween.style.width = (percentMax - percentMin) + "%";
        }

        minSlider.addEventListener("input", updateRange);
        maxSlider.addEventListener("input", updateRange);

        updateRange();

        const filtersOpenButton = document.querySelector(".catalog-filters__title>span");
        const filtersBody = document.querySelectorAll(".catalog-filters__body");
        const catalogFilters = document.querySelector(".catalog__filters");
        const buttonCategoriesBack = document.querySelector(".catalog-page .breadcrump-mobile__button");
        const originalHref = buttonCategoriesBack.getAttribute("href");
        const breadcrump = document.querySelectorAll(".breadcrump")[1];
        
        filtersOpenButton.addEventListener("click", function () {
            filtersBody[1].classList.toggle("active");
            catalogFilters.classList.toggle("active");
            breadcrump.classList.toggle("active");
            body.classList.toggle("filter-lock");

            if (catalogFilters.classList.contains("active")) {
                buttonCategoriesBack.removeAttribute("href");
            } else {
                buttonCategoriesBack.setAttribute("href", originalHref);
            }
        });

        buttonCategoriesBack.addEventListener("click", function () {
            if (catalogFilters.classList.contains("active")) {
                filtersBody[1].classList.remove("active");
                catalogFilters.classList.remove("active");
                body.classList.remove("filter-lock");
                breadcrump.classList.remove("active");
                
                requestAnimationFrame(() => {
                    buttonCategoriesBack.setAttribute("href", originalHref);
                });
            }
        });
    }

    if (document.querySelector(".product-page")) {
        const tabsTitle = document.querySelectorAll(".product-body-characteristics__title");
        const tabsBody = document.querySelectorAll(".product-body-characteristics__body");
        const tabOutput = document.querySelector(".product-body-characteristics__output");

        function activeTabs() {
            for (let i = 0; i < tabsTitle.length; i++) {
                tabsTitle[i].addEventListener("click", function () {
                    const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                    if (viewport_width >= 1100) {
                        for (let i = 0; i < tabsTitle.length; i++) {
                            tabsTitle[i].classList.remove("active");
                        }
                        tabsTitle[i].classList.add("active");
                        if (tabOutput.querySelector(".product-body-characteristics__output .product-body-characteristics__body")) {
                            tabOutput.querySelector(".product-body-characteristics__output .product-body-characteristics__body").remove();
                        }
                        const clone = tabsBody[i].cloneNode(true);
                        tabOutput.insertBefore(clone, tabOutput.children[0]);
                    } else {
                        if (tabsTitle[i].classList.contains("open")) {
                            tabsBody[i].classList.remove("open");
                            tabsTitle[i].classList.remove("open");
                        } else {
                            for (let i = 0; i < tabsTitle.length; i++) {
                                tabsBody[i].classList.remove("open");
                                tabsTitle[i].classList.remove("open");
                            }
                            tabsBody[i].classList.add("open");
                            tabsTitle[i].classList.add("open");
                        }
                    }
                });
            }
        }
        tabsTitle[0].classList.add("active");
        const clone = tabsBody[0].cloneNode(true);
        tabOutput.insertBefore(clone, tabOutput.children[0]);
        activeTabs();
        window.addEventListener("resize", activeTabs);
    }

    if (document.querySelector(".product-page")) {
        const productBlock = document.querySelector(".product>.container");
        const productBreadcrump = document.querySelector(".product-page .breadcrump");
        const productBodyBody = document.querySelector(".product-body__body");
        const productRating = document.querySelector(".product-body__body>.product-body__rate");
        const productFeedNum = document.querySelector(".addfeed__text");
        const addfeedBody = document.querySelector(".addfeed__body");
        const addfeedRateTitle = document.querySelector(".addfeed-rate__title");
        const addfeedRate = document.querySelector(".addfeed__rate");
        const feedbacksBody = document.querySelector(".feedbacks__body");
        const feedbacksContainer = document.querySelector(".feedbacks>.container");
        const bodyCharacteristicsBody = document.querySelector(".product-body-characteristics__body.feedbacks");

        function moveBreadcrump() {
            const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            if (viewport_width < 767) {
                productBlock.insertBefore(productBreadcrump, productBlock.children[0]);
                productRating.insertBefore(productFeedNum, productRating.children[5]);
                productBodyBody.insertBefore(addfeedRateTitle, productBodyBody.children[2]);
                bodyCharacteristicsBody.insertBefore(feedbacksBody, bodyCharacteristicsBody.children[0]);
            } else {
                productBodyBody.insertBefore(productBreadcrump, productBodyBody.children[0]);
                addfeedBody.insertBefore(productFeedNum, addfeedBody.children[1]);
                addfeedRate.insertBefore(addfeedRateTitle, addfeedRate.children[0]);
                feedbacksContainer.insertBefore(feedbacksBody, feedbacksContainer.children[1]);
            }
        }
        moveBreadcrump();
        window.addEventListener("resize", moveBreadcrump);
    }
});