document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a group detail page
    const groupId = getGroupIdFromUrl();
    if (groupId) {
        loadGroupDetails(groupId);
    }

    // Add animation to clickable sections on the main page
    const clickableSections = document.querySelectorAll('.clickable-section');
    clickableSections.forEach(section => {
        section.addEventListener('click', function(e) {
            // If the click is on a link inside the section, let it handle the navigation
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            // Otherwise, navigate to the group's page
            const link = this.closest('.group-link');
            if (link && link.href) {
                window.location.href = link.href;
            }
        });
    });
});

function getGroupIdFromUrl() {
    const path = window.location.pathname.split('/');
    const page = path[path.length - 1];
    return page.replace('.html', '');
}

function loadGroupDetails(groupId) {
    // Get the group data
    const group = groupsData[groupId];
    if (!group) return;

    // Update the page title
    document.title = `${group.title} - Oratorio Sant'Elena`;

    // Update the header
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = `
            <div class="header-content">
                <div class="logo-container">
                    <a href="../index.html">
                        <img src="../images/logo.png" alt="Logo Oratorio Sant'Elena" class="logo">
                    </a>
                </div>
                <div class="header-text">
                    <h1>${group.title}</h1>
                    <p>${group.subtitle}</p>
                </div>
            </div>
        `;
    }

    // Update the main content
    const main = document.querySelector('main');
    if (!main) return;

    // Create the back button
    const backButton = document.createElement('a');
    backButton.href = '../index.html';
    backButton.className = 'back-button';
    backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Torna alla Home';
    backButton.style.display = 'inline-flex';
    backButton.style.alignItems = 'center';
    backButton.style.justifyContent = 'center';

    // Create the group details content
    const details = document.createElement('div');
    details.className = 'group-details';
    details.innerHTML = `
        <div class="group-header">
            <h2>${group.title}</h2>
            <p class="group-subtitle">${group.subtitle}</p>
        </div>
        
        <div class="group-content">
            <div class="group-image">
                <img src="${group.image}" alt="${group.title}" loading="lazy">
            </div>
            
            <div class="group-info">
                <div class="info-box">
                    <h3><i class="fas fa-clock"></i> Orari</h3>
                    <p>${group.schedule}</p>
                </div>
                
                <div class="info-box">
                    <h3><i class="fas fa-info-circle"></i> Descrizione</h3>
                    <p>${group.description}</p>
                </div>
                
                <div class="info-box">
                    <h3><i class="fas fa-list-ul"></i> Attività</h3>
                    <ul>
                        ${group.activities.map(activity => `<li>${activity}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="info-box">
                    <h3><i class="fas fa-user"></i> Contatti</h3>
                    <p>${group.contactPerson}</p>
                    <p>Email: <a href="mailto:oratorio.santelena24@gmail.com">oratorio.santelena24@gmail.com</a></p>
                </div>
            </div>
        </div>
    `;

    // Clear the main content and add the new elements
    main.innerHTML = '';
    main.appendChild(backButton);
    main.appendChild(details);

    // Add animations
    setTimeout(() => {
        document.querySelector('.group-details').style.opacity = '1';
        document.querySelector('.group-details').style.transform = 'translateY(0)';
    }, 100);
}
