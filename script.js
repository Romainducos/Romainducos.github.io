// Register Service Worker for caching
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .catch(() => {}); // Silent fail
    });
}

// Mobile menu toggle
(function(){
    const btn = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
    if (!btn || !nav) return;
    btn.addEventListener('click', function(){
        const opened = nav.classList.toggle('open');
        btn.classList.toggle('open', opened);
        btn.setAttribute('aria-expanded', opened);
    });
})();

// Theme Toggle - Ultra optimized
(function(){
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Set initial theme immediately
    root.setAttribute('data-theme', savedTheme);
    
    // Update icon after DOM is ready
    const updateIcon = () => {
        const themeIcon = themeToggle.querySelector('.theme-icon');
        if (!themeIcon) return;
        
        const isDark = root.getAttribute('data-theme') === 'dark';
        themeIcon.innerHTML = isDark 
            ? '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>'
            : '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    };
    
    updateIcon();

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const newTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon();
    });
})();

// Scroll progress bar
(function() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', function() {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
    }, { passive: true });
})();

// Back to top
(function() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', function() {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// Scroll reveal
(function() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length || !window.IntersectionObserver) {
        elements.forEach(function(el) { el.classList.add('visible'); });
        return;
    }
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    elements.forEach(function(el) { observer.observe(el); });
})();

// Active nav link
(function() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !links.length || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                links.forEach(function(link) {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
                });
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(function(s) { observer.observe(s); });
})();

// Typing animation for hero subtitle
(function() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;
    const text = subtitle.textContent.trim();
    subtitle.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    subtitle.appendChild(cursor);
    let i = 0;
    const next = function() {
        if (i < text.length) {
            subtitle.insertBefore(document.createTextNode(text[i++]), cursor);
            setTimeout(next, 70);
        } else {
            setTimeout(function() { cursor.remove(); }, 1500);
        }
    };
    setTimeout(next, 600);
})();
