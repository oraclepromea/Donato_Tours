// Donato Tours Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const elementsToAnimate = document.querySelectorAll('.feature, .tour-card, .gallery-item, .contact-item');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-out');
        observer.observe(el);
    });

    // Gallery hover effects and modal (placeholder)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // This is a placeholder for gallery modal functionality
            // In a real implementation, you would open a lightbox/modal here
            showNotification('Gallery feature coming soon! Please contact us for more photos.', 'info');
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Initialize active nav link on page load
    updateActiveNavLink();

    // Tour card interactions
    const tourCards = document.querySelectorAll('.tour-card');
    tourCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Loading animation for images (placeholder)
    function initImageLoading() {
        const placeholders = document.querySelectorAll('.gallery-placeholder');
        placeholders.forEach((placeholder, index) => {
            // Simulate loading with delay
            setTimeout(() => {
                placeholder.style.opacity = '0.8';
                placeholder.innerHTML = `<span>📸 ${placeholder.textContent}</span>`;
            }, index * 200);
        });
    }

    // Initialize image loading
    initImageLoading();

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-green);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Notification system for gallery and other features
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === 'success' ? '#4a7c59' : type === 'info' ? '#17a2b8' : '#dc3545'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Animation keyframes for fade-in effect
    const style = document.createElement('style');
    style.textContent = `
        .fade-out {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }

        .nav-link.active {
            color: var(--primary-green) !important;
        }

        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);

    console.log('Donato Tours website loaded successfully!');

    // Translation System
    const translations = {
        en: {
            nav: {
                home: "Home",
                tours: "Tours", 
                about: "About",
                gallery: "Gallery",
                contact: "Contact"
            },
            hero: {
                title: "Welcome to the Amazonian Region of Bolivia",
                subtitle: "Where the rainforest and the pampas form one of the most amazing landscapes ever seen",
                explore: "Explore Tours",
                contact: "Contact Us"
            },
            about: {
                title: "Discover Bolivia's Natural Wonders",
                description: "Experience the incredible biodiversity of Madidi National Park and the Biosphere Reserve Pilon Lajas, two of Bolivia's most important protected areas surrounded by vibrant communities in the North-West region.",
                biodiversity: {
                    title: "Biodiversity",
                    text: "Explore one of the world's most biodiverse regions"
                },
                adventure: {
                    title: "Adventure", 
                    text: "Rafting, kayaking, and expedition trips"
                },
                comfort: {
                    title: "Comfort",
                    text: "Comfortable cabañas with soft beds for relaxation"
                }
            },
            gallery: {
                title: "Experience Gallery",
                description: "Glimpses of the amazing adventures that await you",
                wildlife: "Amazon Wildlife",
                river: "River Adventures", 
                treehouse: "Tree House Experience",
                lodge: "Eco Lodge Comfort",
                culture: "Local Communities",
                cultural: "Cultural Experiences",
                horseback: "Horseback Adventures",
                fishing: "Fishing Experiences",
                encounters: "Wildlife Encounters"
            },
            tours: {
                title: "Our Tour Packages",
                description: "Choose from our carefully crafted adventure experiences with detailed day-by-day itineraries",
                madidi: {
                    title: "Madidi Deep Jungle Adventure",
                    description: "Discover the incredible biodiversity of Madidi National Park with guided trekking and wildlife observation in pristine rainforest.",
                    duration: "3-6 Days",
                    pricing: "Contact for pricing",
                    book: "📱 Book Now on WhatsApp"
                },
                pilon: {
                    title: "Pilon Lajas Cultural & Rafting Expedition", 
                    description: "Experience the Biosphere Reserve Pilon Lajas with indigenous culture, thrilling rafting, and pristine nature exploration.",
                    duration: "3-9 Days",
                    pricing3: "3 Days from: $120 USD",
                    pricing9: "9 Days from: $360 USD",
                    book: "📱 Book Now on WhatsApp"
                },
                pampas: {
                    title: "Yacuma River Pampas Adventure",
                    description: "Enjoy wildlife observation, swimming with pink dolphins, and horseback riding in the warm waters and grasslands of the Yacuma River region.",
                    duration: "3 Days",
                    pricingStd: "Standard (3 days): $240 USD",
                    pricingPrem: "Premium (3 days): $390 USD",
                    book: "📱 Book Now on WhatsApp"
                }
            },
            contact: {
                title: "Contact Us",
                description: "Ready to start your Amazon adventure?",
                getInTouch: "Get in Touch",
                email: "Email",
                phone: "Phone", 
                location: "Location",
                mapTitle: "Find Us on the Map",
                address: "Address: HF5C+979, Avaroa, Rurrenabaque, Beni, Bolivia",
                directions: "Get Directions"
            },
            footer: {
                tagline: "Your gateway to Bolivia's Amazon adventures",
                quickLinks: "Quick Links",
                contactInfo: "Contact Info",
                copyright: "© 2025 Donato Tours. All rights reserved."
            }
        },
        es: {
            nav: {
                home: "Inicio",
                tours: "Tours",
                about: "Nosotros", 
                gallery: "Galería",
                contact: "Contacto"
            },
            hero: {
                title: "Bienvenidos a la Región Amazónica de Bolivia",
                subtitle: "Donde la selva tropical y las pampas forman uno de los paisajes más increíbles jamás vistos",
                explore: "Explorar Tours",
                contact: "Contáctanos"
            },
            about: {
                title: "Descubre las Maravillas Naturales de Bolivia",
                description: "Experimenta la increíble biodiversidad del Parque Nacional Madidi y la Reserva de la Biosfera Pilón Lajas, dos de las áreas protegidas más importantes de Bolivia rodeadas de comunidades vibrantes en la región del Noroeste.",
                biodiversity: {
                    title: "Biodiversidad",
                    text: "Explora una de las regiones más biodiversas del mundo"
                },
                adventure: {
                    title: "Aventura",
                    text: "Rafting, kayak y viajes de expedición"
                },
                comfort: {
                    title: "Comodidad", 
                    text: "Cabañas cómodas con camas suaves para relajarse"
                }
            },
            gallery: {
                title: "Galería de Experiencias",
                description: "Vislumbres de las increíbles aventuras que te esperan",
                wildlife: "Vida Silvestre Amazónica",
                river: "Aventuras en el Río",
                treehouse: "Experiencia Casa del Árbol",
                lodge: "Comodidad Eco Lodge",
                culture: "Comunidades Locales",
                cultural: "Experiencias Culturales",
                horseback: "Aventuras a Caballo",
                fishing: "Experiencias de Pesca",
                encounters: "Encuentros con Vida Silvestre"
            },
            tours: {
                title: "Nuestros Paquetes de Tour",
                description: "Elige entre nuestras experiencias de aventura cuidadosamente diseñadas con itinerarios detallados día a día",
                madidi: {
                    title: "Aventura Profunda en la Selva de Madidi",
                    description: "Descubre la increíble biodiversidad del Parque Nacional Madidi con trekking guiado y observación de vida silvestre en selva virgen.",
                    duration: "3-6 Días",
                    pricing: "Contactar para precios",
                    book: "📱 Reservar por WhatsApp"
                },
                pilon: {
                    title: "Expedición Cultural y Rafting Pilón Lajas",
                    description: "Experimenta la Reserva de la Biosfera Pilón Lajas con cultura indígena, rafting emocionante y exploración de naturaleza virgen.",
                    duration: "3-9 Días", 
                    pricing3: "3 Días desde: $120 USD",
                    pricing9: "9 Días desde: $360 USD",
                    book: "📱 Reservar por WhatsApp"
                },
                pampas: {
                    title: "Aventura en las Pampas del Río Yacuma",
                    description: "Disfruta observación de vida silvestre, natación con delfines rosados y cabalgatas en las aguas cálidas y pastizales de la región del Río Yacuma.",
                    duration: "3 Días",
                    pricingStd: "Estándar (3 días): $240 USD",
                    pricingPrem: "Premium (3 días): $390 USD", 
                    book: "📱 Reservar por WhatsApp"
                }
            },
            contact: {
                title: "Contáctanos",
                description: "¿Listo para comenzar tu aventura amazónica?",
                getInTouch: "Ponte en Contacto",
                email: "Correo Electrónico",
                phone: "Teléfono",
                location: "Ubicación",
                mapTitle: "Encuéntranos en el Mapa",
                address: "Dirección: HF5C+979, Avaroa, Rurrenabaque, Beni, Bolivia",
                directions: "Obtener Direcciones"
            },
            footer: {
                tagline: "Tu puerta de entrada a las aventuras amazónicas de Bolivia",
                quickLinks: "Enlaces Rápidos", 
                contactInfo: "Información de Contacto",
                copyright: "© 2025 Donato Tours. Todos los derechos reservados."
            }
        }
    };

    // Language Management
    let currentLanguage = 'en';

    function initializeLanguage() {
        // Check for saved language preference
        const savedLang = localStorage.getItem('donatoToursLanguage');
        if (savedLang && translations[savedLang]) {
            currentLanguage = savedLang;
        }
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === currentLanguage) {
                btn.classList.add('active');
            }
        });
        
        // Apply translations
        translatePage();
    }

    function translatePage() {
        const lang = translations[currentLanguage];
        
        // Update document language attribute
        document.documentElement.lang = currentLanguage;
        
        // Translate all elements with data-translate attributes
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = getNestedTranslation(lang, key);
            
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Update page title and meta description
        if (currentLanguage === 'es') {
            document.title = "Donato Tours - Aventuras Amazónicas en Bolivia";
            document.querySelector('meta[name="description"]').content = "Descubre la impresionante región amazónica de Bolivia con Donato Tours. Explora el Parque Nacional Madidi, la Reserva de la Biosfera Pilón Lajas y vive aventuras inolvidables.";
        } else {
            document.title = "Donato Tours - Amazon Adventures in Bolivia";
            document.querySelector('meta[name="description"]').content = "Discover the breathtaking Amazonian region of Bolivia with Donato Tours. Explore Madidi National Park, Pilon Lajas Biosphere Reserve, and experience unforgettable adventures.";
        }
        
        // Update WhatsApp button texts and links
        updateWhatsAppButtons();
    }

    function getNestedTranslation(obj, key) {
        return key.split('.').reduce((o, k) => (o || {})[k], obj);
    }

    function updateWhatsAppButtons() {
        const buttons = document.querySelectorAll('.whatsapp-btn');
        const bookText = currentLanguage === 'es' ? '📱 Reservar por WhatsApp' : '📱 Book Now on WhatsApp';
        
        buttons.forEach((btn, index) => {
            btn.textContent = bookText;
            
            // Update WhatsApp message based on language and tour
            let message = '';
            if (currentLanguage === 'es') {
                if (index === 0) {
                    message = 'Hola Donato Tours! Estoy interesado en la Aventura Profunda en la Selva de Madidi. ¿Podrían proporcionarme más información y precios?';
                } else if (index === 1) {
                    message = 'Hola Donato Tours! Estoy interesado en la Expedición Cultural y Rafting Pilón Lajas. ¿Podrían proporcionarme más información y disponibilidad?';
                } else if (index === 2) {
                    message = 'Hola Donato Tours! Estoy interesado en la Aventura en las Pampas del Río Yacuma. ¿Podrían proporcionarme más información y disponibilidad?';
                }
            } else {
                if (index === 0) {
                    message = "Hi Donato Tours! I'm interested in the Madidi Deep Jungle Adventure. Could you please provide more information and pricing?";
                } else if (index === 1) {
                    message = "Hi Donato Tours! I'm interested in the Pilon Lajas Cultural & Rafting Expedition. Could you please provide more information and availability?";
                } else if (index === 2) {
                    message = "Hi Donato Tours! I'm interested in the Yacuma River Pampas Adventure. Could you please provide more information and availability?";
                }
            }
            
            btn.href = `https://wa.me/59171996091?text=${encodeURIComponent(message)}`;
        });
    }

    // Language Switcher Event Listeners
    function setupLanguageSwitchers() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const newLang = this.dataset.lang;
                
                if (newLang !== currentLanguage) {
                    currentLanguage = newLang;
                    localStorage.setItem('donatoToursLanguage', newLang);
                    
                    // Update active button
                    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Translate page with smooth transition
                    document.body.style.opacity = '0.8';
                    setTimeout(() => {
                        translatePage();
                        document.body.style.opacity = '1';
                    }, 150);
                }
            });
        });
    }

    // Initialize language system
    initializeLanguage();
    setupLanguageSwitchers();
});

// Utility functions
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

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(() => {
    // Additional scroll-based functionality can be added here
}, 10);