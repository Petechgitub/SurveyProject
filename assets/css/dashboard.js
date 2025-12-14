// Demo refugee data
const refugees = {
  male: 620,
  female: 580
};

// Update dashboard numbers
document.getElementById("maleCount").textContent = refugees.male;
document.getElementById("femaleCount").textContent = refugees.female;
document.getElementById("totalRefugees").textContent =
  refugees.male + refugees.female;

// Chart.js - Gender Distribution
new Chart(document.getElementById("genderChart"), {
  type: "doughnut",
  data: {
    labels: ["Male", "Female"],
    datasets: [{
      data: [refugees.male, refugees.female]
    }]
  }
});

// Leaflet Map
const map = L.map("map").setView([-12.8, 28.2], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
  .addTo(map);

// Camps
const camps = [
  { name: "Meheba Camp", lat: -11.0, lng: 24.3 },
  { name: "Mayukwayukwa Camp", lat: -14.7, lng: 25.8 },
  { name: "Mantapala Camp", lat: -8.6, lng: 30.8 },
  { name: "Kala Camp", lat: -9.3, lng: 28.7 }
];

camps.forEach(camp => {
  L.marker([camp.lat, camp.lng])
    .addTo(map)
    .bindPopup(camp.name);
});
