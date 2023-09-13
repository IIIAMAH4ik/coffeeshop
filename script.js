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
            cartContainer.appendChild(cartItem);
        });

        // Добавить общую стоимость
        const totalPrice = document.createElement('p');
        totalPrice.classList.add('total-price');
        totalPrice.textContent = `Общая стоимость: $${cart.total}`;
        cartContainer.appendChild(totalPrice);

        // Добавить обработчики событий для кнопок "+", "-"
        const addButtons = document.querySelectorAll('.add-button');
        addButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productName = button.getAttribute('data-name');
                const productPrice = parseFloat(button.getAttribute('data-price'));
                addToCart(productName, productPrice);
            });
        });

        const removeButtons = document.querySelectorAll('.remove-button');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productName = button.getAttribute('data-name');
                const productPrice = parseFloat(button.getAttribute('data-price'));
                removeFromCart(productName, productPrice);
            });
        });
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

// Добавьте обработчики событий для кнопок "-" и "+" в корзине, если нужно
