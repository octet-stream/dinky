### Images

Implements `images` entites interface.

Endpoint `/api/v1/json/images`

Source code [`entities/Images.ts`](https://github.com/octet-stream/dinky/blob/master/src/entities/Images.ts)

#### `getById(id: string | number): Promise<ImagesResponse>`

Finds an image by given ID.

```js
import {Images} from "dinky.js"

const images = new Images()

// The following request will return the 1th uploaded image from Derpibooru.
// Equivalent to https://derpibooru.org/api/v1/json/images/0 request
await images.getById(0)
```

#### `featured(): Promise<ImageResponse>`

Returns featured image.

```js
import {Images} from "dinky.js"

const images = new Images()

await images.featured()
```

### Comments

Implements `comments` entites interface.

Endpoint `/api/v1/json/comments`

Source code [`entities/Comments.ts`](https://github.com/octet-stream/dinky/blob/master/src/entities/Comments.ts)

### Filters

Implements `filters` entites interface.

Endpoint `/api/v1/json/filters`

Source code [`entities/Filters.ts`](https://github.com/octet-stream/dinky/blob/master/src/entities/Filters.ts)

#### `system(options?: LinkOptions): Promise<FiltersResponse>`

Returns list of the system filters.

#### `user(options?: LinkOptions): Promise<FiltersResponse>`

Returns list of public filters, created by users.

#### `getById(id: string): Promise<ImagesResponse>`

Finds a filter by given slug.

### Profiles

Implements `profiles` entites interface.

Endpoint `/api/v1/json/profiles`

Source code [`entities/Profiles.ts`](https://github.com/octet-stream/dinky/blob/master/src/entities/Profiles.ts)

#### `getById(id: string | number): Promise<ImagesResponse>`

Finds a user profile by given ID.

### Tags

Implements `tags` entites interface.

Endpoint `/api/v1/json/tags`

Source code [`entities/Tags.ts`](https://github.com/octet-stream/dinky/blob/master/src/entities/Tags.ts)

#### `getById(id: string | number): Promise<ImagesResponse>`

Finds a tag by given ID.
