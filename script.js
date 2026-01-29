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
