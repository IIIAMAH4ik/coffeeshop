// script.js

function showLayer(layerId) {
    // Скрыть все слои
    const layers = document.querySelectorAll('.layer');
    layers.forEach(layer => {
        layer.classList.remove('active-layer');
    });

    // Показать выбранный слой
    const selectedLayer = document.getElementById(layerId);
    if (selectedLayer) {
        selectedLayer.classList.add('active-layer');
    }
}
function showOptions(button) {
    // Находим родительский элемент (контейнер товара)
    const product = button.closest('.product');

    // Находим контейнер кнопок
    const buttonsContainer = product.querySelector('.buttons-container');

    // Удаляем кнопку "Добавить"
    buttonsContainer.removeChild(button);

    // Создаем и добавляем две кнопки опций
    const optionButton1 = document.createElement('button');
    optionButton1.className = 'option-button';
    optionButton1.textContent = 'Опция 1';

    const optionButton2 = document.createElement('button');
    optionButton2.className = 'option-button';
    optionButton2.textContent = 'Опция 2';

    buttonsContainer.appendChild(optionButton1);
    buttonsContainer.appendChild(optionButton2);
}
