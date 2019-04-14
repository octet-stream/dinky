class NetworkError extends Error {
  constructor(message, response) {
    super(message)

    this.response = response
    this.url = response.url
    this.status = response.status
    this.statusText = response.statusText

    Error.captureStackTrace(this, Error)
  }
}

module.exports = NetworkError
