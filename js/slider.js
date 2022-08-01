//https://www.youtube.com/watch?v=K3E1OfQuJ0Q
const sliderWindow = document.querySelector('.slider')

// console.log(sliderWindow)

const sliderCurrentNum = document.querySelector('.slider-current-num')
const prev = document.querySelector('.btn-left')
const next = document.querySelector('.btn-right')
let sliderImg = document.querySelector('.slider-img')
const dots = document.querySelectorAll('.dot')
let setTimeInterval = 4000
let index = 1

sliderCurrentNum.innerHTML = '0' + index

dots[index - 1].style.backgroundColor = '#D2B183'

// sliderWindow.insertBefore(`
//     <img class="slider-img" src="../assets/img/welcome-slider/${5}.jpg" alt="img01">
// `, sliderImg)


// вперед
const nextSlide = () => {
    if (index === 5) {
        index = 1
        changeIndexImgAndDot(index)
    }
    else {
        index += 1
        changeIndexImgAndDot(index)
    }
}

//назад
const prevSlide = () => {
    if (index === 1) {
        index = 5
        changeIndexImgAndDot(index)
    }
    else {
        index -= 1
        changeIndexImgAndDot(index)
    }
}

// меняем цвет точек
function changeDotsColor(index) {
    for (let dot of dots) {
        dot.style.backgroundColor = '#FFFFFF'
    }
    dots[index - 1].style.backgroundColor = '#D2B183'
}

// при нажатии на дот - меняем картинку
// меняем индекс текущей картинки и менем ее на счетчике
// и перезапуск слайдер-шоу
function dotChangeImageSlider(event) {
    let target = event.target; // где был клик?
    index = Number(target.id) + 1
    changeIndexImgAndDot(index)
    clearIntervalSlider()

}
// анимация - class fade add to img - сдвиг вверх через стили
//animationend - после оконачания анимации - remove class fade and add class fadeOut
// fadeOut - move new img down
// and after some time - remove fadeOut
function changeIndexImgAndDot(index) {
    sliderCurrentNum.innerHTML = '0' + index
    sliderImg.classList.add('fade')
    sliderImg.addEventListener('animationend', () => {
        sliderImg.src = `assets/img/welcome-slider/${index}.jpg`
        sliderImg.classList.remove('fade')
        sliderImg.classList.add('fadeOut')
    })
    changeDotsColor(index)
    setTimeout(() => sliderImg.classList.remove('fadeOut'), 2000)
}

next.addEventListener('click', nextSlide)
prev.addEventListener('click', prevSlide)

next.addEventListener('click', clearIntervalSlider)
prev.addEventListener('click', clearIntervalSlider)

// в цикле по дот добавили айди им, и также событие при нведении/уходе с дот
// и при нажатии меняет цвет
for (let i = 0; i < dots.length; i++) {
    dots[i].id = i
    dots[i].addEventListener('click', dotChangeImageSlider)
    dots[i].addEventListener('mouseover', (target) => {
        dots[i].style.backgroundColor = '#9D8665'
        dots[index - 1].style.backgroundColor = '#D2B183'
    })
    dots[i].addEventListener('mouseout', (target) => {
        dots[i].style.backgroundColor = 'white'
        dots[index - 1].style.backgroundColor = '#D2B183'
    })
}

//запуск слайд-шоу
let timeSl = setInterval(nextSlide, setTimeInterval)

//очистка слайд-шоу и заново запуск через время
function clearIntervalSlider() {
    // console.log('end slide show')
    clearInterval(timeSl)
    setTimeInterval = 10000
    timeSl = setInterval(nextSlide, setTimeInterval)
    // console.log('start NEW slider show 10sec')
}

//****************************
//
let x1 = null
let y1 = null

function handTouchStart(event) {
    let firstTouch = event.touches[0]
    x1 = firstTouch.clientX
    y1 = firstTouch.clientY
    // console.log(x1, y1)
}
function handTouchMove(event) {

    if (!x1 > 0 || !y1 > 0) {
        return false
    }
    else {
        nextSlide()
    }

}

sliderImg.addEventListener('touchstart', handTouchStart, false)
// sliderImg.addEventListener('touchmove', handTouchMove, false)



//***************
// swipe mobil
sliderImg.addEventListener('touchstart', handleTouchStart, false);
sliderImg.addEventListener('touchmove', handleTouchMove, false);


let xDown = null;
let yDown = null;

function getTouches(evt) {
    return evt.touches /*||             // browser API
        // evt.originalEvent.touches; // jQuery*/
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    let xUp = evt.touches[0].clientX;
    let yUp = evt.touches[0].clientY;

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            /* left swipe */
            nextSlide()
        } else {
            /* right swipe */
            prevSlide()
        }
    }
    // else {
    //     if ( yDiff > 0 ) {
    //         /* up swipe */
    //         nextSlide()
    //     } else {
    //         /* down swipe */
    //         prevSlide()
    //     }
    // }
    /* reset values */
    xDown = null;
    yDown = null;
}


//***************** swipe 2
sliderImg.addEventListener('mousedown', mouseTouchDownSlider2, false);
sliderImg.addEventListener('mousedown', function imgOpasity() {
    sliderImg.style.transform = "scale(0.75)"
    sliderImg.style.transition = "2s"
    let d = function d() {
        sliderImg.style.transform = "scale(1)"
    }
    setTimeout(d, 1500)

}, false);

function mouseTouchDownSlider2(event) {
    //предотвратить запуск выделения (действие браузера)
    event.preventDefault()
    //Свойство event.clientX содержит в себе расстояние от левой границы экрана до курсора без учета прокрутки.
    // let shiftX = event.clientX - sliderImg.getBoundingClientRect().left;
    let shiftX = event.clientX
    let shiftY = event.clientX

    // console.log('Нажатие X', shiftX)
    // console.log('Y', shiftY)

    sliderImg.addEventListener('mousemove', onMouseMove);
    sliderImg.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        let newLeft = event.clientX
        // console.log('move left = ', newLeft)
        // курсор вышел из слайдера => оставить бегунок в его границах.
        if (newLeft <= shiftX - 25) {
            shiftX = 0
            prevSlide()
        }
        let newRight = event.clientX
        if (newRight >= shiftY + 25) {
            shiftY = 10000
            nextSlide()
        }
    }

    function onMouseUp() {
        sliderImg.removeEventListener('mouseup', onMouseUp);
        sliderImg.removeEventListener('mousemove', onMouseMove);
    }

}