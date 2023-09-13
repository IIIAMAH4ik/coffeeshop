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
// Ваш JavaScript-код

document.querySelectorAll('.add-button').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.closest('.product-item');
        const productName = productElement.querySelector('h3').textContent;
        const productPrice = parseFloat(productElement.querySelector('p').textContent.split('$')[1]);
        const addToCartContainer = productElement.querySelector('.add-to-cart');
        const quantitySpan = productElement.querySelector('.quantity');

        // Проверка, есть ли уже такой товар в корзине
        const existingItem = cart.items.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += 1; // Увеличить количество товара
        } else {
            cart.items.push({
                name: productName,
                price: productPrice,
                quantity: 1, // Начальное количество товара
            });
        }

        cart.total += productPrice;
        updateCartUI();

        // Показать кнопки "+", "-", и количество товаров
        addToCartContainer.style.display = 'flex';
        quantitySpan.textContent = existingItem ? existingItem.quantity : 1;

        // Скрыть кнопку "Добавить"
        button.style.display = 'none';
    });
});

document.querySelectorAll('.increment-button').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.closest('.product-item');
        const productName = productElement.querySelector('h3').textContent;
        const existingItem = cart.items.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += 1; // Увеличить количество товара
            cart.total += existingItem.price;
            const quantitySpan = productElement.querySelector('.quantity');
            quantitySpan.textContent = existingItem.quantity;
            updateCartUI();
        }
    });
});

document.querySelectorAll('.decrement-button').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.closest('.product-item');
        const productName = productElement.querySelector('h3').textContent;
        const existingItem = cart.items.find(item => item.name === productName);

        if (existingItem && existingItem.quantity > 0) {
            existingItem.quantity -= 1; // Уменьшить количество товара
            cart.total -= existingItem.price;
            const quantitySpan = productElement.querySelector('.quantity');
            quantitySpan.textContent = existingItem.quantity;
            updateCartUI();

            // Если количество стало нулевым, вернуть кнопку "Добавить"
            if (existingItem.quantity === 0) {
                const addButton = productElement.querySelector('.add-button');
                addButton.style.display = 'block';
                const addToCartContainer = productElement.querySelector('.add-to-cart');
                addToCartContainer.style.display = 'none';
            }
        }
    });
});
