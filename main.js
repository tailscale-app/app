// Cookie consent management
const cookieCategories = {
    necessary: {
        name: 'Necessary',
        description: 'Essential for the website to function properly. Cannot be disabled.',
        required: true
    },
    functional: {
        name: 'Functional',
        description: 'Enhanced website functionality and personalization.',
        required: false
    },
    analytics: {
        name: 'Analytics',
        description: 'Help us understand how visitors interact with our website.',
        required: false
    }
};

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/;Secure;SameSite=Strict';
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
}

function saveConsent(preferences) {
    setCookie('cookie-consent', JSON.stringify(preferences), 180); // Store for 180 days
    if (!preferences.analytics) {
        // Disable analytics cookies if not consented
        deleteCookie('_ga');
        deleteCookie('_gid');
        // Add other analytics cookies that need to be deleted
    }
}

function showCookieBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <div class="cookie-header">
                <h2>Privacy Preferences</h2>
                <p>We value your privacy</p>
            </div>
            <div class="cookie-body">
                <p>We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Click "Customize" to manage your preferences.</p>
                
                <div class="cookie-settings" style="display: none;">
                    ${Object.entries(cookieCategories).map(([key, category]) => `
                        <div class="cookie-category">
                            <div class="cookie-category-header">
                                <label class="cookie-switch">
                                    <input type="checkbox" 
                                        data-category="${key}" 
                                        ${category.required ? 'checked disabled' : ''}>
                                    <span class="cookie-slider"></span>
                                </label>
                                <h3>${category.name}</h3>
                            </div>
                            <p>${category.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="cookie-footer">
                <button class="cookie-customize">Customize</button>
                <div class="cookie-buttons">
                    <button class="cookie-reject">Reject All</button>
                    <button class="cookie-accept">Accept All</button>
                    <button class="cookie-save" style="display: none;">Save Preferences</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(banner);

    const settings = banner.querySelector('.cookie-settings');
    const customizeBtn = banner.querySelector('.cookie-customize');
    const saveBtn = banner.querySelector('.cookie-save');
    const acceptBtn = banner.querySelector('.cookie-accept');
    const rejectBtn = banner.querySelector('.cookie-reject');

    customizeBtn.addEventListener('click', () => {
        settings.style.display = settings.style.display === 'none' ? 'block' : 'none';
        saveBtn.style.display = settings.style.display === 'block' ? 'block' : 'none';
        acceptBtn.style.display = settings.style.display === 'block' ? 'none' : 'block';
        rejectBtn.style.display = settings.style.display === 'block' ? 'none' : 'block';
    });

    acceptBtn.addEventListener('click', () => {
        const preferences = Object.keys(cookieCategories).reduce((acc, category) => {
            acc[category] = true;
            return acc;
        }, {});
        saveConsent(preferences);
        banner.remove();
    });

    rejectBtn.addEventListener('click', () => {
        const preferences = Object.keys(cookieCategories).reduce((acc, category) => {
            acc[category] = cookieCategories[category].required;
            return acc;
        }, {});
        saveConsent(preferences);
        banner.remove();
    });

    saveBtn.addEventListener('click', () => {
        const preferences = Object.keys(cookieCategories).reduce((acc, category) => {
            const checkbox = banner.querySelector(`input[data-category="${category}"]`);
            acc[category] = checkbox.checked;
            return acc;
        }, {});
        saveConsent(preferences);
        banner.remove();
    });
}

// Initialize cookie consent
const consent = getCookie('cookie-consent');
if (!consent) {
    showCookieBanner();
} else {
    // Apply stored preferences
    const preferences = JSON.parse(consent);
    if (!preferences.analytics) {
        // Disable analytics if not consented
        window['ga-disable-UA-XXXXX-Y'] = true;
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form submission logic here
        alert('Thank you for your message. We will get back to you soon!');
        contactForm.reset();
    });
}

// Intersection Observer for animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});