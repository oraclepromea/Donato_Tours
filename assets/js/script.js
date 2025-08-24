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
                    parkName: "Madidi National Park",
                    duration: "3-6 Days",
                    title: "Madidi Deep Jungle Adventure",
                    description: "Discover the incredible biodiversity of Madidi National Park with guided trekking and wildlife observation in pristine rainforest.",
                    itinerary3: "3-Day Itinerary:",
                    itinerary6: "6-Day Extended Trek:",
                    day1Label: "Day 1:",
                    day2Label: "Day 2:",
                    day3Label: "Day 3:",
                    day4Label: "Day 4:",
                    day5Label: "Day 5:",
                    day6Label: "Day 6:",
                    day1: "Departure from Rurrenabaque by motorboat (3 hours) to our campsite on the Tuichi River. 2-hour jungle walk to observe medicinal and toxic plants, with possibilities to see wild animals. Dinner and rest.",
                    day2: "Breakfast. Great 5-hour jungle trek to indigenous Mosetenes communities. Experience wildlife of birds, rodents, insects, precious timber trees, wild fruit trees, and medicinal plants. Camping in indigenous areas. Night walk to see tapir, deer, jochi pintado, and armadillo.",
                    day3: "Breakfast. Walk to the salt lick to observe animals, birds, reptiles, and insects. Sport fishing in the Beni River. Return to Rurrenabaque.",
                    ext_day1: "Departure from La Paz in 4x4 vehicle to Apolo town. Accommodation.",
                    ext_day2: "5-6 hour trek from Apolo with lunch break. Arrive at Mamacona community, set up camp.",
                    ext_day3: "Continue trekking through forest and hills. Rest at Piñalito stream, prepare camp.",
                    ext_day4: "Trekking with opportunities to see wild boars, tapir, different monkeys, birds, medicinal plants, and giant trees. Arrive at Eslabón River, set up camp.",
                    ext_day5: "Continue trekking with animal observation possibilities. Arrive at Tuichi River, install camp.",
                    ext_day6: "Jungle experiences and return to Rurrenabaque.",
                    feature1: "🥾 Guided jungle trekking",
                    feature2: "🦎 Wildlife observation (tapir, monkeys, birds)",
                    feature3: "🌿 Medicinal plant interpretation",
                    feature4: "🏕️ Camping in indigenous communities",
                    feature5: "🎣 Sport fishing in Beni River",
                    feature6: "🌙 Night walks for nocturnal animals",
                    pricingLabel: "Starting from:",
                    pricing: "Contact for pricing",
                    book: "📱 Book Now on WhatsApp"
                },
                pilon: {
                    parkName: "Pilon Lajas Biosphere",
                    duration: "3-9 Days",
                    title: "Pilon Lajas Cultural & Rafting Expedition", 
                    description: "Experience the Biosphere Reserve Pilon Lajas with indigenous culture, thrilling rafting, and pristine nature exploration.",
                    itinerary3: "3-Day Expedition:",
                    itinerary9: "9-Day Rafting & Culture Adventure:",
                    day1Label: "Day 1:",
                    day2Label: "Day 2:",
                    day3Label: "Day 3:",
                    day4Label: "Day 4:",
                    day5Label: "Day 5:",
                    day6Label: "Day 6-7:",
                    day8Label: "Day 8:",
                    day9Label: "Day 9:",
                    day1: "Departure from Rurrenabaque by motorboat (5 hours) along Beni River to \"Palma Real\" campsite. Lunch and accommodation. 2-hour jungle walk to viewpoint for bird watching, medicinal plants, and sunset. Dinner, free evening.",
                    day2: "Breakfast. 5-hour exploration trek interpreting medicinal and toxic plants, with opportunities to observe, smell, and hear local animals and birds. Return for lunch. Natural seed crafts activities. Dinner and 2-hour night walk to discover nocturnal wildlife.",
                    day3: "Breakfast. Jungle exploration in different areas for Amazonian fauna and flora. Lunch. Rafting activities. Return by boat to Rurrenabaque.",
                    ext_day1: "Departure from Rurrenabaque by bus. Lunch in Yucumo. Arrival at Charal town, overnight stay.",
                    ext_day2: "5-hour rafting journey on Quiquibey River. Lunch preparation. Rest and camping.",
                    ext_day3: "Continue rafting, discover natural beauty and observe regional animals. Arrive at indigenous Mosetenes families, share their customs.",
                    ext_day4: "Jungle walk guided by native indigenous people, learn about wildlife and share experiences about medicinal and toxic plants. Continue rafting.",
                    ext_day5: "Continue journey to another native Chimanes family, learn more about jungle nature.",
                    ext_day6: "Continue rafting on Quiquibey River to other indigenous communities.",
                    ext_day8: "Rafting to Gredal community, spend night learning native customs.",
                    ext_day9: "Breakfast. Departure to Rurrenabaque observing different natural landscapes. End of program.",
                    feature1: "🚣 Multi-day rafting adventures",
                    feature2: "🏞️ Biosphere Reserve exploration",
                    feature3: "👥 Indigenous community visits",
                    feature4: "🎨 Traditional crafts workshops",
                    feature5: "🌿 Medicinal plant interpretation",
                    feature6: "🌅 Sunrise and sunset viewing",
                    pricing3Label: "3 Days from:",
                    pricing3: "$120 USD",
                    pricing9Label: "9 Days from:",
                    pricing9: "$360 USD",
                    book: "📱 Book Now on WhatsApp"
                },
                pampas: {
                    parkName: "Pampas Experience",
                    duration: "3 Days",
                    title: "Yacuma River Pampas Adventure",
                    description: "Enjoy wildlife observation, swimming with pink dolphins, and horseback riding in the warm waters and grasslands of the Yacuma River region.",
                    itinerary3: "3-Day Wildlife Experience:",
                    itineraryAlt: "Alternative Horseback Adventure:",
                    day1Label: "Day 1:",
                    day2Label: "Day 2:",
                    day3Label: "Day 3:",
                    day1: "Departure from Rurrenabaque to Santa Rosa by 4x4 jeep (3 hours). Lunch at restaurant in Santa Rosa. Boat journey on Yacuma River to our cabins, observing diverse flora and fauna during 4-hour trip. Arrival and accommodation at cabins.",
                    day2_1Label: "07:00",
                    day2_1: "Buffet breakfast",
                    day2_2Label: "08:00",
                    day2_2: "Pampas walk to search for anacondas and observe wildlife, birds, with biogeographical information",
                    day2_3Label: "12:00",
                    day2_3: "Buffet lunch",
                    day2_4Label: "13:00",
                    day2_4: "Rest in hammocks under tree shade",
                    day2_5Label: "15:00",
                    day2_5: "Sport fishing activities, especially piranha fishing",
                    day2_6Label: "18:00",
                    day2_6: "Dinner",
                    day2_7Label: "20:00",
                    day2_7: "Night boat ride with rowing to identify caimans and alligators by their eyes, sharing information about natural habitat (1 hour)",
                    day2_8Label: "21:00",
                    day2_8: "Rest",
                    day3: "Early morning boat trip to appreciate pampas sunrise, natural landscape, birds, and animals manifesting themselves in their natural habitat. Swimming with pink dolphins in safe areas. Return to Rurrenabaque.",
                    alt_day1: "4x4 journey to Santa Rosa, boat transfer to Puerto Santa Cruz cabins observing flora and fauna (4 hours).",
                    alt_day2: "3-hour pampas walk seeking wildlife and birds, anaconda photography opportunities. Boat excursion on river with possibility to swim with pink dolphins. Special sunset viewing location. 1-hour night boat ride observing alligator eyes.",
                    alt_day3: "Horseback riding to second campsite with flora and fauna observation, anaconda possibilities. Yacuma River boat ride and safe swimming with pink dolphins until sunset. Night rowing boat experience with wildlife sounds and alligator observation.",
                    feature1: "🐬 Swimming with pink dolphins",
                    feature2: "🐍 Anaconda searching expeditions",
                    feature3: "🐴 Horseback riding adventures",
                    feature4: "🎣 Piranha fishing experiences",
                    feature5: "🐊 Night caiman observation",
                    feature6: "🌅 Sunrise and sunset viewing",
                    feature7: "🏨 Comfortable cabins with private bathrooms",
                    pricingStdLabel: "Standard (3 days):",
                    pricingStd: "$240 USD",
                    pricingPremLabel: "Premium (3 days):",
                    pricingPrem: "$390 USD",
                    book: "📱 Book Now on WhatsApp"
                },
                info: {
                    accommodation: {
                        title: "🏕️ Accommodation",
                        text: "Comfortable cabins with soft beds and private facilities, camping in pristine natural settings"
                    },
                    meals: {
                        title: "🍽️ Meals",
                        text: "All meals included with buffet breakfast, packed lunches for treks, and traditional dinners"
                    },
                    guides: {
                        title: "👨‍🏫 Expert Guides",
                        text: "Experienced local guides with deep knowledge of flora, fauna, and indigenous cultures"
                    },
                    transport: {
                        title: "🚤 Transportation",
                        text: "4x4 vehicles, motorboats, and traditional canoes for comprehensive exploration"
                    }
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
                    parkName: "Parque Nacional Madidi",
                    duration: "3-6 Días",
                    title: "Aventura Profunda en la Selva de Madidi",
                    description: "Descubre la increíble biodiversidad del Parque Nacional Madidi con trekking guiado y observación de vida silvestre en selva virgen.",
                    itinerary3: "Itinerario de 3 Días:",
                    itinerary6: "Caminata Extendida de 6 Días:",
                    day1Label: "Día 1:",
                    day2Label: "Día 2:",
                    day3Label: "Día 3:",
                    day4Label: "Día 4:",
                    day5Label: "Día 5:",
                    day6Label: "Día 6:",
                    day1: "Salida de Rurrenabaque en lancha a motor (3 horas) a nuestro campamento en el Río Tuichi. Caminata de 2 horas en la selva para observar plantas medicinales y tóxicas, con posibilidades de ver animales salvajes. Cena y descanso.",
                    day2: "Desayuno. Gran caminata de 5 horas en la selva hacia comunidades indígenas Mosetenes. Experiencia de vida silvestre de aves, roedores, insectos, árboles maderables preciosos, árboles frutales silvestres y plantas medicinales. Acampando en áreas indígenas. Caminata nocturna para ver tapir, venado, jochi pintado y armadillo.",
                    day3: "Desayuno. Caminata al saladero para observar animales, aves, reptiles e insectos. Pesca deportiva en el Río Beni. Retorno a Rurrenabaque.",
                    ext_day1: "Salida de La Paz en vehículo 4x4 al pueblo de Apolo. Alojamiento.",
                    ext_day2: "Caminata de 5-6 horas desde Apolo con pausa para almorzar. Llegada a la comunidad Mamacona, establecer campamento.",
                    ext_day3: "Continuar caminata a través del bosque y colinas. Descanso en el arroyo Piñalito, preparar campamento.",
                    ext_day4: "Caminata con oportunidades de ver jabalíes, tapir, diferentes monos, aves, plantas medicinales y árboles gigantes. Llegada al Río Eslabón, establecer campamento.",
                    ext_day5: "Continuar caminata con posibilidades de observación de animales. Llegada al Río Tuichi, instalar campamento.",
                    ext_day6: "Experiencias en la selva y retorno a Rurrenabaque.",
                    feature1: "🥾 Trekking guiado en la selva",
                    feature2: "🦎 Observación de vida silvestre (tapir, monos, aves)",
                    feature3: "🌿 Interpretación de plantas medicinales",
                    feature4: "🏕️ Acampando en comunidades indígenas",
                    feature5: "🎣 Pesca deportiva en el Río Beni",
                    feature6: "🌙 Caminatas nocturnas para animales nocturnos",
                    pricingLabel: "Desde:",
                    pricing: "Contactar para precios",
                    book: "📱 Reservar por WhatsApp"
                },
                pilon: {
                    parkName: "Biosfera Pilón Lajas",
                    duration: "3-9 Días",
                    title: "Expedición Cultural y Rafting Pilón Lajas",
                    description: "Experimenta la Reserva de la Biosfera Pilón Lajas con cultura indígena, rafting emocionante y exploración de naturaleza virgen.",
                    itinerary3: "Expedición de 3 Días:",
                    itinerary9: "Aventura de Rafting y Cultura de 9 Días:",
                    day1Label: "Día 1:",
                    day2Label: "Día 2:",
                    day3Label: "Día 3:",
                    day4Label: "Día 4:",
                    day5Label: "Día 5:",
                    day6Label: "Día 6-7:",
                    day8Label: "Día 8:",
                    day9Label: "Día 9:",
                    day1: "Salida de Rurrenabaque en lancha a motor (5 horas) por el Río Beni al campamento \"Palma Real\". Almuerzo y alojamiento. Caminata de 2 horas en la selva al mirador para observación de aves, plantas medicinales y atardecer. Cena, tarde libre.",
                    day2: "Desayuno. Caminata de exploración de 5 horas interpretando plantas medicinales y tóxicas, con oportunidades de observar, oler y escuchar animales y aves locales. Retorno para almorzar. Actividades de artesanías con semillas naturales. Cena y caminata nocturna de 2 horas para descubrir vida silvestre nocturna.",
                    day3: "Desayuno. Exploración de la selva en diferentes áreas para fauna y flora amazónica. Almuerzo. Actividades de rafting. Retorno en bote a Rurrenabaque.",
                    ext_day1: "Salida de Rurrenabaque en autobús. Almuerzo en Yucumo. Llegada al pueblo Charal, pernocte.",
                    ext_day2: "Viaje de rafting de 5 horas en el Río Quiquibey. Preparación del almuerzo. Descanso y acampada.",
                    ext_day3: "Continuar rafting, descubrir belleza natural y observar animales regionales. Llegada a familias indígenas Mosetenes, compartir sus costumbres.",
                    ext_day4: "Caminata en la selva guiada por personas indígenas nativas, aprender sobre vida silvestre y compartir experiencias sobre plantas medicinales y tóxicas. Continuar rafting.",
                    ext_day5: "Continuar viaje a otra familia nativa Chimanes, aprender más sobre la naturaleza de la selva.",
                    ext_day6: "Continuar rafting en el Río Quiquibey hacia otras comunidades indígenas.",
                    ext_day8: "Rafting a la comunidad Gredal, pasar la noche aprendiendo costumbres nativas.",
                    ext_day9: "Desayuno. Salida a Rurrenabaque observando diferentes paisajes naturales. Fin del programa.",
                    feature1: "🚣 Aventuras de rafting de varios días",
                    feature2: "🏞️ Exploración de Reserva de Biosfera",
                    feature3: "👥 Visitas a comunidades indígenas",
                    feature4: "🎨 Talleres de artesanías tradicionales",
                    feature5: "🌿 Interpretación de plantas medicinales",
                    feature6: "🌅 Observación de amanecer y atardecer",
                    pricing3Label: "3 Días desde:",
                    pricing3: "$120 USD",
                    pricing9Label: "9 Días desde:",
                    pricing9: "$360 USD",
                    book: "📱 Reservar por WhatsApp"
                },
                pampas: {
                    parkName: "Experiencia Pampas",
                    duration: "3 Días",
                    title: "Aventura en las Pampas del Río Yacuma",
                    description: "Disfruta observación de vida silvestre, natación con delfines rosados y cabalgatas en las aguas cálidas y pastizales de la región del Río Yacuma.",
                    itinerary3: "Experiencia de Vida Silvestre de 3 Días:",
                    itineraryAlt: "Aventura Alternativa a Caballo:",
                    day1Label: "Día 1:",
                    day2Label: "Día 2:",
                    day3Label: "Día 3:",
                    day1: "Salida de Rurrenabaque a Santa Rosa en jeep 4x4 (3 horas). Almuerzo en restaurante en Santa Rosa. Viaje en bote por el Río Yacuma a nuestras cabañas, observando flora y fauna diversa durante viaje de 4 horas. Llegada y alojamiento en cabañas.",
                    day2_1Label: "07:00",
                    day2_1: "Desayuno buffet",
                    day2_2Label: "08:00",
                    day2_2: "Caminata por las pampas para buscar anacondas y observar vida silvestre, aves, con información biogeográfica",
                    day2_3Label: "12:00",
                    day2_3: "Almuerzo buffet",
                    day2_4Label: "13:00",
                    day2_4: "Descanso en hamacas bajo la sombra de árboles",
                    day2_5Label: "15:00",
                    day2_5: "Actividades de pesca deportiva, especialmente pesca de pirañas",
                    day2_6Label: "18:00",
                    day2_6: "Cena",
                    day2_7Label: "20:00",
                    day2_7: "Paseo nocturno en bote con remo para identificar caimanes y lagartos por sus ojos, compartiendo información sobre hábitat natural (1 hora)",
                    day2_8Label: "21:00",
                    day2_8: "Descanso",
                    day3: "Viaje matutino temprano en bote para apreciar amanecer de las pampas, paisaje natural, aves y animales manifestándose en su hábitat natural. Natación con delfines rosados en áreas seguras. Retorno a Rurrenabaque.",
                    alt_day1: "Viaje en 4x4 a Santa Rosa, traslado en bote a cabañas Puerto Santa Cruz observando flora y fauna (4 horas).",
                    alt_day2: "Caminata de 3 horas por las pampas buscando vida silvestre y aves, oportunidades fotográficas de anacondas. Excursión en bote por el río con posibilidad de nadar con delfines rosados. Ubicación especial para ver atardecer. Paseo nocturno en bote de 1 hora observando ojos de lagartos.",
                    alt_day3: "Cabalgata a segundo campamento con observación de flora y fauna, posibilidades de anacondas. Paseo en bote por Río Yacuma y natación segura con delfines rosados hasta atardecer. Experiencia nocturna en bote de remo con sonidos de vida silvestre y observación de lagartos.",
                    feature1: "🐬 Natación con delfines rosados",
                    feature2: "🐍 Expediciones de búsqueda de anacondas",
                    feature3: "🐴 Aventuras a caballo",
                    feature4: "🎣 Experiencias de pesca de pirañas",
                    feature5: "🐊 Observación nocturna de caimanes",
                    feature6: "🌅 Observación de amanecer y atardecer",
                    feature7: "🏨 Cabañas cómodas con baños privados",
                    pricingStdLabel: "Estándar (3 días):",
                    pricingStd: "$240 USD",
                    pricingPremLabel: "Premium (3 días):",
                    pricingPrem: "$390 USD",
                    book: "📱 Reservar por WhatsApp"
                },
                info: {
                    accommodation: {
                        title: "🏕️ Alojamiento",
                        text: "Cabañas cómodas con camas suaves y instalaciones privadas, acampada en entornos naturales prístinos"
                    },
                    meals: {
                        title: "🍽️ Comidas",
                        text: "Todas las comidas incluidas con desayuno buffet, almuerzos empacados para caminatas y cenas tradicionales"
                    },
                    guides: {
                        title: "👨‍🏫 Guías Expertos",
                        text: "Guías locales experimentados con conocimiento profundo de flora, fauna y culturas indígenas"
                    },
                    transport: {
                        title: "🚤 Transporte",
                        text: "Vehículos 4x4, lanchas a motor y canoas tradicionales para exploración integral"
                    }
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