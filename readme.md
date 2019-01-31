# dinky.js

A JavaScript client for Derpibooru API

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

## Usage

Dinky implements chainable API to build each request and all requests will return a Promise that resolves data taken from Derpibooru API.
The minimal example that will return an image by known ID:

```js
import dinky from "dinky.js"

// You can specify to which address request will be sent in Dinky's constructor
// The following request will return the 1th uploaded image from Derpibooru.
// Equivalent to https://trixiebooru.org/images/0.json request
dinky({url: "trixiebooru.org"}).images().id(0).then(console.log)
```

Or if you want to find pictures by their tags, just use `.search()` method:

```js
import dinky from "dinky.js"

// You can specify tags right in .search() method
dinky({url: "derpibooru.org"}).search(["artist:rainbow", "safe"]).raindom()
  .then(console.log)
```

## API

### `class Dinky`

##### `constructor([options]) -> {Dinky}`

Creates a new instance of the Derpibooru API client

  - **{object}** [options = {}] – client options
  - **{string}** [options.url = "derpibooru.org"] - Derpibooru API hostname (you can set trixiebooru.org or derpibooru.org)
  - **{string}** [options.key = null] – your personal API key taken from your account settings

#### Instance methods

##### `images() -> {Images}`

Creates a request handler for `/images.json`

##### `search([tags]) -> {Search}`

Creates a request handler for `/search.json`. This method takes a list of tags

  - **{string | string[]}** [tags = null] – a tag or a list of tags and returns Search instance

### `class Images > Request`

##### `constructor() -> {Images}`

Creates a request handler for `/images.json`

#### Instance methods

##### `id(id) -> {Promise<object>}`

Returns an image with given ID

### `class Search > Request`

##### `constructor() -> {Search}`

Creates a request handler for `/search.json`.

#### Instance methods

##### `tags(list) -> {Search}`

Appends a tag or a list of tags to the current search request

  - **{string | string[]}** list – a tag or a list of tags you want to append

##### `limit(value) -> {Search}`

Specifies how many images per page should API return

  - **{number}** value – an amount of images you want to take.
    The value must be in range of 1 and 50.

##### `random() -> {Promise<object>}`

If been called, the API will return random image

### `class Request`

##### `constructor() -> {Request}`

Creates a new request handler.

#### Instance methods

##### `ascending() -> {Request}`

Sets results ordering to ascending

##### `descending() -> {Request}`

Sets results ordering to descending

##### `page(offset) -> {Request}`

Sets the page offset

  - **{number}** [offset = 1] – The page offset.

##### `exec() -> {Promise<object | Array<object>>}`

Executes current request.

##### `then(onFulfilled, onRejected) -> {Promise<object | Array<object>>}`

This method takes up to two arguments: callback functions for the success and failure cases of the Promise.
See [Promise#then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) documentation for more info.

##### `catch(onRejected) -> {Promise<object | Array<object>>}`

This method returns a Promise and deals with rejected cases only.
See [Promise#catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) documentation for more info.

## Related

* Derpibooru API documentation can be found here: [trixiebooru.org/pages/api](https://trixiebooru.org/pages/api)
