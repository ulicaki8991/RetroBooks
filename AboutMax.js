let state = -1;
let infoObj = document.querySelector('#info');
let fade = document.querySelector('#fader');
let close = document.querySelector(".close");
let allPopbtn = document.querySelectorAll('.poptwit');

for (let btn of allPopbtn) {
    btn.addEventListener('click', () => {
        window.open('https://twitter.com/MOulitzky', '_blank').focus();;

    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}





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




infoObj.addEventListener('click', PopupAct, false);
fade.addEventListener('click', ClosePopup, false);
//window.addEventListener('keydown', PopupAct, false);
close.addEventListener('click', ClosePopup, false);


function ClosePopup() {
    state *= -1;
    // fader.classList.toggle('bg-[#000000b6]');
    let fader = document.querySelector("#fader");
    fader.classList.remove("bg-[#000000b6]");
    fader.classList.add("bg-[#00000000]");
    fader.classList.toggle('hidden');


}




