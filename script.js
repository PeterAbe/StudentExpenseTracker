// UniSpend - Interactive JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Navigation item active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Add search functionality here if needed
            console.log('Searching for:', searchTerm);
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add expense button functionality
    const addExpenseBtns = document.querySelectorAll('.btn-primary');
    addExpenseBtns.forEach(btn => {
        if (btn.textContent.includes('Add New Expense')) {
            btn.addEventListener('click', function() {
                alert('Add New Expense feature coming soon!');
            });
        }
    });

    // Responsive sidebar toggle for mobile
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.style.display = 'none';
        }
    }

    // Chart animation on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chartColumns = entry.target.querySelectorAll('.chart-column');
                chartColumns.forEach((column, index) => {
                    setTimeout(() => {
                        column.style.transition = 'height 0.5s ease';
                        // Animate to random heights for demo
                        const randomHeight = Math.floor(Math.random() * 100) + 50;
                        column.style.height = randomHeight + 'px';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    const spendingOverview = document.querySelector('.spending-overview');
    if (spendingOverview) {
        observer.observe(spendingOverview);
    }
});

// Form validation (if forms are added)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff0000';
        } else {
            input.style.borderColor = '';
        }
    });

    return isValid;
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Utility function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(date);
}

