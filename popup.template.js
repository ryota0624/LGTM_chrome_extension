const url = "__url__"

const endpoint = {
  random: (number) => {
    if (number > 0 && number < 10) {
      return `${url}/random${number}.json`
    }
    throw new Error(`invalid random number must be 0 > number 10, ${number}`)
  },
  latest: `${url}/latest.json`
}

function getRandomImages() {
  const randomNumber = getRandomInt(1, 9)
  return fetch(endpoint.random(randomNumber))
    .then(response => response.json())
}

function onClickMoreLoadButton() {
  showRandomImages()
}

function showRandomImages() {
  getRandomImages().then(images => {
    renderContent(getContentRootDom(), images)
  })
}

function renderContent(targetDom, images) {
  function renderImage(image) {
    return (
      `<li class="image-li">
        <img class="lgtm-img" src="${image.imageurl}" />
      </li>`)
  }
  function renderImages(images) {
    return `
    <ul class="images-ul">
      ${images.map(renderImage).reduce((result, li) => result + li, "")}
    </ul>
    `
  }
  const html = chunk(images, 5)
    .map(renderImages)
    .map(imageHtml => `<div class="images-ul-wrapper">${imageHtml}</div>`)
    .reduce((result, li) => result + li, "")
  targetDom.innerHTML = html
}

function getContentRootDom() {
  return document.querySelector("#content")
}

function imageURLToMarkdownFormat(url) {
  return `![img](${url} "img")`
}

function onClickLGTMImage() {
  const imageUrl = event.target.getAttribute('src')
  getCurrentTabUrl().then(url => {
    return url.includes("https://github.com") ? imageURLToMarkdownFormat(imageUrl) : imageUrl
  })
  .then(text => navigator.clipboard.writeText(text))
  .then(() => {
    console.log('copied to clipboard');
  }, (e) => {
    console.log('failed to copy', e);
  });
}
function start() {
  document.querySelector(".more-load-button").addEventListener('click', onClickMoreLoadButton)
  document.addEventListener("click", (event) => {
    if(event.target.getAttribute('class') === "lgtm-img") {
      onClickLGTMImage()
    }
  })
  showRandomImages()
}

start()

// Helpers

function chunk(inputArray, perChunk) {
  return inputArray.reduce(
    (resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk)

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }

      resultArray[chunkIndex].push(item)

      return resultArray
    },
    []
  )
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
}

function getCurrentTabUrl() {
  return new Promise((res) => {
    chrome.tabs.getSelected(tab => {  
      res(tab.url)
    });
  })
}