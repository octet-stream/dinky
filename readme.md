# dinky.js

JavaScript bindings for [Derpibooru](https://derpibooru.org) API

[![Build Status](https://travis-ci.org/octet-stream/dinky.svg?branch=master)](https://travis-ci.org/octet-stream/dinky)
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

## Usage

Dinky implements chainable API to build each request and all requests will return a Promise that resolves data taken from Derpibooru API.
The minimal example that will return an image by known ID:

```js
import dinky from "dinky.js"

// The following request will return the 1th uploaded image from Derpibooru.
// Equivalent to https://derpibooru.org/images/0.json request
dinky().images().id(0).then(console.log)
```

Or if you want to find pictures by their tags, just use `.search()` method:

```js
import dinky from "dinky.js"

// You can specify tags right in the .search() method
// By default all requests will be sent to derpibooru.org, but you can
// manually set one of Derpibooru's host in constructor options if you need.
// The following example is equivalent of these requests:
// https://derpibooru.org/search.json?q=artist:rainbow,safe&random_image=true
// ...and then this one:
// https://derpibooru.org/images/<received image id>.json
dinky({url: "trixiebooru.org"}).search(["artist:rainbow", "safe"]).random()
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

##### `minScore(value) -> {Search}`

Sets the **minimal** score of requested images.

  - **{number}** value – a value of minimal socre

##### `maxScore(value) -> {Search}`

Sets the **maximal** score of requested images

  - **{number}** value – a value of maximal socre

##### `random() -> {Promise<object>}`

If been called, the API will return random image

### `class Request`

##### `constructor() -> {Request}`

Creates a new request handler.

#### Instance methods

##### `ascending() -> {Request}`

Sets images ordering to ascending

##### `descending() -> {Request}`

Sets images ordering to descending

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

* Derpibooru API documentation can be found here: [derpibooru.org/pages/api](https://derpibooru.org/pages/api)

## Another API bindings:
* [derpiboorust](https://github.com/Ralvke/derpiboorust) – Rust
* [DerPyBooru](https://github.com/joshua-stone/DerPyBooru) – Python
* [derpigo](https://github.com/Xe/derpigo) – Go
