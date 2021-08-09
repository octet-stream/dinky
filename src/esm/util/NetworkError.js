class NetworkError extends Error {
    constructor(message, response) {
        super(message);
        this.url = response.url;
        this.status = response.status;
        this.statusText = response.statusText;
        this.response = response;
        Error.captureStackTrace(this, Error);
    }
}
export default NetworkError;
