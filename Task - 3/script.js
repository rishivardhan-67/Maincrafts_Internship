document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Mobile Menu View Layout Triggers
    // ==========================================
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

    // ==========================================
    // 2. Strict Input Form Interactivity & LocalStorage
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevents default form reload behavior

            // Extract values and strip structural spaces
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Client-side structural validation verify check
            if (name === "" || email === "" || message === "") {
                alert("All input fields are mandatory! Please fill out the form entirely.");
                return;
            }

            // Fetch current dataset arrays or instantiate an empty base layout
            let submissions = JSON.parse(localStorage.getItem('contacts')) || [];

            // Structural object compilation payload
            const newSubmission = {
                name: name,
                email: email,
                message: message,
                timestamp: new Date().toLocaleString()
            };

            // Push payload to database context
            submissions.push(newSubmission);

            // Synchronize strings smoothly back to localStorage state variables
            localStorage.setItem('contacts', JSON.stringify(submissions));

            // Trigger completion alert notification layout loop
            alert("Thank you! Your message has been validated and saved successfully to LocalStorage.");
            
            // Clear current input states
            contactForm.reset();
        });
    }

    // ==========================================
    // 3. Dynamic Submissions Pipeline Architecture
    // ==========================================
    const submissionsContainer = document.getElementById('submissionsContainer');
    
    function renderSubmissions() {
        if (!submissionsContainer) return;

        // Read local storage records
        let submissions = JSON.parse(localStorage.getItem('contacts')) || [];

        if (submissions.length === 0) {
            // Friendly UX state handler fallback when database strings are empty
            submissionsContainer.style.display = 'block';
            submissionsContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem; background: #ffffff; border-radius: 16px; border: 1px dashed #cbd5e1; color: #64748b;">
                    <i class="fa-solid fa-folder-open" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 1rem;"></i>
                    <p style="font-size: 1.1rem; font-weight: 500;">No submission records detected locally.</p>
                    <p style="font-size: 0.9rem;">Submissions entered into the Contact Form will show up here.</p>
                </div>
            `;
            // Hide the general clear button if there is no data to delete
            if (clearDataBtn) clearDataBtn.style.display = 'none';
        } else {
            // Restore regular system CSS grid layout mapping rules
            submissionsContainer.style.display = 'grid';
            submissionsContainer.innerHTML = ''; // Wipe old elements
            if (clearDataBtn) clearDataBtn.style.display = 'inline-block';
            
            // Populate data loop layout templates onto interface engine dashboards
            submissions.forEach((data, index) => {
                const cardHTML = `
                    <div class="card" style="border-left: 4px solid var(--primary-color); position: relative; padding-top: 1.5rem;">
                        <button class="delete-single-btn" data-index="${index}" title="Delete this submission" style="position: absolute; top: 12px; right: 16px; background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 1rem; transition: color 0.2s ease;">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                        
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; padding-right: 20px;">
                            <h3 style="color: var(--dark-bg); font-size: 1.1rem;"><i class="fa-solid fa-user" style="font-size:1rem; margin-right:8px; color: var(--primary-color);"></i>${escapeHTML(data.name)}</h3>
                        </div>
                        <span style="display: block; font-size: 0.75rem; color: var(--text-muted); font-weight:500; margin-bottom: 0.75rem;">
                            <i class="fa-regular fa-clock" style="margin-right: 4px;"></i>${data.timestamp || ''}
                        </span>
                        <p style="font-size: 0.9rem; color: var(--primary-color); font-weight: 500; margin-bottom: 1rem;">
                            <i class="fa-solid fa-envelope" style="font-size:0.85rem; margin-right:6px; color: var(--text-muted);"></i>${escapeHTML(data.email)}
                        </p>
                        <div style="background: var(--light-gray); padding: 1rem; border-radius: 8px; font-size: 0.9rem; color: var(--text-main); word-break: break-word;">
                            ${escapeHTML(data.message)}
                        </div>
                    </div>
                `;
                submissionsContainer.innerHTML += cardHTML;
            });

            // Bind Event Listeners dynamically to all newly rendered individual trash icons
            attachIndividualDeleteEvents();
        }
    }

    // Function to capture single item target index positions
    function attachIndividualDeleteEvents() {
        const deleteButtons = document.querySelectorAll('.delete-single-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Get index pointer from button element custom target logic
                const targetIndex = parseInt(button.getAttribute('data-index'));
                
                if (confirm("Are you sure you want to delete this specific record submission?")) {
                    let submissions = JSON.parse(localStorage.getItem('contacts')) || [];
                    
                    // Remove specific entry index layout node from backend stack array
                    submissions.splice(targetIndex, 1);
                    
                    // Rewrite back synchronized state mapping logic
                    localStorage.setItem('contacts', JSON.stringify(submissions));
                    
                    // Instant interactive interface refresh pipeline execution layout loop
                    renderSubmissions();
                }
            });
            
            // UI Visual Hover Interactivity effects optimization
            button.addEventListener('mouseover', () => button.style.color = 'var(--error-color)');
            button.addEventListener('mouseout', () => button.style.color = '#94a3b8');
        });
    }

    // Optional utility: Handle overall database cleaning actions cleanly at once
    const clearDataBtn = document.getElementById('clearDataBtn');
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to clear all locally saved submissions?")) {
                localStorage.removeItem('contacts');
                renderSubmissions(); // Seamlessly update UI view framework cleanly
            }
        });
    }

    // Helper pipeline mechanism preventing cross-site scripting strings execution inside inputs
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    // Initial Engine View Mount execution loop call track
    renderSubmissions();
});