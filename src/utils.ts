// Helpers


export function chunk<T>(inputArray: T[], perChunk: number):T[][] {
    return inputArray.reduce(
      (resultArray: T[][], item, index) => {
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
  
export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
  }
  
export function getCurrentTabUrl() {
    return new Promise<string>((res) => {
      chrome.tabs.getSelected((tab: any) => {  
        res(tab.url)
      });
    })
  }