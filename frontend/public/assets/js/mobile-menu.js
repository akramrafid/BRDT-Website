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
    const mobileContent = document.querySelector('.mobile-nav-content');
    if (mainNavUl) {
        const clonedUl = mainNavUl.cloneNode(true);
        mobileContent.appendChild(clonedUl);
    }
    
    // Clone header actions (Donate/Login) to bottom of mobile menu
    const headerActions = document.querySelector('.header-actions');
    if (headerActions) {
        const clonedActions = headerActions.cloneNode(true);
        clonedActions.classList.add('mobile-header-actions');
        mobileContent.appendChild(clonedActions);
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
                const response = await fetch('https://api.brdtrust.com/api/contact/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();
                
                if (data.status === 'success') {
                    const overlay = document.createElement('div');
                    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);';
                    overlay.innerHTML = `
                      <div style="background:white;padding:40px;border-radius:12px;text-align:center;width:90%;max-width:400px;box-shadow:0 20px 40px rgba(0,0,0,0.2);animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                        <div style="width:70px;height:70px;background:#10b981;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
                          <i class="fa-solid fa-check" style="color:white;font-size:32px;"></i>
                        </div>
                        <h2 style="color:#0f172a;font-size:24px;margin-bottom:10px;font-family:'Outfit',sans-serif;font-weight:700;">Subscribed!</h2>
                        <p style="color:#475569;font-size:15px;margin-bottom:25px;line-height:1.5;">${data.message || 'Successfully subscribed!'}</p>
                        <button id="nl-success-close-btn" style="background:#2563eb;color:white;border:none;padding:12px 30px;border-radius:6px;font-weight:600;cursor:pointer;font-size:15px;width:100%;">Continue</button>
                      </div>
                      <style>@keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }</style>
                    `;
                    document.body.appendChild(overlay);

                    document.getElementById('nl-success-close-btn').addEventListener('click', () => {
                      overlay.remove();
                      emailInput.value = '';
                    });
                } else {
                    const overlay = document.createElement('div');
                    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);';
                    overlay.innerHTML = `
                      <div style="background:white;padding:40px;border-radius:12px;text-align:center;width:90%;max-width:400px;box-shadow:0 20px 40px rgba(0,0,0,0.2);animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                        <div style="width:70px;height:70px;background:#ef4444;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
                          <i class="fa-solid fa-xmark" style="color:white;font-size:32px;"></i>
                        </div>
                        <h2 style="color:#0f172a;font-size:24px;margin-bottom:10px;font-family:'Outfit',sans-serif;font-weight:700;">Subscription Error</h2>
                        <p style="color:#475569;font-size:15px;margin-bottom:25px;line-height:1.5;">${data.message}</p>
                        <button id="nl-error-close-btn" style="background:#ef4444;color:white;border:none;padding:12px 30px;border-radius:6px;font-weight:600;cursor:pointer;font-size:15px;width:100%;">Try Again</button>
                      </div>
                    `;
                    document.body.appendChild(overlay);

                    document.getElementById('nl-error-close-btn').addEventListener('click', () => {
                      overlay.remove();
                    });
                }
            } catch (error) {
                console.error('Subscription Error:', error);
                const overlay = document.createElement('div');
                overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);';
                overlay.innerHTML = `
                  <div style="background:white;padding:40px;border-radius:12px;text-align:center;max-width:400px;box-shadow:0 20px 40px rgba(0,0,0,0.2);animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                    <div style="width:70px;height:70px;background:#ef4444;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
                      <i class="fa-solid fa-triangle-exclamation" style="color:white;font-size:32px;"></i>
                    </div>
                    <h2 style="color:#0f172a;font-size:24px;margin-bottom:10px;font-family:'Outfit',sans-serif;font-weight:700;">Connection Error</h2>
                    <p style="color:#475569;font-size:15px;margin-bottom:25px;line-height:1.5;">Could not connect to server.</p>
                    <button id="nl-conn-error-close" style="background:#ef4444;color:white;border:none;padding:12px 30px;border-radius:6px;font-weight:600;cursor:pointer;font-size:15px;width:100%;">Close</button>
                  </div>
                `;
                document.body.appendChild(overlay);
                document.getElementById('nl-conn-error-close').addEventListener('click', () => overlay.remove());
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
