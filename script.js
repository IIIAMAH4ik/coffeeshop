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
// script.js
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
        quantity: 1, // Начальное количество товара
    };

    // Проверка, есть ли уже такой товар в корзине
    const existingItem = cart.items.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1; // Увеличить количество товара
    } else {
        cart.items.push(newItem);
    }

    cart.total += productPrice;
    updateCartUI();
}

// Функция для удаления товара из корзины
function removeFromCart(productName, productPrice) {
    const existingItemIndex = cart.items.findIndex(item => item.name === productName);

    if (existingItemIndex !== -1) {
        const existingItem = cart.items[existingItemIndex];

        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1; // Уменьшить количество товара
        } else {
            cart.items.splice(existingItemIndex, 1); // Удалить товар из корзины
        }

        cart.total -= productPrice;
        updateCartUI();
    }
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
                <div>
                    <button class="remove-button" data-name="${item.name}" data-price="${item.price}">-</button>
                    <span>${item.quantity}</span>
                    <button class="add-button" data-name="${item.name}" data-price="${item.price}">+</button>
                </div>
                <p>$${item.price * item.quantity}</p>
            `;

            // Добавьте обработчики событий для кнопок "+" и "-"
            const addButton = cartItem.querySelector('.add-button');
            const removeButton = cartItem.querySelector('.remove-button');

            addButton.addEventListener('click', () => {
                addToCart(item.name, item.price);
            });

            removeButton.addEventListener('click', () => {
                removeFromCart(item.name, item.price);
            });

            cartContainer.appendChild(cartItem);
        });

        // Добавить общую стоимость
        const totalPrice = document.createElement('p');
        totalPrice.classList.add('total-price');
        totalPrice.textContent = `Общая стоимость: $${cart.total}`;
        cartContainer.appendChild(totalPrice);
    }
}
