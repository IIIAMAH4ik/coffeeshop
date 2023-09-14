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

    // Находим элемент, который будет отображать количество товаров в корзине
    const itemCountElement = product.querySelector('.item-count');

    // Получаем текущее количество товаров
    let itemCount = parseInt(itemCountElement.textContent);

    // Находим кнопки "+" и "-"
    const addButton = product.querySelector('.add-button');
    const optionButton1 = product.querySelector('.option-button1');
    const optionButton2 = product.querySelector('.option-button2');

    if (button === addButton) {
        // Если нажата кнопка "Добавить", увеличиваем количество товаров на 1
        itemCount += 1;

        // Скрываем кнопку "Добавить" и показываем кнопки "+-" 
        addButton.style.display = 'none';
        optionButton1.style.display = 'inline-block';
        optionButton2.style.display = 'inline-block';
    } else if (button === optionButton1 && itemCount > 0) {
        // Если нажата кнопка "-", уменьшаем количество товаров (но не меньше 0)
        itemCount = Math.max(itemCount - 1, 0);
    } else if (button === optionButton2) {
        // Если нажата кнопка "+", увеличиваем количество товаров
        itemCount += 1;
    }

    // Обновляем отображение количества товаров
    itemCountElement.textContent = itemCount;

    // Показываем или скрываем кнопки "+-" в зависимости от значения itemCount
    if (itemCount === 0) {
        addButton.style.display = 'inline-block';
        optionButton1.style.display = 'none';
        optionButton2.style.display = 'none';
    }
}
