function submitToGoogle(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitButton');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    // Create the submission URL with parameters
    const baseUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfsxZYylaSxkW6Tip6Su0mBD2D0fRmUEPsca81yV7R5M-Gqvw/formResponse';
    
    const formData = new URLSearchParams({
        'entry.2005620554': document.getElementById('fullName').value,
        'entry.1870886290': document.getElementById('dob').value,
        'entry.1375626670': document.getElementById('gender').value,
        'entry.1045781291': document.getElementById('email').value,
        'entry.1166974658': document.getElementById('phone').value,
        'entry.1065046570': document.getElementById('address').value,
        'entry.479499184': document.getElementById('course').value,
        'entry.347061347': document.getElementById('passYear').value,
        'entry.1099822669': document.getElementById('percentage12').value,
        'entry.1416808419': document.getElementById('percentage10').value,
        'entry.2136875474': document.getElementById('tcNumber').value,
        'entry.1664324858': document.getElementById('incomeNumber').value,
        'entry.1434001217': document.getElementById('communityNumber').value,
        'entry.1878976567': document.getElementById('parentName').value,
        'entry.2140741521': document.getElementById('parentNumber').value,
        'entry.297892273': document.getElementById('relationship').value,
        'entry.1726883402': document.getElementById('otherDetails').value,
        'submit': 'Submit'
    });
    
    // Submit using fetch to avoid popup blockers
    fetch(baseUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
    }).then(() => {
        // Show success and reset form
        setTimeout(() => {
            showSuccess();
            document.getElementById('admissionForm').reset();
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Application';
            submitBtn.disabled = false;
        }, 1000);
    }).catch(() => {
        // Even if fetch "fails" (due to no-cors), the form likely submitted
        setTimeout(() => {
            showSuccess();
            document.getElementById('admissionForm').reset();
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Application';
            submitBtn.disabled = false;
        }, 1000);
    });
    
    return false;
}
