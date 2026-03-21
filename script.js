const form = document.getElementById("registrationForm");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");

// Password Strength Meter
passwordInput.addEventListener("input", function() {
    const val = passwordInput.value;
    let strength = 0;

    if (val.length >= 8) strength += 25;
    if (val.match(/[A-Z]/)) strength += 25;
    if (val.match(/[0-9]/)) strength += 25;
    if (val.match(/[^A-Za-z0-9]/)) strength += 25;

    strengthBar.style.width = strength + "%";

    if (strength === 0) {
        strengthBar.style.backgroundColor = "#eee";
        strengthText.textContent = "";
    } else if (strength <= 25) {
        strengthBar.style.backgroundColor = "#ff4d4d";
        strengthText.textContent = "Weak";
        strengthText.style.color = "#ff4d4d";
    } else if (strength <= 50) {
        strengthBar.style.backgroundColor = "#ffa500";
        strengthText.textContent = "Fair";
        strengthText.style.color = "#ffa500";
    } else if (strength <= 75) {
        strengthBar.style.backgroundColor = "#2ecc71";
        strengthText.textContent = "Good";
        strengthText.style.color = "#2ecc71";
    } else {
        strengthBar.style.backgroundColor = "#007BFF";
        strengthText.textContent = "Strong";
        strengthText.style.color = "#007BFF";
    }
});

// Show/Hide Password Toggle
[togglePassword, toggleConfirmPassword].forEach((toggle, index) => {
    toggle.addEventListener("click", function() {
        const input = index === 0 ? passwordInput : confirmPasswordInput;
        const type = input.getAttribute("type") === "password" ? "text" : "password";
        input.setAttribute("type", type);
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
    });
});

// Auto Format Name & Block Numbers (Real-time Sanitization)
const nameInputs = [
    document.getElementById("firstName"),
    document.getElementById("middleName"),
    document.getElementById("lastName")
];

nameInputs.forEach(input => {
    input.addEventListener("input", function() {
        let cursorSelection = this.selectionStart;
        
        // Remove numbers and special characters immediately
        let cleanedValue = this.value.replace(/[0-9]/g, '');

        // Capitalize first letter of every word
        const formattedValue = cleanedValue.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');

        this.value = formattedValue;
        this.setSelectionRange(cursorSelection, cursorSelection);
    });
});

// Form Submission and Validation
form.addEventListener("submit", function(e) {
    e.preventDefault();
    let isValid = true;

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const course = document.getElementById("course");
    const gender = document.getElementsByName("gender");
    const terms = document.getElementById("terms");

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    // Clear previous errors
    document.querySelectorAll(".error").forEach(e => e.textContent = "");

    // Basic empty check for required names
    if (firstName.value.trim() === "") {
        showError(firstName, "First name is required");
        isValid = false;
    }

    if (lastName.value.trim() === "") {
        showError(lastName, "Last name is required");
        isValid = false;
    }

    if (course.value === "") {
        showError(course, "Please select a course");
        isValid = false;
    }

    if (!passwordRegex.test(passwordInput.value)) {
        showError(passwordInput, "Requires 8+ chars, 1 uppercase, 1 number, 1 symbol");
        isValid = false;
    }

    // Confirm Password Matching
    if (confirmPasswordInput.value === "") {
        showError(confirmPasswordInput, "Please confirm your password");
        isValid = false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        showError(confirmPasswordInput, "Passwords do not match");
        isValid = false;
    }

    let genderSelected = false;
    gender.forEach(g => { if (g.checked) genderSelected = true; });
    if (!genderSelected) {
        showError(gender[0], "Select gender");
        isValid = false;
    }

    if (!terms.checked) {
        showError(terms, "Required");
        isValid = false;
    }

    if (isValid) {
        alert("Registration Successful!");
        form.reset();
        strengthBar.style.width = "0%";
        strengthText.textContent = "";
    }
});

function showError(input, message) {
    const formGroup = input.closest(".form-group");
    const errorDisplay = formGroup.querySelector(".error");
    if (errorDisplay) errorDisplay.textContent = message;
}
