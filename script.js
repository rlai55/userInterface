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