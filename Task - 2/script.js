document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu View Layout Triggers
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }
});

// 2. Strict Input Form Data Validation Logic [cite: 140, 161, 169]
function validateForm() {
    // Extract values matching structural document names [cite: 170]
    let name = document.forms["contactForm"]["name"].value.trim();
    let email = document.forms["contactForm"]["email"].value.trim();

    // Verification check for missing variables
    if (name === "" || email === "") {
        alert("Name and Email must be filled out!");
        return false;
    }
    
    alert("Thank you! Your message has been validated and sent successfully.");
    return true;
}