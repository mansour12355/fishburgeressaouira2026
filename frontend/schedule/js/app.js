// ===================================
// DevSync Dashboard - Main Application
// With Firebase Integration
// ===================================

// Import Firebase functions
import {
    fetchTasks,
    addTask,
    updateTask,
    fetchMessages,
    addMessage,
    fetchActivities,
    addActivity,
    subscribeToTasks,
    subscribeToMessages,
    subscribeToActivities,
    fetchMenu,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    batchDeleteMenuItems,
    subscribeToMenu,
    resetMenu
} from './firebase-config.js';

// App initialization
document.addEventListener('DOMContentLoaded', function () {
    // Check if user is logged in
    if (!sessionStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
        return;
    }

    // Set current role from session storage
    const savedRole = sessionStorage.getItem('userRole');
    if (savedRole) {
        currentRole = savedRole;
    }

    initializeApp();
});

async function initializeApp() {
    // Set default deadline to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('taskDeadline').valueAsDate = tomorrow;

    // Initialize event listeners
    initRoleSwitcher();
    initNavigation();
    initModals();
    initTaskForm();
    initCalendar();
    initMessages();
    initFilters();

    // Load data from Firebase
    await loadDataFromFirebase();

    // Set up real-time listeners
    setupRealtimeListeners();

    // Update UI based on logged-in role
    switchRole(currentRole);
}

// Global menu items - default data shown immediately
let menuItems = [
    // BURGERS
    // BURGERS (ESSAOUIRA)
    { id: 'default-1', name: "Crispy Fish Burger", price: 70, category: "burgers", location: "essaouira", available: true, mini: 55, desc: "Crispy fish filet, lettuce, coleslaw, chipotle, salsa verde, tartar & cornichons" },
    { id: 'default-2', name: "Double Crispy Fish Burger", price: 110, category: "burgers", location: "essaouira", available: true, desc: "2 crispy fish filets, lettuce, coleslaw, chipotle, salsa verde, tartar & cornichons" },
    { id: 'default-3', name: "Sardine Burger", price: 60, category: "burgers", location: "essaouira", available: true, mini: 45, desc: "2 grilled hashed sardine patties, cheese, lettuce, tomatoes & caramelized onions" },
    { id: 'default-4', name: "Tofu Burger", price: 75, category: "burgers", location: "essaouira", available: true, mini: 60, desc: "Crispy tofu, cheese, lettuce, tomatoes, salsa verde and chipotle sauce", veg: true },
    { id: 'default-5', name: "Calamari Burger", price: 75, category: "burgers", location: "essaouira", available: true, mini: 60, desc: "Crispy calamari rings, lettuce, cornichons & tartar" },
    { id: 'default-6', name: "Octopus Burger", price: 75, category: "burgers", location: "essaouira", available: true, mini: 60, desc: "Crispy chopped octopus legs, lettuce, tomatoes, cornichons & salsa verde" },
    { id: 'default-7', name: "Burger of the Month", price: 70, category: "burgers", location: "essaouira", available: true, mini: 55, desc: "Monthly burger inspired by a local artist" },

    // BURGERS (CASABLANCA)
    { id: 'default-casa-1', name: "Crispy Fishburger", price: 65, category: "burgers", location: "casablanca", available: true, mini: 50, desc: "Crispy white fish filet, chipotle, salsa verde & tartar, lettuce, pickles & coleslaw" },
    { id: 'default-casa-2', name: "Double Crispy Fishburger", price: 100, category: "burgers", location: "casablanca", available: true, desc: "2 crispy white fish filets, chipotle, salsa verde & tartar, lettuce, pickles & coleslaw" },
    { id: 'default-casa-3', name: "Sardine Burger", price: 55, category: "burgers", location: "casablanca", available: true, mini: 40, desc: "2 grilled hashed sardine patties, cheese, lettuce, tomatoes & caramelized onions" },
    { id: 'default-casa-4', name: "Eggplant Burger", price: 60, category: "burgers", location: "casablanca", available: true, mini: 45, desc: "Crispy eggplant patty, cheese, lettuce, tomatoes, salsa verde and chipotle sauce", veg: true },
    { id: 'default-casa-5', name: "Calamari* Burger", price: 70, category: "burgers", location: "casablanca", available: true, mini: 55, desc: "Crispy calamari rings, lettuce, cornichons & tartar" },
    { id: 'default-casa-6', name: "Octopus Burger", price: 70, category: "burgers", location: "casablanca", available: true, mini: 55, desc: "Crispy chopped octopus legs, lettuce, tomatoes, cornichons & salsa verde" },
    { id: 'default-casa-7', name: "Burger of the Month", price: 70, category: "burgers", location: "casablanca", available: true, mini: 50, desc: "Monthly burger inspired by a local artist" },

    // GLOBE (CASABLANCA)
    { id: 'default-casa-8', name: "Fish & Chips", price: 70, category: "globe", location: "casablanca", available: true, desc: "Crispy fish fillets, potato chips, coleslaw & tartar" },
    { id: 'default-casa-9', name: "Fish Burrito", price: 60, category: "globe", location: "casablanca", available: true, desc: "Crispy white fish, guacamole, rice, lettuce, salsa verde, coleslaw & chipotle sauce" },
    { id: 'default-casa-10', name: "Po' Boy Sandwich", price: 50, category: "globe", location: "casablanca", available: true, desc: "Crispy white fish, lettuce, tomatoes & tartar" },
    { id: 'default-casa-11', name: "Calamari Sandwich", price: 50, category: "globe", location: "casablanca", available: true, desc: "Crispy calamari rings, lettuce, cornichons & tartar" },
    { id: 'default-casa-12', name: "Octopus Sandwich", price: 50, category: "globe", location: "casablanca", available: true, desc: "Marinated octopus, marinara, pico de gallo & chipotle sauce" },

    // SHARED / ALL
    { id: 'default-21', name: "Ice Cream Cookie-Burger", price: 40, category: "desserts", location: "all", available: true, desc: "" },
    { id: 'default-22', name: "Chocolate Chip Cookies", price: 20, category: "desserts", location: "all", available: true, desc: "" },
    { id: 'default-23', name: "Soda", price: 15, category: "drinks", location: "all", available: true, desc: "" },
    { id: 'default-casa-13', name: "Ginger Mint Lemonade", price: 15, category: "drinks", location: "casablanca", available: true, desc: "" },
    { id: 'default-casa-14', name: "Espresso", price: 15, category: "drinks", location: "casablanca", available: true, desc: "" },
];

// Load initial data from Firebase
async function loadDataFromFirebase() {
    // Save hardcoded defaults as backup
    const defaultData = [...menuItems];

    try {
        tasks = await fetchTasks();
        messages = await fetchMessages();
        activities = await fetchActivities();

        // Fetch menu with error handling
        try {
            menuItems = await fetchMenu();
            console.log('Fetched menu items:', menuItems.length);
        } catch (menuError) {
            console.error('Error fetching menu, forcing reseed:', menuError);
            menuItems = [];
        }

        // NUCLEAR RESET: Force reseed with version v1005 for strict isolation and complete data fix
        const currentReseedVersion = 'menuReseeded_v1005';
        const hasReseeded = localStorage.getItem(currentReseedVersion);

        if (!hasReseeded || menuItems.length === 0) {
            console.log('--- STRICT MENU ISOLATION RESET (v1000) ---');
            try {
                // EXPLICITLY clear all existing data to remove contaminated "all" tags
                await resetMenu();
                console.log('Database cleared. Starting reseed...');

                // Reseed with branch assignments
                await seedMenu();

                localStorage.setItem(currentReseedVersion, 'true');
                console.log('--- RESET COMPLETED ---');

                // Fetch fresh data
                menuItems = await fetchMenu();
            } catch (seedError) {
                console.error('Critical failure during reset:', seedError);
            }
        }

        // Final safety check: if still empty, restore defaults
        if (menuItems.length === 0) {
            console.log('Menu empty after all attempts, restoring defaults.');
            menuItems = defaultData;
            // Ensure unique items in default data just in case
            const uniqueDefaults = [];
            const seen = new Set();
            menuItems.forEach(item => {
                const key = `${(item.name || '').trim().toLowerCase()}_${(item.location || 'all').trim().toLowerCase()}`;
                if (!seen.has(key)) {
                    seen.add(key);
                    uniqueDefaults.push(item);
                }
            });
            menuItems = uniqueDefaults;
        }

        // Render all views
        updateStats();
        renderRecentTasks();
        renderActivityFeed();
        renderDeadlines();
        renderTasksBoard();
        renderMessages();
        renderMenuCards();
    } catch (error) {
        console.error('Error loading data from Firebase:', error);
    }
}

async function deduplicateMenu() {
    console.log('Checking for duplicate menu items...');
    const currentItems = await fetchMenu();
    const seenNames = new Set();
    const duplicateIds = [];

    currentItems.forEach(item => {
        if (seenNames.has(item.name)) {
            duplicateIds.push(item.id);
        } else {
            seenNames.add(item.name);
        }
    });

    if (duplicateIds.length > 0) {
        console.log(`Deleting ${duplicateIds.length} duplicate items...`);
        await batchDeleteMenuItems(duplicateIds);
        console.log('✅ Deduplication complete');
    } else {
        console.log('No duplicates found');
    }
}

// Set up real-time listeners for live updates
function setupRealtimeListeners() {
    // Listen for task changes
    subscribeToTasks((updatedTasks) => {
        tasks = updatedTasks;
        updateStats();
        renderRecentTasks();
        renderDeadlines();
        renderTasksBoard();
        renderCalendar();
    });

    // Listen for message changes
    subscribeToMessages((updatedMessages) => {
        const hadMessages = messages.length;
        messages = updatedMessages;
        renderMessages();

        // Show notification badge if new message from other user
        if (updatedMessages.length > hadMessages) {
            const lastMsg = updatedMessages[updatedMessages.length - 1];
            if (lastMsg && lastMsg.sender !== currentRole) {
                showMessageNotification();
            }
        }
    });

    // Listen for activity changes
    subscribeToActivities((updatedActivities) => {
        activities = updatedActivities;
        renderActivityFeed();
    });

    // Listen for menu changes
    subscribeToMenu((updatedItems) => {
        // In-memory Deduplication for Realtime Updates
        if (updatedItems && updatedItems.length > 0) {
            const uniqueItems = [];
            const seenNames = new Set();
            updatedItems.forEach(item => {
                const nameKey = (item.name || '').trim().toLowerCase();
                const locationKey = (item.location || 'all').trim().toLowerCase();
                const uniqueKey = `${nameKey}_${locationKey}`;

                if (!seenNames.has(uniqueKey)) {
                    seenNames.add(uniqueKey);
                    uniqueItems.push(item);
                }
            });
            menuItems = uniqueItems;
        } else {
            menuItems = updatedItems;
        }
        renderMenuCards();
    });
}

// Show notification for new messages
function showMessageNotification() {
    const badge = document.getElementById('messageBadge');
    let count = parseInt(badge.textContent) || 0;
    count++;
    badge.textContent = count;
    badge.style.display = 'block';
}

// Logout function
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userRole');
    window.location.href = 'login.html';
}

// Toggle sidebar for mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

// Close sidebar when clicking a nav item (mobile)
function closeSidebarOnNav() {
    if (window.innerWidth <= 992) {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
    }
}

// Make toggleSidebar available globally
window.toggleSidebar = toggleSidebar;

// ===================================
// Role Display (No Switching)
// ===================================
function initRoleSwitcher() {
    // Role switching is disabled - role is set at login
    // Just display the current role indicator
    displayRoleIndicator();
}

function displayRoleIndicator() {
    const indicator = document.getElementById('roleIndicator');
    if (!indicator) return;

    const user = users[currentRole];
    const icon = (currentRole !== 'developer' && currentRole !== 'manager') ? 'briefcase' : 'code-2';

    indicator.innerHTML = `
        <div class="role-display">
            <span class="role-icon"><i data-lucide="${icon}"></i></span>
            <span class="role-name">${user.role}</span>
        </div>
    `;
    lucide.createIcons();
}

function switchRole(role) {
    // Role is fixed at login - just update UI for current role
    currentRole = role;

    // Update user profile display
    const user = users[role];
    const avatarEl = document.getElementById('userAvatar');
    const nameEl = document.getElementById('userName');

    if (avatarEl) avatarEl.textContent = user.avatar;
    if (nameEl) nameEl.textContent = user.name;

    // Update new task button text based on role
    const newTaskBtns = document.querySelectorAll('#newTaskBtn, #newTaskBtn2');
    newTaskBtns.forEach(btn => {
        btn.innerHTML = (currentRole !== 'developer' && currentRole !== 'manager') ? '<span>+</span> New Request' : '<span>+</span> Add Task';
    });

    // Display role indicator
    displayRoleIndicator();

    // Auto-set management location if user belongs to a specific branch
    if (user.location !== 'all') {
        selectedManagementLocation = user.location;
        // Also update any location selector UI if it exists
        document.querySelectorAll('.location-chip').forEach(chip => {
            chip.classList.toggle('active', chip.dataset.location === user.location);
        });
    }

    // Show/hide branch selection for professional roles (Developer/Manager)
    const branchSelector = document.getElementById('branchSelectorWrapper');
    if (branchSelector) {
        branchSelector.style.display = (user.location === 'all') ? 'block' : 'none';
    }

    // Hide/show Management Location Selection (Menu Page)
    const mgmtLocationArea = document.getElementById('locationSelectionArea');
    if (mgmtLocationArea) {
        mgmtLocationArea.style.display = (user.location === 'all') ? 'block' : 'none';
    }

    // Refresh views
    renderRecentTasks();
    renderTasksBoard();
    renderMessages();
    renderMenuCards();
}

// ===================================
// Branch Selection Logic
// ===================================
window.toggleBranchDropdown = function () {
    const dropdown = document.getElementById('branchDropdown');
    if (!dropdown) return;
    dropdown.classList.toggle('show');

    // Close when clicking outside
    const closeDropdown = (e) => {
        if (!e.target.closest('.branch-selector-wrapper')) {
            dropdown.classList.remove('show');
            document.removeEventListener('click', closeDropdown);
        }
    };

    if (dropdown.classList.contains('show')) {
        setTimeout(() => document.addEventListener('click', closeDropdown), 0);
    }
};

window.filterMenuByBranch = function (branch) {
    selectedBranch = branch;

    // Update UI active state in dropdown
    document.querySelectorAll('.branch-option').forEach(btn => {
        if (btn.dataset.branch === branch) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update bag icon glow or text if needed (optional)
    const branchBtn = document.getElementById('branchBtn');
    if (branchBtn) {
        if (branch === 'all') {
            branchBtn.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.4)';
        } else {
            branchBtn.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.6)';
        }
    }

    renderMenuCards();

    // Close dropdown
    const dropdown = document.getElementById('branchDropdown');
    if (dropdown) dropdown.classList.remove('show');
};

// ===================================
// Navigation
// ===================================
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const view = this.dataset.view;
            switchView(view);
        });
    });

    // View all links
    document.querySelectorAll('.link[data-view]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            switchView(this.dataset.view);
        });
    });
}

function switchView(view) {
    currentView = view;

    // Close sidebar on mobile when navigating
    closeSidebarOnNav();

    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.view === view);
    });

    // Update views
    document.querySelectorAll('.view').forEach(v => {
        v.classList.remove('active');
    });
    document.getElementById(view + 'View').classList.add('active');

    // Refresh calendar if switching to calendar view
    if (view === 'calendar') {
        renderCalendar();
    }

    // Clear message badge when viewing messages and scroll to latest
    if (view === 'messages') {
        const badge = document.getElementById('messageBadge');
        badge.textContent = '0';
        badge.style.display = 'none';

        // Scroll to the latest message
        setTimeout(() => {
            const messagesList = document.getElementById('messagesList');
            if (messagesList) {
                messagesList.scrollTop = messagesList.scrollHeight;
            }
        }, 100);
    }
}

// ===================================
// Statistics
// ===================================
function updateStats() {
    const pending = tasks.filter(t => t.status === 'pending').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const review = tasks.filter(t => t.status === 'review').length;
    const completed = tasks.filter(t => t.status === 'completed').length;

    document.getElementById('statPending').textContent = pending;
    document.getElementById('statProgress').textContent = inProgress;
    document.getElementById('statReview').textContent = review;
    document.getElementById('statCompleted').textContent = completed;

    document.getElementById('pendingCount').textContent = pending;
    document.getElementById('progressCount').textContent = inProgress;
}

// ===================================
// Recent Tasks
// ===================================
function renderRecentTasks() {
    const container = document.getElementById('recentTasksList');
    const recentTasks = tasks
        .filter(t => t.status !== 'completed')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    container.innerHTML = recentTasks.map(task => `
        <div class="task-item" onclick="openTaskDetail('${task.id}')">
            <div class="task-priority ${task.priority}"></div>
            <div class="task-info">
                <div class="task-title">${task.title}</div>
                <div class="task-meta">
                    <span><i data-lucide="folder"></i> ${categoryLabels[task.category]}</span>
                    <span><i data-lucide="calendar"></i> ${formatDate(task.deadline)}</span>
                </div>
            </div>
            <span class="task-status ${task.status}">${formatStatus(task.status)}</span>
        </div>
    `).join('');
    lucide.createIcons();
}

function formatStatus(status) {
    const labels = {
        'pending': 'Pending',
        'in-progress': 'In Progress',
        'review': 'Review',
        'completed': 'Done'
    };
    return labels[status] || status;
}

// ===================================
// Activity Feed
// ===================================
function renderActivityFeed() {
    const container = document.getElementById('activityList');

    container.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${getActivityIcon(activity.icon)}</div>
            <div class="activity-content">
                <div class="activity-text">${activity.text}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// Helper function to convert emoji icons to Lucide icons
function getActivityIcon(emoji) {
    const iconMap = {
        '✅': '<i data-lucide="check-circle-2"></i>',
        '💬': '<i data-lucide="message-circle"></i>',
        '🔄': '<i data-lucide="refresh-cw"></i>',
        '📝': '<i data-lucide="file-text"></i>',
        '⚡': '<i data-lucide="zap"></i>',
        '📅': '<i data-lucide="calendar"></i>',
        '📁': '<i data-lucide="folder"></i>'
    };
    return iconMap[emoji] || emoji;
}

// ===================================
// Deadlines
// ===================================
function renderDeadlines() {
    const container = document.getElementById('deadlineList');
    const upcoming = tasks
        .filter(t => t.status !== 'completed')
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .slice(0, 4);

    container.innerHTML = upcoming.map(task => {
        const date = new Date(task.deadline);
        return `
            <div class="deadline-item" onclick="openTaskDetail('${task.id}')">
                <div class="deadline-date">
                    <span class="deadline-day">${date.getDate()}</span>
                    <span class="deadline-month">${date.toLocaleDateString('en-US', { month: 'short' })}</span>
                </div>
                <div class="deadline-info">
                    <div class="deadline-title">${task.title}</div>
                    <div class="deadline-category">${categoryLabels[task.category]} • ${getDaysUntil(task.deadline)}</div>
                </div>
            </div>
        `;
    }).join('');
    lucide.createIcons();
}

// ===================================
// Tasks Board (Kanban)
// ===================================
function renderTasksBoard() {
    const container = document.getElementById('tasksBoard');
    const columns = [
        { id: 'pending', title: 'Pending', dot: 'pending' },
        { id: 'in-progress', title: 'In Progress', dot: 'in-progress' },
        { id: 'review', title: 'In Review', dot: 'review' },
        { id: 'completed', title: 'Completed', dot: 'completed' }
    ];

    // Get filter values
    const statusFilter = document.getElementById('statusFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;

    container.innerHTML = columns.map(col => {
        let columnTasks = tasks.filter(t => t.status === col.id);

        // Apply priority filter
        if (priorityFilter !== 'all') {
            columnTasks = columnTasks.filter(t => t.priority === priorityFilter);
        }

        // If status filter is set, only show that column
        if (statusFilter !== 'all' && statusFilter !== col.id) {
            return '';
        }

        return `
            <div class="task-column">
                <div class="column-header">
                    <div class="column-dot ${col.dot}"></div>
                    <span class="column-title">${col.title}</span>
                    <span class="column-count">${columnTasks.length}</span>
                </div>
                <div class="column-tasks">
                    ${columnTasks.map(task => `
                        <div class="board-task" onclick="openTaskDetail('${task.id}')">
                            <div class="board-task-header">
                                <div class="board-task-priority ${task.priority}"></div>
                                <div class="board-task-title">${task.title}</div>
                            </div>
                            <div class="board-task-category">${categoryLabels[task.category]}</div>
                            <div class="board-task-footer">
                                <span><i data-lucide="calendar"></i> ${formatDate(task.deadline)}</span>
                                <span><i data-lucide="message-circle"></i> ${task.comments ? task.comments.length : 0}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
    lucide.createIcons();
}

function initFilters() {
    document.getElementById('statusFilter').addEventListener('change', renderTasksBoard);
    document.getElementById('priorityFilter').addEventListener('change', renderTasksBoard);
}

// ===================================
// Calendar
// ===================================
function initCalendar() {
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    renderCalendar();
}

function renderCalendar() {
    const container = document.getElementById('calendarGrid');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    document.getElementById('currentMonth').textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    let html = dayNames.map(day => `<div class="calendar-header">${day}</div>`).join('');

    // Previous month days
    const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
        html += `<div class="calendar-day other-month"><span class="day-number">${prevLastDay - i}</span></div>`;
    }

    // Current month days
    for (let day = 1; day <= totalDays; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayTasks = tasks.filter(t => t.deadline === dateStr);
        const isToday = dateStr === todayStr;

        html += `
            <div class="calendar-day ${isToday ? 'today' : ''}">
                <span class="day-number">${day}</span>
                <div class="day-tasks">
                    ${dayTasks.slice(0, 3).map(t => `
                        <div class="day-task ${t.priority}" onclick="openTaskDetail('${t.id}')">${t.title}</div>
                    `).join('')}
                    ${dayTasks.length > 3 ? `<div class="day-task">+${dayTasks.length - 3} more</div>` : ''}
                </div>
            </div>
        `;
    }

    // Next month days
    const remainingDays = 42 - (startingDay + totalDays);
    for (let i = 1; i <= remainingDays; i++) {
        html += `<div class="calendar-day other-month"><span class="day-number">${i}</span></div>`;
    }

    container.innerHTML = html;
}

// ===================================
// Messages
// ===================================
function initMessages() {
    const sendBtn = document.getElementById('sendMessageBtn');
    const input = document.getElementById('messageInput');

    sendBtn.addEventListener('click', sendMessageHandler);
    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') sendMessageHandler();
    });
}

function renderMessages() {
    const container = document.getElementById('messagesList');

    container.innerHTML = messages.map(msg => {
        const isSent = msg.sender === currentRole;
        const user = users[msg.sender];

        return `
            <div class="message ${isSent ? 'sent' : 'received'}">
                <div class="message-avatar">${user.avatar}</div>
                <div class="message-content">
                    <div class="message-sender">${user.name}</div>
                    <div class="message-text">${msg.text}</div>
                    <div class="message-time">${formatTime(msg.time)}</div>
                </div>
            </div>
        `;
    }).join('');

    container.scrollTop = container.scrollHeight;
    lucide.createIcons();
}

async function sendMessageHandler() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();

    if (!text) return;

    const now = new Date();
    const timeStr = now.toISOString().slice(0, 16).replace('T', ' ');

    const newMessage = {
        sender: currentRole,
        text: text,
        time: timeStr
    };

    // Add to Firebase
    await addMessage(newMessage);

    input.value = '';
}

function formatTime(timeStr) {
    const date = new Date(timeStr.replace(' ', 'T'));
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

// ===================================
// Modals
// ===================================
function initModals() {
    const taskModal = document.getElementById('taskModal');
    const taskDetailModal = document.getElementById('taskDetailModal');

    // Open new task modal
    document.getElementById('newTaskBtn').addEventListener('click', () => openModal(taskModal));
    document.getElementById('newTaskBtn2').addEventListener('click', () => openModal(taskModal));

    // Close modals
    document.getElementById('closeModal').addEventListener('click', () => closeModal(taskModal));
    document.getElementById('cancelTask').addEventListener('click', () => closeModal(taskModal));
    document.getElementById('closeDetailModal').addEventListener('click', () => closeModal(taskDetailModal));

    // Close on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function () {
            closeModal(this.closest('.modal'));
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => closeModal(modal));
        }
    });
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===================================
// Task Form
// ===================================
function initTaskForm() {
    const form = document.getElementById('taskForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        createTaskHandler();
    });
}

async function createTaskHandler() {
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const category = document.getElementById('taskCategory').value;
    const priority = document.getElementById('taskPriority').value;
    const deadline = document.getElementById('taskDeadline').value;

    if (!title || !description || !deadline) return;

    const newTask = {
        title,
        description,
        category,
        priority,
        status: 'pending',
        deadline,
        createdAt: new Date().toISOString().split('T')[0],
        createdBy: currentRole,
        comments: []
    };

    // Add to Firebase
    await addTask(newTask);

    // Add activity
    const activityData = {
        icon: '📝',
        text: `<strong>${users[currentRole].name}</strong> created new task: ${title}`,
        time: 'Just now'
    };
    await addActivity(activityData);

    // Reset form and close modal
    document.getElementById('taskForm').reset();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('taskDeadline').valueAsDate = tomorrow;

    closeModal(document.getElementById('taskModal'));
}

// ===================================
// Task Detail
// ===================================
window.openTaskDetail = function (taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const modal = document.getElementById('taskDetailModal');
    const content = document.getElementById('taskDetailContent');

    document.getElementById('detailTitle').textContent = task.title;

    content.innerHTML = `
        <div class="detail-section">
            <div class="detail-label">Description</div>
            <div class="detail-value">${task.description}</div>
        </div>
        
        <div class="detail-section">
            <div class="detail-badges">
                <span class="detail-badge priority-${task.priority}">${task.priority.toUpperCase()}</span>
                <span class="detail-badge" style="background: rgba(99, 102, 241, 0.15); color: var(--accent-primary);">
                    ${categoryLabels[task.category]}
                </span>
            </div>
        </div>
        
        <div class="detail-section">
            <div class="detail-label">Status</div>
            <select class="status-select" onchange="updateTaskStatusHandler('${task.id}', this.value)" ${currentRole !== 'developer' && task.status !== 'review' ? 'disabled' : ''}>
                <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                <option value="review" ${task.status === 'review' ? 'selected' : ''}>In Review</option>
                <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
            </select>
        </div>
        
        <div class="detail-section">
            <div class="detail-label">Deadline</div>
            <div class="detail-value"><i data-lucide="calendar" class="inline-icon"></i> ${formatDate(task.deadline)} (${getDaysUntil(task.deadline)})</div>
        </div>
        
        <div class="detail-section">
            <div class="detail-label">Created</div>
            <div class="detail-value">By ${users[task.createdBy].name} on ${formatDate(task.createdAt)}</div>
        </div>
        
        <div class="detail-section">
            <div class="detail-label">Comments (${task.comments ? task.comments.length : 0})</div>
            <div class="comments-list">
                ${task.comments ? task.comments.map(c => `
                    <div class="comment">
                        <div class="comment-avatar">${c.author[0]}</div>
                        <div class="comment-content">
                            <div class="comment-header">
                                <span class="comment-author">${c.author}</span>
                                <span class="comment-time">${formatTime(c.time)}</span>
                            </div>
                            <div class="comment-text">${c.text}</div>
                        </div>
                    </div>
                `).join('') : '<p style="color: var(--text-muted);">No comments yet</p>'}
            </div>
            <div class="comment-form">
                <input type="text" class="comment-input" id="commentInput" placeholder="Add a comment...">
                <button class="btn btn-primary" onclick="addCommentHandler('${task.id}')">Send</button>
            </div>
        </div>
    `;

    openModal(modal);
    lucide.createIcons();
}

window.updateTaskStatusHandler = async function (taskId, newStatus) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    // Update in Firebase
    await updateTask(taskId, { status: newStatus });

    // Add activity
    const activityData = {
        icon: newStatus === 'completed' ? '✅' : '🔄',
        text: `<strong>${users[currentRole].name}</strong> moved task to ${formatStatus(newStatus)}: ${task.title}`,
        time: 'Just now'
    };
    await addActivity(activityData);
}

window.addCommentHandler = async function (taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const input = document.getElementById('commentInput');
    const text = input.value.trim();
    if (!text) return;

    const now = new Date();
    const timeStr = now.toISOString().slice(0, 16).replace('T', ' ');

    const newComment = {
        author: users[currentRole].name,
        text,
        time: timeStr
    };

    // Update task comments in Firebase
    const updatedComments = [...(task.comments || []), newComment];
    await updateTask(taskId, { comments: updatedComments });

    // Add activity
    const activityData = {
        icon: '💬',
        text: `<strong>${users[currentRole].name}</strong> commented on: ${task.title}`,
        time: 'Just now'
    };
    await addActivity(activityData);

    // Refresh task detail
    input.value = '';
    openTaskDetail(taskId);
}

// Make logout available globally
window.logout = logout;

// ===================================
// Menu Management
// ===================================

async function initMenuForm() {
    const form = document.getElementById('menuItemForm');
    if (!form) return;

    // ONLY show location selection for global managers/developers
    const locationGroup = document.getElementById('locationGroup');
    if (locationGroup) {
        locationGroup.style.display = (users[currentRole].location === 'all') ? 'block' : 'none';
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('menuName').value.trim();
        const price = document.getElementById('menuPrice').value;
        const mini = document.getElementById('menuMiniPrice').value;
        const category = document.getElementById('menuCategory').value;
        const locationInput = document.getElementById('menuLocation').value;
        const image = document.getElementById('menuImage').value.trim();
        const available = document.getElementById('menuAvailable').checked;

        if (!name || !price) return;

        // Enforce location: if developer, use input; if others, use their fixed location
        const user = users[currentRole];
        const assignedLocation = user.location === 'all' ? locationInput : user.location;

        const newItem = {
            name,
            price: parseFloat(price),
            mini: mini ? parseFloat(mini) : null,
            category,
            location: assignedLocation,
            image: image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww',
            available,
            updatedBy: currentRole,
            updatedAt: new Date().toISOString()
        };

        await addMenuItem(newItem);

        // Add activity
        await addActivity({
            icon: '🍔',
            text: `<strong>${user.name}</strong> added menu item: ${name} (${assignedLocation})`,
            time: 'Just now'
        });

        // Reset and close
        form.reset();
        document.getElementById('menuAvailable').checked = true;
        closeModal(document.getElementById('menuItemModal'));
    });
}

// Call this in initializeApp
// (Since we can't easily edit initializeApp again without context loss, we'll append a call here)
document.addEventListener('DOMContentLoaded', () => {
    initMenuForm();
});


// Menu Filtering
let selectedCategory = 'all';
let selectedBranch = 'all';
let selectedManagementLocation = ''; // New: For menu management
let searchQuery = '';

window.setSelectedManagementLocation = function (location) {
    selectedManagementLocation = location;
    selectedBranch = location; // Synchronize both filter variables

    // Update UI
    document.querySelectorAll('.location-chip').forEach(chip => {
        if (chip.dataset.location === location) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });

    renderMenuCards();
};

window.handleMenuSearch = function (query) {
    searchQuery = query.toLowerCase().trim();
    renderMenuCards();
};

// ===================================
// Drag to Scroll Logic for Menu Filters
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.menu-filters');
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        slider.scrollLeft = scrollLeft - walk;
    });

    // Set initial cursor
    slider.style.cursor = 'grab';
});

window.filterMenuByCategory = function (category) {
    selectedCategory = category;

    // Update UI active state
    document.querySelectorAll('.menu-filter').forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Reset branch filter when changing category if needed, 
    // but usually we want to keep it. Let's just render.
    renderMenuCards();
};

window.filterMenuByBranch = function (branch) {
    selectedBranch = branch;
    selectedManagementLocation = branch;

    // Update UI active state
    document.querySelectorAll('.location-chip').forEach(chip => {
        if (chip.dataset.location === branch) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });

    renderMenuCards();
};



function renderMenuCards() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    if (!selectedManagementLocation) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 40px; background: rgba(30, 41, 59, 0.3); border-radius: 20px; border: 2px dashed rgba(255, 255, 255, 0.05);">
                <div style="margin-bottom: 20px; color: #6366f1;">
                    <i data-lucide="map-pin" style="width: 48px; height: 48px; margin: 0 auto;"></i>
                </div>
                <h3 style="font-size: 1.25rem; font-weight: 700; color: white; margin-bottom: 10px;">Select a Location First</h3>
                <p style="color: var(--text-muted); max-width: 400px; margin: 0 auto;">Please select one of the locations above to view and manage menu items for that specific branch.</p>
            </div>
        `;
        requestAnimationFrame(() => {
            lucide.createIcons({ root: grid });
        });
        return;
    }

    const userLocation = users[currentRole].location;
    const filteredItems = menuItems.filter(item => {
        const itemLocation = item.location || 'all';
        // Strict Isolation: 
        // 1. Medina/Rooftop users see 'essaouira' or 'all'
        // 2. Casablanca users see 'casablanca' or 'all'
        // 3. User with 'all' location sees everything
        const matchesLocation = userLocation === 'all' ||
            itemLocation === 'all' ||
            itemLocation === userLocation ||
            (itemLocation === 'essaouira' && (userLocation === 'medina' || userLocation === 'rooftop'));

        const matchesBranch = selectedBranch === 'all' ||
            itemLocation === 'all' ||
            itemLocation === selectedBranch ||
            (itemLocation === 'essaouira' && (selectedBranch === 'medina' || selectedBranch === 'rooftop'));

        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const name = (item.name || '').toLowerCase();
        const matchesSearch = name.includes(searchQuery);
        return matchesLocation && matchesBranch && matchesCategory && matchesSearch;
    });

    if (filteredItems.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">No items found.</div>`;
        return;
    }

    const fragment = document.createDocumentFragment();
    filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.id = `card-${item.id}`;

        const locKey = selectedManagementLocation.charAt(0).toUpperCase() + selectedManagementLocation.slice(1);
        const isAvailable = item['available' + locKey] !== false;

        card.innerHTML = `
            <div class="menu-card-body" style="padding: 24px; display: flex; flex-direction: column; height: 100%; justify-content: space-between; background: #1e1e2d; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; transition: all 0.2s ease;">
                <div>
                    <h3 class="menu-card-title view-mode" style="font-size: 1.1rem; font-weight: 700; color: #ffffff; margin-bottom: 8px;">${item.name}</h3>
                    <input type="text" class="edit-mode form-input" id="edit-name-${item.id}" value="${item.name}" style="display:none; width: 100%; background: #13131f; border: 1px solid #2f2f3d; color: white; padding: 8px; border-radius: 6px; margin-bottom: 8px;">

                    <div class="menu-card-price" style="margin-bottom: 12px;">
                        <span class="view-mode" style="font-size: 1.1rem; font-weight: 700; color: #818cf8;">
                            ${item.price} DH 
                            ${item.mini ? `<span style="font-size: 0.85em; color: #a5b4fc; font-weight: 500; margin-left: 4px;">(Mini: ${item.mini} DH)</span>` : ''}
                        </span>
                        <div class="edit-mode" style="display:none; gap: 8px; width: 100%;">
                            <div style="flex: 1">
                                <label style="display: block; font-size: 0.7rem; color: #818cf8; margin-bottom: 4px; font-weight: 600;">Price</label>
                                <input type="number" class="form-input" id="edit-price-${item.id}" value="${item.price}" style="width: 100%; background: #1b1b29; border: 1px solid #2f2f3d; color: white; padding: 8px; border-radius: 6px; font-size: 0.9rem;">
                            </div>
                            <div style="flex: 1">
                                <label style="display: block; font-size: 0.7rem; color: #a5b4fc; margin-bottom: 4px; font-weight: 600;">Mini (Opt)</label>
                                <input type="number" class="form-input" id="edit-mini-${item.id}" value="${item.mini || ''}" style="width: 100%; background: #1b1b29; border: 1px solid #2f2f3d; color: white; padding: 8px; border-radius: 6px; font-size: 0.9rem;">
                            </div>
                        </div>
                    </div>

                    <div class="menu-card-category" style="display: inline-block; background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 6px 12px; border-radius: 8px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 24px;">
                        ${item.category}
                    </div>
                </div>

                <div class="menu-card-footer" style="padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                        <span style="font-size: 0.85rem; color: #6a6a7a; font-weight: 500;">Available in <span style="color: #818cf8; text-transform: capitalize;">${selectedManagementLocation}</span></span>
                        <label class="switch">
                            <input type="checkbox" ${isAvailable ? 'checked' : ''} onchange="toggleLocationAvailability('${item.id}', '${selectedManagementLocation}', this.checked)">
                            <span class="slider"></span>
                            <span class="slider-knob"></span>
                        </label>
                    </div>

                    <div class="menu-card-actions" style="display: flex; align-items: center; gap: 8px;">
                        <div class="action-btn edit-btn view-mode" style="color: #6a6a7a; cursor: pointer;" title="Edit">
                            <i data-lucide="pencil" style="width: 18px; height: 18px;"></i>
                        </div>
                        <div class="action-btn save-btn edit-mode" style="display: none; color: #10b981; cursor: pointer;" title="Save">
                            <i data-lucide="check" style="width: 20px; height: 20px;"></i>
                        </div>
                        <div class="action-btn cancel-btn edit-mode" style="display: none; color: #ef4444; cursor: pointer;" title="Cancel">
                            <i data-lucide="x" style="width: 20px; height: 20px;"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const editBtn = card.querySelector('.edit-btn');
        const saveBtn = card.querySelector('.save-btn');
        const cancelBtn = card.querySelector('.cancel-btn');

        editBtn.addEventListener('click', () => {
            card.classList.add('editing');
            card.querySelectorAll('.view-mode').forEach(el => el.style.display = 'none');
            card.querySelectorAll('.edit-mode').forEach(el => el.style.display = 'block');
            card.querySelector('.menu-card-price .edit-mode').style.display = 'flex';
        });

        cancelBtn.addEventListener('click', () => {
            renderMenuCards();
        });

        saveBtn.addEventListener('click', async () => {
            const name = card.querySelector(`#edit-name-${item.id}`).value.trim();
            const price = parseFloat(card.querySelector(`#edit-price-${item.id}`).value);
            const mini = card.querySelector(`#edit-mini-${item.id}`).value ? parseFloat(card.querySelector(`#edit-mini-${item.id}`).value) : null;
            if (!name || isNaN(price)) return;
            try {
                await updateMenuItem(item.id, { name, price, mini });
                await addActivity({ icon: '📝', text: `<strong>${users[currentRole].name}</strong> updated item: ${name}`, time: 'Just now' });
            } catch (err) {
                console.error('Failed to update item:', err);
                alert('Failed to save changes.');
            }
        });

        fragment.appendChild(card);
    });

    grid.innerHTML = '';
    grid.appendChild(fragment);
    lucide.createIcons({ root: grid });
}


window.toggleLocationAvailability = async function (id, location, isAvailable) {
    const field = 'available' + location.charAt(0).toUpperCase() + location.slice(1);
    await updateMenuItem(id, { [field]: isAvailable });

    // Check local update for immediate feedback (optional, since realtime listener will handle it)
    const item = menuItems.find(i => i.id === id);
    if (item) {
        item[field] = isAvailable;
    }
}

async function seedMenu() {
    const seedItems = [
        // ESSAOUIRA BURGERS
        { name: "Crispy Fish Burger", price: 70, category: "burgers", location: "essaouira", available: true, mini: 55, desc: "Crispy fish filet, lettuce, coleslaw, chipotle, salsa verde, tartar & cornichons", note: "Best Seller - Includes 1 side for free" },
        { name: "Double Crispy Fish Burger", price: 110, category: "burgers", location: "essaouira", available: true, desc: "2 crispy fish filets, lettuce, coleslaw, chipotle, salsa verde, tartar & cornichons", note: "Includes 1 side for free" },
        { name: "Sardine Burger", price: 60, category: "burgers", location: "essaouira", available: true, mini: 45, desc: "2 grilled hashed sardine patties, cheese, lettuce, tomatoes & caramelized onions", note: "Signature - Includes 1 side for free" },
        { name: "Tofu Burger", price: 75, category: "burgers", location: "essaouira", available: true, mini: 60, desc: "Crispy tofu, cheese, lettuce, tomatoes, salsa verde and chipotle sauce", veg: true, note: "Vegetarian - Includes 1 side for free" },
        { name: "Calamari Burger", price: 75, category: "burgers", location: "essaouira", available: true, mini: 60, desc: "Crispy calamari rings, lettuce, cornichons & tartar", note: "Includes 1 side for free" },
        { name: "Octopus Burger", price: 75, category: "burgers", location: "essaouira", available: true, mini: 60, desc: "Crispy chopped octopus legs, lettuce, tomatoes, cornichons & salsa verde", note: "Includes 1 side for free" },
        { name: "Burger of the Month", price: 70, category: "burgers", location: "essaouira", available: true, mini: 55, desc: "Monthly burger inspired by a local artist. Ask your waiter for more details", note: "Limited Edition - Includes 1 side for free" },

        // CASABLANCA BURGERS
        { name: "Crispy Fishburger", price: 65, category: "burgers", location: "casablanca", available: true, mini: 50, desc: "Crispy white fish filet, chipotle, salsa verde & tartar, lettuce, pickles & coleslaw", note: "Best Seller - Includes 1 side for free" },
        { name: "Double Crispy Fishburger", price: 100, category: "burgers", location: "casablanca", available: true, desc: "2 crispy white fish filets, chipotle, salsa verde & tartar, lettuce, pickles & coleslaw", note: "Includes 1 side for free" },
        { name: "Sardine Burger", price: 55, category: "burgers", location: "casablanca", available: true, mini: 40, desc: "2 grilled hashed sardine patties, cheese, lettuce, tomatoes & caramelized onions", note: "Signature - Includes 1 side for free" },
        { name: "Eggplant Burger", price: 60, category: "burgers", location: "casablanca", available: true, mini: 45, desc: "Crispy eggplant patty, cheese, lettuce, tomatoes, salsa verde and chipotle sauce", veg: true, note: "Vegetarian - Includes 1 side for free" },
        { name: "Calamari* Burger", price: 70, category: "burgers", location: "casablanca", available: true, mini: 55, desc: "Crispy calamari rings, lettuce, cornichons & tartar", note: "Includes 1 side for free" },
        { name: "Octopus Burger", price: 70, category: "burgers", location: "casablanca", available: true, mini: 55, desc: "Crispy chopped octopus legs, lettuce, tomatoes, cornichon & tartar", note: "Includes 1 side for free" },
        { name: "Burger of the Month", price: 70, category: "burgers", location: "casablanca", available: true, mini: 50, desc: "Monthly burger inspired by a local artist. Ask your waiter for more details", note: "Limited Edition - Includes 1 side for free" },

        // ESSAOUIRA SIDES
        { name: "Potato Fries", price: 20, category: "sides", location: "essaouira", available: true },
        { name: "Onion Rings", price: 25, category: "sides", location: "essaouira", available: true },
        { name: "Guacamole", price: 20, category: "sides", location: "essaouira", available: true },
        { name: "Coleslaw", price: 20, category: "sides", location: "essaouira", available: true },

        // CASABLANCA SIDES
        { name: "Potato Chips", price: 20, category: "sides", location: "casablanca", available: true },
        { name: "Onion Rings", price: 20, category: "sides", location: "casablanca", available: true },
        { name: "Guacamole", price: 20, category: "sides", location: "casablanca", available: true },
        { name: "Coleslaw", price: 20, category: "sides", location: "casablanca", available: true },

        // ESSAOUIRA TAPAS
        { name: "Summer Salad", price: 35, category: "tapas", location: "essaouira", available: true, desc: "Avocados, lettuce, tomatoes, onions, cucumbers & vinaigrette" },
        { name: "Fancy Sardines", price: 20, category: "tapas", location: "essaouira", available: true, desc: "3 crispy fresh sardines, stuffed with sharmoula" },
        { name: "Seafood Basket", price: 60, category: "tapas", location: "essaouira", available: true, desc: "Fried seafood mix & potato chips" },
        { name: "Nachos", price: 45, category: "tapas", location: "essaouira", available: true, desc: "Golden tortilla chips, guacamole, pico de gallo, chipotle sauce and salsa verde" },
        { name: "Msemmen Fish Tacos", price: 35, category: "tapas", location: "essaouira", available: true, desc: "2 Moroccan tortilla, crispy white fish, veggies, salsa verde and chipotle sauce" },
        { name: "Sardine Croquettes", price: 30, category: "tapas", location: "essaouira", available: true, desc: "3 crispy sardine balls, cheese stuffed" },
        { name: "Calamari Rings", price: 40, category: "tapas", location: "essaouira", available: true, desc: "5 crispy rings & tartar sauce" },
        { name: "Fish Nuggets", price: 30, category: "tapas", location: "essaouira", available: true, desc: "3 crispy fish nuggets & tartar sauce" },
        { name: "Mozzarella Sticks", price: 30, category: "tapas", location: "essaouira", available: true, desc: "5 sticks & marinara sauce" },
        { name: "Fried Octopus", price: 40, category: "tapas", location: "essaouira", available: true, desc: "Crispy octopus slices" },

        // CASABLANCA TAPAS
        { name: "Summer Salad", price: 35, category: "tapas", location: "casablanca", available: true, desc: "Avocados, lettuce, tomatoes, onions, cucumbers & vinaigrette" },
        { name: "Msemmen Fish Tacos", price: 35, category: "tapas", location: "casablanca", available: true, desc: "2 Moroccan tortilla, crispy white fish, veggies, salsa verde and chipotle sauce" },
        { name: "Sardine Croquettes", price: 30, category: "tapas", location: "casablanca", available: true, desc: "3 crispy sardine balls, cheese stuffed" },
        { name: "Aubergine Crunchies", price: 30, category: "tapas", location: "casablanca", available: true, desc: "3 crispy golden eggplant balls" },
        { name: "Fancy Sardines", price: 30, category: "tapas", location: "casablanca", available: true, desc: "3 crispy fresh sardines, stuffed with sharmoula" },
        { name: "Seafood Basket", price: 60, category: "tapas", location: "casablanca", available: true, desc: "Fried seafood mix & potato chips" },
        { name: "Fish Nuggets", price: 30, category: "tapas", location: "casablanca", available: true, desc: "3 crispy fish nuggets & tartar sauce" },
        { name: "Nachos", price: 50, category: "tapas", location: "casablanca", available: true, desc: "Golden tortilla chips, guacamole, pico de gallo, chipotle sauce and salsa verde" },
        { name: "Mozzarella Sticks", price: 30, category: "tapas", location: "casablanca", available: true, desc: "5 sticks & marinara sauce" },
        { name: "Fried Octopus", price: 40, category: "tapas", location: "casablanca", available: true, desc: "Crispy octopus slices" },
        { name: "Calamari* Rings", price: 40, category: "tapas", location: "casablanca", available: true, desc: "5 crispy rings & tartar sauce" },

        // CASABLANCA GLOBE (Was missing!)
        { name: "Fish & Chips", price: 70, category: "globe", location: "casablanca", available: true, desc: "Crispy fish fillets, potato chips, coleslaw & tartar" },
        { name: "Fish Burrito", price: 60, category: "globe", location: "casablanca", available: true, desc: "Crispy white fish, guacamole, rice, lettuce, salsa verde, coleslaw & chipotle sauce" },
        { name: "Po' Boy Sandwich", price: 50, category: "globe", location: "casablanca", available: true, desc: "Crispy white fish, lettuce, tomatoes & tartar" },
        { name: "Calamari Sandwich", price: 50, category: "globe", location: "casablanca", available: true, desc: "Crispy calamari rings, lettuce, cornichons & tartar" },
        { name: "Octopus Sandwich", price: 50, category: "globe", location: "casablanca", available: true, desc: "Marinated octopus, marinara, pico de gallo & chipotle sauce" },

        // SHARED / ALL
        { name: "Cinnabun Crumble Topped Icecream", price: 35, category: "desserts", location: "all", available: true },
        { name: "Ice Cream Cookie-Burger", price: 40, category: "desserts", location: "all", available: true },
        { name: "2 Chocolate Chip Cookies", price: 20, category: "desserts", location: "all", available: true },
        { name: "Soda", price: 15, category: "drinks", location: "all", available: true },
        { name: "Still Water", price: 10, category: "drinks", location: "all", available: true },
        { name: "Sparkling Water", price: 15, category: "drinks", location: "all", available: true },
        { name: "Ginger Mint Lemonade", price: 15, category: "drinks", location: "casablanca", available: true }, // Casablanca price override
        { name: "Ginger Mint Lemonade ", price: 20, category: "drinks", location: "essaouira", available: true }, // Essaouira price
        { name: "Espresso", price: 15, category: "drinks", location: "casablanca", available: true }, // Casablanca Price
        { name: "Espresso ", price: 20, category: "drinks", location: "essaouira", available: true }, // Essaouira Price
        { name: "Americano", price: 20, category: "drinks", location: "all", available: true },
        { name: "Iced Coffee", price: 25, category: "drinks", location: "all", available: true },
        { name: "Hibiscus Tea", price: 15, category: "drinks", location: "all", available: true }
    ];

    console.log('Seeding menu with branch assignments...');

    // Upload each item
    for (const item of seedItems) {
        // Initial state matches UI expectation
        item.updatedBy = 'system';
        item.updatedAt = new Date().toISOString();

        await addMenuItem(item);
    }

    console.log(`✅ Menu seeded(${seedItems.length} items)`);
}

