document.addEventListener('DOMContentLoaded', async function () {
  const userName = document.getElementById('user-name');
  const userEmail = document.getElementById('user-email');
  const userMobile = document.getElementById('user-mobile');
  const logoutBtn = document.getElementById('logout-btn');

  // Fetch user details from the server
  try {
    const response = await fetch('http://localhost:3000/signinon/account', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for session-based authentication
    });

    if (response.ok) {
      const userData = await response.json();
      userName.textContent = `Name: ${userData.name}`;
      userEmail.textContent = `Email: ${userData.email}`;
      userMobile.textContent = `Mobile: ${userData.mobile}`;
    } else if (response.status === 401) {
      alert("User not logged in. Redirecting to login page...");
      window.location.href = 'http://localhost:3000/login.html';
    } else {
      alert("Failed to load account details.");
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    alert("An unexpected error occurred.");
  }

  // Handle logout functionality
  logoutBtn.addEventListener('click', async function () {
    try {
      const response = await fetch('http://localhost:3000/signinon/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        alert("Logged out successfully!");
        window.location.href = 'http://localhost:3000/login.html';
      } else {
        alert("Failed to log out.");
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert("An unexpected error occurred.");
    }
  });
});
