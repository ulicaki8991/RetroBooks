//   AIzaSyDTnDsp2IQRV5dLNW4KclCxvgrpPcty06U
// https://www.googleapis.com/books/v1/volumes?q={name}:keyes&key=AIzaSyDTnDsp2IQRV5dLNW4KclCxvgrpPcty06U
import { openFeedbackPopup, closeFeedbackPopup } from "./EndFeedback.js";


let categroy = 'entrepreneurship';
let fromYear = '1600';
let toYear = '2020';
let AllDataGot;
let numBook;
let BookNameObj = document.querySelector('#book_name');
let year = document.querySelector('#year');
let description = document.querySelector('#description');
let Image = document.querySelector('#book_cover');
let Skeleton = document.querySelector('#skeleton')
let LoadedContent = document.querySelector('#loaded')
let NowMonthText = document.querySelector('#MonthText');
//let buttonFilter = document.querySelector('#YearButton');
let canvas = document.querySelector('#confetti');
let numbOfBook = document.querySelector('#numbOfBook');

let minYear = 1990;
let bookLoaded = false;
let nowimgURL;


let ReloadButton = document.querySelector('#reloadButton');
let SaveButton = document.querySelector('#saveButton');
let numbOfMonth = 1;

let BookNames = [];
let BookYear = [];
let BookImg = [];
let img1Loaded = false;
let img2Loaded = false;
let img3Loaded = false;
let img4Loaded = false;


let img_skeleton = document.querySelector('#book_cover_skeleton');
let img_full = document.querySelector('#book_cover');
let content_skeleton = document.querySelector('#content_skeleton');
let content_full = document.querySelector('#content_full');


ReloadButton.addEventListener('click', ReloadBook);
SaveButton.addEventListener('click', SaveBook);


const jsConfetti = new JSConfetti();


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
categroy = urlParams.get('categroy');
fromYear = urlParams.get('fromYear');
toYear = urlParams.get('toYear');


let logo = document.querySelector('#logo').addEventListener('click', () => { window.history.back(); });

function ReloadBook() {

    Loaded();
}



function SaveBook() {
    if (numbOfMonth != 4) {
        //jsConfetti.addConfetti();
        jsConfetti.addConfetti({ confettiNumber: 500, });
        var audio = new Audio('/clickSound.wav');
        audio.play();
        numbOfMonth++;
        BookNames.push(AllDataGot.data.works[0].title.replaceAll(']', '').replaceAll('[', ''));
        BookYear.push(`${AllDataGot.data.works[0].first_publish_year}, ${AllDataGot.data.works[0].authors[0].name}`);
        BookImg.push(nowimgURL);
        NowMonthText.innerText = `Book for Month: ${numbOfMonth}`;

        ReloadBook();
    }
    else {
        jsConfetti.addConfetti({ confettiNumber: 500, });
        numbOfMonth++;
        BookNames.push(AllDataGot.data.works[0].title.replaceAll(']', '').replaceAll('[', ''));
        BookYear.push(`${AllDataGot.data.works[0].first_publish_year}, ${AllDataGot.data.works[0].authors[0].name}`);
        BookImg.push(nowimgURL);
        document.querySelector('#SelectingBooks').classList.toggle("hidden");
        document.querySelector('#loader').classList.toggle("hidden");
        LoadEndScreen();
    }
}


Loaded();
//loopNumberInput();

/*function filterOn() {
    let randomOfsset = Random(600, 1);
    console.log(`https://openlibrary.org/subjects/${categroy}.json?limit=1&offset=${randomOfsset}&published_in=$2000-2024`);
    HideSkeleton();
    Loaded(true);
    setTimeout(() => {
        if (!bookLoaded) {
            console.log('Reload');
            filterOn();
        }
    }, 2000);
}
*/




function Loaded() {



    img_skeleton.classList.remove('hidden');
    img_full.classList.remove('hidden');
    content_skeleton.classList.remove('hidden');
    content_full.classList.remove('hidden');

    content_full.classList.add('hidden');
    img_full.classList.add('hidden');
    // Getting number of all books in this topic

    console.log(`req: https://openlibrary.org/subjects/${categroy}.json?published_in=${fromYear}-${toYear}`)
    axios.get(`https://openlibrary.org/subjects/${categroy}.json?published_in=${fromYear}-${toYear}`).then(resoponse => {


        //generating a offset based on the number of books (for randoming)
        let data = resoponse;

        if (data.data.work_count !== 0) {

            bookLoaded = false;
            let MaxOfSet = data.data.work_count - 1;
            let randomOfsset = Random(MaxOfSet, 1);

            numbOfBook.innerText = `Founded: ${MaxOfSet + 1} books`;

            // Getting One random book from the category
            axios.get(`https://openlibrary.org/subjects/${categroy}.json?limit=30&offset=${randomOfsset}`).then(resoponse => {




                AllDataGot = resoponse;

                let formatedName = AllDataGot.data.works[0].title.replaceAll(' ', '+').replaceAll('[', '').replaceAll(']', '');


                let formatedAthor = AllDataGot.data.works[0].authors[0].name.replaceAll(' ', '+');




                BookNameObj.innerText = AllDataGot.data.works[0].title.replaceAll(']', '').replaceAll('[', '');
                year.innerText = `${AllDataGot.data.works[0].first_publish_year}, ${AllDataGot.data.works[0].authors[0].name}`;

                book_cover.src = `https://covers.openlibrary.org/b/id/${AllDataGot.data.works[0].cover_id}-L.jpg`;

                content_skeleton.classList.add('hidden');
                content_full.classList.remove('hidden');

                axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${formatedName}+inauthor:${formatedAthor}&key=AIzaSyDTnDsp2IQRV5dLNW4KclCxvgrpPcty06U
    `).then(res => {


                    if (res.data.items && res.data.items.length > 0) {

                        const firstBook = res.data.items[0];
                        description.innerText = firstBook.volumeInfo.description;
                        nowimgURL = `https://covers.openlibrary.org/b/id/${AllDataGot.data.works[0].cover_id}-L.jpg`;
                        bookLoaded = true;
                        book_cover.addEventListener('load', EndLoadingImage);
                    } else {
                        console.log('No books found');
                        BookNameObj.innerText = AllDataGot.data.works[0].title;
                        year.innerText = `${AllDataGot.data.works[0].first_publish_year}, ${AllDataGot.data.works[numBook].authors[0].name}`;
                        description.innerText = 'No description available';
                    }

                });

            });
        }
        else {
            alert('NO books');
        }

    });


}

async function LoadEndScreen() {

    let bookName1 = document.querySelector('#book_name1');
    let bookYear1 = document.querySelector('#year1');
    let bookImg1 = document.querySelector('#book_cover1');
    let bookButton1 = document.querySelector('#button1');

    let bookName2 = document.querySelector('#book_name2');
    let bookYear2 = document.querySelector('#year2');
    let bookImg2 = document.querySelector('#book_cover2');
    let bookButton2 = document.querySelector('#button2');

    let bookName3 = document.querySelector('#book_name3');
    let bookYear3 = document.querySelector('#year3');
    let bookImg3 = document.querySelector('#book_cover3');
    let bookButton3 = document.querySelector('#button3');

    let bookName4 = document.querySelector('#book_name4');
    let bookYear4 = document.querySelector('#year4');
    let bookImg4 = document.querySelector('#book_cover4');
    let bookButton4 = document.querySelector('#button4');


    bookName1.innerText = BookNames[0];
    bookYear1.innerText = BookYear[0];
    bookImg1.src = BookImg[0];
    let buttonURL1 = BookNames[0].replaceAll(' ', '+');
    let name1 = BookYear[0].split(' ')[1].replaceAll(' ', '+');
    bookButton1.parentElement.href = `https://www.amazon.com/s?k=${buttonURL1}+ book+by+${name1}&linkCode=ll2&tag=devmax0b-20&linkId=4c46c637a176b1d20e13c684b9e27a89&language=en_US&ref_=as_li_ss_tl`;

    bookName2.innerText = BookNames[1];
    bookYear2.innerText = BookYear[1];
    bookImg2.src = BookImg[1];
    let buttonURL2 = BookNames[1].replaceAll(' ', '+');
    let name2 = BookYear[1].split(' ')[1].replaceAll(' ', '+');
    bookButton2.parentElement.href = `https://www.amazon.com/s?k=${buttonURL2}+book+by+${name2}&linkCode=ll2&tag=devmax0b-20&linkId=4c46c637a176b1d20e13c684b9e27a89&language=en_US&ref_=as_li_ss_tl`;

    bookName3.innerText = BookNames[2];
    bookYear3.innerText = BookYear[2];
    bookImg3.src = BookImg[2];
    let buttonURL3 = BookNames[2].replaceAll(' ', '+');
    let name3 = BookYear[2].split(' ')[1].replaceAll(' ', '+');
    bookButton3.parentElement.href = `https://www.amazon.com/s?k=${buttonURL3}+book+by+${name3}&linkCode=ll2&tag=devmax0b-20&linkId=4c46c637a176b1d20e13c684b9e27a89&language=en_US&ref_=as_li_ss_tl`;

    bookName4.innerText = BookNames[3];
    bookYear4.innerText = BookYear[3];
    bookImg4.src = BookImg[3];
    let buttonURL4 = BookNames[3].replaceAll(' ', '+');
    let name4 = BookYear[3].split(' ')[1].replaceAll(' ', '+');
    bookButton4.parentElement.href = `https://www.amazon.com/s?k=${buttonURL4}+book+by+${name4}&linkCode=ll2&tag=devmax0b-20&linkId=4c46c637a176b1d20e13c684b9e27a89&language=en_US&ref_=as_li_ss_tl`;


    document.querySelector('#startAgain').addEventListener('click', () => {
        window.history.back();
    });


    bookImg1.addEventListener('load', () => { img1Loaded = true; });
    bookImg2.addEventListener('load', () => { img2Loaded = true; });
    bookImg3.addEventListener('load', () => { img3Loaded = true; });
    bookImg4.addEventListener('load', () => { img4Loaded = true; });

    new Promise(resolve => {
        let intervalIndex = setInterval(() => {
            if (img1Loaded) {
                console.log('loaded in promise');
                clearInterval(intervalIndex);
                resolve();
            }
        }, 10);
    }).then(() => {
        console.log('loaded');
        document.querySelector('#loader').classList.toggle('hidden');
        document.querySelector('#AllBooks').classList.toggle('hidden');
        sleep(3000).then(() => {
            openFeedbackPopup();
        });
    });
}






function EndLoadingImage() {

    img_skeleton.classList.add('hidden');
    img_full.classList.remove('hidden');
    //   HideSkeleton();
}




function HideSkeleton() {
    Skeleton.classList.toggle('hidden');
    LoadedContent.classList.toggle('hidden');
}



function Random(num, from) {
    return Math.floor(Math.random() * num) + from;
}







/*function loopNumberInput() {
    let number = document.querySelector('#slider_val');
    let slider = document.querySelector('#slider');
    setInterval(() => {
        number.innerText = slider.value;
        minYear = slider.value;
    }, 10);
} */


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyEscape') {
        closeFeedbackPopup();
    }
});

document.querySelector("#closeAskfeed").addEventListener('click', () => {
    closeFeedbackPopup();
});

document.querySelector("#faderEndFeed").addEventListener('click', () => {
    closeFeedbackPopup();
});


document.querySelector("#OpenFeedback").addEventListener('click', () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSepUuAcSlo3q3r8tGFjoS18Zrk7gzFk2zEQfx8YGatk0o0vDA/viewform', "_blank");
});





