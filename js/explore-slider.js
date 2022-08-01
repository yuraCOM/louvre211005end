
const exploreBtn = document.querySelector('.explore-btn')
const exploreSlider = document.querySelector('.explore-slider')
const imgBefore = document.querySelector('.img-before')

exploreBtn.addEventListener('mousedown', mouseTouchDown, false);


function mouseTouchDown(event) {
    //предотвратить запуск выделения (действие браузера)
    event.preventDefault()
    //Свойство event.clientX содержит в себе расстояние от левой границы экрана до курсора без учета прокрутки.
    let shiftX = event.clientX - exploreBtn.getBoundingClientRect().left;

    // console.log('clientX = ', event.clientX)

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {

        let newLeft = event.clientX - shiftX - exploreSlider.getBoundingClientRect().left;
        // console.log(newLeft)
        // курсор вышел из слайдера => оставить бегунок в его границах.
        if (newLeft < 0) {
            newLeft = 0;
        }

        let rightEdge = exploreSlider.offsetWidth - exploreBtn.offsetWidth;
        // console.log('rightEdge', rightEdge)
        if (newLeft > rightEdge) {
            newLeft = rightEdge + exploreBtn.offsetWidth;
        }
        exploreBtn.style.left = newLeft-exploreBtn.offsetWidth/2 + 'px';
        imgBefore.style.clipPath = `inset(0 0 0 ${newLeft}px)`
        // imgBefore.style.clip = `inset(0 0 0 ${newLeft}px)`
    }

    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
    }

}

//mobile
exploreBtn.addEventListener('touchstart', TouchStart, false);
exploreBtn.addEventListener('touchmove', TouchMove, false);

function TouchStart(e){
    e.preventDefault()
    //Получаем текущую позицию касания
    touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    touchPosition = { x: touchStart.x, y: touchStart.y };
    // console.log(touchPosition)

}

function TouchMove(e){
    e.preventDefault()
    //Получаем новую позицию
    touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    // console.log(touchPosition.x)

    // let shiftX = touchPosition.x - exploreBtn.getBoundingClientRect().left

    // let newLeft = touchPosition.x - shiftX - exploreSlider.getBoundingClientRect().left;
    let newLeft = touchPosition.x - exploreSlider.getBoundingClientRect().left;

    if (newLeft < 0) {
        newLeft = 0;
    }
    let rightEdge = exploreSlider.offsetWidth - exploreBtn.offsetWidth;

    if (newLeft > rightEdge) {
        newLeft = rightEdge + exploreBtn.offsetWidth;
    }
    exploreBtn.style.left = newLeft-exploreBtn.offsetWidth/2 + 'px';
    imgBefore.style.clipPath = `inset(0 0 0 ${newLeft}px)`
    // imgBefore.style.clip = `inset(0 0 0 ${newLeft}px)`



}