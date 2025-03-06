document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.onscroll = () => {
      if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
  }
});

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var todayDate = String(date.getDate());
var datepattern = todayDate + " / " + month + " / " + year;

console.log(datepattern);
document.getElementById("date-picker").value = datepattern;

document.getElementById('email').addEventListener('input', function () {
    const email = this.value;
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      this.classList.add('is-invalid');
      emailError.textContent = 'Please enter a valid email address (must contain @ and .)';
    } else {
      this.classList.remove('is-invalid');
      this.classList.add('is-valid');
      emailError.textContent = '';
    }
  });

document.getElementById('percentage').addEventListener('input', function () {
    let value = parseFloat(this.value);
    if (value > 100) {
      this.value = 100;
    } else if (value < 0) {
      this.value = 0;
    }
  });

function handleOtherOption(selectId, inputId) {
    const select = document.getElementById(selectId);
    const input = document.getElementById(inputId);

    select.addEventListener('change', function() {
      if (this.value === 'Others') {
        input.style.display = 'block';
        input.required = true;
        this.name = selectId + 'Select';
      } else {
        input.style.display = 'none';
        input.required = false;
        this.name = selectId;
      }
    });
  }

  handleOtherOption('experience', 'experienceOther');
  handleOtherOption('Events', 'EventsOther');
  handleOtherOption('Position', 'PositionOther');
  handleOtherOption('city', 'cityOther');

  const submittedEntries = []; // Array to store submitted entries

  const scriptURL = 'https://script.google.com/macros/s/AKfycbyMbX1xBjneceUxoX98-bg0ibM2PkdNFLpcN-XgkIMM5G7GOtOSmHclZ9r3ClnPE3x2/exec';
  const form = document.forms['submit-to-google-sheet'];
  const msg = document.getElementById("msg");

  form.addEventListener('submit', e => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value; // Get the full name
    const email = document.getElementById('email').value; // Get the email
    const phoneNumber = document.getElementById('phoneNumber').value; // Get the phone number

    // Check for duplicates
    const isDuplicate = submittedEntries.some(entry => 
      entry.fullName === fullName || 
      entry.email === email || 
      entry.phoneNumber === phoneNumber
    );
    console.log(phoneNumber);

    if (isDuplicate) {
      alert("This entry has already been submitted.");
      return; // Stop submission if duplicate found
    }

    // Proceed with submission
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        submittedEntries.push({ fullName, email, phoneNumber }); // Store the submitted entry
        msg.innerHTML = "Congratulations! Our Recruitment team will get in touch with you soon. Have a great day ✅.";
        form.reset(); // Reset the form
      })
      .catch(error => console.error('Error!', error.message));
  });