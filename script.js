// script.js

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const cartLink = document.querySelector('.cart-link');
const cartCount = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const gameCards = document.querySelectorAll('.game-card');
const gameModal = document.getElementById('game-modal');
const closeModal = document.querySelector('.close-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const modalBuyBtn = document.getElementById('modal-buy-btn');

// Carousel Elements
const carouselSlides = document.querySelectorAll('.carousel-slide');
const carouselIndicators = document.querySelectorAll('.indicator');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');

// Game Data (Updated to match the new HTML game titles and developers)
const gamesData = [
    {
        id: 1,
        title: 'Grand Theft Auto V',
        developer: 'Rockstar North',
        price: 29.99,
        image: 'game1.jpg',
        description: 'Experience the ultimate open-world adventure in Los Santos. Steal cars, complete missions, and live the criminal life in this iconic game.'
    },
    {
        id: 2,
        title: 'Naruto x Boruto: Ultimate Ninja Storm Connections',
        developer: 'CyberConnect2 Co., Ltd.',
        price: 19.99,
        image: 'game2.jpg',
        description: 'Dive into the world of Naruto with intense battles, new stories, and connections between generations. Master jutsu and fight alongside your favorite characters.'
    },
    {
        id: 3,
        title: 'Lego Batman: Legacy of the Dark Knight',
        developer: 'TT Games',
        price: 14.99,
        image: 'game3.jpg',
        description: 'Join Batman and his allies in a Lego-filled adventure. Solve puzzles, battle villains, and uncover the secrets of Gotham in this fun family game.'
    },
    {
        id: 4,
        title: 'Marvel\'s Spider-Man: Miles Morales',
        developer: 'Insomniac Games, Nixxes Software',
        price: 49.99,
        image: 'game4.jpg',
        description: 'Swing through New York as Miles Morales. Experience a new Spider-Man story with stunning graphics, web-slinging action, and superhero responsibilities.'
    },
    {
        id: 5,
        title: 'Resident Evil 9: Requiem',
        developer: 'CAPCOM Co., Ltd.',
        price: 9.99,
        image: 'game5.jpg',
        description: 'Survive the horror in this latest installment of Resident Evil. Face terrifying creatures, solve puzzles, and uncover the dark secrets of the Umbrella Corporation.'
    },
    {
        id: 6,
        title: 'Call of Duty: Black Ops 7',
        developer: 'Treyarch, Raven Software, Beenox, High Moon Studios, Sledgehammer Games, Infinity Ward, Activision Shanghai, Demonware',
        price: 24.99,
        image: 'game6.jpg',
        description: 'Engage in high-stakes multiplayer battles and campaign missions. Experience the next level of warfare with cutting-edge graphics and intense gameplay.'
    }
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update Cart Count
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Update Cart Display
function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h4>${item.title}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price;
    });
    cartTotal.textContent = total.toFixed(2);
    updateCartCount();
}

// Add to Cart
function addToCart(gameId) {
    const game = gamesData.find(g => g.id === gameId);
    if (game) {
        cart.push(game);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        alert(`${game.title} added to cart!`);
    }
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Carousel Functionality
let currentSlide = 0;
let autoSlideInterval;

function showSlide(index) {
    carouselSlides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    carouselIndicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselSlides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
    showSlide(currentSlide);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Modal Functionality
function openModal(gameId) {
    const game = gamesData.find(g => g.id === gameId);
    if (game) {
        modalImage.src = game.image;
        modalTitle.textContent = game.title;
        modalDescription.textContent = game.description;
        modalPrice.textContent = `$${game.price.toFixed(2)}`;
        modalBuyBtn.onclick = () => addToCart(gameId);
        gameModal.style.display = 'block';
    }
}

function closeModalFunc() {
    gameModal.style.display = 'none';
}

// Search Functionality
function performSearch() {
    const query = searchInput.value.toLowerCase();
    const filteredGames = gamesData.filter(game =>
        game.title.toLowerCase().includes(query) ||
        game.developer.toLowerCase().includes(query)
    );
    // In a real app, you'd update the DOM with filtered results
    console.log('Search results:', filteredGames);
    // For demo, just log; you could implement dynamic filtering
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    showSlide(currentSlide);
    startAutoSlide();

    // Carousel Controls
    carouselPrev.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    carouselNext.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    carouselIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });

    // Game Cards
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const gameId = parseInt(card.dataset.gameId);
            openModal(gameId);
        });
    });

    // Modal
    closeModal.addEventListener('click', closeModalFunc);
    window.addEventListener('click', (e) => {
        if (e.target === gameModal) {
            closeModalFunc();
        }
    });

    // Cart
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('open');
    });

    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });

    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const index = parseInt(e.target.dataset.index);
            removeFromCart(index);
        }
    });

    // Search
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Keyboard Navigation for Carousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        }
    });

    // Touch Support for Carousel (Mobile)
    let touchStartX = 0;
    let touchEndX = 0;

    document.querySelector('.hero-carousel').addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.querySelector('.hero-carousel').addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        } else if (touchEndX - touchStartX > 50) {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        }
    });

    // Window Resize for Responsiveness (if needed)
    window.addEventListener('resize', () => {
        // Any dynamic adjustments can go here
    });
});