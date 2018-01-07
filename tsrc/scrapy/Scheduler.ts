const fetchList: string[] = []

export class Scheduler {
  constructor() {

  }

  addFetchUrl(url: string) {
    fetchList.push(url)
  }

  removeFetchUrl() {
    fetchList.shift();
  }
}