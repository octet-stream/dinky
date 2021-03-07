class Link {
  private _parsedUrl: URL

  private _path: string[]

  constructor(readonly url: string = "https://derpibooru.org") {
    this._parsedUrl = new URL(url)
  }

  get to(): string {
    return this.url.toString()
  }
}

export default Link
