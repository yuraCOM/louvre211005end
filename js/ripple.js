const buttons = document.querySelectorAll('.ripple')
buttons.forEach(button => {

    button.addEventListener('click', function (e) {
        // console.log(e)
        const x = e.clientX
        const y = e.clientY
        // console.log(x, y)

        const buttonTop = e.target.offsetTop
        const buttonLeft = e.target.offsetLeft
        // console.log(buttonTop, buttonLeft)

        // const xInside = x - buttonLeft
        // const yInside = y - buttonTop
        const xInside = buttonLeft
        const yInside = buttonTop - y
        // console.log (xInside, yInside)

        const circle = document.createElement('span')
        circle.classList.add('circle')
        // circle.style.top = +yInside + 'px'
        circle.style.top = 15 + 'px'
        // circle.style.left = yInside + 'px'
        circle.style.left = 50+ 'px'

        this.appendChild(circle)

        // setTimeout(() => circle.remove(), 500)
    })
})