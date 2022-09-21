// create map
const map = L.map('map')

var layerGroup = L.layerGroup().addTo(map);
var pin = null

async function main(coords) {
    let [latitude, longitude] = coords

    // Load map
    renderMap(latitude, longitude)

    // Add event listeners to search buttons
    let selections = document.querySelectorAll('.selection')
    selections.forEach((selection) => {
        selection.addEventListener('click', async (event) => {
            let searchItem = event.target.textContent
            if (searchItem != "Clear Markers") {
                changePinColor(searchItem)
                await loadSelection(searchItem, latitude, longitude)
            }
            else {
                layerGroup.clearLayers()
            }
        })
    })
}

// Grab user location
window.onload = async () => {
    let response = await getCoords()
        .catch(err => {
            window.alert(err)
        })

    coords = [
        response.coords.latitude,
        response.coords.longitude
    ]

    main(coords)
}