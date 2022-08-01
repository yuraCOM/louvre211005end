

// ****Делаем рандом галлерею
// рендом чисел
function getRandomNum (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
//сколько у нас картинок
let n = 15
// рандом массив
let arrGalleryArtMain = []
//в цикле получаем номера картинок
while ( arrGalleryArtMain.length !== n ){
    let randomN = getRandomNum(1, 15)
    if (arrGalleryArtMain.indexOf(randomN)=== -1){
        arrGalleryArtMain.push(randomN)
    }
}

// сколько будет картинок в каждой колонке галлереи
const array_size = 5;
// Новый рендом массив для колонок галлереи
let randomGalleryArray = [];

for (let i = 0; i <arrGalleryArtMain.length; i += array_size) {
    randomGalleryArray.push(arrGalleryArtMain.slice(i, i + array_size));
}

let galleryArt = document.querySelector(".picture-inner-container")

//
let delay = 500
let dur = 1000


// for (let i = 0; i < arrGalleryArtMain.length; i++ ) {
//     galleryArt.innerHTML += `
//     <img src="assets/img/gallery/galery${arrGalleryArtMain[i]}.jpg" loading="lazy" alt="img-gallery${arrGalleryArtMain[i]}">
// `
//     delay+=100
//     dur+=100
// }

for (let i = 0; i < arrGalleryArtMain.length; i++ ) {

    galleryArt.innerHTML += `
    <img src="assets/img/gallery/galery${arrGalleryArtMain[i]}.jpg" data-aos="zoom-in-up"  data-aos-delay="${delay}" data-aos-duration="${dur}"  loading="lazy" alt="img-gallery${arrGalleryArtMain[i]}">
`
    delay+=100
    dur+=100
}
