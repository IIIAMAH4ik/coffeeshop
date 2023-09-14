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
    const optionButton1 = product.querySelector('.add-button,.option-button1');
    const optionButton2 = product.querySelector('.add-button,.option-button2');

    // Скрываем кнопку "Добавить"
    buttons[0].style.display = 'none';

    // Показываем кнопки опций
    buttons[1].style.display = 'inline-block';
    buttons[2].style.display = 'inline-block';
}
