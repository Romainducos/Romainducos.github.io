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

// Theme Toggle - Optimized
(function(){
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Set initial theme
    root.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme === 'dark');

    function updateThemeIcon(isDark) {
        // Use setAttribute instead of innerHTML for better performance
        if (isDark) {
            themeIcon.setAttribute('d', '');
            themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        } else {
            themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
        }
    }

    // Toggle theme with requestAnimationFrame for smoother performance
    themeToggle.addEventListener('click', function(){
        requestAnimationFrame(() => {
            const currentTheme = root.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            updateThemeIcon(newTheme === 'dark');
        });
    });
})();
