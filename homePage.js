let buttons = document.querySelectorAll('.cat');
for (let but of buttons) {
    but.addEventListener('click', () => {
        console.log('pressed');

        window.location.href = `Pages/books.html?categroy=${but.getAttribute('alt')}`;

    });
}

const SoundBTN = document.querySelectorAll('.soundBtn');

for (let but of SoundBTN) {
    but.addEventListener('mouseover', () => {
        var audio = new Audio('/hover.wav');
        audio.play();
    });
}


