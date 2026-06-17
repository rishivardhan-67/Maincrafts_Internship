document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. Mobile Menu View Layout Triggers (Task 2 Continuation)
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
    // 2. Contact Form Processing (Task 3 Continuation)
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === "" || email === "" || message === "") {
                alert("All input fields are mandatory!");
                return;
            }

            let submissions = JSON.parse(localStorage.getItem('contacts')) || [];
            submissions.push({
                name: name,
                email: email,
                message: message,
                timestamp: new Date().toLocaleString()
            });

            localStorage.setItem('contacts', JSON.stringify(submissions));
            alert("Thank you! Your message has been saved successfully to LocalStorage.");
            contactForm.reset();
        });
    }

    // Task 3 Rendering System
    const submissionsContainer = document.getElementById('submissionsContainer');
    const clearDataBtn = document.getElementById('clearDataBtn');
    
    function renderSubmissions() {
        if (!submissionsContainer) return;
        let submissions = JSON.parse(localStorage.getItem('contacts')) || [];

        if (submissions.length === 0) {
            submissionsContainer.style.display = 'block';
            submissionsContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem; background: #ffffff; border-radius: 16px; border: 1px dashed #cbd5e1; color: #64748b;">
                    <i class="fa-solid fa-folder-open" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 1rem;"></i>
                    <p style="font-size: 1.1rem; font-weight: 500;">No submission records detected locally.</p>
                </div>
            `;
            if (clearDataBtn) clearDataBtn.style.display = 'none';
        } else {
            submissionsContainer.style.display = 'grid';
            submissionsContainer.innerHTML = '';
            if (clearDataBtn) clearDataBtn.style.display = 'inline-block';
            
            submissions.forEach((data, index) => {
                submissionsContainer.innerHTML += `
                    <div class="card" style="border-left: 4px solid var(--primary-color); position: relative; padding-top: 1.5rem;">
                        <button class="delete-single-btn" data-index="${index}" style="position: absolute; top: 12px; right: 16px; background: none; border: none; color: #94a3b8; cursor: pointer;">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                        <h3 style="color: var(--dark-bg); font-size: 1.1rem;"><i class="fa-solid fa-user" style="font-size:1rem; margin-right:8px; color: var(--primary-color);"></i>${escapeHTML(data.name)}</h3>
                        <span style="display: block; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.75rem;">
                        <i class="fa-regular fa-clock" style="margin-right: 4px;"></i>${data.timestamp || ''}
                        </span>
                        <p style="font-size: 0.9rem; color: var(--primary-color); margin-bottom: 1rem;">${escapeHTML(data.email)}</p>
                        <div style="background: var(--light-gray); padding: 1rem; border-radius: 8px; font-size: 0.9rem;">${escapeHTML(data.message)}</div>
                    </div>
                `;
            });
            attachSubmissionsDeleteEvents();
        }
    }

    function attachSubmissionsDeleteEvents() {
        document.querySelectorAll('.delete-single-btn').forEach(button => {
            button.addEventListener('click', () => {
                const idx = parseInt(button.getAttribute('data-index'));
                if (confirm("Delete this submission?")) {
                    let submissions = JSON.parse(localStorage.getItem('contacts')) || [];
                    submissions.splice(idx, 1);
                    localStorage.setItem('contacts', JSON.stringify(submissions));
                    renderSubmissions();
                }
            });
        });
    }

    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', () => {
            if (confirm("Clear all submissions?")) {
                localStorage.removeItem('contacts');
                renderSubmissions();
            }
        });
    }
    renderSubmissions();


    // ==========================================
    // 3. Task Dashboard CRUD State Machine (Task 4 Implementation)
    // ==========================================
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskSearch = document.getElementById('taskSearch');
    const taskFilter = document.getElementById('taskFilter');

    // Retrieve active array items or instantiate fresh local scope
    let tasks = JSON.parse(localStorage.getItem('dashboardTasks')) || [];

    function renderTasks() {
        if (!taskList) return;
        taskList.innerHTML = '';

        const searchQuery = taskSearch ? taskSearch.value.toLowerCase() : '';
        const filterValue = taskFilter ? taskFilter.value : 'all';

        // Chain array processing pipelines together cleanly
        const filteredTasks = tasks.filter(task => {
            const matchesSearch = task.name.toLowerCase().includes(searchQuery);
            const matchesFilter = filterValue === 'all' || 
                (filterValue === 'completed' && task.completed) || 
                (filterValue === 'pending' && !task.completed);
            
            return matchesSearch && matchesFilter;
        });

        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div style="text-align: center; padding: 3rem; background: #ffffff; border-radius: 12px; border: 1px dashed #cbd5e1; color: #64748b;">
                    <i class="fa-solid fa-list-check" style="font-size: 2.5rem; color: #cbd5e1; margin-bottom: 0.75rem;"></i>
                    <p style="font-weight: 500;">No tasks match your selection criteria.</p>
                </div>
            `;
            return;
        }

        // Render dynamic task rows
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <div class="task-item-left">
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                    <span class="task-text">${escapeHTML(task.name)}</span>
                </div>
                <div class="task-actions">
                    <button class="btn-icon btn-icon-edit" title="Edit text"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn-icon btn-icon-delete" title="Delete task permanently"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;

            // Bind CRUD Action Event Listeners
            // Toggle Completion State (Update)
            const checkbox = li.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => {
                task.completed = checkbox.checked;
                saveAndRenderTasks();
            });

            // Edit Task Content inline (Update)
            const editBtn = li.querySelector('.btn-icon-edit');
            editBtn.addEventListener('click', () => {
                const currentName = task.name;
                const updatedName = prompt("Modify task descriptions:", currentName);
                if (updatedName !== null && updatedName.trim() !== "") {
                    task.name = updatedName.trim();
                    saveAndRenderTasks();
                }
            });

            // Delete Single Task Entry (Delete)
            const deleteBtn = li.querySelector('.btn-icon-delete');
            deleteBtn.addEventListener('click', () => {
                if (confirm("Permanently drop this task from your active project workspace?")) {
                    tasks = tasks.filter(t => t.id !== task.id);
                    saveAndRenderTasks();
                }
            });

            taskList.appendChild(li);
        });
    }

    function saveAndRenderTasks() {
        localStorage.setItem('dashboardTasks', JSON.stringify(tasks));
        renderTasks();
    }

    // Create Action Event Listener (Create)
    if (taskForm && taskInput) {
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const content = taskInput.value.trim();
            if (!content) return;

            // Generate unique record profiles using timestamp hashes
            const newTask = {
                id: Date.now(),
                name: content,
                completed: false
            };

            tasks.push(newTask);
            taskForm.reset();
            saveAndRenderTasks();
        });
    }

    // Live search and filter event observers
    if (taskSearch) taskSearch.addEventListener('input', renderTasks);
    if (taskFilter) taskFilter.addEventListener('change', renderTasks);

    // Mount execution loop call track
    renderTasks();

    // Cross-site scripting extraction defense helper
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
});