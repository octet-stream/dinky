class NetworkError extends Error {
  url: string

  status: number

  statusText: string

  response: Response

  constructor(message: string, response: Response) {
    super(message)

    this.url = response.url
    this.status =  response.status
    this.statusText = response.statusText
    this.response = response

    Error.captureStackTrace(this, Error)
  }
}

export default NetworkError
