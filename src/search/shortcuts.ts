import {instaniate} from "../util/instaniate.js"

import {SearchGalleries} from "./SearchGalleries.js"
import {SearchComments} from "./SearchComments.js"
import {SearchImages} from "./SearchImages.js"
import {SearchPosts} from "./SearchPosts.js"
import {SearchTags} from "./SearchTags.js"
import {reverse} from "./reverse.js"

export const search = Object.freeze({
  tags: instaniate(SearchTags),
  posts: instaniate(SearchPosts),
  images: instaniate(SearchImages),
  comments: instaniate(SearchComments),
  galleries: instaniate(SearchGalleries),
  reverse
})
