
const player = document.querySelector('.video-player');
player.querySelector('.player-video').pause();
player.currentTime = 0;

// окно видео-ролика - через него можно навешивать управление
let video = document.querySelector('.player-video');
// console.log()

const bigButtonPlay = player.querySelector('.video-btn-big-play')
let littleButtonPlay = player.querySelector('#little-play')


/* Vide and audio range */
// цвет инпута
const progress = document.querySelectorAll('.control-input');
let videoProgress = document.querySelector('.video-length-control');
// console.log(videoProgress.value)



videoProgress.addEventListener('mousedown', () => {
    // console.log( video.currentTime, video.duration)
    // const percent = (video.currentTime / video.duration) * 100;
    // console.log(  videoProgress.value)
})

progress.forEach(item => item.addEventListener('input', function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4)`
}))

function scrub(e) {
    const scrubT = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubT
}
video.addEventListener('timeupdate', updateVideoProgressLine);

function updateVideoProgressLine() {
    let percent = (video.currentTime / video.duration) * 100;
    videoProgress.style.background = `linear-gradient(to right, rgb(113, 7, 7) ${percent}%, rgb(113, 7, 7) ${percent}%, rgb(196, 196, 196) ${percent}%, rgb(196, 196, 196))`
    videoProgress.value = `${percent}`
    // videoProgress.value

}
function skipVideoProgressLine() {
    // console.log(videoProgress.value)
    // videoProgress.value = "0"
    // videoProgress.innerHtml = 'value = 0';
    videoProgress.style.background = `linear-gradient(to right, rgb(113, 7, 7) 0%, rgb(113, 7, 7) 0%, rgb(196, 196, 196) 0%, rgb(196, 196, 196))`

}


video.addEventListener('click', togglePlay)

bigButtonPlay.addEventListener('click', () => {
    togglePlay()

})
littleButtonPlay.addEventListener('click', () => {
    togglePlay()
})

// включение выключени видео
// нашли видео наше и если пауза то игарть или наоборот и передаем метод в video[method]();
// и также прячем или показываем большую снопку
function togglePlay() {
    video = player.querySelector('.player-video');

    if (video.paused) {
        setTimeout(function () {
            video.play();
        }, 150)
    } else {
        setTimeout(function () {
            video.pause();
        }, 150)
    }

    // video.paused ? setTimeout(function () {
    //     playerMP3.play();
    // }, 150) : video.pause();

    const method = video.paused ? 'play' : 'pause';

    // video[method]()
    // console.log(video[method]())
    method === 'play' ? bigButtonPlay.style.display = 'none' : bigButtonPlay.style.display = '';
    method === 'play' ? littleButtonPlay.src = "./assets/img/pause.png" : littleButtonPlay.src = "./assets/img/play.png";

}

//volume
// volume btn
let volumeBtn = document.querySelector('#volume-btn')
let volumeRange = document.querySelector('#volume-range')
// console.log(volumeRange)
//через ползунок звука управляем звуком видео video.volume
volumeRange.addEventListener('input', function () {
    console.log(volumeRange.value)
    video.volume = volumeRange.value;
    if (video.volume === 0) {
        volumeBtn.src = './assets/img/mute.png'
    }
    else {
        volumeBtn.src = './assets/img/volume.png'
    }
}, false);
//mute
let currentVolume = volumeRange.value
volumeBtn.addEventListener('click', function () {
    // console.log(video.volume)

    if (video.volume !== 0) {
        video.volume = 0
        // volumeRange.value = 0
        volumeBtn.src = './assets/img/mute.png'
    }
    else {
        volumeBtn.src = './assets/img/volume.png'
        video.volume = currentVolume
        volumeRange.value = currentVolume

    }


}, false)

//фулл скрин

let fullScreenBtn = document.querySelector('#full-scr')
fullScreenBtn.addEventListener('click', function () {
    video.webkitEnterFullscreen()
})