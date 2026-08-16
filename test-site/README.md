# Test Automation Platform - Test Site (Dummy Application)

<div align="center">
  <img src="docs/images/vizja-logo.png" alt="Uniwersytet Vizja" width="300"/>
  
  ### Graduation Thesis Project
  **Vizja University**
  
  **Student:** Buğra Han - 42078
  
  ---
  
  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Purpose](#purpose)
- [Features](#features)
- [Test Scenarios](#test-scenarios)
- [Element Locators](#element-locators)
- [Getting Started](#getting-started)
- [File Structure](#file-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This is a **dummy e-commerce test site** specifically designed for automated testing purposes. It simulates a simple online store with user registration, login, and address management features.

The site is intentionally kept simple and predictable to ensure:
- ✅ Consistent test results
- ✅ Stable element locators
- ✅ Controlled test scenarios
- ✅ Easy maintenance

This project serves as a **graduation thesis** component, providing a controlled environment for demonstrating automated testing capabilities.

---

## 💡 Purpose

### Why a Dummy Site?

1. **Controlled Environment** - No external dependencies or API calls
2. **Predictable Behavior** - Consistent responses for testing
3. **Stable Locators** - Elements have fixed IDs and classes
4. **No Side Effects** - Tests don't affect real data
5. **Fast Execution** - Lightweight, loads quickly
6. **Educational** - Clear demonstration of test automation concepts

### Target Audience

- QA Engineers learning test automation
- Students studying software testing
- Developers practicing Selenium/TestNG
- Anyone interested in test automation frameworks

---

## ✨ Features

### Implemented Functionality

#### User Story 01 (US01) - User Registration
- ✅ Registration form with validation
- ✅ Username, email, and password fields
- ✅ Privacy policy checkbox
- ✅ Success/error messages
- ✅ Duplicate user detection

#### User Story 02 (US02) - User Login
- ✅ Login form with credentials
- ✅ Username/email and password fields
- ✅ Login validation
- ✅ Success/error feedback
- ✅ Session management (simulated)

#### User Story 03 (US03) - Billing Address
- ✅ Billing address form
- ✅ All required fields (name, address, city, state, ZIP, phone)
- ✅ Field validation
- ✅ Save/edit functionality
- ✅ Auto-fill for registered users

#### User Story 04 (US04) - Shipping Address
- ✅ Shipping address form
- ✅ Similar structure to billing address
- ✅ "Same as billing" option
- ✅ Multiple address support

---

## 🧪 Test Scenarios

### US01 - User Registration Test Cases

| Test Case ID | Description | Expected Result |
|--------------|-------------|-----------------|
| TC01 | Sign up when all fields filled | Registration successful |
| TC02 | Sign up with existing username | Error: "Username already exists" |
| TC03 | Sign up without privacy policy | Error: "Must agree to policy" |
| TC04 | Sign up with invalid email | Error: "Invalid email format" |
| TC05 | Sign up with weak password | Error: "Password too weak" |

### US02 - User Login Test Cases

| Test Case ID | Description | Expected Result |
|--------------|-------------|-----------------|
| TC01 | Login with valid credentials | Login successful, redirect to account |
| TC02 | Login with invalid password | Error: "Invalid credentials" |
| TC03 | Login with non-existent user | Error: "User not found" |
| TC04 | Login with empty fields | Error: "Please fill all fields" |

### US03 - Billing Address Test Cases

| Test Case ID | Description | Expected Result |
|--------------|-------------|-----------------|
| TC01 | Save address with all fields | Address saved successfully |
| TC02 | Save without country/region | Error: "Country required" |
| TC03 | Save without street address | Error: "Street address required" |
| TC04 | Save without town/city | Error: "City required" |
| TC05 | Save without state | Error: "State required" |
| TC06 | Save without ZIP code | Error: "ZIP code required" |
| TC07 | Save without phone | Error: "Phone required" |
| TC08 | Save with all fields empty | Error: "Please fill required fields" |
| TC09 | Auto-fill when editing | First name, last name, email auto-filled |
| TC10 | Address changed message | Success message displayed |
| TC11 | Invalid ZIP code | Error: "Invalid ZIP format" |
| TC12 | Invalid phone number | Error: "Invalid phone format" |
| TC13 | Valid form submission | Address saved to account |

---

## 🔍 Element Locators

### Registration Form (US01)

```html
<!-- Register Link -->
<a class="register inline-type" id="link-register">Register</a>

<!-- Registration Form Fields -->
<input id="reg_username" name="reg_username" type="text" />
<input id="reg_email" name="reg_email" type="email" />
<input id="reg_password" name="reg_password" type="password" />
<input id="register-policy" name="register-policy" type="checkbox" />
<button name="register" type="submit">Sign Up</button>

<!-- Status Messages -->
<div id="status-1" class="submit-status"></div>
<div id="status-2" class="submit-status">An account is already registered...</div>
```

### Login Form (US02)

```html
<!-- Sign In Link -->
<a class="w-icon-account" id="link-signin">Sign In</a>

<!-- Login Form Fields -->
<input id="username" name="username" type="text" />
<input id="password" name="password" type="password" />
<button name="login" type="submit">Log in</button>

<!-- Status Messages -->
<div id="login-error" class="submit-status login-error"></div>
<div id="login-fillout" class="submit-status login-error"></div>

<!-- After Login -->
<h2 class="page-title">My Account</h2>
<a class="login logout inline-type" id="link-signout">Sign Out</a>
```

### Billing Address Form (US03)

```html
<!-- Addresses Link -->
<a id="link-addresses">Addresses</a>

<!-- Add/Edit Billing Address -->
<a id="link-billing-add" class="edit btn btn-link btn-primary">ADD</a>
<a id="link-edit-billing" class="edit btn btn-link btn-primary">Edit</a>

<!-- Billing Form Fields -->
<input id="billing_first_name" name="billing_first_name" type="text" />
<input id="billing_last_name" name="billing_last_name" type="text" />
<input id="billing_email" name="billing_email" type="email" />
<input id="billing_country_field" name="billing_country" type="text" />
<input id="billing_address_1" name="billing_address_1" type="text" />
<input id="billing_city" name="billing_city" type="text" />
<input id="billing_state_field" name="billing_state" type="text" />
<input id="billing_postcode" name="billing_postcode" type="text" />
<input id="billing_phone" name="billing_phone" type="text" />
<button class="btn btn-dark btn-rounded btn-sm" type="submit">Save Address</button>

<!-- Status Messages -->
<div id="billing-success" class="submit-status"></div>
<div id="billing-error" class="woocommerce-error"></div>
```

### Page Object Model (POM) Mapping

All locators are designed to work with the `Anasayfa.java` Page Object class:

```java
// Example from Anasayfa.java
@FindBy(xpath = "//*[@class='register inline-type']")
public WebElement registerAs;

@FindBy(xpath = "//*[@id='reg_username']")
public WebElement usernameAs;

@FindBy(xpath = "//*[@id='billing_first_name']")
public WebElement adressesFirstNameAs;
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (for running local server)
- Or any HTTP server (Python, PHP, etc.)

### Running the Site

#### Option 1: Using npx serve (Recommended)

```bash
# Navigate to test-site directory
cd test-site

# Run server on port 1510
npx serve -l 1510
```

Site will be available at: `http://localhost:1510`

#### Option 2: Using Python

```bash
# Python 3
python -m http.server 1510

# Python 2
python -m SimpleHTTPServer 1510
```

#### Option 3: Using PHP

```bash
php -S localhost:1510
```

#### Option 4: Using Live Server (VS Code)

1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Configure port to 1510 in settings

---

## 📁 File Structure

```
test-site/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Styles for the site
├── js/
│   └── app.js             # JavaScript for form handling
├── docs/
│   ├── images/
│   │   └── vizja-logo.png
│   └── screenshots/
└── README.md
```

### File Descriptions

#### `index.html`
Main HTML file containing:
- Header with navigation
- Registration form (US01)
- Login form (US02)
- My Account section
- Billing address form (US03)
- Shipping address form (US04)

#### `css/style.css`
Styling for:
- Responsive layout
- Form elements
- Buttons and inputs
- Status messages
- Mobile optimization

#### `js/app.js`
JavaScript for:
- Form validation
- Tab switching (Register/Login)
- Local storage simulation
- Success/error messages
- Form submission handling

---

## 📖 Usage

### For Test Automation

1. **Start the test site**
   ```bash
   npx serve -l 1510
   ```

2. **Configure test base URL**
   ```properties
   # configuration.properties
   testSiteUrl=http://localhost:1510
   ```

3. **Run tests**
   ```bash
   # From backend directory
   mvn test -Dtest=Us01_KullaniciKaydiYapilabilmeli
   ```

### For Manual Testing

1. Open `http://localhost:1510` in browser
2. Try registration flow:
   - Click "Register"
   - Fill in username, email, password
   - Check privacy policy
   - Click "Sign Up"
3. Try login flow:
   - Click "Sign In"
   - Enter credentials
   - Click "Log in"
4. Try address management:
   - Click "Addresses"
   - Click "ADD" for billing address
   - Fill in all fields
   - Click "Save Address"

---

## 🎨 Customization

### Adding New Test Scenarios

1. **Add HTML elements** in `index.html`
2. **Add styling** in `css/style.css`
3. **Add behavior** in `js/app.js`
4. **Create test case** in backend test suite
5. **Update README** with new locators

### Modifying Existing Forms

1. Keep existing `id` and `class` attributes for compatibility
2. Update `Anasayfa.java` if locators change
3. Test with existing test suite
4. Document changes in README

---

## 🤝 Contributing

This is a graduation thesis project. Contributions are welcome for educational purposes.

### Guidelines

- Keep the site simple and predictable
- Don't add external dependencies
- Maintain stable element locators
- Document all changes
- Test with existing test suite

---

## 📄 License

This project is part of a graduation thesis at the **Vizja University**.

**Student:** Buğra Han (ID: 42078)  
**Academic Year:** 2025/2026

---

## 📞 Contact

**Buğra Han**  
Student ID: 42078  
Vizja University

---

<div align="center">
  <p>Made it for graduation thesis</p>
  <p>© 2026 Uniwersytet Vizja - All Rights Reserved</p>
</div>
