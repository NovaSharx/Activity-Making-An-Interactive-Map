// create map
const map = L.map('map').setView([48.87007, 2.346453], 13)

// add openstreetmap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map)