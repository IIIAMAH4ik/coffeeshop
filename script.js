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
// Переменная для отслеживания количества товаров в корзине
let cartItemCount = 0;

// Функция для отображения и скрытия корзины при нажатии на корзину
function toggleCart() {
    const cartLayer = document.querySelector('.cart-layer');
    cartLayer.classList.toggle('active-layer');
}

// Функция для обновления отображения количества товаров в корзине и корзины
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-button .item-count');

    // Обновляем отображение количества товаров в корзине
    cartCountElement.textContent = cartItemCount;

    // Показываем или скрываем корзину в зависимости от количества товаров
    const cartLayer = document.querySelector('.cart-layer');
    if (cartItemCount > 0) {
        cartLayer.classList.add('active-layer');
    } else {
        cartLayer.classList.remove('active-layer');
    }
}

// Функция для изменения количества товаров и отображения кнопок "+-"
function showOptions(button) {
    // Находим родительский элемент (контейнер товара)
    const product = button.closest('.product');

    // Находим элемент, который будет отображать количество товаров в корзине
    const itemCountElement = product.querySelector('.item-count');

    // Получаем текущее количество товаров
    let itemCount = parseInt(itemCountElement.textContent);

    // Находим кнопки "+-" внутри контейнера товара
    const optionButton1 = product.querySelector('.option-button1');
    const optionButton2 = product.querySelector('.option-button2');

    if (button === optionButton1 && itemCount > 0) {
        // Если нажата кнопка "-", уменьшаем количество товаров (но не меньше 0)
        itemCount = Math.max(itemCount - 1, 0);
    } else if (button === optionButton2) {
        // Если нажата кнопка "+", увеличиваем количество товаров
        itemCount += 1;
    }

    // Обновляем отображение количества товаров
    itemCountElement.textContent = itemCount;

    // Показываем или скрываем кнопки "+-" в зависимости от значения itemCount
    const addButton = product.querySelector('.add-button');

    if (itemCount === 0) {
        addButton.style.display = 'inline-block';
        optionButton1.style.display = 'none';
        optionButton2.style.display = 'none';
    } else {
        addButton.style.display = 'none';
        optionButton1.style.display = 'inline-block';
        optionButton2.style.display = 'inline-block';
    }

    // Обновляем количество товаров в корзине и отображаем его в корзине
    cartItemCount = itemCount;
    updateCartCount();
}
