document.addEventListener("DOMContentLoaded", function () {
  const searchToggle = document.querySelector('.toggle-mobile-search');
  const mobileSearch = document.querySelector('.mobile-search-input');
  const navToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.getElementById('navbarContent');

  // Toggle search bar
  if (searchToggle && mobileSearch) {
    searchToggle.addEventListener('click', (e) => {
      e.preventDefault();

      // Close nav menu if open
      if (navbarCollapse.classList.contains('show')) {
        navToggler.click(); // trigger collapse
      }

      mobileSearch.classList.toggle('active');
    });
  }

  // Close search if nav toggler clicked
  if (navToggler) {
    navToggler.addEventListener('click', () => {
      if (mobileSearch.classList.contains('active')) {
        mobileSearch.classList.remove('active');
      }
    });
  }
});

// Contact form validation and success message
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const successMsg = document.getElementById("contactSuccess");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (contactForm.checkValidity()) {
        successMsg.classList.remove("d-none");
        contactForm.reset();
      } else {
        contactForm.reportValidity();
      }
    });
  }
});
