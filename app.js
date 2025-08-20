// SkillMentorX Community Website JavaScript - Fixed Navigation

// Global navigation function with improved error handling
window.navigateToPage = function(page) {
    console.log('Navigating to:', page);
    
    // Hide all pages first
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
    });
    
    // Show target page
    const targetPage = document.getElementById(page);
    if (targetPage) {
        // Force display and opacity
        targetPage.style.display = 'block';
        targetPage.classList.add('active');
        targetPage.style.opacity = '1';
        
        console.log('Successfully showing page:', page);
        
        // Update navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Update URL
        history.replaceState(null, null, `#${page}`);
        
        return true;
    }
    
    console.error('Page not found:', page);
    return false;
};

// Helper function to close mobile menu
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    if (mobileMenu && navMenu) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// Contact form handler that redirects to WhatsApp
function handleContactForm(form) {
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create WhatsApp message
    const whatsappMessage = `Hi Chetan, I'm ${name} (${email}).

Subject: ${subject}

Message: ${message}

I'd like to connect with you regarding SkillMentorX Community.`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/917838177359?text=${encodedMessage}`;
    
    // Show success message
    showSuccessMessage(form, 'Redirecting to WhatsApp...');
    
    // Redirect to WhatsApp after a short delay
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
        form.reset();
        hideSuccessMessage();
    }, 1500);
}

// Helper functions for success messages
function showSuccessMessage(form, text) {
    let successMsg = document.querySelector('.success-message');
    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        form.parentNode.insertBefore(successMsg, form);
    }
    successMsg.innerHTML = `<i class="fas fa-check-circle"></i> ${text}`;
    successMsg.classList.add('show');
}

function hideSuccessMessage() {
    const successMsg = document.querySelector('.success-message');
    if (successMsg) {
        successMsg.classList.remove('show');
    }
}

// Initialize everything when DOM is ready
function initializeApp() {
    console.log('Initializing SkillMentorX Community app...');
    
    // Ensure home page is visible by default first
    const homePage = document.getElementById('home');
    if (homePage) {
        homePage.style.display = 'block';
        homePage.classList.add('active');
        homePage.style.opacity = '1';
    }
    
    // Set up navigation event listeners with improved handling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const page = this.getAttribute('data-page');
            console.log('Nav link clicked:', page);
            if (page) {
                navigateToPage(page);
            }
        });
    });
    
    // Set up brand logo navigation
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToPage('home');
        });
    }
    
    // Set up mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log('Mobile menu toggled');
        });
    }
    
    // Set up contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Contact form submitted');
            handleContactForm(this);
        });
    }
    
    // Handle WhatsApp buttons - make sure they work
    document.addEventListener('click', function(e) {
        const whatsappLink = e.target.closest('a[href*="wa.me"]');
        if (whatsappLink) {
            console.log('WhatsApp link clicked:', whatsappLink.href);
            // Let the default behavior handle the WhatsApp opening
            return true;
        }
        
        // Handle navigation buttons that use onclick
        const navButton = e.target.closest('button[onclick*="navigateToPage"]');
        if (navButton) {
            e.preventDefault();
            const onclickAttr = navButton.getAttribute('onclick');
            const match = onclickAttr.match(/navigateToPage\('([^']+)'\)/);
            if (match) {
                const page = match[1];
                console.log('Navigation button clicked:', page);
                navigateToPage(page);
            }
        }
    });
    
    // Handle initial page load
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
        setTimeout(() => navigateToPage(hash), 100);
    } else {
        // Ensure home page is visible by default
        setTimeout(() => navigateToPage('home'), 100);
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        const hash = window.location.hash.slice(1);
        if (hash && document.getElementById(hash)) {
            navigateToPage(hash);
        } else {
            navigateToPage('home');
        }
    });
    
    // Add loading animation to buttons when clicked (non-WhatsApp buttons)
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.btn');
        if (btn && !btn.href && !btn.closest('a[href*="wa.me"]')) {
            btn.classList.add('loading');
            setTimeout(() => {
                btn.classList.remove('loading');
            }, 1000);
        }
    });
    
    console.log('SkillMentorX Community app initialized successfully!');
}

// Add fade-in animation to page elements
function addAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.highlight-card, .focus-item, .card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Handle logo image loading
function handleLogoLoad() {
    const logoImages = document.querySelectorAll('.logo-img, .logo-img-large');
    logoImages.forEach(img => {
        img.addEventListener('error', function() {
            // If logo image fails to load, show a placeholder
            const placeholder = document.createElement('div');
            placeholder.className = 'logo-fallback';
            placeholder.innerHTML = '<i class="fas fa-users"></i>';
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--color-primary);
                color: white;
                border-radius: inherit;
                font-size: inherit;
            `;
            this.parentNode.replaceChild(placeholder, this);
        });
    });
}

// Add interactive enhancements
function addInteractiveEnhancements() {
    // Add click ripple effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Skip ripple for WhatsApp links
            if (this.href && this.href.includes('wa.me')) {
                return;
            }
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Force page visibility fix
function fixPageVisibility() {
    // Override any conflicting CSS
    const style = document.createElement('style');
    style.id = 'visibility-fix';
    style.textContent = `
        .page.active {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
        .page:not(.active) {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        fixPageVisibility();
        initializeApp();
        handleLogoLoad();
        addAnimations();
        addInteractiveEnhancements();
    });
} else {
    fixPageVisibility();
    initializeApp();
    handleLogoLoad();
    addAnimations();
    addInteractiveEnhancements();
}

// Debug helper
window.debugNavigation = function() {
    console.log('Available pages:', Array.from(document.querySelectorAll('.page')).map(p => p.id));
    console.log('Navigation links:', Array.from(document.querySelectorAll('.nav-link')).map(l => l.getAttribute('data-page')));
    console.log('Current active page:', document.querySelector('.page.active')?.id || 'none');
};

console.log('SkillMentorX Community JavaScript loaded successfully');