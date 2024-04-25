const jsConfetti = new JSConfetti();


let btns = document.querySelectorAll('.justBtn');

for (let bt of btns) {
    bt.addEventListener('click', () => {
        var audio = new Audio('sounds/clickSound.wav');
        audio.play();
        jsConfetti.addConfetti({ confettiNumber: 500, });
    })
};

document.querySelector('#mainBtn').addEventListener('click', () => {
    window.open("questions.html");
});