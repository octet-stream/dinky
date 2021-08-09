# dinky.js

JavaScript bindings for [Philomena](https://github.com/philomena-dev/philomena) JSON API. Supports sites such as [Derpibooru](https://derpibooru.org) and [Furbooru](https://furbooru.org).

[![ESLint](https://github.com/octet-stream/dinky/workflows/ESLint/badge.svg)](https://github.com/octet-stream/dinky/actions/workflows/eslint.yml)
[![CI](https://github.com/octet-stream/dinky/workflows/CI/badge.svg)](https://github.com/octet-stream/dinky/actions/workflows/ci.yml)
[![Code Coverage](https://codecov.io/github/octet-stream/dinky/coverage.svg?branch=master)](https://codecov.io/github/octet-stream/dinky?branch=master)

## Installation

You can install this package from npm:

```
npm install dinky.js
```

Or with yarn:

```
yarn add dinky.js
```

## Usage

Dinky implements individual class for each API resourse to build a request. All requests will return a Promise that resolves data taken from API.

1. The minimal example that will return an image by known ID:

```js
import {Images} from "dinky.js"

const images = new Images()

// The following request will return the 1th uploaded image from Derpibooru.
// Equivalent to https://derpibooru.org/api/v1/json/images/0 request
images.getById(0).then(console.log)
```

2. Search for images by their tags using the `Search` class:

```js
import {Search} from "dinky.js"

const search = new Search()

// You can specify tags right in the .query() method
// The following example is equivalent of this requests:
// https://derpibooru.org/api/v1/json/search/images?q=artist:rainbow,safe&sf=random&per_page=1
search.query(["artist:rainbow", "safe"]).random().limit(1)
  .then(console.log)
```

3. Every dinky.js class constructor allows to set a custom base URL, allowing you to use it with any Philomena compatible APIs.

```js
import {Search} from "dinky.js"

const search = new Search({url: "https://furbooru.org"})

search.query(["safe", "loona"]).then(console.log)
```

4. Every class keeps its state between request, which means you can re-use same object to perform multiple requests.

```js
import {Search} from "dinky.js"

const search = new Search()

search
  .query(["scootaloo", "princess luna", "safe", "sleepless in ponyville"])
  .minScore(200)
  .random()
  .limit(1)

// Will search for random image with parameters from above
await search

// ...and once more
await search
```

5. You can navigate through search results with `.page()` method. Note that after each `.page()` call you have to send a new request to API:

```js
import {Search} from "dinky.js"

const search = new Search()

serch.query("twilight sparkle").minScore(200)

// Search class is thenable, so you don't have to call `.exec()`,`.then()` and `.catch()` methods to commit a request.
// By default, will API will return results from the first page
await search

// Results for 2nd page
await search.page(2)
```

6. You can set a filter to use for requests:

```js
import {Search} from "dinky.js"

const search = new Search({filter: 37430})

search.query(["dinky", "derpy hooves"])

await search.exec()

// You can also set per-request filter from .exec() method
await search.exec({filter: 100073})
```

7. Search for "my:faves" images using a key taken from account page:

```js
import {Search} from "dinky.js"

const search = new Search({key: "<your key here>"})

search.query(["trixie", "safe"]).faves()
  .then(console.log)
```

## API

### `class Images > Entities`

##### `constructor() -> {Images}`

Creates a request handler for `/api/v1/json/images`

#### Instance methods

##### `getById(id) -> {Promise<object>}`

Returns an image with given ID

##### `featured() -> {Promise<object>}`

Returns featured image

### `class Comments > Entities`

##### `constructor() -> {Comments}`

Creates a request handler for `/api/v1/json/comments`.

#### Instance methods

##### `getById(id) -> {Promise<object>}`

Returns a comment with given ID

### `class Tags > Entities`

##### `constructor() -> {Tags}`

Creates a request handler for `/api/v1/json/tags`.

#### Instance methods

##### `getById(id) -> {Promise<object>}`

Returns a tag with given ID

### `class Profiles > Entities`

##### `constructor() -> {Profiles}`

Creates a request handler for `/api/v1/json/tags`.

#### Instance methods

##### `getById(id) -> {Promise<object>}`

Returns a user with given ID

### `class Search > Request`

##### `constructor() -> {Search}`

Creates a request handler for `/api/v1/json/search`.

#### Instance methods

##### `query([list]) -> {Search}`

Appends list of query params to the current search request.
This method will not apply the `q=` parameter to if called without arguments.

  - **{string | string[]}** [list = []] – list of query params you want to append

##### `faves() -> {Search}`

Sets my:faves param to the search request.

**Note that this method requires user's key.**

##### `watched() -> {Search}`

Sets my:watched param to the search request.

**Note that this method requires user's key.**

##### `upvotes() -> {Search}`

Sets my:upvotes param to the search request.

**Note that this method requires user's key.**

##### `downvotes() -> {Search}`

Sets my:downvotes param to the search request.

**Note that this method requires user's key.**

##### `uploads() -> {Search}`

Sets my:uploads param to the search request.

**Note that this method requires user's key.**

##### `favedBy(user) -> {Search}`

Search for images faved by given user.

  - **{string}** user – name of the user on Derpibooru

##### `uploadedBy(user) -> {Search}`

Search for images uploaded by given user.

  - **{string}** user – name of the user on Derpibooru

##### `limit(value) -> {Search}`

Specifies how many images per page should API return

  - **{number}** value – an amount of images you want to take.
    The value must be in range of 1 and 50.

##### `minScore(value) -> {Search}`

Sets the **minimal** score of requested images.

  - **{number}** value – a value of minimal score

##### `maxScore(value) -> {Search}`

Sets the **maximal** score of requested images

  - **{number}** value – a value of maximal score

##### `random() -> {Search}`

Sets the "sf" parameter to "random"

### `class Entities > Request`

##### `constructor() -> {Entities}`

Creates an Entity providing a few common methods for `Images`, `Comments` and `Tags`

#### Instance methods

##### `getById(id) -> {Promise<object>}`

Finds an entity by given ID

### `class Request`

##### `constructor() -> {Request}`

Creates a new request handler.

#### Instance methods

Sets images ordering to descending

##### `page(offset) -> {Request}`

Sets the page offset

  - **{number}** [offset = 1] – The page offset.

##### `exec([options]) -> {Promise<object>}`
Executes current request.

  - **{object}** options – a set of options to use in request.
    They are have priority over the [constructor](#class-dinky) options.
  - **{string}** [options.key = undefined] – your personal API key taken from your account settings
  - **{number}** [options.filter = undefined] – ID of a filter. The ID can be found on [filters page](https://derpibooru.org/filters)

##### `then(onFulfilled, onRejected) -> {Promise<object>}`

This method takes up to two arguments: callback functions for the success and failure cases of the Promise.
See [Promise#then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) documentation for more info.

##### `catch(onRejected) -> {Promise<any>}`

This method returns a Promise and deals with rejected cases only.
See [Promise#catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) documentation for more info.

### `class NetworkError > Error`

##### `constructor() -> {NetworkError}`

This class can be used to check if network error was thrown.

#### Instance properties

##### `response -> {Response}`

Returns a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.

##### `url -> {string}`

Contains the URL of the response.

##### `status -> {number}`

Contains the status code of the response (e.g., `200` for a `success`).

##### `statusText -> {string}`

Contains the status message corresponding to the status code (e.g., `OK` for `200`).

## Related

* Derpibooru API documentation can be found here: [derpibooru.org/pages/api](https://derpibooru.org/pages/api)

## Another API bindings:
* [derpiboorust](https://github.com/Ralvke/derpiboorust) – Rust
* [DerPyBooru](https://github.com/joshua-stone/DerPyBooru) – Python
* [derpigo](https://github.com/Xe/derpigo) – Go
