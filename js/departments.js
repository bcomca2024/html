// Department page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Faculty tab switching
    const facultyTabs = document.querySelectorAll('.faculty-tab');
    const facultyContents = document.querySelectorAll('.faculty-content');

    facultyTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetFaculty = this.dataset.faculty;
            
            // Remove active class from all tabs and contents
            facultyTabs.forEach(t => t.classList.remove('active'));
            facultyContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetFaculty + '-faculty').classList.add('active');
        });
    });

    // Add hover effects to department cards
    const deptCards = document.querySelectorAll('.department-card');
    
    deptCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animate counters when in view
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('h3');
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                
                if (number && number > 0) {
                    animateCounter(statNumber, number, text.replace(/\d/g, ''));
                    statsObserver.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-item').forEach(item => {
        statsObserver.observe(item);
    });

    // Counter animation function
    function animateCounter(element, target, suffix, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + suffix;
            }
        }, 16);
    }

    // Add search functionality for departments
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search departments...';
    searchInput.className = 'dept-search';
    searchInput.style.cssText = `
        width: 300px;
        padding: 12px 20px;
        margin: 20px auto;
        display: block;
        border: 2px solid #e3f2fd;
        border-radius: 25px;
        font-size: 1em;
        outline: none;
        transition: border-color 0.3s ease;
    `;
    
    // Insert search box before departments section
    const deptSection = document.querySelector('.departments-section');
    if (deptSection) {
        deptSection.insertBefore(searchInput, deptSection.firstChild);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const allDeptCards = document.querySelectorAll('.department-card');
            
            allDeptCards.forEach(card => {
                const deptName = card.querySelector('h3').textContent.toLowerCase();
                const deptContent = card.textContent.toLowerCase();
                
                if (deptName.includes(searchTerm) || deptContent.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease-in-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
        
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = '#1567c3';
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.borderColor = '#e3f2fd';
        });
    }

    console.log('🎓 SGAC Departments page loaded successfully!');
});
