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

`constructor Dinky([options])`

Creates a new instance of the Derpibooru API client

  - **{object}** [options = {}] – client options
  - **{string}** [options.url = "derpibooru.org"] - Derpibooru API hostname (you can set trixiebooru.org or derpibooru.org)
  - **{string}** [options.key = null] – your personal API key taken from your account settings

`images() -> {Images}`

Creates a request handler for `/images.json`

`search([tags]) -> {Search}`

Creates a request handler for `/search.json`. This method takes a list of tags

  - **{string | Array<string>}** [tags = null] – a tag or a list of tags
