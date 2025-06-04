'use strict'
document.addEventListener("DOMContentLoaded", () => {
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
    
    const intensiveImg = document.querySelector(".services__image");
    intensiveImg.addEventListener('mouseenter' , () => {
        console.log("Мышка наведена на изображение, показываем текст");
    });

});

/* 2. Создание слайдера */
let currentIndex = 0; // индекс карточек
const slider = document.querySelectorAll(".doctors__card");
const prevButton = document.querySelector(".doctors__left");
const nextButton = document.querySelector(".doctors__right");
const visibleCards = 3; // количество отображаемых карточек
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
