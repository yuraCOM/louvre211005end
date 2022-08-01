AOS.init();

AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 100, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 0, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom' // defines which position of the element regarding to window should trigger the animation

});

const logo = document.querySelector('.logo')
const logoP = document.querySelector('.logo p')
let louvreSite = `https://louvre-museum.tickets-paris.fr/`

logo.onclick = function(){
    window.open(louvreSite)
    logoP.style.color = 'var(--color-gold)'
}

let vrCard = document.querySelector('.vr')

vrCardArr.forEach( item => {
    vrCard.innerHTML += `
    <div class="vr-card vr-card-block">
            <a class="vr-card" href="${item.http}" target="_blank"> <img src="./assets/img/vr0${vrCardArr.indexOf(item)+1}.jpg" alt="">
                <h3 class="style-title">${item.place}</h3>
                <div class="line"></div>
                <h4>360° Virtual Tour</h4>
                <p>Google Street Panorama View</p>
            </a>
         </div>
    `
})

// бургер меню адаптив 1024/768/420
const burgerMenu = document.querySelector('.burger-menu')
const welcomeInfo = document.querySelector('.welcome-info')
const popMenuWelcome = document.querySelector('.burger-nav')

burgerMenu.addEventListener('click', ()=>{
    if (burgerMenu.classList.contains('burger-menu-close')){
        burgerMenu.src = 'assets/svg/close-burger.svg'
        burgerMenu.classList.remove('burger-menu-close')
        welcomeInfo.style.opacity = 0
        popMenuWelcome.style.left = 0
    }
    else{
        burgerMenu.classList.add('burger-menu-close')
        burgerMenu.src = 'assets/svg/burger.svg'
        welcomeInfo.style.opacity = 1
        popMenuWelcome.style.left = -1000 + 'px'
    }
})

popMenuWelcome.addEventListener('click', ()=>{
    closeBurgerMenu()
})

const social = document.querySelector('.social').cloneNode(true)
popMenuWelcome.appendChild(social)


function closeBurgerMenu() {
    burgerMenu.classList.add('burger-menu-close')
    burgerMenu.src = 'assets/svg/burger.svg'
    welcomeInfo.style.opacity = 1
    popMenuWelcome.style.left = -1000 + 'px'
}

//--------------------------------
//ticket
let infoAboutTicketOrder = {
    'ticketType' : 'Choice1',
    'price' : 20,
    'basic' : 0,
    'senior' : 0,
    'total': 0
}
// окна на секции тикет
const TicketBlock = document.querySelector(".choice-ticket")//
const totalPriseSectionAmount = document.querySelector(".total-span")
const amountCountAllBtnPlusMinus = document.querySelector('.amount-count').querySelectorAll('button')
const allTypeTickets = TicketBlock.querySelectorAll("input")// all radio ticket

// данные на поп форме
let date = document.querySelector('#pop-date')
let popTime = document.querySelector('#pop-time')
let popTypeTickets = document.querySelector('#ticket-type') //select type ticket
let popTypeTicketOverview = document.querySelector('.overview-exhibition')
let popBasicPrice = document.querySelectorAll('.b-price')
let popSeniorPrice = document.querySelectorAll('.s-price')
let popBasicValue = document.querySelector('#pop-basic')
let popSeniorValue = document.querySelector('#pop-senior')
let popAmountCountBtns = document.querySelector('.amount-count-pop').querySelectorAll('button')

popTypeTickets.addEventListener('change', getPopTypeTicket)

//local store
localStorage.infoAboutTicketOrder ?
    infoAboutTicketOrder = JSON.parse(localStorage.getItem('infoAboutTicketOrder')) : false

let typeTicketPrice = infoAboutTicketOrder.price
let basicTicketValue = document.querySelector(".basic").querySelector('input').value
let seniorTicketValue = document.querySelector(".senior").querySelector('input').value


date.addEventListener('change', getDate )
function getDate() {
    // console.log(date.value)
    let data = new Date(date.value)
    // console.log(data)
    // console.log(data.getMonth())
    // console.log(data.toLocaleString('en-us',{month:'long',
    //     year:'numeric', day:'numeric', weekday: 'long'}) )
    document.querySelector('.overview-date').innerHTML = data.toLocaleString('en-us', {weekday: 'long', month:'long', day:'numeric'})
}

popTime.addEventListener('change', function () {
    // console.log(popTime.value.toString().split(':'))
    let timeSelected = popTime.value.toString().split(':')
    document.querySelector('.overview-time').innerHTML = timeSelected[0] + ' : ' + timeSelected[1]
})
updateTicketOnStart()

allTypeTickets.forEach( item=>{
    item.addEventListener('click', function () {
        item.value === 'Permanent' ? (
            typeTicketPrice = 20,
                infoAboutTicketOrder.ticketType = 'Choice1') :
            item.value === 'temporary' ? (
                typeTicketPrice = 25,
                    infoAboutTicketOrder.ticketType = 'Choice2') :
                item.value === 'combined' ? (
                    typeTicketPrice = 40,
                        infoAboutTicketOrder.ticketType = 'Choice3')  : false;
        infoAboutTicketOrder['price'] = typeTicketPrice

        getTotalPrice()
        updatePopTypeTicket()
        updateLocalStore()
        updatePopTicketTypePrice()
        updateOverSumTicket()

    })
})

amountCountAllBtnPlusMinus.forEach( item=>{
    item.addEventListener('click', ()=>{
        getTotalPrice()
        updateLocalStore()
        updatePopTypeTicket()
        updateOverSumTicket()

    })
})


function getTotalPrice() {
    let basicTicketValue = document.querySelector(".basic").querySelector('input').value
    let seniorTicketValue = document.querySelector(".senior").querySelector('input').value
    infoAboutTicketOrder.basic = +basicTicketValue
    infoAboutTicketOrder.senior = +seniorTicketValue
    totalPriseSectionAmount.innerHTML = (typeTicketPrice * basicTicketValue)
        + (typeTicketPrice * seniorTicketValue) / 2
    infoAboutTicketOrder.total = +totalPriseSectionAmount.innerHTML
    updateLocalStore()
    // console.log(infoAboutTicketOrder)

}

//стрелочная ф - записваем в локал
const updateLocalStore = ()=>{
    localStorage.setItem('infoAboutTicketOrder', JSON.stringify(infoAboutTicketOrder))
}

//функц - при старте страниццы - сомтрит на локал стор и в секции покупки белетов
// выставляет данные что были ранее выставлены
function updateTicketOnStart() {
    allTypeTickets.forEach( item => {
        infoAboutTicketOrder.ticketType === item.id ? item.checked = 'checked' : false;
    })
    document.querySelector(".basic").querySelector('input').value = infoAboutTicketOrder.basic.toString()
    document.querySelector(".senior").querySelector('input').value = infoAboutTicketOrder.senior.toString()
    totalPriseSectionAmount.innerHTML = infoAboutTicketOrder.total
    updatePopTypeTicket()
    updatePopTicketTypePrice()
    updateOverSumTicket()

    // updatePopTicketTypePrice()
}


// pop
// функц берет из локал стор данные и ставит тип билета в поп форме и при изменени в секции
// билеты - в поп тоже меняется тип былите и меняется также в overview-exhibition

function updatePopTypeTicket(){

    infoAboutTicketOrder.ticketType === "Choice1" ? popTypeTickets[1].selected = true :
        infoAboutTicketOrder.ticketType === "Choice2" ? popTypeTickets[2].selected = true :
            infoAboutTicketOrder.ticketType === "Choice3" ? popTypeTickets[3].selected = true : false
    let selectIndex = popTypeTickets.options.selectedIndex
    let txt= popTypeTickets.options[selectIndex].text;
    popTypeTicketOverview.innerHTML = txt;
    // console.log(txt)
    popBasicValue.value = infoAboutTicketOrder.basic.toString()
    popSeniorValue.value = infoAboutTicketOrder.senior.toString()


}
// если меняется тип билета в поп форме - меняем в локал стор значение
function getPopTypeTicket() {
    let selectIndex = popTypeTickets.options.selectedIndex
    // console.log(selectIndex)
    selectIndex === 1 ? (typeTicketPrice = 20, infoAboutTicketOrder.ticketType = 'Choice1') :
        selectIndex === 2 ? (typeTicketPrice = 25, infoAboutTicketOrder.ticketType = 'Choice2') :
            selectIndex === 3 ? (typeTicketPrice = 40, infoAboutTicketOrder.ticketType = 'Choice3') : false
    infoAboutTicketOrder['price'] = typeTicketPrice
    //обновляем все остальные элементы
    updateLocalStore()
    getTotalPrice()
    updateTicketOnStart()
    updatePopTypeTicket()
    updatePopTicketTypePrice()


}
//обновляем цену в скобках байсик и сениор
function updatePopTicketTypePrice() {
    popBasicPrice.forEach( item =>{
        item.innerHTML = infoAboutTicketOrder.price.toString()
    })
    popSeniorPrice.forEach( item =>{
        item.innerHTML = (infoAboutTicketOrder.price/2).toString()
    })
}

function updateOverSumTicket(){
    document.querySelector('.over-right-basic').innerHTML = (infoAboutTicketOrder.basic*infoAboutTicketOrder.price).toString() + ' &#8364;'

    document.querySelector('.over-right-senior').innerHTML = (infoAboutTicketOrder.senior * infoAboutTicketOrder.price/2).toString() + ' &#8364;'

    document.querySelector('#over-sum-total').innerHTML = infoAboutTicketOrder.total.toString()+ ' &#8364;'

}

// pop Entry Ticket buttons
popAmountCountBtns.forEach( item =>{
    item.addEventListener('click', () => {
        console.log(item)
        getPopBasicSeniorValue()
        updateTicketOnStart()
        getTotalPrice()
        updateTicketOnStart()
        updatePopTypeTicket()
        updatePopTicketTypePrice()


    })
})

function getPopBasicSeniorValue() {
    infoAboutTicketOrder.basic = document.querySelector('#pop-basic').value
    infoAboutTicketOrder.senior = document.querySelector('#pop-senior').value

}

console.log()

