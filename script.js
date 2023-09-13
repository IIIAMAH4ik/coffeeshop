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

// Определение объекта корзины
const cart = {
    items: [],
    total: 0,
};

// Функция для добавления товара в корзину
function addToCart(productName, productPrice) {
    const newItem = {
        name: productName,
        price: productPrice,
    };
    cart.items.push(newItem);
    cart.total += productPrice;
    updateCartUI();
}

// Функция для обновления интерфейса корзины
function updateCartUI() {
    const cartContainer = document.querySelector('.cart-container');
    cartContainer.innerHTML = ''; // Очистить содержимое корзины

    if (cart.items.length === 0) {
        cartContainer.innerHTML = '<p>Корзина пуста.</p>';
    } else {
        cart.items.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name}</p>
                <p>$${item.price}</p>
            `;
            cartContainer.appendChild(cartItem);
        });

        // Добавить общую стоимость
        const totalPrice = document.createElement('p');
        totalPrice.classList.add('total-price');
        totalPrice.textContent = `Общая стоимость: $${cart.total}`;
        cartContainer.appendChild(totalPrice);
    }
}
