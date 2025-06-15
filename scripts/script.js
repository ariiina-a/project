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

    };
    
});


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
const formApplication = document.querySelector('.modal__form'); 
const modalMessage = document.createElement('div'); // Создаем элемент для сообщений
modalMessage.id = 'form-message';
formApplication.appendChild(modalMessage);
const phoneInput = document.getElementById('userPhone'); 

// Маска для телефона
phoneInput.addEventListener('input', function(e) {
    // Удаляем все нецифровые символы, кроме +
    let value = e.target.value.replace(/[^\d+]/g, '');
    
    // Обеспечиваем начало с +7
    if (!value.startsWith('+7')) {
        if (value.startsWith('7') || value.startsWith('8')) {
            value = '+7' + value.substring(1); // Преобразуем 7... или 8... в +7...
        } else {
            value = '+7' + value; // Добавляем +7 в начало
        }
    }
    
    // Ограничиваем длину (+7 и 10 цифр)
    if (value.length > 12) {
        value = value.substring(0, 12);
    }
    
    // Форматируем номер: +7 (XXX) XXX-XX-XX
    const digits = value.replace(/\D/g, '').substring(1); // Получаем цифры без +7
    let formattedValue = '+7';
    
    if (digits.length > 0) {
        formattedValue += ' (' + digits.substring(0, 3);
        if (digits.length > 3) {
            formattedValue += ') ' + digits.substring(3, 6);
        }
        if (digits.length > 6) {
            formattedValue += '-' + digits.substring(6, 8);
        }
        if (digits.length > 8) {
            formattedValue += '-' + digits.substring(8, 10);
        }
    }
    
    e.target.value = formattedValue;
});

// Защита от удаления +7
phoneInput.addEventListener('keydown', function(e) {
    // Запрещаем удаление +7
    if ((e.key === 'Backspace' || e.key === 'Delete') && 
        phoneInput.selectionStart <= 2) {
        e.preventDefault();
    }
    
    // Разрешаем только цифры и управляющие клавиши
    if (!/\d/.test(e.key) && 
        !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
        e.preventDefault();
    }
});


// Открытие модального окна
openModalBtn.addEventListener('click', () => {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    loadFormData(); // Загружаем сохраненные данные при открытии
});

// Закрытие модального окна
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
};

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

// Обработка отправки формы
if (formApplication) {
    formApplication.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('userName').value;
        const tel = document.getElementById('userPhone').value.replace(/\D/g, '');
        const email = document.getElementById('userEmail').value;

        // Валидация имени
        if (username.length < 3) {
            modalMessage.textContent = 'Имя пользователя должно содержать не менее 3 символов';
            modalMessage.style.color = 'red';
            return;
        }

        // Валидация телефона (должен начинаться с 7 и иметь 10 цифр после)
        if (!tel.startsWith('7') || tel.length !== 11) {
            modalMessage.textContent = 'Номер должен начинаться с +7 и содержать 10 цифр';
            modalMessage.style.color = 'red';
            return;
        }

        // Валидация email
        if (!email.includes('@') || !email.includes('.')) {
            modalMessage.textContent = 'Введите корректный email';
            modalMessage.style.color = 'red';
            return;
        }

        // Сохраняем данные в LocalStorage (телефон сохраняем без маски)
        localStorage.setItem('userName', username);
        localStorage.setItem('userPhone', tel);
        localStorage.setItem('userEmail', email);

        // Успешная отправка
        modalMessage.textContent = 'Заявка отправлена!';
        modalMessage.style.color = 'green';

        // Очищаем форму через 2 секунды
        setTimeout(() => {
            formApplication.reset();
            modalMessage.textContent = '';
            closeModal();
        }, 2000);
    });
};

// Загрузка сохраненных данных из LocalStorage
function loadFormData() {
    const savedUsername = localStorage.getItem('userName');
    const savedTel = localStorage.getItem('userPhone'); // Сохраняем только цифры
    const savedEmail = localStorage.getItem('userEmail');

    if (savedUsername) document.getElementById('userName').value = savedUsername;
    if (savedTel) {
        const digits = savedTel.substring(1); // Убираем первую 7
        document.getElementById('userPhone').value = `+7 (${digits.substring(0,3)}) ${digits.substring(3,6)}-${digits.substring(6,8)}-${digits.substring(8,10)}`;
    }
    if (savedEmail) document.getElementById('userEmail').value = savedEmail;
};


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
};

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

};

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
};


/* Лекция 6 */
const cardsContainer = document.querySelector('.section__job');
    if (cardsContainer) {
        const cardList = cardsContainer.querySelector('.job__list');

        // Пример URL для получения данных с сервера
        const apiUrl = 'data.json';

        // Функция для создания карточки
        const createCard = (imageUrl, iconAlt, iconWidth, iconHeight, title, description) => {

            // Шаблонные строки и подстановки
            const card = `
                <a class="job__card" href="#">
                    <span class="card__icon">
                        <img src="${imageUrl}" alt="${iconAlt}" width="${iconWidth}" height="${iconHeight}">
                    </span>
                    <h2 class="card__title">${title}</h2>
                    <p class="card__description">${description}</p>
                </a>
            `;

            return card;
        }

        // Загрузка данных с сервера
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Данные
                console.log(typeof (data)); // Тип полученных данных

                // for (const item in data) {
                //     const card = data[item];

                //     const cardElement = createCard(card.link, card.icon, card.iconAlt, card.iconWidth, 
                // card.iconHeight, card.title, card.description);
                //     cardList.insertAdjacentHTML('beforeend', cardElement);
                // }

                data.forEach(item => {
                    const cardElement = createCard(item.image, item.iconAlt, item.iconWidth, 
                        item.iconHeight, item.title, item.description);
                    cardList.insertAdjacentHTML('beforeend', cardElement);
                });
            })
            .catch(error => {
                console.error('Ошибка при загрузке данных:', error);
            });
};

// Preloader страницы
    const preloader = document.querySelector('.preloader');
    const content = document.querySelector('.content');
    if (preloader && content) {
        setTimeout(() => {
            // Скрываем прелоадер
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';

            // Показываем контент
            content.style.display = 'block';

            // Удаляем элемент из DOM
            preloader.remove();
        }, 3000); // Задержка 3 секунды
    }

// Объявляем переменную slider, куда помещаем элемент с классом swiper
const sliders = document.querySelector ('.swiper');
// Проверяем существует ли элемент
    if (sliders) {
        const swiper1 = new Swiper('.mySwiper', {
            // Пагинация
            pagination: {
                el: '.swiper-pagination',
                type: "fraction",
            },
            // Навигационные стрелки
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
