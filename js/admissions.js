// Fixed admissions page functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Admissions page loaded successfully!');
    
    // Form validation
    const form = document.getElementById('admissionForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearErrors);
    });
    
    function validateField(event) {
        const field = event.target;
        const value = field.value.trim();
        
        field.classList.remove('error');
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return;
            }
        }
        
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[6-9]\d{9}$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Please enter a valid 10-digit mobile number');
                return;
            }
        }
        
        if (field.id === 'pincode' && value) {
            const pincodeRegex = /^[1-9][0-9]{5}$/;
            if (!pincodeRegex.test(value)) {
                showFieldError(field, 'Please enter a valid 6-digit PIN code');
                return;
            }
        }
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = 'color: #e74c3c; font-size: 0.85rem; margin-top: 5px;';
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearErrors(event) {
        const field = event.target;
        field.classList.remove('error');
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    // Auto-format phone numbers
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.substr(0, 10);
            }
            this.value = value;
        });
    });
    
    // Auto-format PIN code
    const pincodeInput = document.getElementById('pincode');
    if (pincodeInput) {
        pincodeInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 6) {
                value = value.substr(0, 6);
            }
            this.value = value;
        });
    }
});

// Google Form submission handler
function submitToGoogleForm() {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    // Re-enable button after 3 seconds
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 3000);
    
    return true; // Allow form to submit
}

// Handle form submission success
function formSubmitted() {
    setTimeout(() => {
        showSuccessMessage();
        document.getElementById('admissionForm').reset();
    }, 1000);
}

// Show success message
function showSuccessMessage() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 15px 50px rgba(0,0,0,0.3);
    `;
    
    successMsg.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 4rem; color: #27ae60; margin-bottom: 20px;"></i>
        <h3 style="color: #2c3e50; font-size: 1.5rem; margin-bottom: 15px;">Application Submitted Successfully!</h3>
        <p style="color: #666; margin-bottom: 25px;">Thank you for your application. We have received your details and will contact you soon.</p>
        <p style="color: #666; margin-bottom: 25px;"><strong>Application ID:</strong> SGAC${Date.now()}</p>
        <button onclick="closeSuccessMessage()" style="background: #27ae60; color: white; padding: 12px 25px; border: none; border-radius: 25px; cursor: pointer; font-weight: 600;">Close</button>
    `;
    
    overlay.appendChild(successMsg);
    document.body.appendChild(overlay);
    
    // Auto close after 10 seconds
    setTimeout(() => {
        closeSuccessMessage();
    }, 10000);
}

// Close success message
function closeSuccessMessage() {
    const overlay = document.querySelector('[style*="position: fixed"]');
    if (overlay) {
        overlay.remove();
    }
}
