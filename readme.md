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

Or via pnpm:

```
pnpm add dinky.js
```

## Usage

Dinky implements individual class for each API resourse to build a request. Each class is request builder and will return `Promise` when you commit the request.

1. The minimal example that will return an image by known ID:

```js
import {Images} from "dinky.js"

const images = new Images()

// The following request will return the 1th uploaded image from Derpibooru.
// Equivalent to https://derpibooru.org/api/v1/json/images/0 request
await images.getById(0)
```

2. Search for images by their tags using the `Search` class:

```js
import {Search} from "dinky.js"

const search = new Search()

// You can specify tags right in the .query() method
// The following example is equivalent of this requests:
// https://derpibooru.org/api/v1/json/search/images?q=artist:rainbow,safe&sf=random&per_page=1
await search.query(["artist:rainbow", "safe"]).random().limit(1)
```

3. Every dinky.js class constructor allows to set a custom base URL, allowing you to use it with any Philomena compatible APIs.

```js
import {Search} from "dinky.js"

const search = new Search({url: "https://furbooru.org"})

await search.query(["safe", "loona"])
```

4. Dinky has shortcuts for both `entites` and `search` interfaces, so you can build request in similar to v1 manner:

```js
import {images, search} from "dinky.js"

await images().getById(0) // Same as new Images().getById(0)
await search.reverse("https://derpicdn.net/img/2019/12/24/2228439/full.jpg") // Same as new SearchImages().reverse()
await search.images().query(["pinke pie", "safe"])
```

5. Every class keeps its state between request, which means you can re-use same object to perform multiple requests.

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

7. You can navigate through search results with `.page()` method. Note that after each `.page()` call you have to send a new request to API:

```js
import {Search} from "dinky.js"

const search = new Search()

serch.query(["twilight sparkle"]).minScore(200)

// Search class is thenable, so you don't have to call `.exec()`,`.then()` and `.catch()` methods to commit a request.
// By default, will API will return results from the first page
await search

// Results for 2nd page
await search.page(2)
```

8. You can set a filter to use for requests:

```js
import {Search} from "dinky.js"

const search = new Search({filter: 37430})

search.query(["dinky", "derpy hooves"])

await search.exec()

// You can also set per-request filter from .exec() method
await search.exec({filter: 100073})
```

9. Search for "my:faves" images using a key taken from account page:

```js
import {Search} from "dinky.js"

const search = new Search({key: "<your key here>"})

// You can search for `my:faves` images with specific tags
await search.query(["trixie", "safe"]).faves()
```

## API

Full documentation can be found in [`/docs`](https://github.com/octet-stream/dinky/tree/master/docs) directory.

## Related

* Derpibooru API documentation can be found here: [derpibooru.org/pages/api](https://derpibooru.org/pages/api)

## Another API bindings:
* [derpiboorust](https://github.com/mxseev/derpiboorust) – Rust
* [DerPyBooru](https://github.com/joshua-stone/DerPyBooru) – Python
* [derpigo](https://github.com/Xe/derpigo) – Go
