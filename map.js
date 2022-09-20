async function renderMap(location) {
    let [latitude, longitude] = coords
    // create map
    const map = L.map('map').setView([latitude, longitude], 13)

    // add openstreetmap tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map)

    // create and main add geolocation marker
    const marker = L.marker([latitude, longitude]).addTo(map)
    marker.bindPopup("<p1><b>You are here</b></p1>").openPopup();
}

