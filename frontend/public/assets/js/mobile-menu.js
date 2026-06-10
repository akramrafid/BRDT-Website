document.addEventListener('DOMContentLoaded', () => {
    // 1. Create the mobile menu DOM structure
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-nav-overlay';
    
    const mobileDrawer = document.createElement('nav');
    mobileDrawer.className = 'mobile-nav-drawer';
    
    // Copy the logo image src from the main header
    const logoImg = document.querySelector('.logo-img');
    const logoSrc = logoImg ? logoImg.src : 'logo.png';

    mobileDrawer.innerHTML = `
        <div class="mobile-nav-header">
            <img src="${logoSrc}" alt="BRDT Logo" class="mobile-logo" />
            <button class="mobile-menu-close"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="mobile-nav-content"></div>
    `;

    document.body.appendChild(mobileOverlay);
    document.body.appendChild(mobileDrawer);

    // 2. Clone the main nav into the mobile drawer
    const mainNavUl = document.querySelector('.main-nav ul');
    if (mainNavUl) {
        const clonedUl = mainNavUl.cloneNode(true);
        // Remove class has-dropdown so we can handle it specifically for mobile if needed, or just let CSS handle it
        document.querySelector('.mobile-nav-content').appendChild(clonedUl);
    }

    // 3. Handle Toggling
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const closeBtn = document.querySelector('.mobile-menu-close');
    
    function openMenu() {
        mobileOverlay.classList.add('active');
        mobileDrawer.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeMenu() {
        mobileOverlay.classList.remove('active');
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

    // Handle dropdown toggles inside mobile menu
    const mobileDropdowns = document.querySelectorAll('.mobile-nav-content .has-dropdown > a');
    mobileDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = dropdown.parentElement;
            parent.classList.toggle('active');
            const submenu = parent.querySelector('.dropdown-menu');
            if (submenu) {
                if (parent.classList.contains('active')) {
                    submenu.style.display = 'block';
                } else {
                    submenu.style.display = 'none';
                }
            }
        });
    });

    // ==================== NEWSLETTER SUBSCRIPTION ====================
    const newsletterForms = document.querySelectorAll('.newsletter-input form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const submitBtn = form.querySelector('button[type="submit"]');
            const email = emailInput.value;

            if (!email) return;

            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

            try {
                const response = await fetch('http://localhost:5000/api/contact/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();
                
                if (data.status === 'success') {
                    alert(data.message || 'Successfully subscribed!');
                    emailInput.value = '';
                } else {
                    alert('Error: ' + data.message);
                }
            } catch (error) {
                console.error('Subscription Error:', error);
                alert('Could not connect to server. Please ensure the backend is running.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    });

    // ==================== AUTH STATE (Login/Dashboard Button) ====================
    const loginLink = document.querySelector('.login-link');
    if (loginLink) {
        const storedUser = localStorage.getItem('brdt_user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user.email === 'brdtbd@gmail.com') {
                    // Admin
                    loginLink.innerHTML = '<i class="fa-solid fa-circle-user" style="margin-right: 5px;"></i> Admin Dashboard';
                    loginLink.href = 'admin-dashboard.html';
                } else {
                    // Normal User
                    loginLink.innerHTML = `<i class="fa-solid fa-circle-user" style="margin-right: 5px;"></i> ${user.first_name || 'My Account'}`;
                    loginLink.href = '#';
                    
                    // Simple logout for normal users
                    loginLink.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (confirm('Are you sure you want to log out?')) {
                            localStorage.removeItem('brdt_token');
                            localStorage.removeItem('brdt_user');
                            window.location.reload();
                        }
                    });
                }
            } catch (e) {
                console.error('Error parsing user data', e);
            }
        }
    }
});
