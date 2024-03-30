
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




export function openFeedbackPopup() {
    let fader = document.querySelector("#faderEndFeed");
    fader.classList.toggle('hidden');
    fader.classList.remove("bg-[#00000000]");
    sleep(10).then(() => { fader.classList.add("bg-[#000000b6]"); });


}


export function closeFeedbackPopup() {
    let fader = document.querySelector("#faderEndFeed");
    fader.classList.remove("bg-[#000000b6]");
    fader.classList.add("bg-[#00000000]");
    fader.classList.toggle('hidden');

} 