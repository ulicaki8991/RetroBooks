let state = -1;

let infoObj = document.querySelector('#info');
let feedback = document.querySelector('#feedback');
let fade = document.querySelector('#fader');
let fade2 = document.querySelector('#faderFeed');



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyI') {
        PopupAct();
    }
});


document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyF') {
        PopupActFeedback();
    }
});

async function PopupAct() {
    if (state === -1) {
        state *= -1;
        let fader = document.querySelector("#fader");
        fader.classList.toggle('hidden');
        fader.classList.remove("bg-[#00000000]");
        sleep(10).then(() => { fader.classList.add("bg-[#000000b6]"); });


    }
    else {
        ClosePopup();
    }
}


async function PopupActFeedback() {
    if (state === -1) {
        state *= -1;
        let fader = document.querySelector("#faderFeed");
        fader.classList.toggle('hidden');
        fader.classList.remove("bg-[#00000000]");
        sleep(10).then(() => {
            fader.classList.add("bg-[#000000b6]");

        });


    }
    else {
        ClosePopupfeedback();
    }
}


infoObj.addEventListener('click', PopupAct, false);
feedback.addEventListener('click', PopupActFeedback, false);
fade.addEventListener('click', ClosePopup, false);
fade2.addEventListener('click', ClosePopupfeedback, false);
//window.addEventListener('keydown', PopupAct, false);


function ClosePopup() {
    state *= -1;
    // fader.classList.toggle('bg-[#000000b6]');
    let fader = document.querySelector("#fader");
    fader.classList.remove("bg-[#000000b6]");
    fader.classList.add("bg-[#00000000]");
    fader.classList.toggle('hidden');


}

function ClosePopupfeedback() {
    state *= -1;
    // fader.classList.toggle('bg-[#000000b6]');
    let fader2 = document.querySelector("#faderFeed");
    fader2.classList.remove("bg-[#000000b6]");
    fader2.classList.add("bg-[#00000000]");
    fader2.classList.toggle('hidden');


}


function ClosePopupEndfeedback() {
    state *= -1;
    // fader.classList.toggle('bg-[#000000b6]');
    let fader2 = document.querySelector("#faderEndFeed");
    fader2.classList.remove("bg-[#000000b6]");
    fader2.classList.add("bg-[#00000000]");
    fader2.classList.toggle('hidden');


}

let buttoni = document.querySelector("#close").addEventListener('click', () => {
    ClosePopup();
});




let buttonf = document.querySelector("#closeAskfeed").addEventListener('click', () => {
    ClosePopupEndfeedback();
});

