
// Login Form Submission
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
  
    // Get input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Basic Validation
    if (email.trim() === '') {
      alert('Please enter your email address!');
      return;
    }
  
    if (!validateEmail(email)) {
      alert('Please enter a valid email address!');
      return;
    }
  
    if (password.trim() === '') {
      alert('Please enter your password!');
      return;
    }
  
    // Simulate a successful login
    alert('Login successful! Redirecting to the dashboard...');
    // You can redirect the user to another page here, e.g.:
    // window.location.href = 'dashboard.html';
  });
  
  // Email Validation Function
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return regex.test(email);
  }
  document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const playerName = document.getElementById('email').value.trim();
    
    if (playerName) {
        localStorage.setItem('currentPlayer', playerName);
        window.location.href = 'index.html'; // Or the home page after login
    }
});
