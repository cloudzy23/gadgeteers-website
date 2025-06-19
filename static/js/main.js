// Main JavaScript functionality for The Gadgeteers website
class GadgeteersApp {
    constructor() {
        this.currentTeam = '2025';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupTeamTabs();
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
        this.setupContactForm();
        this.setupPerformanceOptimizations();
        this.ensureTeamPhotosAlwaysVisible();
    }

    ensureTeamPhotosAlwaysVisible() {
        // Function to keep team photos visible at all times
        const keepPhotosVisible = () => {
            const teamPhotoSelectors = [
                '.hero-team-photo',
                '.team-showcase-photo',
                '.contact-team-photo'
            ];

            teamPhotoSelectors.forEach(selector => {
                const photos = document.querySelectorAll(selector);
                photos.forEach(photo => {
                    if (photo) {
                        // Force visibility
                        photo.style.opacity = '1';
                        photo.style.visibility = 'visible';
                        photo.style.display = 'block';

                        // Remove any hiding classes
                        photo.classList.remove('hidden', 'invisible');

                        // Special handling for hero team photo
                        if (photo.classList.contains('hero-team-photo')) {
                            photo.style.zIndex = '10';
                            photo.style.position = 'absolute';
                            photo.style.top = '50%';
                            photo.style.left = '50%';
                            photo.style.transform = 'translate(-50%, -50%)';

                            // Ensure no content replaces the photo
                            if (photo.innerHTML && photo.innerHTML.includes('⚙️')) {
                                photo.innerHTML = '';
                            }
                        }
                    }
                });
            });

            // Keep gear behind photo
            const gear = document.querySelector('.gear-3d');
            if (gear) {
                gear.style.zIndex = '1';
                gear.style.opacity = '0.3';
            }
        };

        // Run immediately
        keepPhotosVisible();

        // Run when DOM is fully loaded
        document.addEventListener('DOMContentLoaded', keepPhotosVisible);

        // Run when page is fully loaded (including images)
        window.addEventListener('load', keepPhotosVisible);

        // Run periodically to ensure photos stay visible
        setInterval(keepPhotosVisible, 1000);

        // Run when scrolling (in case scroll animations interfere)
        window.addEventListener('scroll', this.throttle(keepPhotosVisible, 100));

        // Run when resizing
        window.addEventListener('resize', this.debounce(keepPhotosVisible, 250));
    }

    setupNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Animate hamburger bars
                const bars = hamburger.querySelectorAll('.bar');
                if (hamburger.classList.contains('active')) {
                    gsap.to(bars[0], { rotation: 45, y: 6, duration: 0.3 });
                    gsap.to(bars[1], { opacity: 0, duration: 0.3 });
                    gsap.to(bars[2], { rotation: -45, y: -6, duration: 0.3 });
                } else {
                    gsap.to(bars[0], { rotation: 0, y: 0, duration: 0.3 });
                    gsap.to(bars[1], { opacity: 1, duration: 0.3 });
                    gsap.to(bars[2], { rotation: 0, y: 0, duration: 0.3 });
                }
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    
                    // Reset hamburger animation
                    const bars = hamburger.querySelectorAll('.bar');
                    gsap.to(bars[0], { rotation: 0, y: 0, duration: 0.3 });
                    gsap.to(bars[1], { opacity: 1, duration: 0.3 });
                    gsap.to(bars[2], { rotation: 0, y: 0, duration: 0.3 });
                });
            });
        }
    }

    setupTeamTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const teamContents = document.querySelectorAll('.team-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                this.switchTeam(targetTab, tabButtons, teamContents);
            });
        });
    }

    switchTeam(targetTab, tabButtons, teamContents) {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        teamContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
        const activeContent = document.getElementById(`team-${targetTab}`);

        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeContent.classList.add('active');
            this.currentTeam = targetTab;

            // Animate team switch
            gsap.fromTo(activeContent, {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });

            // Re-trigger scroll animations for new content
            ScrollTrigger.refresh();
        }
    }

    setupSmoothScrolling() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        ease: "power2.inOut"
                    });
                }
            });
        });
    }

    setupActiveNavigation() {
        // Highlight active navigation based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    
                    // Remove active class from all nav links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to corresponding nav link
                    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    setupContactForm() {
        // Add interactive effects to contact items
        const contactItems = document.querySelectorAll('.contact-item');
        
        contactItems.forEach(item => {
            item.addEventListener('click', () => {
                // Add click ripple effect
                const ripple = document.createElement('div');
                ripple.classList.add('ripple');
                item.appendChild(ripple);

                // Position ripple
                const rect = item.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (rect.width / 2 - size / 2) + 'px';
                ripple.style.top = (rect.height / 2 - size / 2) + 'px';

                // Animate ripple
                gsap.fromTo(ripple, {
                    scale: 0,
                    opacity: 0.5
                }, {
                    scale: 1,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    onComplete: () => ripple.remove()
                });
            });
        });
    }

    setupPerformanceOptimizations() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        // Preload critical resources
        this.preloadCriticalResources();

        // Optimize scroll performance
        this.optimizeScrollPerformance();
    }

    preloadCriticalResources() {
        // Preload fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
        fontLink.as = 'style';
        document.head.appendChild(fontLink);

        // Preload critical images including team photo
        const criticalImages = [
            '/static/images/logo.jpeg',
            '/static/images/team-photo.jpeg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = src;
            link.as = 'image';
            document.head.appendChild(link);
        });

        // Preload team photo with Image object for immediate availability
        const teamPhotoImg = new Image();
        teamPhotoImg.onload = () => {
            console.log('Team photo preloaded successfully');
            // Ensure all team photo elements use the loaded image
            document.querySelectorAll('.hero-team-photo, .team-showcase-photo, .contact-team-photo').forEach(img => {
                if (img.src.includes('team-photo.jpeg')) {
                    img.style.opacity = '1';
                    img.style.visibility = 'visible';
                    img.style.display = 'block';
                }
            });
        };
        teamPhotoImg.onerror = () => {
            console.error('Team photo failed to preload');
        };
        teamPhotoImg.src = '/static/images/team-photo.jpeg';
    }

    optimizeScrollPerformance() {
        let ticking = false;

        const updateScrollEffects = () => {
            // Update any scroll-based effects here
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // API methods for dynamic content
    async loadTeamData(year) {
        try {
            const response = await fetch(`/api/team/${year}`);
            if (response.ok) {
                return await response.json();
            }
            throw new Error('Failed to load team data');
        } catch (error) {
            console.error('Error loading team data:', error);
            return null;
        }
    }

    async loadAccomplishments() {
        try {
            const response = await fetch('/api/accomplishments');
            if (response.ok) {
                return await response.json();
            }
            throw new Error('Failed to load accomplishments');
        } catch (error) {
            console.error('Error loading accomplishments:', error);
            return null;
        }
    }

    // Utility methods
    debounce(func, wait) {
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

    throttle(func, limit) {
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
}

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(245, 158, 11, 0.6);
        pointer-events: none;
        z-index: 1;
    }
    
    .contact-item {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(rippleStyle);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GadgeteersApp();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GadgeteersApp;
}
