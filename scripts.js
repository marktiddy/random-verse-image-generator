import * as htmlToImage from "html-to-image";
import download from "downloadjs";
const getBgImage = () => {
  //The number is number of images
  var randomNum = Math.floor(Math.random() * 24);

  const bgElement = document.getElementById("image-container");
  bgElement.style.backgroundImage = "";

  bgElement.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url('bg-image-library/${randomNum}.jpg')`;
};

const toggleTextColor = (buttonPressed) => {
  const quoteText = document.getElementById("quote-text");
  if (buttonPressed === "white") {
    quoteText.classList.add("white-quote");
    quoteText.classList.remove("black-quote");
    quoteText.classList.remove("teal-quote");
  } else if (buttonPressed === "black") {
    quoteText.classList.add("black-quote");
    quoteText.classList.remove("white-quote");
    quoteText.classList.remove("teal-quote");
  } else {
    quoteText.classList.add("teal-quote");
    quoteText.classList.remove("white-quote");
    quoteText.classList.remove("black-quote");
  }
};

const loadVerse = () => {
  const url = "https://labs.bible.org/api/?passage=random&type=json";
  var apiResult;
  $.ajax({
    url:
      "https://labs.bible.org/api/?passage=random&type=json&callback=myCallback",
    crossDomain: true,
    dataType: "jsonp",
    success: function (result) {
      apiResult = result[0];
    },
  }).then(() => {
    const quote = document.getElementById("quote-text");

    //We need to remove the link from the end of the netbible link
    const link =
      '<a style="" target="_blank" href="http://netbible.com/net-bible-preface">&copy;NET</a>';
    const verse = apiResult.text.replace(link, "");
    if (apiResult) {
      quote.innerHTML =
        `"${verse}"` +
        `<span id="quote-source"><br />${apiResult.bookname} ${apiResult.chapter}:${apiResult.verse}</span>`;
    } else {
      quote.innerText = "Sorry, something went wrong";
    }
  });
};

//Code to save
const saveImage = () => {
  const node = document.getElementById("image-area-container");
  htmlToImage
    .toPng(node)
    .then(function (dataUrl) {
      download(dataUrl, "my-bible-verse.png");
    })
    .catch(function (error) {
      // console.error("oops, something went wrong!", error);
    });
};

//Generate when we load
$(document).ready(() => {
  loadVerse();
  getBgImage();
});

//event listeners
$("#new-image-btn").click(() => {
  getBgImage();
});

$("#new-verse-btn").click(() => {
  loadVerse();
});

$("#save-img-btn").click(() => {
  saveImage();
});

$("#black-text-btn").click(() => {
  toggleTextColor("black");
});

$("#white-text-btn").click(() => {
  toggleTextColor("white");
});
