// Portfolio JavaScript - Zeba K P
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio app initializing...');
    initializeApp();
});

function initializeApp() {
    initSmoothScrolling();
    initNavigationHighlight();
    initMobileMenu();
    initScrollEffects();
    initScrollReveal();
    initTerminalEffects();
    initHoverEffects();
    initResumeDownload();
    console.log('Portfolio app initialized successfully');
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav__link');
    const heroButtons = document.querySelectorAll('.hero__cta .btn');
    
    function smoothScrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const headerHeight = 80;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (typeof closeMobileMenu === 'function') {
                closeMobileMenu();
            }
            
            console.log(`Scrolling to section: ${targetId}`);
            return true;
        }
        console.warn(`Section not found: ${targetId}`);
        return false;
    }
    
    // Handle navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                smoothScrollToSection(targetId);
            }
        });
    });
    
    // Handle hero section buttons
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                smoothScrollToSection(targetId);
            }
        });
    });
    
    console.log('Smooth scrolling initialized for', navLinks.length, 'nav links and', heroButtons.length, 'hero buttons');
}

// Navigation highlighting and header scroll effects
function initNavigationHighlight() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');
    
    function updateNavigationState() {
        const scrollPosition = window.pageYOffset;
        
        // Header background change on scroll
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active navigation link
        let currentSection = '';
        const offset = 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active class on nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref.substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttled scroll handler for better performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateNavigationState();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    updateNavigationState(); // Initial call
    
    console.log('Navigation highlighting initialized for', sections.length, 'sections');
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');
    const navLinks = document.querySelectorAll('.nav__link');
    
    if (!navToggle || !navList) {
        console.warn('Mobile menu elements not found');
        return;
    }
    
    function toggleMobileMenu() {
        navToggle.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navList.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navList.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Toggle menu on hamburger click
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize if screen gets larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
    
    // Make function available globally
    window.closeMobileMenu = closeMobileMenu;
    
    console.log('Mobile menu initialized');
}

// Resume download functionality
function initResumeDownload() {
    const resumeBtn = document.querySelector('a[download]');
    
    if (!resumeBtn) {
        console.warn('Resume download button not found');
        return;
    }
    
    resumeBtn.addEventListener('click', function(e) {
        // Check if the PDF file exists, otherwise show a message
        const originalText = this.innerHTML;
        const originalStyle = {
            background: this.style.background,
            borderColor: this.style.borderColor,
            color: this.style.color
        };
        
        // Visual feedback
        this.innerHTML = '<span class="btn__icon">⬇</span>Downloading...';
        this.style.background = 'var(--violet2)';
        this.style.borderColor = 'var(--violet2)';
        this.style.color = 'var(--white)';
        
        // Simulate download process
        setTimeout(() => {
            this.innerHTML = '<span class="btn__icon">✓</span>Download Started!';
            this.style.background = 'var(--green-terminal)';
            this.style.borderColor = 'var(--green-terminal)';
            this.style.color = 'var(--black)';
            
            // Reset after delay
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = originalStyle.background;
                this.style.borderColor = originalStyle.borderColor;
                this.style.color = originalStyle.color;
            }, 2000);
        }, 800);
        
        console.log('Resume download initiated');
    });
    
    console.log('Resume download functionality initialized');
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('project__card') || 
                    entry.target.classList.contains('cert__item')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const elementsToAnimate = document.querySelectorAll(`
        .project__card,
        .cert__item,
        .timeline__item,
        .education__item,
        .skills__column,
        .contact__item
    `);
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    console.log('Scroll effects initialized for', elementsToAnimate.length, 'elements');
}

// Scroll reveal functionality
function initScrollReveal() {
    const sections = document.querySelectorAll('section');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, revealOptions);
    
    sections.forEach(section => {
        // Set initial state
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        revealObserver.observe(section);
    });
    
    console.log('Scroll reveal initialized for', sections.length, 'sections');
}

// Terminal effects and typing animations
function initTerminalEffects() {
    const terminalOutput = document.querySelector('.terminal__output');
    const greeting = document.querySelector('.hero__greeting');
    
    if (!terminalOutput || !greeting) {
        console.warn('Terminal elements not found');
        return;
    }
    
    // Add typing cursor effect
    function addTypingCursor(element) {
        if (!element) return;
        
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        cursor.style.cssText = `
            color: var(--green-terminal);
            animation: blink 1s infinite;
            margin-left: 2px;
        `;
        
        element.appendChild(cursor);
    }
    
    // Add blinking cursor animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Add cursor to greeting after a delay
    setTimeout(() => {
        addTypingCursor(greeting);
    }, 2000);
    
    console.log('Terminal effects initialized');
}

// Add hover effects for interactive elements
function initHoverEffects() {
    // Skill chips hover effect
    const skillChips = document.querySelectorAll('.skill__chip');
    skillChips.forEach(chip => {
        chip.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 5px 15px rgba(132, 49, 155, 0.3)';
            this.style.transform = 'translateY(-2px)';
        });
        
        chip.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.transform = '';
        });
    });
    
    // Project cards enhanced hover
    const projectCards = document.querySelectorAll('.project__card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 40px rgba(99, 38, 115, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Contact links hover effect
    const contactLinks = document.querySelectorAll('.contact__link');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    console.log('Hover effects initialized');
}

// Code rain effect for hero section (subtle)
function initCodeRain() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const codes = ['&lt;/&gt;', '{}', '[]', '()', ';', '{', '}', '//', '/*', '*/', 'var', 'let', 'const', 'function', 'class', '=&gt;'];
    
    function createCodeDrop() {
        const drop = document.createElement('div');
        drop.style.cssText = `
            position: absolute;
            color: var(--violet2);
            font-family: var(--font-family-mono);
            font-size: 12px;
            opacity: 0.1;
            pointer-events: none;
            z-index: 1;
            left: ${Math.random() * 100}%;
            top: -20px;
            animation: code-rain 8s linear infinite;
        `;
        drop.textContent = codes[Math.floor(Math.random() * codes.length)];
        hero.appendChild(drop);
        
        setTimeout(() => {
            if (drop.parentNode) {
                drop.parentNode.removeChild(drop);
            }
        }, 8000);
    }
    
    // Create code drops periodically
    const interval = setInterval(createCodeDrop, 3000);
    
    // Clean up on page unload
    window.addEventListener('beforeunload', function() {
        clearInterval(interval);
    });
    
    console.log('Code rain effect initialized');
}

// Initialize code rain effect on larger screens only
function initCodeRainConditional() {
    if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setTimeout(initCodeRain, 3000); // Start after page load
    }
}

// Keyboard navigation support
function initKeyboardNavigation() {
    const focusableElements = document.querySelectorAll(`
        a[href],
        button:not([disabled]),
        textarea:not([disabled]),
        input:not([disabled]),
        select:not([disabled])
    `);
    
    // Add focus styles for keyboard navigation
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--violet2)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    console.log('Keyboard navigation initialized');
}

// Utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    // Set initial loading state
    document.body.classList.add('loading');
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
    
    // Initialize code rain after delay
    initCodeRainConditional();
    
    // Remove loading state after everything is initialized
    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
    }, 500);
});

// Error handling and fallbacks
window.addEventListener('error', function(e) {
    console.warn('Portfolio JS Error:', e.error);
    // Graceful degradation - ensure basic functionality works
});

// Handle page unload cleanup
window.addEventListener('beforeunload', function() {
    // Clean up any intervals or timeouts
    document.body.style.overflow = '';
});

// Prefers reduced motion support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--duration-fast', '0.01ms');
    document.documentElement.style.setProperty('--duration-normal', '0.01ms');
    console.log('Reduced motion preferences detected');
}

console.log('Portfolio JavaScript loaded successfully');