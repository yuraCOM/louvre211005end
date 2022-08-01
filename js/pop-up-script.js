const buyNowTicket = document.querySelector('.buy-now')
const popClose = document.querySelector('.pop-close')
const coverDiv = document.querySelector('#cover-div')

buyNowTicket.addEventListener('click', getPopUpForm)
popClose.addEventListener('click', closePopUpForm)

function getPopUpForm() {
    document.querySelector('.pop-container').classList.add('active')
    coverDiv.style.display = 'block'
}


function closePopUpForm() {
    document.querySelector('.pop-container').classList.remove('active')
    coverDiv.style.display = 'none'

}

window.onclick = function(event) {
    // console.log(event)
    if (event.target === coverDiv) {
        coverDiv.style.display = "none";
        document.querySelector('.pop-container').classList.remove('active')
    }
}