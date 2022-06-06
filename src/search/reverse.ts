import type {LinkOptions} from "../util/link.js"
import {SearchImages} from "./SearchImages.js"

/**
 * Executes reverse-searching the image given by the url query parameter.
 *
 * An alias for `ImageSearch.reverse()` method.
 *
 * @param url The URL of image
 * @param options Request options
 */
export const reverse = (url: string, options?: LinkOptions) => {
  const search = new SearchImages()

  return search.reverse(url, options)
}
