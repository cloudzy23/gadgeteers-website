// Premium GSAP Animations and Scroll Triggers
class PremiumAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Ensure team photos are always visible
        this.ensureTeamPhotosVisible();

        // Initialize animations
        this.setupLoadingAnimation();
        this.setupHeroAnimations();
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupHoverAnimations();
    }

    ensureTeamPhotosVisible() {
        // Force team photos to be visible
        const teamPhotos = [
            '.hero-team-photo',
            '.team-showcase-photo',
            '.contact-team-photo'
        ];

        teamPhotos.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (element) {
                    element.style.opacity = '1';
                    element.style.visibility = 'visible';
                    element.style.display = 'block';

                    // Add error handling for image loading
                    element.addEventListener('error', function() {
                        console.log('Image failed to load, showing fallback');
                        this.style.opacity = '1';
                        this.style.visibility = 'visible';
                        this.style.display = 'block';
                    });

                    // Ensure image loads
                    element.addEventListener('load', function() {
                        this.style.opacity = '1';
                        this.style.visibility = 'visible';
                        this.style.display = 'block';
                    });
                }
            });
        });

        // Check every 2 seconds to ensure photos stay visible
        setInterval(() => {
            teamPhotos.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    if (element && (element.style.opacity !== '1' || element.style.visibility === 'hidden')) {
                        element.style.opacity = '1';
                        element.style.visibility = 'visible';
                        element.style.display = 'block';
                    }
                });
            });
        }, 2000);
    }

    setupLoadingAnimation() {
        const loadingScreen = document.getElementById('loading-screen');
        const loadingGear = document.querySelector('.loading-gear');

        // Animate loading gear
        gsap.to(loadingGear, {
            rotation: 360,
            duration: 2,
            ease: "none",
            repeat: -1
        });

        // Hide loading screen after page load
        window.addEventListener('load', () => {
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                onComplete: () => {
                    loadingScreen.classList.add('hidden');
                    this.startPageAnimations();
                }
            });
        });
    }

    startPageAnimations() {
        // Animate hero elements
        const tl = gsap.timeline();

        tl.from('.hero-title', {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        })
        .from('.hero-subtitle', {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .from('.hero-description', {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6")
        .from('.hero-tagline', {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.4")
        .from('.hero-buttons .btn', {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out"
        }, "-=0.2")
        .from('.hero-team-photo', {
            scale: 0,
            opacity: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
            onComplete: function() {
                // Ensure photo stays visible and on top
                gsap.set('.hero-team-photo', {
                    opacity: 1,
                    visibility: 'visible',
                    zIndex: 10,
                    transform: 'translate(-50%, -50%)'
                });
            }
        }, "-=1")
        .from('.gear-container', {
            scale: 0,
            rotation: -180,
            opacity: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)",
            onComplete: function() {
                // Keep gear behind photo
                gsap.set('.gear-container', {zIndex: 1});
                gsap.set('.gear-3d', {zIndex: 1, opacity: 0.3});
            }
        }, "-=0.8");
    }

    setupHeroAnimations() {
        // Typing effect for hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';

            gsap.to(heroTitle, {
                duration: 2,
                text: {
                    value: text,
                    delimiter: ""
                },
                ease: "none",
                delay: 1,
                onComplete: function() {
                    // Ensure team photo stays visible after text animation
                    const teamPhoto = document.querySelector('.hero-team-photo');
                    if (teamPhoto) {
                        teamPhoto.style.opacity = '1';
                        teamPhoto.style.visibility = 'visible';
                        teamPhoto.style.zIndex = '10';
                        teamPhoto.style.display = 'block';
                    }
                }
            });
        }

        // Floating animation for gear (keep it subtle and behind photo)
        gsap.to('.gear-3d', {
            y: 10,
            duration: 4,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
            onUpdate: function() {
                // Ensure gear stays behind photo
                const gear = document.querySelector('.gear-3d');
                if (gear) {
                    gear.style.zIndex = '1';
                    gear.style.opacity = '0.3';
                }
            }
        });

        // Particle floating animation
        gsap.to('.floating-particles', {
            rotation: 360,
            duration: 20,
            ease: "none",
            repeat: -1
        });

        // Continuous check to keep team photo visible
        setInterval(() => {
            const teamPhoto = document.querySelector('.hero-team-photo');
            if (teamPhoto) {
                teamPhoto.style.opacity = '1';
                teamPhoto.style.visibility = 'visible';
                teamPhoto.style.zIndex = '10';
                teamPhoto.style.display = 'block';
            }
        }, 500);
    }

    setupScrollAnimations() {
        // Animate elements on scroll
        const animatedElements = document.querySelectorAll('[data-scroll-animation]');
        
        animatedElements.forEach((element, index) => {
            gsap.fromTo(element, {
                y: 100,
                opacity: 0,
                scale: 0.8
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                delay: index * 0.1
            });
        });

        // Section titles animation
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.fromTo(title, {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Stagger animation for team members
        gsap.utils.toArray('.team-grid').forEach(grid => {
            const cards = grid.querySelectorAll('.member-card');
            gsap.fromTo(cards, {
                y: 80,
                opacity: 0,
                scale: 0.8
            }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: grid,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Achievement cards animation
        gsap.utils.toArray('.achievement-card').forEach((card, index) => {
            gsap.fromTo(card, {
                x: index % 2 === 0 ? -100 : 100,
                opacity: 0,
                rotation: index % 2 === 0 ? -5 : 5
            }, {
                x: 0,
                opacity: 1,
                rotation: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Team showcase photo animation
        gsap.fromTo('.team-photo-container', {
            scale: 0.8,
            opacity: 0,
            y: 100
        }, {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.team-photo-container',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Contact image animation
        gsap.fromTo('.contact-image', {
            x: 100,
            opacity: 0,
            scale: 0.9
        }, {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.contact-image',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    }

    setupParallaxEffects() {
        // Parallax scrolling for hero background
        gsap.to('.hero', {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Parallax for floating particles
        gsap.to('.floating-particles', {
            y: -200,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });

        // Navbar background change on scroll
        ScrollTrigger.create({
            start: "top -80",
            end: 99999,
            toggleClass: {className: "scrolled", targets: ".navbar"}
        });
    }

    setupHoverAnimations() {
        // Enhanced hover effects for buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Member card hover effects
        document.querySelectorAll('.member-card').forEach(card => {
            const avatar = card.querySelector('.member-avatar');
            const glow = card.querySelector('.member-glow');

            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(avatar, {
                    scale: 1.1,
                    rotation: 5,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(glow, {
                    scale: 1,
                    opacity: 0.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(avatar, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(glow, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Achievement card hover effects
        document.querySelectorAll('.achievement-card').forEach(card => {
            const glow = card.querySelector('.achievement-glow');

            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -15,
                    scale: 1.02,
                    duration: 0.4,
                    ease: "power2.out"
                });

                gsap.to(glow, {
                    scale: 1,
                    opacity: 0.1,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                });

                gsap.to(glow, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
        });

        // Value item hover effects
        document.querySelectorAll('.value-item').forEach(item => {
            const icon = item.querySelector('i');

            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    y: -10,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(icon, {
                    scale: 1.2,
                    rotation: 10,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PremiumAnimations();
});
