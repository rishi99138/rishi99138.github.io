// Modern JavaScript for Portfolio Interactivity

document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loader = document.querySelector('.loader-wrapper');
    
    window.addEventListener('load', function() {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Update Active Navigation Link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    // Skills Category Switching
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillSections = document.querySelectorAll('.skills-section');

    skillCategories.forEach(category => {
        category.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Update active category
            skillCategories.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding skills section
            skillSections.forEach(section => {
                section.classList.remove('active');
                if (section.getAttribute('data-section') === targetCategory) {
                    section.classList.add('active');
                    
                    // Animate skill bars
                    const skillBars = section.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                }
            });
        });
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate skill bars when skills section comes into view
                if (entry.target.classList.contains('skills')) {
                    const activeSkillBars = entry.target.querySelectorAll('.skills-section.active .skill-progress');
                    activeSkillBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 300);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sectionsToObserve = document.querySelectorAll('section');
    sectionsToObserve.forEach(section => {
        observer.observe(section);
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Particle Effect for Hero Section (Optional Enhancement)
    function createParticles() {
        const hero = document.querySelector('.hero');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(99, 102, 241, 0.3);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${5 + Math.random() * 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            hero.appendChild(particle);
        }
    }

    // Initialize particles
    createParticles();

    // Typewriter Effect for Hero Title (Optional)
    function typewriterEffect() {
        const titleLines = document.querySelectorAll('.title-line');
        const texts = [
            "Hi, I'm",
            "Rishi Mandal", 
            "Cybersecurity Expert"
        ];

        titleLines.forEach((line, index) => {
            const originalText = texts[index];
            line.textContent = '';
            
            setTimeout(() => {
                let charIndex = 0;
                const typeInterval = setInterval(() => {
                    line.textContent += originalText[charIndex];
                    charIndex++;
                    
                    if (charIndex === originalText.length) {
                        clearInterval(typeInterval);
                    }
                }, 100);
            }, index * 1000);
        });
    }

    // Scroll-triggered Counters
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const countObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent.replace('+', ''));
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current) + '+';
                        }
                    }, 30);
                    countObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => countObserver.observe(counter));
    }

    // Initialize counter animation
    animateCounters();

    // Add CSS for particles and animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.8s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-menu.active {
            display: flex;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            z-index: 999;
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add custom cursor effect (Optional)
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            width: 20px;
            height: 20px;
            border: 2px solid #6366f1;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(newCursor);
    }
    
    document.querySelector('.custom-cursor').style.left = e.clientX + 'px';
    document.querySelector('.custom-cursor').style.top = e.clientY + 'px';
});
