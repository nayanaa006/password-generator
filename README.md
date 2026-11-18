# 🔐 Password Generator

A simple and responsive Password Generator built using HTML, CSS, and JavaScript. It allows users to create strong, customizable passwords with different character combinations.

## ✨ Features

- Generate random passwords instantly.
- Customize password length (8–32 characters).
- Include or exclude:
  - Uppercase letters (A–Z)
  - Lowercase letters (a–z)
  - Numbers (0–9)
  - Special symbols (!@#$)
- Password strength indicator.
- Copy generated passwords to the clipboard.
- Dark and light theme toggle.
- Remembers the selected theme.

## 🛠️ Technologies Used

- HTML5 – Structure
- CSS3 – Styling and responsive design
- JavaScript – Password generation and functionality
- Web Crypto API – Secure random number generation
- Local Storage – Theme preference persistence

## 📂 Project Structure

```text
Password-Generator/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🚀 How to Run

1. Clone this repository:

   ```bash
   git clone https://github.com/nayanaa006/password-generator.git
   ```

2. Open the project folder in Visual Studio Code.
3. Open `index.html` using the Live Server extension.
4. Customize your password settings and click **Generate Password**.

## 🔒 Security Note

The application uses the browser's Web Crypto API to generate random values. The password strength indicator is a basic estimate based on password length and character variety, not a formal security assessment.

## 🎯 Project Objective

This project was developed to practice front-end web development, JavaScript logic, browser APIs, and responsive user interface design.

---

**Built with ❤️ using HTML, CSS, and JavaScript.**
