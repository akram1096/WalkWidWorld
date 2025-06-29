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
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Basic validation
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  const topic = document.getElementById('topic').value;

  if (!name || !email || !subject || !message || !topic) {
    alert("Please fill in all required fields.");
    return;
  }

  // Email format check (simple)
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Simulate success
  document.getElementById('formResponse').style.display = 'block';
  this.reset();
});

