// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Login form validation
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // In a real app, you would send this to your server
    console.log('Login attempt:', { email, password });
    
    // Redirect based on role (demo purposes)
    if (email === 'currentemail') {
        window.location.href = 'admin_dashboard.html';
    } else {
        window.location.href = 'dashboard.html';
    }
});

// File upload preview
document.getElementById('fileInput')?.addEventListener('change', function() {
    const fileName = document.getElementById('fileName');
    if (this.files.length > 0) {
        fileName.textContent = this.files[0].name;
    } else {
        fileName.textContent = 'No file chosen';
    }
});

// Notification dropdown toggle
document.getElementById('notificationBtn')?.addEventListener('click', function() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('hidden');
});

// Tab switching in dashboard
const tabs = document.querySelectorAll('.dashboard-tab');
tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('bg-blue-600', 'text-white'));
        tabs.forEach(t => t.classList.add('text-gray-600', 'hover:bg-gray-100'));
        
        // Add active class to clicked tab
        this.classList.remove('text-gray-600', 'hover:bg-gray-100');
        this.classList.add('bg-blue-600', 'text-white');
        
        // Hide all tab contents
        const contents = document.querySelectorAll('.tab-content');
        contents.forEach(c => c.classList.add('hidden'));
        
        // Show selected tab content
        const target = this.getAttribute('data-target');
        document.getElementById(target).classList.remove('hidden');
    });
});

// Initialize first tab as active
if (tabs.length > 0) {
    tabs[0].click();
}

// Modal toggle
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.toggle('hidden');
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.add('hidden');
    }
});

// File forwarding form
document.getElementById('forwardForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const recipient = document.getElementById('recipient').value;
    const message = document.getElementById('message').value;
    
    // In a real app, you would send this to your server
    console.log('Forwarding file to:', { recipient, message });
    
    // Show success message
    alert('File forwarded successfully!');
    window.location.href = 'dashboard.html';
});

// Mobile menu toggle
document.getElementById('mobile-menu-button')?.addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('animate-fade-in');
});

// File upload preview with validation
document.getElementById('fileInput')?.addEventListener('change', function() {
    const fileName = document.getElementById('fileName');
    const submitBtn = document.querySelector('#fileForm button[type="submit"]');
    
    if (this.files.length > 0) {
        const file = this.files[0];
        const fileSizeMB = file.size / 1024 / 1024;
        const allowedTypes = ['application/pdf', 'application/msword', 
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                            'application/vnd.ms-excel', 
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                            'application/vnd.ms-powerpoint',
                            'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
        
        if (fileSizeMB > 50) {
            fileName.textContent = 'File size exceeds 50MB limit';
            fileName.classList.add('text-red-500');
            submitBtn.disabled = true;
            return;
        }
        
        if (!allowedTypes.includes(file.type)) {
            fileName.textContent = 'Invalid file type';
            fileName.classList.add('text-red-500');
            submitBtn.disabled = true;
            return;
        }
        
        fileName.textContent = `${file.name} (${fileSizeMB.toFixed(2)} MB)`;
        fileName.classList.remove('text-red-500');
        submitBtn.disabled = false;
    } else {
        fileName.textContent = 'No file chosen';
        fileName.classList.remove('text-red-500');
        submitBtn.disabled = true;
    }
});

// Notification dropdown toggle
document.getElementById('notificationBtn')?.addEventListener('click', function() {
    const dropdown = document.getElementById('notificationDropdown');
    dropdown.classList.toggle('hidden');
    
    // Mark notifications as read when dropdown is opened
    if (!dropdown.classList.contains('hidden')) {
        document.querySelectorAll('.notification-badge').forEach(badge => {
            badge.classList.add('hidden');
        });
    }
});

// Tab switching in dashboard
// (Already declared above, so just add event listeners if needed)
document.querySelectorAll('.dashboard-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs
        document.querySelectorAll('.dashboard-tab').forEach(t => {
            t.classList.remove('bg-blue-600', 'text-white');
            t.classList.add('text-gray-600', 'hover:bg-gray-100');
        });
        
        // Add active class to clicked tab
        this.classList.remove('text-gray-600', 'hover:bg-gray-100');
        this.classList.add('bg-blue-600', 'text-white');
        
        // Hide all tab contents
        const contents = document.querySelectorAll('.tab-content');
        contents.forEach(c => c.classList.add('hidden'));
        
        // Show selected tab content
        const target = this.getAttribute('data-target');
        document.getElementById(target)?.classList.remove('hidden');
    });
});

// Initialize first tab as active
const tabsInit = document.querySelectorAll('.dashboard-tab');
if (tabsInit.length > 0) {
    tabsInit[0].click();
}

// Modal toggle functionality
function toggleModal(modalId, show = true) {
    const modal = document.getElementById(modalId);
    if (show) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    } else {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
}

// Close modal when clicking outside or on close button
document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this || e.target.classList.contains('modal-close')) {
            toggleModal(this.id, false);
        }
    });
});

// File table sorting functionality
document.querySelectorAll('.sortable th').forEach(header => {
    header.addEventListener('click', function() {
        const table = this.closest('table');
        const headerIndex = Array.prototype.indexOf.call(this.parentElement.children, this);
        const rows = Array.from(table.querySelectorAll('tbody tr'));
        const isAscending = !this.classList.contains('asc');
        
        // Clear previous sort indicators
        table.querySelectorAll('th').forEach(th => {
            th.classList.remove('asc', 'desc');
        });
        
        // Set new sort indicator
        this.classList.add(isAscending ? 'asc' : 'desc');
        
        rows.sort((a, b) => {
            const aText = a.children[headerIndex].textContent.trim();
            const bText = b.children[headerIndex].textContent.trim();
            
            if (!isNaN(aText)) {
                return isAscending ? aText - bText : bText - aText;
            } else {
                return isAscending 
                    ? aText.localeCompare(bText)
                    : bText.localeCompare(aText);
            }
        });
        });
        
        // Re-append rows in new order
        rows.forEach(row => table.querySelector('tbody').appendChild(row));
    });

// Initialize tooltips
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(el => {
        el.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'absolute z-10 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap';
            tooltip.textContent = this.getAttribute('data-tooltip');
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = `${rect.top - 30}px`;
            tooltip.style.left = `${rect.left + rect.width/2}px`;
            tooltip.style.transform = 'translateX(-50%)';
            
            tooltip.id = 'current-tooltip';
            document.body.appendChild(tooltip);
        });
        
        el.addEventListener('mouseleave', function() {
            const tooltip = document.getElementById('current-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTooltips();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

// File preview functionality
function previewFile(fileId) {
    const modal = document.getElementById('filePreviewModal');
    const iframe = document.getElementById('filePreviewFrame');
    
    // In a real app, you would get the file URL from your server
    const fileUrl = `/files/preview/${fileId}`;
    
    iframe.src = fileUrl;
    toggleModal('filePreviewModal');
}

// File download functionality
function downloadFile(fileId, fileName) {
    // In a real app, you would initiate a download from your server
    console.log(`Downloading file ${fileId}: ${fileName}`);
    window.open(`/files/download/${fileId}`, '_blank');
}

// File tracking history
function showFileHistory(fileId) {
    const modal = document.getElementById('fileHistoryModal');
    const historyContent = document.getElementById('fileHistoryContent');
    
    // In a real app, you would fetch the history from your server
    fetch(`/api/files/${fileId}/history`)
        .then(response => response.json())
        .then(data => {
            historyContent.innerHTML = data.map(entry => `
                <div class="py-2 border-b border-gray-200">
                    <div class="flex justify-between">
                        <span class="font-medium">${entry.action}</span>
                        <span class="text-sm text-gray-500">${new Date(entry.timestamp).toLocaleString()}</span>
                    </div>
                    <div class="text-sm text-gray-600">${entry.user}</div>
                    ${entry.comment ? `<div class="text-sm text-gray-500 mt-1">${entry.comment}</div>` : ''}
                </div>
            `).join('');
            
            toggleModal('fileHistoryModal');
        })
        .catch(error => {
            console.error('Error fetching file history:', error);
            alert('Could not load file history');
        });
}

// User activity logging
function logUserActivity(action, details = {}) {
    // In a real app, you would send this to your server
    const activity = {
        userId: currentUser.id,
        action,
        timestamp: new Date().toISOString(),
        ...details
    };
    
    console.log('User activity:', activity);
}

// Initialize file viewer
function initFileViewer() {
    document.querySelectorAll('.file-view').forEach(btn => {
        btn.addEventListener('click', function() {
            const fileId = this.getAttribute('data-file-id');
            previewFile(fileId);
        });
    });
}

// Initialize file download buttons
function initFileDownloads() {
    document.querySelectorAll('.file-download').forEach(btn => {
        btn.addEventListener('click', function() {
            const fileId = this.getAttribute('data-file-id');
            const fileName = this.getAttribute('data-file-name');
            downloadFile(fileId, fileName);
        });
    });
}

// Initialize file history buttons
function initFileHistory() {
    document.querySelectorAll('.file-history').forEach(btn => {
        btn.addEventListener('click', function() {
            const fileId = this.getAttribute('data-file-id');
            showFileHistory(fileId);
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTooltips();
    initFileViewer();
    initFileDownloads();
    initFileHistory();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Log page view
    logUserActivity('page_view', {
        page: window.location.pathname
    });
});