async function main(coords) {
    renderMap(coords)
    let selections = document.querySelectorAll('.selection')
    selections.forEach((selection)=>{
        selection.addEventListener('click', (event)=> {
            console.log(event.target.textContent)
        })
    })
}

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