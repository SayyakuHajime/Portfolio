/**
 * Component Loader
 * Loads reusable HTML components into pages
 */

// Load component from file
async function loadComponent(componentPath, targetSelector) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${componentPath}`);
        }
        const html = await response.text();
        const target = document.querySelector(targetSelector);
        if (target) {
            target.innerHTML = html;
        }
    } catch (error) {
        console.error('Component loading error:', error);
    }
}

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    // Load sidebar
    const sidebarContainer = document.getElementById('sidebar-left-container');
    if (sidebarContainer) {
        await loadComponent('../components/sidebar-left.html', '#sidebar-left-container');
    }

    // Load mobile nav
    const mobileNavContainer = document.getElementById('mobile-nav-container');
    if (mobileNavContainer) {
        await loadComponent('../components/mobile-nav.html', '#mobile-nav-container');
    }

    // Initialize Lucide icons after components are loaded
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Set active nav item based on current page
    setActiveNavItem();
});

// Set active state for current page in navigation
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}
