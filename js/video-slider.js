
function VideoSlider(){
    let videoPlaylistSlider = document.querySelector('.play-list-slider')
    let videoSliderDots = document.querySelector('.video-slider-dots')


    videoPlayList.forEach(item => {
        videoPlaylistSlider.innerHTML += `
        <div class="video-slider" id="${item.id}" >
             <iframe
             src="${item.srs}"
             loading="lazy" 
             title="YouTube video player"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    `
        videoSliderDots.innerHTML += `
        <div id="${item.id}" class="video-dot"></div>
    `
    });

    // движение slider
// this move
// // let videoPlaylistWrapper = document.querySelector('.video-playlist-wrapper')
// let videoPlaylistSlider = document.querySelector('.play-list-slider')
// right button
    let videoSlideNextButton = document.querySelector('.video-slider-right')
//left button
    let videoSlidePrevButton = document.querySelector('.video-slider-left')
// сдвиг  при нажатии на  клавишу left or right
    let offSet = 0


// add function move left
    videoSlideNextButton.addEventListener('click', moveVideoSliderLeft)
// add function move right
    videoSlidePrevButton.addEventListener('click', moveVideoSliderRight)


    let index = 0

    function moveVideoSliderLeft(){
        let videoPlaylistSlider = document.querySelector('.play-list-slider')
        let newSlide = videoPlaylistSlider.firstElementChild
        videoPlaylistSlider.appendChild(newSlide)

        if (index === 4){
            index = 0
            changeDotColor(index)
            ChangePlayerScreen(index)
        }
        else {

            index+=1
            changeDotColor(index)
            ChangePlayerScreen(index)

        }
        // offSet -= 494
        // videoPlaylistSlider.style.left = offSet + 'px'

    }
    function moveVideoSliderRight() {
        let videoPlaylistSlider = document.querySelector('.play-list-slider')
        let newSlide = videoPlaylistSlider.lastElementChild
        videoPlaylistSlider.prepend(newSlide)

        if (index === 0){
            index = 4
            changeDotColor(index)
            ChangePlayerScreen(index)

        }
        else {
            index-=1
            changeDotColor(index)
            ChangePlayerScreen(index)



        }
        // offSet += 494
        // videoPlaylistSlider.style.left = offSet + 'px'
    }


//dots
    let videoDots = document.querySelectorAll('.video-dot')
    videoDots[0].style.backgroundColor = '#333333'
    // console.log(videoDots)

    function changeDotColor(index){
        videoDots.forEach( item =>{
            item.style.backgroundColor = 'var(--color-grey)'
        })
        videoDots[index].style.backgroundColor = '#333333'
    };

    // change poster player and sours video file
    // пауза + получаем источник видео + меняем  videoPlayerSource.setAttribute на новый
    // перегружаем playerVideoScreen.load();
    function ChangePlayerScreen(index){
        let playerVideoScreen = document.querySelector('.player-video')
        // playerVideoScreen.pause();
        playerVideoScreen.poster = `assets/video/poster${index}.jpg`
        let videoPlayerSource =  document.querySelector("#video-player-source")
        videoPlayerSource.setAttribute("src",  `assets/video/video${index}.mp4`)
        // console.log(videoPlayerSource)
        playerVideoScreen.load();
        bigButtonPlay.style.display = ''
        littleButtonPlay.src = "./assets/img/play.png";
        skipVideoProgressLine()



    }

}

VideoSlider()




