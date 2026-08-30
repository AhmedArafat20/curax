/* ==========================================================================
   CURAX — CONTACT.JS
   Frontend-only form validation + submit UX. No backend is connected —
   see the clearly marked placeholder below for where an API call goes.
   ========================================================================== */

(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    const success = document.querySelector('.form-success');
    const bannerError = document.querySelector('.form-banner-error');
    const submitBtn = form.querySelector('.submit-btn');

    function validateField(field) {
      const wrap = field.closest('.form-field');
      if (!wrap) return true;
      const value = field.value.trim();
      const required = field.hasAttribute('data-required');
      let fieldValid = true;

      if (required && value === '') fieldValid = false;
      if (field.type === 'email' && value !== '') {
        fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }

      wrap.classList.toggle('invalid', !fieldValid);
      wrap.classList.toggle('valid', fieldValid && value !== '');
      wrap.classList.toggle('has-value', value !== '');
      return fieldValid;
    }

    form.querySelectorAll('input, textarea, select').forEach((field) => {
      field.addEventListener('input', () => validateField(field));
      field.addEventListener('blur', () => validateField(field));
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (bannerError) bannerError.classList.remove('show');

      let valid = true;
      form.querySelectorAll('[data-required]').forEach((field) => {
        if (!validateField(field)) valid = false;
      });
      if (!valid) return;

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      /* ------------------------------------------------------------------
         BACKEND PLACEHOLDER
         No backend is connected in this build. Replace the block below
         with a real request once an endpoint exists, e.g.:

         fetch('[CONTACT_API_ENDPOINT]', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(Object.fromEntries(new FormData(form)))
         })
           .then((res) => { if (!res.ok) throw new Error('Request failed'); })
           .then(showSuccess)
           .catch(showFailure);
      ------------------------------------------------------------------- */
      window.setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        showSuccess();
      }, 900);
    });

    function showSuccess() {
      form.reset();
      form.querySelectorAll('.form-field').forEach((f) => f.classList.remove('has-value', 'invalid', 'valid'));
      form.style.display = 'none';
      if (success) success.classList.add('show');
    }

    // Exposed for future backend wiring: call window.curaxContactError() to
    // show the error banner with a retry link instead of the success state.
    window.curaxContactError = function curaxContactError() {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      if (bannerError) bannerError.classList.add('show');
    };

    const retryBtn = document.querySelector('.form-banner-error .retry-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (bannerError) bannerError.classList.remove('show');
      });
    }
  });
})();
