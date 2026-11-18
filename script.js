
// 1. Get HTML elements
const passwordDisplay = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("length-value");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const generateButton = document.getElementById("generate-btn");
const copyButton = document.getElementById("copy-btn");

const strengthText = document.getElementById("strength");
const strengthFill = document.getElementById("strength-fill");

const themeToggle = document.getElementById("theme-toggle");
const message = document.getElementById("message");

// 2. Character collections
const characters = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}?"
};

// 3. Update password length
lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

// 4. Generate unbiased secure random integers
function secureRandomInt(max) {
    const range = 0x100000000;
    const limit = range - (range % max);
    const randomValues = new Uint32Array(1);

    let value;

    do {
        crypto.getRandomValues(randomValues);
        value = randomValues[0];
    } while (value >= limit);

    return value % max;
}

// 5. Generate password
function generatePassword() {

    let availableCharacters = "";
    let requiredCharacters = [];

    if (uppercase.checked) {
        availableCharacters += characters.uppercase;
        requiredCharacters.push(characters.uppercase);
    }

    if (lowercase.checked) {
        availableCharacters += characters.lowercase;
        requiredCharacters.push(characters.lowercase);
    }

    if (numbers.checked) {
        availableCharacters += characters.numbers;
        requiredCharacters.push(characters.numbers);
    }

    if (symbols.checked) {
        availableCharacters += characters.symbols;
        requiredCharacters.push(characters.symbols);
    }

    const length = Number(lengthSlider.value);

    if (requiredCharacters.length === 0) {
        message.textContent = "Select at least one character type!";
        return;
    }

    if (requiredCharacters.length > length) {
        message.textContent = "Password length is too short!";
        return;
    }

    // Ensure at least one character from each selected category
    let password = requiredCharacters.map(set => {
        return set[secureRandomInt(set.length)];
    });

    // Fill remaining positions
    while (password.length < length) {
        password.push(
            availableCharacters[
                secureRandomInt(availableCharacters.length)
            ]
        );
    }

    // Securely shuffle the password characters
    for (let i = password.length - 1; i > 0; i--) {
        const j = secureRandomInt(i + 1);
        [password[i], password[j]] = [password[j], password[i]];
    }

    const finalPassword = password.join("");

    passwordDisplay.value = finalPassword;
    message.textContent = "Password generated successfully!";

    checkStrength();
}

// 6. Check password strength
function checkStrength() {

    const password = passwordDisplay.value;

    if (!password) {
        strengthText.textContent = "Not generated";
        strengthFill.style.width = "0%";
        return;
    }

    let score = 0;

    if (password.length >= 12) score++;
    if (password.length >= 16) score++;

    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
        strengthText.textContent = "Weak";
        strengthFill.style.width = "30%";
        strengthFill.style.background = "#ef4444";
    } else if (score <= 4) {
        strengthText.textContent = "Medium";
        strengthFill.style.width = "65%";
        strengthFill.style.background = "#f59e0b";
    } else {
        strengthText.textContent = "Strong";
        strengthFill.style.width = "100%";
        strengthFill.style.background = "#22c55e";
    }
}

// 7. Copy password
copyButton.addEventListener("click", async () => {

    const password = passwordDisplay.value;

    if (!password) {
        message.textContent = "Generate a password first!";
        return;
    }

    try {
        await navigator.clipboard.writeText(password);
        message.textContent = "Password copied successfully!";
    } catch (error) {
        message.textContent = "Unable to copy. Check browser permissions.";
    }
});

// 8. Dark and light theme
function setTheme(theme) {

    document.body.classList.toggle("dark", theme === "dark");

    themeToggle.textContent =
        theme === "dark" ? "☀️" : "🌙";

    localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

themeToggle.addEventListener("click", () => {

    const newTheme =
        document.body.classList.contains("dark")
            ? "light"
            : "dark";

    setTheme(newTheme);
});

// 9. Generate button event
generateButton.addEventListener("click", generatePassword);
