
import {Image} from "./types";
import {chunk} from "./utils";

export interface ImageRenderer {
    render(images: Image[]): void
}

export class ImageRendererOnDom implements ImageRenderer {
    private rootElement: Element;
    constructor() {
        this.rootElement = document.querySelector("#content")!
    }
  
    render(images: Image[]) {
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
        this.rootElement.innerHTML = html
  }
}
