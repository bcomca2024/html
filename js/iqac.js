
// IQAC Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize page
    console.log('🎓 IQAC Page Loaded Successfully');
    
    // Form submission
    const feedbackForm = document.getElementById('iqac-feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const feedback = {
                type: formData.get('feedback-type'),
                stakeholder: formData.get('stakeholder-type'),
                message: formData.get('feedback-message'),
                contact: formData.get('contact-info')
            };
            
            // Simulate form submission
            showNotification('Thank you for your feedback! Your suggestions have been submitted to the IQAC team.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.function-card, .composition-card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Toggle NAAC Criteria accordion
function toggleCriteria(criteriaNumber) {
    const content = document.getElementById(`criteria-${criteriaNumber}`);
    const header = content.previousElementSibling;
    const icon = header.querySelector('i');
    
    // Close all other criteria
    document.querySelectorAll('.criteria-content').forEach(item => {
        if (item !== content) {
            item.classList.remove('active');
            const otherIcon = item.previousElementSibling.querySelector('i');
            otherIcon.style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current criteria
    content.classList.toggle('active');
    
    // Rotate icon
    if (content.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

// Show notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .notification button:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);
