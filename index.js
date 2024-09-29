// Define submitForm function
async function submitForm(event) {
    event.preventDefault(); // Prevent form submission

    const submitButton = document.querySelector(".submit-button");
    submitButton.classList.add("active-hover");

    const fileInput = document.getElementById('picture');
    const file = fileInput.files[0];

    // Show loader and change button text
    document.getElementById('submit-text').innerText = 'Please wait...';
    document.getElementById('loader').style.display = 'inline-block';

    const whatsappNumber = document.getElementById("whatsapp-number").value.replace(/[\s+]/g, ""); // Remove spaces and '+' sign

    // Collect form data
    const formData = {
        Name: document.getElementById('name').value,
        Nickname: document.getElementById('nickname').value,
        "Whatsapp Number": whatsappNumber,
        Email: document.getElementById('email').value,
        "Date of Birth": document.getElementById('dob').value,
        Picture: file // Send the file directly to the backend
    };

    try {
        // Send formData to your backend server
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ formData, file })
        });

        const result = await response.json();

        if (result.message === 'Form submitted successfully!') {
            // Show success message
            showPopup(); // Call showPopup function to display confirmation
            document.getElementById('submit-text').innerText = 'Submit';
            document.getElementById('loader').style.display = 'none';
            submitButton.classList.remove("active-hover"); // Remove hover state once submitted
            // Reset the form
            document.getElementById('form').reset();
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form: ' + error.message);
        document.getElementById('submit-text').innerText = 'Submit';
        document.getElementById('loader').style.display = 'none';
        submitButton.classList.remove("active-hover"); // Remove hover state on error
    }
}

// Validate form data
function validateForm(formData, file) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.Email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (!file || !['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        alert('Please upload an image file (JPG, JPEG, PNG, GIF).');
        return false;
    }

    return true;
}

// Show the popup when the form is successfully submitted
function showPopup() {
    const popupOverlay = document.querySelector('.popup-overlay');
    popupOverlay.style.display = 'flex';
}

// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('form').addEventListener('submit', submitForm);

    // Listen for Enter key press to trigger form submission
    form.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent default Enter behavior
            submitForm(event); // Call submitForm function
        }
    });

    const okButton = document.getElementById('ok-button');
    const popupOverlay = document.querySelector('.popup-overlay');

    // Reload the page when the OK button is clicked and hide the popup
    okButton.addEventListener('click', function () {
        location.reload();
        popupOverlay.style.display = 'none';
    });

    okButton.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            location.reload();
            popupOverlay.style.display = 'none';
        }
    });
});
