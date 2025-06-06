'use strict'
document.addEventListener("DOMContentLoaded", () => {

    /* 1. Исключение накладывания контента на хедер при скроле/прокрутке страницы */

    const header = document.querySelector('.header');       // создаем переменную находя блок по классу

    if (header) {                                           // проверяем существование элемента в DOM
        console.log('Константа header существует');

        // * Алгоритм:
        // * 1. Начало.
        // * 2. Получаем все элементы изображений с описанием.
        // * 3. Для каждого изображеия (проверяем есть ли такие изображения):
        // *    3.1. Добавляем обработчик курсора на изображение:
        // *        3.1.1. Да:
        // *            3.1.1.1. показываем текст при наведении.
        // *            3.1.2. Нет: продолжаем.
        // *    3.2. Добавляем обработчик курсор уходит с изображения:
        // *        3.3.1. Да:
        // *            3.3.1.1. Скрываем элемент с описанием.
        // *        3.3.2. Нет: продоложаем.
        // * 4. Конец
        //
        // Блок-схема: /images/block-schema.jpg


        const heightHeader = header.offsetHeight;           
        document.addEventListener('scroll', () => {         
            console.log('Страница скролится');

            let scrollPageY = this.scrollY;                

            if (scrollPageY > heightHeader) {               
                header.classList.add('header--scroll')      
            } else {
                header.classList.remove('header--scroll')   
            }

        })

    }
    

        /* 2. Создание слайдера */
    let currentIndex = 0; // индекс карточек
    const slider = document.querySelectorAll(".doctors__card");
    const prevButton = document.querySelector(".doctors__left");
    const nextButton = document.querySelector(".doctors__right");
    const visibleCards = 2; // количество отображаемых карточек
    updateSlider();

    prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = slider.length - visibleCards; //Переход к последним карточкам
    }
    updateSlider();
    });
    console.log (nextButton);
    nextButton.addEventListener("click", () => {
    if (currentIndex < slider.length - visibleCards) {
        currentIndex++;
    } else {
        currentIndex = 0; // Переход к началу карточек
    }
    updateSlider();
    });

    function updateSlider() {
    slider.forEach((item, index) => {
    // Проверяем, нужно ли показывать карточку
    if (index >= currentIndex && index < currentIndex + visibleCards) {
        item.style.display = "block"; // Показываем карточку
    } else {
        item.style.display = "none"; // Иначе скрываем карточку
    }
    });
    }

    // Получаем элементы DOM
    const modalOverlay = document.getElementById('modalOverlay');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.querySelector('.modal-close-btn');

    // Открытие модального окна
    openModalBtn.addEventListener('click', () => {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
    });

    // Закрытие модального окна
    function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Восстанавливаем скролл
    }

    closeModalBtn.addEventListener('click', closeModal);

    // Закрытие при клике вне окна
    modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
    });

    // Закрытие по клавише Escape
    document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
    }
    });

    /* Динамический вывод карточек тегов */
    const servicesContainer = document.querySelector(".services");
    if (servicesContainer) {
        const dataTitleServices= [
            "Терапия",
            "Дерматология",
            "УЗИ кошек и собак",
            "Лабораторные исследования",
            "Рентген",
            "Стоматология",
            "Хирургия",
            "Травматология",
            "Кардиология",
            "Онкология",
            "Офтальмология",
            "Вакцинация кошек и собак",
            "Чипирование животных",
            "Кастрация и стерилизация",
            "Груминг",
            "Стационар",
            "Ритуальные услуги",
            "Вызов врача на дом",
        ];

        const titleCards = 
            servicesContainer.querySelectorAll(".services__name");
            
            titleCards.forEach((item, index) => {
                item.textContent = dataTitleServices[index];
            });
    }
                 

    const scrollUpButton = document.querySelector('.scroll-up');

    if (scrollUpButton) {
        const windowHeight = document.documentElement.clientHeight; // Определяем высоту видимой части окна браузера

        // Показать кнопку при прокрутке вниз на высоту экрана
        document.addEventListener('scroll', () => {
            let scrollPageY = this.scrollY;

            if (scrollPageY >= windowHeight) {
                scrollUpButton.classList.add('scroll-up--show');
            } else {
                scrollUpButton.classList.remove('scroll-up--show');
            }
        });

        // Плавная прокрутка наверх при нажатии на кнопку
        scrollUpButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

    }

    // Динамический вывод навигационного меню
    const headerMenu = document.querySelector('.header__menu');
    if (headerMenu){
        const headerList = headerMenu.querySelector('.menu')
        const menuData = {
            link1: {
                link: 'index.html',
                title: 'Главное'
            },
            link2: {
                link: 'catalog.html',
                title: 'Каталог услуг'
            },
            link3: {
                link: '#',
                title: 'Отзывы'
            },
            link4: {
                link: '#',
                title: 'Контакты'
            },
            link5: {
                link: '#goto',
                title: 'Запись на приём'
            },
        }
        const createLink = ( UrlLink, title) =>{
            const link = `
            <li class="menu__item"><a href="${UrlLink}" class="menu__link">${title}</a></li>
            `;
            return link;
        }
        for (const linkItem in menuData) {
        const link = menuData[linkItem];
        const linkIndex = createLink(link.UrlLink, link.title);
        headerList.insertAdjacentHTML ('beforeend', linkIndex);
        
        }
    }

    const cardsCon = document.querySelector(".job");
    if (cardsCon) {
        const cardList = cardsCon.querySelector(".job__list");

        // Пример URL для получения данных с сервера
        const apiUrl = "data.json";

        // Функция для создания карточки
        const createCard = (
            imageUrl,
            iconAlt,
            iconWidth,
            iconHeight,
            title,
            description
        ) => {
            // Шаблонные строки и подстановки
            const card = `
                <li class="job__item" href="#">
                      <img class="job__img" src="${imageUrl}" alt="${iconAlt}" width="${iconWidth}" height="${iconHeight}">
                    <h3 class="job__title">${title}</h3>
                    <p class="job__description">${description}</p>
                </li>
            `;
            return card;
        };
        // Загрузка данных с сервера
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Данные
                console.log(typeof data); // Тип полученных данных
 
                data.forEach((item) => {
                    const cardElement = createCard(
                        item.image,
                        item.iconAlt,
                        item.iconWidth,
                        item.iconHeight,
                        item.title,
                        item.description
                    );
                    cardList.insertAdjacentHTML("beforeend", cardElement);
                });
            })
            .catch((error) => {
                console.error("Ошибка при загрузке данных:", error);
            });
    }
});


