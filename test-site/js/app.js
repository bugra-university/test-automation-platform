(function () {
  'use strict';

  // Known duplicate credentials (from configuration.properties — tests use these for US02)
  var DUPLICATE_USERNAMES = ['woody1', 'username1as', 'aa1'];
  var DUPLICATE_EMAILS = ['woody.ansley@feerock.com', 'signInEmail1', 'kajetan.juanito@feerock.com'];

  // Valid login credentials for US02/US03 (username/email -> password)
  var VALID_LOGINS = {
    'aa1': 'A123a&4567890',
    'woody1': 'Sifre123456?',
    'woody.ansley@feerock.com': 'Sifre123456?',
    'kajetan.juanito@feerock.com': 'A123a&4567890',
    'raydin.nathanael@feerock.com': 'Sifre123456?',
    'aris.saw@feerock.com': 'Sifre123456?',
    'jossiel.lavante@feerock.com': 'Sifre123456?',
    'karnell.jordyan@feerock.com': 'Sifre123456?',
    'brennon.jeziel@feerock.com': '1234##'
  };

  var linkRegister = document.getElementById('link-register');
  var linkSignin = document.getElementById('link-signin');
  var linkSignout = document.getElementById('link-signout');
  var panelAuth = document.getElementById('panel-auth');
  var panelRegister = document.getElementById('panel-register');
  var panelLogin = document.getElementById('panel-login');
  var panelAccount = document.getElementById('panel-account');
  var tabRegister = document.getElementById('tab-register');
  var tabLogin = document.getElementById('tab-login');
  var formRegister = document.getElementById('form-register');
  var formLogin = document.getElementById('form-login');
  var status1 = document.getElementById('status-1');
  var status2 = document.getElementById('status-2');

  function switchToRegisterTab() {
    panelRegister.classList.add('active');
    panelRegister.removeAttribute('hidden');
    panelLogin.classList.remove('active');
    panelLogin.setAttribute('hidden', '');
    if (tabRegister) { tabRegister.classList.add('active'); tabRegister.setAttribute('aria-selected', 'true'); }
    if (tabLogin) { tabLogin.classList.remove('active'); tabLogin.setAttribute('aria-selected', 'false'); }
  }

  function switchToLoginTab() {
    panelLogin.classList.add('active');
    panelLogin.removeAttribute('hidden');
    panelRegister.classList.remove('active');
    panelRegister.setAttribute('hidden', '');
    if (tabLogin) { tabLogin.classList.add('active'); tabLogin.setAttribute('aria-selected', 'true'); }
    if (tabRegister) { tabRegister.classList.remove('active'); tabRegister.setAttribute('aria-selected', 'false'); }
  }

  function showPanel(panel) {
    if (panel === panelAccount) {
      if (panelAuth) panelAuth.style.display = 'none';
      if (panelAccount) panelAccount.style.display = 'block';
    } else {
      if (panelAuth) panelAuth.style.display = 'block';
      if (panelAccount) panelAccount.style.display = 'none';
      if (panel === panelRegister) switchToRegisterTab();
      else if (panel === panelLogin) switchToLoginTab();
    }
  }

  function setSignedIn(signedIn) {
    linkSignout.style.display = signedIn ? 'inline-block' : 'none';
    linkSignin.style.display = signedIn ? 'none' : 'inline-block';
    linkRegister.style.display = signedIn ? 'none' : 'inline-block';
    if (signedIn) {
      if (panelAuth) panelAuth.style.display = 'none';
      if (panelAccount) panelAccount.style.display = 'block';
    }
  }

  function hideDuplicateError() {
    if (status1) status1.style.display = 'none';
    if (status2) status2.style.display = 'none';
  }

  function showDuplicateError() {
    if (status1) status1.style.display = 'none';
    if (status2) {
      status2.textContent = 'An account is already registered with that username or email. Please log in.';
      status2.style.display = 'block';
    }
  }

  function isDuplicateRegistration(username, email) {
    var u = (username || '').trim().toLowerCase();
    var e = (email || '').trim().toLowerCase();
    if (DUPLICATE_USERNAMES.some(function (x) { return x.toLowerCase() === u; })) return true;
    if (DUPLICATE_EMAILS.some(function (x) { return x.toLowerCase() === e; })) return true;
    return false;
  }

  linkRegister.addEventListener('click', function (e) {
    e.preventDefault();
    hideDuplicateError();
    showPanel(panelRegister);
  });

  linkSignin.addEventListener('click', function (e) {
    e.preventDefault();
    showPanel(panelLogin);
  });

  linkSignout.addEventListener('click', function (e) {
    e.preventDefault();
    setSignedIn(false);
    if (panelAccount) panelAccount.style.display = 'none';
    if (panelAuth) panelAuth.style.display = 'block';
    switchToRegisterTab();
  });

  if (tabRegister) {
    tabRegister.addEventListener('click', function (e) {
      e.preventDefault();
      hideDuplicateError();
      switchToRegisterTab();
    });
  }
  if (tabLogin) {
    tabLogin.addEventListener('click', function (e) {
      e.preventDefault();
      switchToLoginTab();
    });
  }

  function hideRegisterValidation() {
    if (status1) status1.style.display = 'none';
  }

  function showRegisterValidation(msg) {
    if (status2) status2.style.display = 'none';
    if (status1) {
      status1.textContent = msg || 'Please fill this area.';
      status1.style.display = 'block';
    }
  }

  formRegister.addEventListener('submit', function (e) {
    e.preventDefault();
    hideDuplicateError();
    hideRegisterValidation();

    var username = (document.getElementById('reg_username') && document.getElementById('reg_username').value) || '';
    var email = (document.getElementById('reg_email') && document.getElementById('reg_email').value) || '';
    var password = (document.getElementById('reg_password') && document.getElementById('reg_password').value) || '';
    var policy = document.getElementById('register-policy') && document.getElementById('register-policy').checked;

    if (!policy) {
      showRegisterValidation('If you want to register, please tick this box.');
      return;
    }
    if (!username.trim()) {
      showRegisterValidation('Please fill this area.');
      return;
    }
    if (!email.trim()) {
      showRegisterValidation('Please fill this area.');
      return;
    }
    if (!password.trim()) {
      showRegisterValidation('Please fill this area.');
      return;
    }
    if (password.length < 12) {
      showRegisterValidation('Please fill this area.');
      return;
    }
    // TC11: Password cannot be digits-only
    if (/^\d+$/.test(password)) {
      showRegisterValidation('Password cannot contain only digits.');
      return;
    }
    // Password must contain at least one letter
    if (!/[a-zA-Z]/.test(password)) {
      showRegisterValidation('Password must contain at least one letter.');
      return;
    }
    if (email.indexOf('@') === -1) {
      showRegisterValidation('Please enter an appropriate email address.');
      return;
    }
    if (!/\.(com|net|org|edu)$/i.test(email.split('@')[1] || '')) {
      showRegisterValidation('Please provide a valid email address.');
      return;
    }

    if (isDuplicateRegistration(username, email)) {
      showDuplicateError();
      return;
    }

    setSignedIn(true);
    showPanel(panelAccount);
  });

  var loginError = document.getElementById('login-error');
  var loginFillout = document.getElementById('login-fillout');

  function hideLoginErrors() {
    if (loginError) loginError.style.display = 'none';
    if (loginFillout) loginFillout.style.display = 'none';
  }

  function showLoginError(msg) {
    hideLoginErrors();
    if (loginError) {
      loginError.textContent = msg || 'Wrong username or password.';
      loginError.style.display = 'block';
    }
  }

  function showLoginFillOut() {
    hideLoginErrors();
    if (loginFillout) {
      loginFillout.textContent = 'Fill out this area.';
      loginFillout.style.display = 'block';
    }
  }

  formLogin.addEventListener('submit', function (e) {
    e.preventDefault();
    hideLoginErrors();
    var user = document.getElementById('username') && document.getElementById('username').value;
    var pass = document.getElementById('password') && document.getElementById('password').value;
    var userTrim = (user || '').trim();
    var passTrim = (pass || '').trim();

    if (!userTrim || !passTrim) {
      showLoginFillOut();
      return;
    }
    var key = Object.keys(VALID_LOGINS).find(function (k) { return k.toLowerCase() === userTrim.toLowerCase(); });
    var expectedPass = key ? VALID_LOGINS[key] : null;
    if (expectedPass && passTrim === expectedPass) {
      setSignedIn(true);
      showPanel(panelAccount);
    } else {
      showLoginError('Wrong username or password.');
    }
  });

  // US03 Billing Address
  var panelBilling = document.getElementById('panel-billing');
  var linkAddresses = document.getElementById('link-addresses');
  var linkBillingAdd = document.getElementById('link-billing-add');
  var formBilling = document.getElementById('form-billing');
  var billingSuccess = document.getElementById('billing-success');
  var billingError = document.getElementById('billing-error');

  function showBillingPanel() {
    if (panelAuth) panelAuth.style.display = 'none';
    if (panelAccount) panelAccount.style.display = 'none';
    if (panelBilling) panelBilling.style.display = 'block';
  }

  function showAccountPanel() {
    if (panelBilling) panelBilling.style.display = 'none';
    if (panelAccount) panelAccount.style.display = 'block';
  }

  // Addresses: stay on account panel so ADD link stays visible (test clicks Addresses then ADD)
  if (linkAddresses) {
    linkAddresses.addEventListener('click', function (e) {
      e.preventDefault();
      showAccountPanel();
      var el = document.getElementById('link-billing-add');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }
  if (linkBillingAdd) {
    linkBillingAdd.addEventListener('click', function (e) {
      e.preventDefault();
      clearBillingForm();
      showBillingPanel();
    });
  }

  var linkEditBilling = document.getElementById('link-edit-billing');
  function clearBillingForm() {
    var fn = document.getElementById('billing_first_name');
    var ln = document.getElementById('billing_last_name');
    var em = document.getElementById('billing_email');
    if (fn) { fn.value = ''; fn.removeAttribute('value'); }
    if (ln) { ln.value = ''; ln.removeAttribute('value'); }
    if (em) { em.value = ''; em.removeAttribute('value'); }
  }
  function prefillBillingFormForEdit() {
    var fn = document.getElementById('billing_first_name');
    var ln = document.getElementById('billing_last_name');
    var em = document.getElementById('billing_email');
    if (fn) { fn.value = 'jüpiter'; fn.setAttribute('value', 'jüpiter'); }
    if (ln) { ln.value = 'neptün'; ln.setAttribute('value', 'neptün'); }
    if (em) { em.value = 'jossiel.lavante@feerock.com'; em.setAttribute('value', 'jossiel.lavante@feerock.com'); }
  }
  if (linkEditBilling) {
    linkEditBilling.addEventListener('click', function (e) {
      e.preventDefault();
      prefillBillingFormForEdit();
      showBillingPanel();
    });
  }

  if (formBilling) {
    formBilling.addEventListener('submit', function (e) {
      e.preventDefault();
      if (billingSuccess) billingSuccess.style.display = 'none';
      if (billingError) billingError.style.display = 'none';

      var firstName = (document.getElementById('billing_first_name') && document.getElementById('billing_first_name').value) || '';
      var lastName = (document.getElementById('billing_last_name') && document.getElementById('billing_last_name').value) || '';
      var country = (document.getElementById('billing_country_field') && document.getElementById('billing_country_field').value) || '';
      var street = (document.getElementById('billing_address_1') && document.getElementById('billing_address_1').value) || '';
      var city = (document.getElementById('billing_city') && document.getElementById('billing_city').value) || '';
      var state = (document.getElementById('billing_state_field') && document.getElementById('billing_state_field').value) || '';
      var zip = (document.getElementById('billing_postcode') && document.getElementById('billing_postcode').value) || '';
      var phone = (document.getElementById('billing_phone') && document.getElementById('billing_phone').value) || '';

      if (!firstName.trim() || !lastName.trim() || !country.trim() || !street.trim() || !city.trim() || !state.trim() || !zip.trim() || !phone.trim()) {
        if (billingError) {
          billingError.textContent = 'Please fill all required fields.';
          billingError.style.display = 'block';
        }
        return;
      }
      if (!/^\d+$/.test(zip.replace(/\s/g, ''))) {
        if (billingError) {
          billingError.textContent = 'Please enter a valid postcode/ZIP.';
          billingError.style.display = 'block';
        }
        return;
      }
      if (!/^[\d\s\-+()]+$/.test(phone.replace(/\s/g, '')) || phone.replace(/\D/g, '').length < 6) {
        if (billingError) {
          billingError.textContent = 'Please enter a valid phone number.';
          billingError.style.display = 'block';
        }
        return;
      }

      if (billingSuccess) {
        billingSuccess.textContent = 'Address changed successfully.';
        billingSuccess.style.display = 'block';
      }
      var linkEditBilling = document.getElementById('link-edit-billing');
      if (linkEditBilling) linkEditBilling.style.display = 'inline-block';
      // showAccountPanel(); // Don't hide the form immediately so we can see the success message
    });
  }

  // US04 Shipping Address
  var panelShipping = document.getElementById('panel-shipping');
  var linkEditShipping = document.getElementById('link-edit-shipping');
  var formShipping = document.getElementById('form-shipping');
  var shippingSuccess = document.getElementById('shipping-success');

  function showShippingPanel() {
    if (panelAuth) panelAuth.style.display = 'none';
    if (panelAccount) panelAccount.style.display = 'none';
    if (panelBilling) panelBilling.style.display = 'none';
    if (panelShipping) panelShipping.style.display = 'block';
  }

  function hideShippingErrors() {
    var errs = document.querySelectorAll('#form-shipping .field-error[data-id]');
    for (var i = 0; i < errs.length; i++) {
      errs[i].textContent = '';
      errs[i].style.display = 'none';
    }
    if (shippingSuccess) shippingSuccess.style.display = 'none';
  }

  function showShippingFieldError(dataId, message) {
    var el = document.querySelector('#form-shipping [data-id="' + dataId + '"]');
    if (el) {
      el.textContent = message;
      el.style.display = 'block';
    }
  }

  if (linkEditShipping) {
    linkEditShipping.addEventListener('click', function (e) {
      e.preventDefault();
      hideShippingErrors();
      showShippingPanel();
    });
  }

  if (formShipping) {
    formShipping.addEventListener('submit', function (e) {
      e.preventDefault();
      hideShippingErrors();

      var firstName = (document.getElementById('shipping_first_name') && document.getElementById('shipping_first_name').value) || '';
      var lastName = (document.getElementById('shipping_last_name') && document.getElementById('shipping_last_name').value) || '';
      var country = (document.getElementById('shipping_country') && document.getElementById('shipping_country').value) || '';
      var street1 = (document.getElementById('shipping_address_1') && document.getElementById('shipping_address_1').value) || '';
      var postcode = (document.getElementById('shipping_postcode') && document.getElementById('shipping_postcode').value) || '';
      var city = (document.getElementById('shipping_city') && document.getElementById('shipping_city').value) || '';
      var state = (document.getElementById('shipping_state') && document.getElementById('shipping_state').value) || '';

      var hasError = false;
      if (!firstName.trim()) {
        showShippingFieldError('shipping_first_name', 'First name is a required field.');
        hasError = true;
      }
      if (!lastName.trim()) {
        showShippingFieldError('shipping_last_name', 'Last name is a required field.');
        hasError = true;
      }
      if (!country.trim()) {
        showShippingFieldError('shipping_country', 'Country / Region is a required field.');
        hasError = true;
      }
      if (!street1.trim()) {
        showShippingFieldError('shipping_address_1', 'Street address is a required field.');
        hasError = true;
      }
      if (!postcode.trim()) {
        showShippingFieldError('shipping_postcode', 'Postcode / ZIP is a required field.');
        hasError = true;
      }
      if (!city.trim()) {
        showShippingFieldError('shipping_city', 'Town / City is a required field.');
        hasError = true;
      }
      if (!state.trim()) {
        showShippingFieldError('shipping_state', 'Province is a required field.');
        hasError = true;
      }
      if (hasError) return;

      if (shippingSuccess) {
        shippingSuccess.textContent = 'Address changed successfully.';
        shippingSuccess.className = 'woocommerce-message';
        shippingSuccess.style.display = 'block';
      }
    });
  }
})();
