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

export class ImageFetcherOnLgtmoon implements ImageFetcher {
    getRandom(): Promise<Image[]> {
        interface Image {
            url: string;
            isConverted: boolean;
        }
        interface RootObject {
            images: Image[];
        }
        const url = "https://lgtmoon.herokuapp.com/api/images/random"
        return fetch(url)
        .then(response => response.json())
        .then((json: RootObject) => json.images.map(image => ({imageurl: image.url})))
    }

}

export class MixedProviderFetcher implements ImageFetcher {
    private lgtmoon = new ImageFetcherOnLgtmoon()
    private lgtmfun = new ImageFetcherOnLgtmFun()

    get fetchers(): ImageFetcher[] {
        return [
            this.lgtmoon,
            this.lgtmfun,
        ]
    }

    pickupFetcher(): ImageFetcher {
        const idx = getRandomInt(0, this.fetchers.length - 1);
        return this.fetchers[idx]!
    }

    getRandom(): Promise<Image[]> {
        return this.pickupFetcher().getRandom();
    }
}