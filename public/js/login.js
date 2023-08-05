const afterLoginPath = '/dashboard';

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace(afterLoginPath);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('click', loginFormHandler);






  // // Get the login form element
// const loginForm = document.querySelector('#login-form');

// // Add event listener to the login form
// loginForm.addEventListener('submit', e => {
//   e.preventDefault(); // Prevent form submission

//   // Get the entered username and password values
//   const username = document.querySelector('#username').value;
//   const password = document.querySelector('#password').value;

//   // Perform basic validation
//   if (username && password) {
//     // Simulate login functionality
//     // Replace this with your actual login logic
//     if (username === 'admin' && password === 'password') {
//       // Successful login, redirect to the home page or perform necessary actions
//       window.location.href = 'home.html';
//     } else {
//       // Invalid credentials, display an error message
//       alert('Invalid username or password');
//     }
//   } else {
//     // Display an error message for missing credentials
//     alert('Please enter a username and password');
//   }
// });
