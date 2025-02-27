document.getElementById('location-btn').onclick = function() {
  window.location.href = 'my-location.html';
};

document.getElementById('transport-btn').onclick = function() {
  window.location.href = 'accessible-beaches.html';
};

document.getElementById('shores-btn').onclick = function() {
  window.location.href = 'all-shores.html';
};

document.getElementById('who-we-are-btn').onclick = function() {
  window.location.href = 'who-are-we.html';
};

// SEARCH FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-bar input");
  const buttons = document.querySelectorAll(".button"); // Select all buttons

  searchInput.addEventListener("input", function () {
      const query = searchInput.value.toLowerCase().trim();

      buttons.forEach(button => {
          const buttonText = button.innerText.toLowerCase();
          if (buttonText.includes(query)) {
              button.style.display = "flex"; // Show matching buttons
          } else {
              button.style.display = "none"; // Hide non-matching buttons
          }
      });
  });
});
