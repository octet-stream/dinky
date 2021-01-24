# dinky.js

JavaScript bindings for [Derpibooru](https://derpibooru.org) API

![ESLint](https://github.com/octet-stream/dinky/workflows/ESLint/badge.svg)
![CI](https://github.com/octet-stream/dinky/workflows/CI/badge.svg)
[![Code Coverage](https://codecov.io/github/octet-stream/dinky/coverage.svg?branch=master)](https://codecov.io/github/octet-stream/dinky?branch=master)
[![dependencies Status](https://david-dm.org/octet-stream/dinky/status.svg)](https://david-dm.org/octet-stream/dinky)
[![devDependencies Status](https://david-dm.org/octet-stream/dinky/dev-status.svg)](https://david-dm.org/octet-stream/dinky?type=dev)

## Installation

You can install this package from npm:

```
npm install dinky.js
```

Or with yarn:

```
yarn add dinky.js
```

## Native ESM support

Dinky expose `.mjs` entry point, so you can use ESM natively
in Node.js context using the [`--experimental-modules`](https://nodejs.org/api/esm.html#esm_enabling) flag.

## Usage

Dinky implements chainable API to build each request and all requests will return a Promise that resolves data taken from Derpibooru API.

1. The minimal example that will return an image by known ID:

```js
import dinky from "dinky.js"

// The following request will return the 1th uploaded image from Derpibooru.
// Equivalent to https://derpibooru.org/api/v1/json/images/0 request
dinky().images().getById(0).then(console.log)
```

2. Search for images by their tags using the `.search()` method:

```js
import dinky from "dinky.js"

// You can specify tags right in the .search() method
// The following example is equivalent of this requests:
// https://derpibooru.org/api/v1/json/search/images
//   ?q=artist:rainbow,safe&sf=random
dinky().search(["artist:rainbow", "safe"]).random()
  .then(console.log)
```

3. Since `.search()` method returns [`Search`](#class-search--request) instance
you can store it into variable for the further usage:

```js
import dinky from "dinky.js"

(async function () {
  const random = dinky()
    .search(["scootaloo", "princess luna", "safe", "sleepless in ponyville"])
    .minScore(200)
    .random()
    .limit(1)

  // Will search for random image with parameters from above
  await random

  // ...and once more
  await random
}()).catch(console.error)
```

4. Walking through the search results:

```js
import dinky from "dinky.js"

(async function () {
  const search = dinky().search(["twilight sparkle"]).minScore(200)

  // Search class is thenable, so you don't have to call `.exec()` method
  // in async functions context.
  // This request will return search results from the first page
  await search

  await search.page(2)

  // Same thing for Images class:
  const images = dinky().images()

  await images.page(2)
}()).catch(console.error)
```

5. You can set a filter to use for requests:

```js
import dinky from "dinky.js"

dinky({filter: 37430}).search(["dinky", "derpy hooves"]).then(console.log)

// You can also set per-request filter from .exec() method
dinky({filter: 37430}).search(["dinky", "derpy hooves"]).exec({filter: 100073})
  .then(console.log)
```

6. Search for "my:faves" images using a key taken from account page:

```js
import dinky from "dinky.js"

dinky({key: "<your key here>"}).search(["trixie", "safe"]).faves()
  .then(console.log)
```

## API

### `class Dinky`

##### `constructor([options]) -> {Dinky}`

Creates a new instance of the Derpibooru API client

  - **{object}** [options = {}] – client options
  - **{string}** [options.key = undefined] – your personal API key taken from your account settings
  - **{number}** [options.filter = undefined] – ID of a filter. The ID can be found on [filters page](https://derpibooru.org/filters)

#### Instance methods

##### `images() -> {Images}`

Creates a request handler for `/api/v1/json/images`

##### `search([query]) -> {Search}`

Creates a request handler for `/api/v1/json/search/images`. This method takes a list of query params

  - **{string | string[]}** [query = []] – a tag or a list of query params and returns Search instance

### `class Images > Entities`

##### `constructor() -> {Images}`

Creates a request handler for `/api/v1/json/images`

#### Instance methods

##### `search([query]) -> {Search}`

Creates a new Search request that points to `/api/v1/json/search/images`.

##### `getById(id) -> {Promise<object>}`

Returns an image with given ID

##### `featured() -> {Promise<object>}`

Returns featured image

### `class Comments > Entities`

##### `constructor() -> {Comments}`

Creates a request handler for `/api/v1/json/comments`.

#### Instance methods

##### `search([query]) -> {Search}`

Creates a new Search request that points to `/api/v1/json/search/comments`.

##### `getById(id) -> {Promise<object>}`

Returns a comment with given ID

### `class Tags > Entities`

##### `constructor() -> {Tags}`

Creates a request handler for `/api/v1/json/tags`.

#### Instance methods

##### `search([query]) -> {Search}`

Creates a new Search request that points to `/api/v1/json/search/tags`.

##### `getById(id) -> {Promise<object>}`

Returns a tag with given ID

### `class Search > Request`

##### `constructor() -> {Search}`

Creates a request handler for `/api/v1/json/search`.

#### Instance methods

##### `comments() -> {Search}`

Sets Search type to "comments"

##### `galleries() -> {Search}`

Sets Search type to "galleries"

##### `posts() -> {Search}`

Sets Search type to "posts"

##### `tags() -> {Search}`

Sets Search type to "tags"

##### `images() -> {Search}`

Sets Search type to "images"

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

If been called, the API will return random image

### `class Lists > Request`

##### `constructor() -> {Lists}`

Provides a bunch of shortcuts for `Search` request

##### `topScoring() -> {Search}`

Creates a Search request that gets top scoring images of last 3 days.
The most rated images will be at the top of the list.

##### `topScoringAllTime() -> {Search}`

Creates a Search request that gets top scoring images of the all time.
The most rated images will be at the top of the list.

##### `topCommented() -> {Search}`

Creates a Search request that gets top commented images of last 3 days.
The most commented images will be at the top of the list.

### `class Entities > Request`

##### `constructor() -> {Entities}`

Creates an Entity providing a few common methods for `Images`, `Comments` and `Tags`

#### Instance methods

##### `search([query]) -> {Search}`

Creates a new Search request that points to `/api/v1/json/search`.

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
