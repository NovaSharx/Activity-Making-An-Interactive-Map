async function getCoords() {
    return await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
}

async function renderMap(latitude, longitude) {
    // set map view
    map.setView([latitude, longitude], 13)

    // add openstreetmap tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map)

    // create and add geolocation marker for user's location
    const marker = L.marker([latitude, longitude]).addTo(map)
    marker.bindPopup(`<p1><b>You are here</b></p1>`).openPopup();
}

async function loadSelection(searchItem, latitude, longitude) {
    await fetch(`https://api.foursquare.com/v3/places/search?query=${searchItem}&ll=${latitude}%2C${longitude}8&limit=5`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'fsq3d9s+4nzsOex0CB/YUCOZ0Bss2HxJ2OG3UU/r/ZiVOjk='
        }
    })
        .then(response => response.json())
        .then(response => processResults(response))
        .catch(err => console.error(err));
}

function processResults(response) {

    response.results.forEach(location => {
        let latitude = location.geocodes.main.latitude
        let longitude = location.geocodes.main.longitude
        let name = location.name

        loadMarker(latitude, longitude, name)
    })
}

function loadMarker(latitude, longitude, name) {
    // create and add geolocation marker
    const marker = L.marker([latitude, longitude], { icon: pin }).addTo(layerGroup)
    marker.bindPopup(`<p1><b>${name}</b></p1>`)
}

function changePinColor(searchItem) {
    switch (searchItem) {
        case 'Coffee':
            pinColor = 'red'
            break;
        case 'Restaurant':
            pinColor = 'green'
            break;
        case 'Hotel':
            pinColor = 'blue'
            break;
        case 'Market':
            pinColor = 'yellow'
            break;
    }

    console.log(pinColor)

    // create red pin marker
    pin = L.icon({
        iconUrl: `./assets/${pinColor}-pin.png`,
        iconSize: [38, 38],
        iconAnchor: [19, 38]
    })
}
