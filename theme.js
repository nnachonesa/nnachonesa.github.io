let button = document.getElementById('bt'),
    id = 0

button.addEventListener('click', () => {
    if (id === 0) {
        changeWhite()
        id++
    } else {
        changeBlack()
        id--
    }
})

function changeWhite() {
    document.body.style.backgroundColor = "#FFF" // white
    document.body.style.color = '#000'
}
function changeBlack() {
    document.body.style.backgroundColor = "#000" // black
    document.body.style.color = '#FFF'
}