### Images

#### `getById(id: string | number): Promise<ImagesResponse>`

```js
import {Images} from "dinky.js"

const images = new Images()

// The following request will return the 1th uploaded image from Derpibooru.
// Equivalent to https://derpibooru.org/api/v1/json/images/0 request
await images.getById(0)
```
