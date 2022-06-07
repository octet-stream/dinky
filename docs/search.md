### SearchImages

Implements `images` search interface.

Endpoint `/api/v1/json/search/images`

#### `query(params: string[]): SearchImages`

```js
import {SearchImages} from "dinky.js"

const search = new SearchImages()

// Will send request to https://derpibooru.org/api/v1/json/search/images?q=pinkie+pie,safe
await search.query(["pinkie pie", "safe"])
```

#### `limit(value: number): SearchImages`

```js
import {SearchImages} from "dinky.js"

const search = new SearchImages()

// Will send request to https://derpibooru.org/api/v1/json/search/images?q=fluttershy&per_page=1
await search.query(["fluttershy"]).limit(1)
```

#### `random(): SearchImages`

```js
import {SearchImages} from "dinky.js"

const search = new SearchImages()

// Will send request to https://derpibooru.org/api/v1/json/search/images?q=izzy+moonbow,safe&sf=random&per_page=1
await search.query(["izzy moonbow", "safe"]).random().limit(1)
```

#### `faves(): SearchImages`

Sets my:faves param to the search request. This method requires API key.

```js
import {SearchImages} from "dinky.js"

const search = new SearchImages({key: "secret"})

// Will request images with my:faves search param
await search.faves()
```

#### `watched(): SearchImages`

Sets `my:watched` param to the search request. This method requires API key.

#### `upvotes(): SearchImages`

Sets `my:upvotes` param to the search request. This method requires API key.

#### `downvotes(): SearchImages`

Sets `my:downvotes` param to the search request. This method requires API key.

#### `uploads(): SearchImages`

Sets `my:uploads` param to the search request. This method requires API key.

#### `favedBy(user: string): SearchImages`

Search for the images faved by specified user.

#### `uploadedBy(user: string): SearchImages`

Search for images uploaded by specified user.

#### `minScore(value: number): SearchImages`

Sets the **minimal** score of requested images.

  - **value** A value of minimal score

#### `maxScore(value: number): SearchImages`

Sets the **maximal** score of requested images.

- **value** A value of maximal score

#### `ascending(): SearchImages`

Sets images ordering to **ascending**.

#### `descending(): SearchImages`

Sets images ordering to **descending**.

#### `sortBy(field: string): SearchImages`

Adds a param to sort result by given field.

  - **field** Name of the field to sort by

#### `reverse(url: string, options?: LinkOptions): Promise<ImagesResponse>`

## Shortcuts

Dinky provides functions-wrappers for each of the Search classes, so you can use it in a similar manner as you did with `dinky.js@1.x` version.

All of them awailable from `search` object, exposed from the main dinky.js entry point:

```js
import {search} from "dinky.js"
```

#### `search.images(options?: LinkOptions): SearchImages`

This function will create an instance of `SearchImage` class and allows to use all of its methods.

```js
import {search} from "dinky.js"

// Request random image with "Izzy Moonbow" and "Safe" tags, one image per page
await search.images().query(["izzy moonbow", "sage"]).random().limit(1)
```

#### `search.reverse(url: string, options?: LinkOptions): Promise<ImagesResponse>`

This function is the images reverse-search shortcut. Unlike all of the previous, this will send API request immediately as you call it.

  - **url** The URL of image
  - **options** Request options

```js
import {search} from "dinky.js"

// You can reverse-search for an image using `search.reverse` shortcut.
// This function is identical to `SearchImage.reverse()` method.
// Will send request to https://derpibooru.org/api/v1/json/search/reverse?url=https://derpicdn.net/img/2019/12/24/2228439/full.jpg
await search.reverse("https://derpicdn.net/img/2019/12/24/2228439/full.jpg")
```

### SearchTags

Implements `tags` search interface.

Endpoint `/api/v1/json/search/tags`

### SearchComments

Implements `comments` search interface.

Endpoint `/api/v1/json/search/comments`

### SearchGalleries

Implements `galleries` search interface.

Endpoint `/api/v1/json/search/galleries`

### SearchPosts

Implements `posts` search interface.

Endpoint `/api/v1/json/search/posts`
