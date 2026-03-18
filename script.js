const form = document.getElementById("registrationForm");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
const strengthBar = document.getElementById("strength-bar");
const strengthText = document.getElementById("strength-text");

//PASSWORD STRENGTH METER
passwordInput.addEventListener("input", function() {
    const val = passwordInput.value;
    let strength = 0;

    if (val.length >= 8) strength += 25;           // Length check
    if (val.match(/[A-Z]/)) strength += 25;        // Uppercase check
    if (val.match(/[0-9]/)) strength += 25;        // Number check
    if (val.match(/[^A-Za-z0-9]/)) strength += 25; // Special char check

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

//SHOW/HIDE PASSWORD
togglePassword.addEventListener("click", function() {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    
    // Toggle the icon class
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
});

//SHOW/HIDE CONFIRM PASSWORD
toggleConfirmPassword.addEventListener("click", function() {
    const type = confirmPasswordInput.getAttribute("type") === "password" ? "text" : "password";
    confirmPasswordInput.setAttribute("type", type);
    this.classList.toggle("fa-eye");
    this.classList.toggle("fa-eye-slash");
});

//Check if passwords match
if (confirmPasswordInput.value !== passwordInput.value) {
    showError(confirmPasswordInput, "Passwords do not match");
    isValid = false;
} else if (confirmPasswordInput.value === "") {
    showError(confirmPasswordInput, "Please confirm your password");
    isValid = false;
}

//AUTO FORMAT NAME
const nameInputs = [
    document.getElementById("firstName"),
    document.getElementById("middleName"),
    document.getElementById("lastName")
];

nameInputs.forEach(input => {
    input.addEventListener("input", function() {
        let cursorSelection = this.selectionStart;
        
        // Capitalize first letter of every word
        const formattedValue = this.value.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        this.value = formattedValue;
        this.setSelectionRange(cursorSelection, cursorSelection);
    });
});

// --- FORM SUBMISSION & VALIDATION ---
form.addEventListener("submit", function(e) {
    e.preventDefault();
    let isValid = true;

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const course = document.getElementById("course");
    const gender = document.getElementsByName("gender");
    const terms = document.getElementById("terms");

    const nameRegex = /^[A-Za-z\s]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    // Clear all previous error messages
    document.querySelectorAll(".error").forEach(e => e.textContent = "");

    // Name Validation
    if (!nameRegex.test(firstName.value)) {
        showError(firstName, "Only letters allowed");
        isValid = false;
    }

    if (!nameRegex.test(lastName.value)) {
        showError(lastName, "Only letters allowed");
        isValid = false;
    }

    // Course Validation
    if (course.value === "") {
        showError(course, "Please select a course");
        isValid = false;
    }

    // Password Format Validation
    if (!passwordRegex.test(passwordInput.value)) {
        showError(passwordInput, "Requires 8+ chars, 1 uppercase, 1 number, 1 symbol");
        isValid = false;
    }

    // PASSWORD MATCHING VALIDATION (Moved inside the listener)
    if (confirmPasswordInput.value === "") {
        showError(confirmPasswordInput, "Please confirm your password");
        isValid = false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        showError(confirmPasswordInput, "Passwords do not match");
        isValid = false;
    }

    // Gender Validation
    let genderSelected = false;
    gender.forEach(g => { if (g.checked) genderSelected = true; });
    if (!genderSelected) {
        showError(gender[0], "Select gender");
        isValid = false;
    }

    // Terms Validation
    if (!terms.checked) {
        showError(terms, "Required");
        isValid = false;
    }

    if (isValid) {
        alert("Registration Successful");
        form.reset();
        // Reset strength bar after success
        strengthBar.style.width = "0%";
        strengthText.textContent = "";
    }
});
function showError(input, message) {
    const formGroup = input.closest(".form-group");
    formGroup.querySelector(".error").textContent = message;
}