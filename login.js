document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault(); 
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      const loginData = {
        email,
        password
      };
  
      try {
  
        const response = await fetch('http://localhost:3000/signinon/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
  
        if (response.ok) {
          const message = await response.text();
          alert(message); 
          window.location.href='http://localhost:3000/index.html';
        } else {
          const errorText = await response.text();
          alert(errorText);
        }
      } catch (error) {
        console.error('Error:', error);
        alert("An unexpected error occurred.");
      }
    });
  });