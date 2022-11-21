const btn = document.querySelector("button");
btn.addEventListener("click", getPoemTitle);
const synth = window.speechSynthesis;

function getPoemTitle() {
    document.querySelector('h3').innerText = ""
    document.querySelector('h2').innerText = ""
    const titlesUrl = 'https://poetrydb.org/title'

    fetch(titlesUrl)
    .then(res => res.json())
    .then(data => {
        // Data is an object with an array of titles and other stuff.
        let poemTitle = data.titles[Math.floor(Math.random() * data.titles.length + 1)];
        console.log(poemTitle)
        getPoem(poemTitle)
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

function getPoem(poem) {
    const poemUrl = `https://poetrydb.org/title/${poem}/lines.json`
    fetch(poemUrl)
    .then(res => res.json())
    .then(data => {
        //console.log(data)
        console.log(data[0].lines)
        let poemArr = data[0].lines
        document.querySelector('h2').innerText = poem

        for (i = 0; i < poemArr.length; i++) {
            let lineText = poemArr[i]
            document.querySelector('h3').innerText += `${lineText}\n`
            let yellThis = new SpeechSynthesisUtterance(lineText);
            synth.speak(yellThis);
        }
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

