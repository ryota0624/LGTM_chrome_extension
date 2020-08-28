
import {getCurrentTabUrl} from "./utils";
import {ImageFetcher, ImageFetcherOnLgtmFun, ImageFetcherOnLgtmoon} from "./fetcher";
import {ImageRenderer, ImageRendererOnDom} from "./renderer"



function imageUrlCopyToClipboard(imageUrl: string) {
    function imageURLToMarkdownFormat(url: string) {
        return `![img](${url} "img")`
      }
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

class App {
    constructor(
        private imageFetcher: ImageFetcher,
        private imageRenderer: ImageRenderer,
    ) {}


    loadAndShowImages() {
        this.imageFetcher.getRandom().then(images => {
            this.imageRenderer.render(images);
        })
    }
}

export function start() {
    const app = new App(
        new ImageFetcherOnLgtmoon(),
        new ImageRendererOnDom(),
    );

    document.querySelector(".more-load-button")?.addEventListener('click', () => app.loadAndShowImages());
    document.addEventListener("click", (event) => {
      if(event?.target instanceof Element && event?.target.getAttribute('class') === "lgtm-img") {
          const imageUrl = event.target.getAttribute('src')
          if (imageUrl) {
              imageUrlCopyToClipboard(imageUrl)
        }
      }
    })
    app.loadAndShowImages();
}