import {Image} from "./types";
import {getRandomInt} from "./utils";

export interface ImageFetcher {
    getRandom(): Promise<Image[]>
}

export class ImageFetcherOnLgtmFun implements ImageFetcher {
    getRandom(): Promise<Image[]> {
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
        const randomNumber = getRandomInt(1, 9)
        return fetch(endpoint.random(randomNumber))
          .then(response => response.json())
    }
}