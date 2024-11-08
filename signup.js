document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    const errorMessage = document.getElementById('error-message');

    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault(); 

        const name = document.getElementById('names').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        
        if (password !== confirmPassword) {
            errorMessage.textContent = "Your password does not match";
            errorMessage.style.display = 'block';
            return; // Stop further execution
        } else {
            errorMessage.style.display = 'none'; 
            signupForm.reset();
        }

        
        const userData = {
            name,
            email,
            mobile,
            password
        };

        try {
            
            const response = await fetch('http://localhost:3000/signinon/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const message = await response.text();
                alert(message); 
                signupForm.reset(); 
                window.location.href='http://localhost:3000/login.html';
            } else {
                const errorText = await response.text();
                errorMessage.textContent = errorText; 
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessage.textContent = "An unexpected error occurred.";
            errorMessage.style.display = 'block';
        }
    });
});