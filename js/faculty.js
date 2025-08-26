// Faculty page complete functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Staff category tab switching
    const staffTabs = document.querySelectorAll('.staff-tab');
    const staffContents = document.querySelectorAll('.staff-content');

    staffTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetStaff = this.dataset.staff;
            
            // Remove active class from all tabs and contents
            staffTabs.forEach(t => t.classList.remove('active'));
            staffContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetStaff + '-staff').classList.add('active');
            
            // Scroll to content
            document.getElementById(targetStaff + '-staff').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        });
    });

    // Department tab switching for teaching faculty
    const deptTabs = document.querySelectorAll('.dept-tab');
    const deptContents = document.querySelectorAll('.dept-content');

    deptTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetDept = this.dataset.dept;
            
            // Remove active class from all dept tabs and contents
            deptTabs.forEach(t => t.classList.remove('active'));
            deptContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetDept + '-dept');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Add search functionality
    const searchContainer = document.createElement('div');
    searchContainer.className = 'faculty-search';
    searchContainer.innerHTML = `
        <input type="text" placeholder="Search faculty and staff..." id="faculty-search">
        <i class="fas fa-search"></i>
    `;
    
    const staffSection = document.querySelector('.staff-content-section');
    if (staffSection) {
        staffSection.insertBefore(searchContainer, staffSection.firstChild);
        
        const searchInput = document.getElementById('faculty-search');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const allCards = document.querySelectorAll('.faculty-card, .staff-card');
            let visibleCards = 0;
            
            allCards.forEach(card => {
                const name = card.querySelector('h4').textContent.toLowerCase();
                const qualification = card.querySelector('.qualification')?.textContent.toLowerCase() || '';
                const designation = card.querySelector('.designation')?.textContent.toLowerCase() || '';
                const specialization = card.querySelector('.specialization')?.textContent.toLowerCase() || '';
                
                if (name.includes(searchTerm) || 
                    qualification.includes(searchTerm) || 
                    designation.includes(searchTerm) ||
                    specialization.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.3s ease-in-out';
                    visibleCards++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show all relevant sections if searching
            if (searchTerm.length > 0) {
                staffContents.forEach(content => {
                    const hasVisibleCards = content.querySelector('.faculty-card[style*="display: block"], .staff-card[style*="display: block"], .faculty-card:not([style*="display: none"]), .staff-card:not([style*="display: none"])');
                    if (hasVisibleCards) {
                        content.classList.add('active');
                    }
                });
                
                deptContents.forEach(content => {
                    const hasVisibleCards = content.querySelector('.faculty-card[style*="display: block"], .faculty-card:not([style*="display: none"])');
                    if (hasVisibleCards) {
                        content.classList.add('active');
                    }
                });
            } else {
                // Reset to original view
                staffContents.forEach(content => content.classList.remove('active'));
                deptContents.forEach(content => content.classList.remove('active'));
                document.querySelector('.staff-content').classList.add('active');
                document.querySelector('.dept-content').classList.add('active');
            }
        });
    }

    // Add hover effects
    const allCards = document.querySelectorAll('.faculty-card, .staff-card');
    
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animate stats when in view
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

    // Faculty/Staff card click for details modal
    allCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('h4').textContent;
            const qualification = this.querySelector('.qualification')?.textContent || '';
            const designation = this.querySelector('.designation')?.textContent || '';
            const specialization = this.querySelector('.specialization')?.textContent || '';
            const experience = this.querySelector('.experience')?.textContent || '';
            const department = this.querySelector('.department')?.textContent || '';
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'faculty-modal';
            modal.innerHTML = `
                <div class="faculty-modal-content">
                    <span class="close-modal">&times;</span>
                    <h3>${name}</h3>
                    ${qualification ? `<p><strong>Qualification:</strong> ${qualification}</p>` : ''}
                    ${designation ? `<p><strong>Designation:</strong> ${designation}</p>` : ''}
                    ${department ? `<p><strong>Department:</strong> ${department}</p>` : ''}
                    ${specialization ? `<p><strong>Specialization:</strong> ${specialization}</p>` : ''}
                    ${experience ? `<p><strong>Experience:</strong> ${experience}</p>` : ''}
                   
                </div>
            `;
            
            document.body.appendChild(modal);
            modal.style.display = 'flex';
            
            // Close modal
            modal.querySelector('.close-modal').addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    });

    // Generate staff statistics
    function generateStats() {
        const teachingFaculty = document.querySelectorAll('#teaching-staff .faculty-card').length;
        const adminStaff = document.querySelectorAll('#administrative-staff .staff-card').length;
        const techStaff = 20; // Based on categories
        const supportStaff = 24; // Based on document
        
        console.log(`📊 SGAC Staff Statistics:`);
        console.log(`👨‍🏫 Teaching Faculty: ${teachingFaculty}`);
        console.log(`👔 Administrative Staff: ${adminStaff}`);
        console.log(`🔧 Technical Staff: ${techStaff}`);
        console.log(`🤝 Supporting Staff: ${supportStaff}`);
        console.log(`📈 Total Staff: ${teachingFaculty + adminStaff + techStaff + supportStaff}`);
    }

    generateStats();
    console.log('🎓 SGAC Complete Faculty & Staff page loaded successfully!');
});

// Add modal styles dynamically
const modalStyles = `
<style>
.faculty-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.faculty-modal-content {
    background: #fff;
    padding: 30px;
    border-radius: 15px;
    max-width: 500px;
    width: 90%;
    position: relative;
    text-align: left;
    max-height: 80vh;
    overflow-y: auto;
}

.close-modal {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 1.5em;
    cursor: pointer;
    color: #666;
}

.faculty-modal-content h3 {
    color: #1567c3;
    margin-bottom: 20px;
    font-size: 1.3em;
}

.faculty-modal-content p {
    margin-bottom: 10px;
    line-height: 1.5;
}

.modal-actions {
    margin-top: 25px;
    display: flex;
    gap: 15px;
    justify-content: center;
}

.modal-actions button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s ease;
}

.contact-btn {
    background: #1567c3;
    color: #fff;
}

.contact-btn:hover {
    background: #0d4a94;
}

.profile-btn {
    background: #f39c12;
    color: #fff;
}

.profile-btn:hover {
    background: #d68910;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', modalStyles);
