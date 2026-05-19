document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownWrapper = document.querySelector('.dropdown-wrapper');
    const dropdownTrigger = document.querySelector('.dropdown-trigger');
    const navLinks = document.querySelectorAll('.nav-link');

    // 1. Smooth Flyout Trigger for Mobile Devices
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Dynamic Icon Swap (Bars <-> Close X)
        const toggleIcon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            toggleIcon.className = 'fa-solid fa-xmark';
        } else {
            toggleIcon.className = 'fa-solid fa-bars';
        }
    });

    // 2. Mobile Responsive Click Support for Dropdowns
    dropdownTrigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Restrict instant route shifts on mobile
            dropdownWrapper.classList.toggle('open');
        }
    });

    // 3. Close the Mobile Drawer on Link Selection
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!link.classList.contains('dropdown-trigger')) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').className = 'fa-solid fa-bars';
                dropdownWrapper.classList.remove('open');
            }
        });
    });

    // 4. Highlight Nav Links Smoothly During Scroll Calculations
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const targetNavLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (targetNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
                    targetNavLink.classList.add('active');
                }
            }
        });
    });
});