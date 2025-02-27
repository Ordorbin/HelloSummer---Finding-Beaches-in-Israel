document.addEventListener("DOMContentLoaded", () => {
    // Initialize the map centered on a default location
    const map = L.map('map').setView([32.0853, 34.7818], 13); // Default to Tel Aviv
  
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    // Function to display the user's location
    function showUserLocation(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      // Add a marker for the user's location
      L.marker([latitude, longitude]).addTo(map)
        .bindPopup("You are here!")
        .openPopup();
  
      // Center the map on the user's location
      map.setView([latitude, longitude], 15);
    }
  
    // Handle geolocation errors
    function handleLocationError(error) {
      alert("Error getting your location: " + error.message);
    }
  
    // Request user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showUserLocation, handleLocationError);
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  });
  
  document.getElementById('transport-btn').addEventListener('click', () => {
    window.location.href = 'accessible-beaches.html';
  });
  