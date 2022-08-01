//https://www.youtube.com/watch?v=K3E1OfQuJ0Q
const sliderCurrentNum = document.querySelector('.slider-current-num')
const prev = document.querySelector('.btn-left')
const next = document.querySelector('.btn-right')
const sliderImg = document.querySelector('.slider-img')
const dots = document.querySelectorAll('.dot')


let index = 1

sliderCurrentNum.innerHTML = '0'+index

dots[index-1].style.backgroundColor = '#D2B183'


// вперед
const nextSlide = () =>{
    if (index === 5){
        index = 1
        changeIndexImgDot(index)
        // sliderCurrentNum.innerHTML = '0'+index
        // sliderImg.src = `assets/img/welcome-slider/${index}.jpg`
        // changeDotsColor(index)
    }
    else {
        index+=1
        changeIndexImgDot(index)
        // sliderCurrentNum.innerHTML = '0'+index
        // sliderImg.src = `assets/img/welcome-slider/${index}.jpg`
        // changeDotsColor(index)
    }
}

//назад
const prevSlide = () =>{
    if (index === 1){
        index = 5
        changeIndexImgDot(index)
        // sliderCurrentNum.innerHTML = '0'+index
        // sliderImg.src = `assets/img/welcome-slider/${index}.jpg`
        // changeDotsColor(index)

    }
    else {
        index-=1
        changeIndexImgDot(index)
        // sliderCurrentNum.innerHTML = '0'+index
        // sliderImg.src = `assets/img/welcome-slider/${index}.jpg`
        // changeDotsColor(index)

    }
}

// меняем цвет точек
function changeDotsColor(index){
    for(dot of dots){
        dot.style.backgroundColor = '#FFFFFF'
    }
    dots[index-1].style.backgroundColor = '#D2B183'
    // dots[index-1].style.backgroundColor = 'red'
}

// при нажатии на дот - меняем картинку
// меняем индекс текущей картинки и менем ее на счетчике
//
function dotChangeImageSlider(event) {
    let target = event.target; // где был клик?
    index = Number(target.id) + 1
    changeIndexImgDot(index)
    // sliderCurrentNum.innerHTML = '0'+index
    // changeDotsColor(index)
    // sliderImg.src = `assets/img/welcome-slider/${index}.jpg`
};

function changeIndexImgDot(index) {
    sliderCurrentNum.innerHTML = '0'+index
    sliderImg.src = `assets/img/welcome-slider/${index}.jpg`
    changeDotsColor(index)
}

next.addEventListener('click', nextSlide)
prev.addEventListener('click', prevSlide)

// в цикле по дот добавили айди им, и также событие при нведении/уходе с дот
// и при нажатии меняет
for ( let i = 0; i < dots.length; i++){
    dots[i].id = i
    dots[i].addEventListener('click', dotChangeImageSlider)
    dots[i].addEventListener('mouseover', (target)=>{
        dots[i].style.backgroundColor = 'red'
        dots[index-1].style.backgroundColor = '#D2B183'
    })
    dots[i].addEventListener('mouseout', (target)=>{
        dots[i].style.backgroundColor = 'white'
        dots[index-1].style.backgroundColor = '#D2B183'
    })
}

setInterval(nextSlide, 2500)