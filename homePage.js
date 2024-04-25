let buttons = document.querySelectorAll('.cat');

let fromLab = document.querySelector('#fromYear_lab')
let toLab = document.querySelector('#toYear_lab')
let fromSlider = document.querySelector('#fromYear_slider')
let toSlider = document.querySelector('#toYear_slider')


for (let but of buttons) {
    but.addEventListener('click', () => {
        console.log('pressed');

        window.location.href = `Pages/books.html?categroy=${but.getAttribute('alt')}&fromYear=${fromSlider.value}&toYear=${toSlider.value}`;

    });
}

const SoundBTN = document.querySelectorAll('.soundBtn');

for (let but of SoundBTN) {
    but.addEventListener('mouseover', () => {
        var audio = new Audio('/hover.wav');
        audio.play();
    });
}


setInterval(() => {
    fromLab.innerHTML = `From year: ${fromSlider.value}`;
    toLab.innerHTML = `From year: ${toSlider.value}`;
}, 10);


document.querySelector('#logo').addEventListener('click', () => {
    window.open("index.html");
});

