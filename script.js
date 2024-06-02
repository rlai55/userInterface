function footerToggle(footerBtn) {
    $(footerBtn).toggleClass("btnActive");
    $(footerBtn).next().toggleClass("active");
}

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', function() {
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

document.addEventListener('DOMContentLoaded', function() {
    const searchIconLink = document.querySelector('.nav-icons a img[alt="Search"]').parentElement;
    const searchModal = document.getElementById('search-modal');
    const cancelButton = document.getElementById('cancel-button');

    searchIconLink.addEventListener('click', function(event) {
        event.preventDefault();
        searchModal.style.display = 'flex';
        setTimeout(() => {
            searchModal.classList.add('show');
        }, 10);
    });

    cancelButton.addEventListener('click', function() {
        searchModal.classList.remove('show');
        setTimeout(() => {
            searchModal.style.display = 'none';
        }, 500);
    });

    window.addEventListener('click', function(event) {
        if (event.target == searchModal) {
            searchModal.classList.remove('show');
            setTimeout(() => {
                searchModal.style.display = 'none';
            }, 500);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const filterTitles = document.querySelectorAll('.filter-title');

    filterTitles.forEach(title => {
        title.addEventListener('click', function() {
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
    }

    // Add to Cart from product page
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

    // Add to Cart from product cards
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

    // Cart page functionality
    if (cartSection) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            cartSection.innerHTML = '<p>There are no items in your cart.</p>';
            totalElement.innerText = '$0.00';
        } else {
            cartSection.innerHTML = '';
            let total = 0;

            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p class="item-price">$${item.price.toFixed(2)}</p>
                        <div class="cart-item-controls">
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
