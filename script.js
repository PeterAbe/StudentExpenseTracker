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

        // Add expense form handling (no alerts)
    const addExpenseContainer = document.getElementById('add-expense-container');
    const saveExpenseBtn = document.getElementById('save-expense-btn');
    const dateInput = document.getElementById('expense-date');
    const descInput = document.getElementById('expense-desc');
    const categoryInput = document.getElementById('expense-category');
    const amountInput = document.getElementById('expense-amount');

    // Find the "Add New Expense" button on this page
    const addExpenseBtn = Array.from(document.querySelectorAll('.btn.btn-primary'))
        .find(btn => btn.textContent.includes('Add New Expense'));

    // Show / hide the small form when the main button is clicked
    if (addExpenseBtn && addExpenseContainer) {
        addExpenseBtn.addEventListener('click', function () {
            const currentlyHidden =
                addExpenseContainer.style.display === 'none' ||
                addExpenseContainer.style.display === '';
            addExpenseContainer.style.display = currentlyHidden ? 'block' : 'none';

            if (currentlyHidden && dateInput) {
                dateInput.focus();
            }
        });
    }

    // Handle adding the row when "Add" in the small form is clicked
    if (saveExpenseBtn && dateInput && descInput && categoryInput && amountInput) {
        saveExpenseBtn.addEventListener('click', function () {
            const date = dateInput.value || new Date().toISOString().slice(0, 10);
            const description = descInput.value.trim();
            const category = categoryInput.value.trim();
            const amountValue = parseFloat(amountInput.value);

            if (!description || !category || isNaN(amountValue)) {
                [descInput, categoryInput, amountInput].forEach(input => {
                    if (!input.value.trim()) {
                        input.style.borderColor = '#ff4b4b';
                    } else {
                        input.style.borderColor = '#CBD5E1';
                    }
                });
                return;
            }

            addTransactionRow({
                date,
                description,
                category,
                amount: amountValue
            });

            // Clear fields and hide form again
            descInput.value = "";
            categoryInput.value = "";
            amountInput.value = "";
            [descInput, categoryInput, amountInput].forEach(input => {
                input.style.borderColor = '#CBD5E1';
            });
            addExpenseContainer.style.display = 'none';
        });
    }




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


// Add a new transaction row to the "Recent Transactions" table
function addTransactionRow({ date, description, category, amount }) {
    const table = document.querySelector('.transactions-table');
    if (!table) return;

    const row = document.createElement('div');
    row.classList.add('table-row');

    // Use existing currency formatter; amount can be + or -
    const absAmount = Math.abs(amount);
    const formatted = formatCurrency(absAmount); // e.g. $150.00
    const signed = (amount >= 0 ? "+" : "-") + formatted;

    row.innerHTML = `
        <div class="table-cell">${date}</div>
        <div class="table-cell">${description}</div>
        <div class="table-cell">
            <span class="category-badge">${category}</span>
        </div>
        <div class="table-cell">${signed}</div>
    `;

    table.appendChild(row);
}

// Sidebar navigation scrolling
const navDashboard = document.getElementById("nav-dashboard");
const navExpenses = document.getElementById("nav-expenses");
const navLimits = document.getElementById("nav-limits");
const navReports = document.getElementById("nav-reports");
const navSettings = document.getElementById("nav-settings");
const navLogout = document.getElementById("nav-logout");

// Dashboard → scroll to very top
if (navDashboard) {
    navDashboard.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// My Expenses → scroll to Recent Transactions
if (navExpenses) {
    navExpenses.addEventListener("click", () => {
        const target = document.getElementById("section-expenses");
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
}

// Budget Limits → scroll to Spending Overview
if (navLimits) {
    navLimits.addEventListener("click", () => {
        const target = document.getElementById("section-overview");
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
}

// Reports → same as Dashboard → scroll to top
if (navReports) {
    navReports.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Settings → same as Dashboard → scroll to top
if (navSettings) {
    navSettings.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Log Out → go back to index.html
if (navLogout) {
    navLogout.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}
