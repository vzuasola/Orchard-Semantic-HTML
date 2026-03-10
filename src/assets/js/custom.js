
(function() {
    const galleryImages = document.querySelectorAll('.interview-block .gallery-img');
    const lightbox = document.getElementById('interviewLightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-nav.prev');
    const nextBtn = lightbox.querySelector('.lightbox-nav.next');
    
    let currentIndex = 0;
    const imageSources = [];

    galleryImages.forEach((img, index) => {
    imageSources.push(img.src);

    img.addEventListener('click', function(e) {
        e.preventDefault();
        currentIndex = parseInt(this.getAttribute('data-index'));
        openLightbox(currentIndex);
    });
    });

    function openLightbox(index) {
    if (imageSources.length === 0) return;
    
    currentIndex = index;
    lightboxImg.src = imageSources[currentIndex];
    updateCounter();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    console.log('interview-block image clicked - gallery opened, image index:', currentIndex);
    }

    function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';

    console.log('gallery closed');
    }

    function navigate(direction) {
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % imageSources.length;
        console.log('gallery navigation - next, now showing index:', currentIndex);
    } else {
        currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
        console.log('gallery navigation - prev, now showing index:', currentIndex);
    }
    lightboxImg.src = imageSources[currentIndex];
    updateCounter();
    }

    function updateCounter() {
    lightboxCounter.textContent = `${currentIndex + 1} / ${imageSources.length}`;
    }

    // Lightbox controls
    closeBtn.addEventListener('click', function() {
    closeLightbox();
    });
    
    prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    navigate('prev');
    });
    
    nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    navigate('next');
    });

    // Click outside to close
    lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigate('prev');
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigate('next');
    }
    });

    // Handle touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    lightbox.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    }, false);
    
    function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left
        navigate('next');
        console.log('gallery swipe left detected');
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right
        navigate('prev');
        console.log('gallery swipe right detected');
    }
    }

    // COLOUR CARDS MODALS
    const colourCards = document.querySelectorAll('.clickableFigure');
    const closeButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal-overlay');

    function openModal(modalId, element) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        
        // CONSOLE LOG - colour card clicked
        if (element.closest('.card-trio')) {
        const colourText = element.querySelector('h4')?.textContent || 'unknown';
        console.log('card-trio section clicked - modal:', modalId, 'colour:', colourText);
        }
    }
    }

    function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    
    // CONSOLE LOG - modal closed
    console.log('modal closed:', modal.id);
    }

    colourCards.forEach(card => {
    card.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal');
        if (modalId) {
        openModal(modalId, this);
        }
    });
    });

    closeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const modal = this.closest('.modal-overlay');
        if (modal) closeModal(modal);
    });
    });

    modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) closeModal(this);
    });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal-overlay.active');
        if (openModal) {
        closeModal(openModal);
        // CONSOLE LOG - escape key
        console.log('modal closed with Escape key:', openModal.id);
        }
        
        // Also check for lightbox
        if (lightbox.classList.contains('active')) {
        closeLightbox();
        console.log('gallery closed with Escape key');
        }
    }
    });

    const tempBadge = document.querySelector('.temp-badge');
    if (tempBadge) {
    tempBadge.addEventListener('click', function() {
        console.log('The perfect egg button clicked - temperature info');
    });
    }

    window.addEventListener('resize', function() {
    // No action needed, CSS handles responsiveness
    });
    console.log('Gallery and modal system initialized with responsive modals');      
})();