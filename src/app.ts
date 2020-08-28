
import {getCurrentTabUrl, getRandomInt, chunk} from "./utils";
const url = "https://lgtm.fun"
const endpoint = {
  random: (number: number) => {
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

type Image = any

function renderContent(targetDom: Element, images: any) {
  function renderImage(image: Image): string {
    return (
      `<li class="image-li">
        <img class="lgtm-img" src="${image.imageurl}" />
      </li>`)
  }
  function renderImages(images: Image[]): string {
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

function getContentRootDom() : Element{
  return document.querySelector("#content")!
}

function imageURLToMarkdownFormat(url: string) {
  return `![img](${url} "img")`
}

function imageUrlCopyToClipboard(imageUrl: string) {
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

export function start() {
  document.querySelector(".more-load-button")?.addEventListener('click', onClickMoreLoadButton)
  document.addEventListener("click", (event) => {
    if(event?.target instanceof Element && event?.target.getAttribute('class') === "lgtm-img") {
        const imageUrl = event.target.getAttribute('src')
        if (imageUrl) {
            imageUrlCopyToClipboard(imageUrl)
      }
    }
  })
  showRandomImages()
}