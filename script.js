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
// Определение объекта корзины
const cart = {
    items: [],
    total: 0,
};

// JavaScript-код
// ... (ваш JavaScript-код) ...

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
                <div class="quantity-container">
                    <button class="remove-button" data-name="${item.name}" data-price="${item.price}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="add-button" data-name="${item.name}" data-price="${item.price}">+</button>
                </div>
                <p>$${item.price * item.quantity}</p>
            `;

            cartContainer.appendChild(cartItem);
        });

        // Добавить общую стоимость
        const totalPrice = document.createElement('p');
        totalPrice.classList.add('total-price');
        totalPrice.textContent = `Общая стоимость: $${cart.total}`;
        cartContainer.appendChild(totalPrice);
    }

    // Отображаем кнопки "+" и "-" только для товаров в корзине
    const addButtons = document.querySelectorAll('.add-button');
    const removeButtons = document.querySelectorAll('.remove-button');
    cart.items.forEach((item, index) => {
        if (item.quantity > 0) {
            addButtons[index].style.display = 'inline-block';
            removeButtons[index].style.display = 'inline-block';
        }
    });
}

// ... (ваш JavaScript-код) ...

// Добавляем обработчики событий для кнопок "+" и "-"
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-button')) {
        const productName = event.target.getAttribute('data-name');
        const productPrice = parseFloat(event.target.getAttribute('data-price'));
        addToCart(productName, productPrice);
    } else if (event.target.classList.contains('remove-button')) {
        const productName = event.target.getAttribute('data-name');
        const productPrice = parseFloat(event.target.getAttribute('data-price'));
        removeFromCart(productName, productPrice);
    }
});
