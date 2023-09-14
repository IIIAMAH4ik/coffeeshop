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

    // Находим все кнопки внутри контейнера
    const addButton = product.querySelector('.add-button');
    const optionButton1 = product.querySelector('.option-button1');
    const optionButton2 = product.querySelector('.option-button2');

    // Скрываем кнопку "Добавить"
    addButton.style.display = 'none';

    // Показываем кнопки опций
    optionButton1.style.display = 'inline-block';
    optionButton2.style.display = 'inline-block';
}
