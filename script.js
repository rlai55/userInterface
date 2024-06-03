document.addEventListener('DOMContentLoaded', function () {
    const searchIconLink = document.querySelector('.nav-icons a img[alt="Search"]').parentElement;
    const searchModal = document.getElementById('search-modal');
    const cancelButton = document.getElementById('cancel-button');
    const cartNotification = document.getElementById('cart-notification');
    const viewCartButton = cartNotification.querySelector('.view-cart-button');

    searchIconLink.addEventListener('click', function (event) {
        event.preventDefault();
        searchModal.style.display = 'flex';
        setTimeout(() => {
            searchModal.classList.add('show');
        }, 10);
    });

    cancelButton.addEventListener('click', function () {
        searchModal.classList.remove('show');
        setTimeout(() => {
            searchModal.style.display = 'none';
        }, 500);
    });

    window.addEventListener('click', function (event) {
        if (event.target == searchModal) {
            searchModal.classList.remove('show');
            setTimeout(() => {
                searchModal.style.display = 'none';
            }, 500);
        }
    });

    function showCartNotification(product) {
        const notificationImage = cartNotification.querySelector('img');
        const notificationName = cartNotification.querySelector('.cart-notification-name');
        const notificationPrice = cartNotification.querySelector('.cart-notification-price');

        notificationImage.src = product.image;
        notificationName.innerText = product.name;
        notificationPrice.innerText = `$${product.price.toFixed(2)}`;

        cartNotification.style.display = 'flex';
        setTimeout(() => {
            cartNotification.classList.add('show');
        }, 10);
        setTimeout(() => {
            cartNotification.classList.remove('show');
            setTimeout(() => {
                cartNotification.style.display = 'none';
            }, 500);
        }, 3000);
    }

    viewCartButton.addEventListener('click', function () {
        window.location.href = 'cart.html';
    });

    const addToCartButton = document.querySelector('.product-button');
    const productCards = document.querySelectorAll('.product-card--button');
    const cartSection = document.querySelector('.cart-items');
    const totalElement = document.querySelector('.summary-section .total-price');

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(item => item.name === product.name);

        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        showCartNotification(product);
    }

    if (addToCartButton) {
        addToCartButton.addEventListener('click', function () {
            const productName = document.querySelector('.product-name').innerText;
            const productPrice = parseFloat(document.querySelector('.product-price--special').innerText.replace('$', ''));
            const productImage = document.querySelector('.main-image').src;

            const cartItem = {
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            addToCart(cartItem);
        });
    }

    productCards.forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-card--name').innerText;
            const productPrice = parseFloat(productCard.querySelector('.product-card--price, .product-card--priceSpecial').innerText.replace('$', ''));
            const productImage = productCard.querySelector('img').src;

            const cartItem = {
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };

            addToCart(cartItem);
        });
    });

    if (cartSection) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            cartSection.innerHTML = '<p class="noitems">There are no items in your cart.</p>';
            totalElement.innerText = '$0.00';
        } else {
            cartSection.innerHTML = '';
            let total = 0;

            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item--image">
                    <div class="cart-item--details">
                        <h3 class="item-details">${item.name}</h3>
                        <p class="item-price">$${item.price.toFixed(2)}</p>
                        <div class="cart-item--controls">
                            <div class="quantity-controls">
                                <button class="quantity-decrease" data-index="${index}">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-increase" data-index="${index}">+</button>
                            </div>
                            <button class="delete-item" data-index="${index}"><img src="image/delete-icon.png" alt="Delete"></button>
                        </div>
                    </div>
                `;
                cartSection.appendChild(itemElement);
                total += item.price * item.quantity;
            });

            totalElement.innerText = `$${total.toFixed(2)}`;

            document.querySelectorAll('.quantity-decrease').forEach(button => {
                button.addEventListener('click', function () {
                    const index = this.dataset.index;
                    if (cart[index].quantity > 1) {
                        cart[index].quantity -= 1;
                        localStorage.setItem('cart', JSON.stringify(cart));
                        location.reload();
                    }
                });
            });

            document.querySelectorAll('.quantity-increase').forEach(button => {
                button.addEventListener('click', function () {
                    const index = this.dataset.index;
                    cart[index].quantity += 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    location.reload();
                });
            });

            document.querySelectorAll('.delete-item').forEach(button => {
                button.addEventListener('click', function () {
                    const index = this.dataset.index;
                    cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    location.reload();
                });
            });
        }
    }
});

function footerToggle(footerBtn) {
    $(footerBtn).toggleClass("btnActive");
    $(footerBtn).next().toggleClass("active");
}

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    } else {
        console.warn('Navbar element not found.');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const filterTitles = document.querySelectorAll('.filter-title');

    filterTitles.forEach(title => {
        title.addEventListener('click', function () {
            const filterOptions = this.nextElementSibling;
            this.classList.toggle('expanded');
            if (filterOptions.classList.contains('expanded')) {
                filterOptions.classList.remove('expanded');
                filterOptions.style.maxHeight = null;
            } else {
                filterOptions.classList.add('expanded');
                filterOptions.style.maxHeight = filterOptions.scrollHeight + 'px';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            thumbnails.forEach(thumb => thumb.classList.remove('selected'));

            this.classList.add('selected');

            mainImage.src = this.src;
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const checkoutItemsSection = document.querySelector('.checkout-items');
    const totalElement = document.querySelector('.total-price');

    function loadCheckoutItems() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            checkoutItemsSection.innerHTML = '<p class="noitems">There are no items in your cart.</p>';
            totalElement.innerText = '$0.00';
        } else {
            checkoutItemsSection.innerHTML = '';
            let total = 0;

            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'checkout-item';
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="checkout-item--image">
                    <div class="checkout-item--details">
                        <h3 class="checkout-item--name">${item.name}</h3>
                        <div class="checkout-item-price-quantity">
                            <p class="checkout-item--price">$${item.price.toFixed(2)}</p>
                            <span class="checkout-item--quantity">X ${item.quantity}</span>
                        </div>
                    </div>
                `;
                checkoutItemsSection.appendChild(itemElement);
                total += item.price * item.quantity;
            });

            totalElement.innerText = `$${total.toFixed(2)}`;
        }
    }

    loadCheckoutItems();
});

document.addEventListener('DOMContentLoaded', function() {
    const checkoutButton = document.getElementById('checkout-button');

    checkoutButton.addEventListener('click', function() {
        window.location.href = 'checkout.html';
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const confirmButton = document.getElementById('confirm-button');
    const paymentModal = document.getElementById('payment-modal');
    const closeButton = document.querySelector('.close-button');

    // Function to clear cart and redirect to cart page
    function clearCart() {
        localStorage.removeItem('cart');
        window.location.href = 'cart.html';
    }

    // Function to show payment modal
    function showPaymentModal() {
        paymentModal.style.display = 'flex';
    }

    // Event listener for confirm payment button
    if (confirmButton) {
        confirmButton.addEventListener('click', function(event) {
            event.preventDefault();
            showPaymentModal();
        });
    }

    // Event listener for close button
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            paymentModal.style.display = 'none';
            clearCart();
        });
    }

    // Close the modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target == paymentModal) {
            paymentModal.style.display = 'none';
            clearCart();
        }
    });
});