import type {Response} from "node-fetch"

interface Request<T> {
  /**
   * Sets the page offset.
   *
   * Default offset: `1`
   */
  page(offset?: number): this

  /**
   * Executes current request.
   *
   * Default options: `{}`
   */
  exec<T>(options?: DinkyRequestOptions): Promise<T>

  then: Promise<T>["then"]
  catch: Promise<T>["catch"]
}

interface Entities<Entity, EntitiesPage> extends Request<EntitiesPage> {
  /**
   * Creates a new `Search` request for given query
   */
  search(query: (string | string[])[]): Search<EntitiesPage>

  /**
  * Get one entity by its ID
  */
  getById(id: number, options?: DinkyRequestOptions): Promise<Entity>
}

interface DinkyRequestOptions {
  /**
   * User's personal API key taken from their account.
   */
  key?: string

  /**
   * An ID of a filter found on filters page.
   * The ID can be found on filters page: <https://derpibooru.org/filters>
   */
  filter?: number
}

class Dinky {
  /**
   * Creates an instance of derpibooru API client.
   * See `DinkyRequestOptions` for more details on configuration.
   *
   * Default options: `{}`
   */
  constructor(options?: DinkyRequestOptions)

  /**
   * Creates a request handler for `/api/v1/json/search`
   *
   * @param query – query params
   */
  search(...query: (string | string[])[]): ImagesSearch

  /**
   * Creates a request handler for `/api/v1/json/comments`
   */
  comments(): Comments

  /**
   * Creates a request handler for `/api/v1/json/tags`
   */
  tags(): Tags

  /**
   * Creates a request handler for `/api/v1/json/images`
   */
  images(): Images

  /**
   * Creates a `Lists` class that contains a bunch of shortcuts for `Search`
   */
  lists(): Lists
}

/**
 * Creates an instance of derpibooru API client.
 * See `DinkyRequestOptions` for more details on configuration.
 * This is effectively a shortcut for `new Dinky(options)`
 *
 * Default options: `{}`
 */
function dinky(options?: DinkyRequestOptions): Dinky

class NetworkError extends Error {
  response: Response
  url: string
  status: number
  statusText: string

  /**
   * The class constructor symbol is exported only for `instanceof` checks purposes.
   * It is not intended to be invoked by client code.
   */
  private constructor(message: string, response: Response)
}

/**
 * Represents a request to `/api/v1/json/search/comments`
 */
interface Comments extends Entities<responses.Comment, responses.CommentsResponse> {}

/**
 * Represents a request to `/api/v1/json/search/tags`
 */
interface Tags extends Entities<responses.Tag, responses.TagsResponse> {}

/**
 * Represents a request to `/api/v1/json/search/images`
 */
interface Images extends Entities<responses.Image, responses.ImagesResponse> {
  search(query: (string | string[])[]): ImagesSearch
  /**
   * Get a featured image
   */
  featured(options?: DinkyRequestOptions): Promise<responses.ImageResponse>
}

interface Lists {
  /**
   * Creates a `Search` request that gets top scoring images of last 3 days.
   * The most rated images will be at the top of the list.
   */
  topScoring(): ImagesSearch

  /**
   * Creates a `Search` request that gets top scoring images of the all time.
   * The most rated images will be at the top of the list.
   */
  topScoringAllTime(): ImagesSearch

  /**
   * Creates a `Search` request that gets top commented images of last 3 days.
   * The most commented images will be at the top of the list.
   */
  topCommented(): ImagesSearch
}

interface Search<T> extends Request<T> {
  /**
   * Sets Search type to "comments"
   */
  comments(): Search<responses.ImagesResponse>

  /**
   * Sets Search type to "galleries"
   */
  galleries(): Search<responses.GalleriesResponse>

  /**
   * Sets Search type to "posts"
   */
  posts(): Search<responses.PostsResponse>

  /**
   * Sets Search type to "tags"
   */
  tags(): Search<responses.TagsResponse>

  /**
   * Sets Search type to "images"
   */
  images(): ImagesSearch

  /**
   * Appends a tag or a list of tags to the current search request
   *
   * @param list – a tag or a list of tags you want to append
   */
  query(...list: (string | string[])[]): this

  /**
   * Adds a param to sort result by given field.
   *
   * @param field Filed name to sort by. Note that sorting doesn't work for all fields.
   *  Consult the [api docs](https://derpibooru.org/pages/api) to learn more
   */
  sortBy(field: string): this
}

interface ImagesSearch extends Search<responses.ImagesResponse> {
  /**
   * Sets `my:faves` param to the search request.
   *
   * Note that this method requires user's key.
   */
  faves(): this

  /**
   * Sets `my:watched` param to the search request.
   *
   * Note that this method requires user's key.
   */
  watched(): this

  /**
   * Sets `my:upvotes` param to the search request.
   *
   * Note that this method requires user's key.
   */
  upvotes(): this

  /**
   * Sets `my:downvotes` param to the search request.
   *
   * Note that this method requires user's key.
   */
  downvotes(): this

  /**
   * Sets `my:uploads` param to the search request.
   *
   * Note that this method requires user's key.
   */
  uploads(): this

  /**
   * Search for the images faved by given user.
   *
   * @param user – name of the user on Derpibooru
   */
  favedBy(user: string): this

  /**
   * Search for images uploaded by specified user
   *
   * @param user – name of the user on Derpibooru
   */
  uploadedBy(user: string): this

  /**
   * Specifies how many images per page should API return.
   *
   * @param value – an amount of images you want to take.
   *   The value must be in range of `1` and `50`.
   */
  limit(value: number): this

  /**
   * Sets the MINIMAL score of requested images.
   *
   * @param value – a value of minimal score
   */
  minScore(value: number): this

  /**
   * Sets the MAXIMAL score of requested images.
   *
   * @param value – a value of maximal score
   */
  maxScore(value: number): this

  /**
   * Sets images ordering to ascending.
   */
  ascending(): this

  /**
   * Sets images ordering to descending.
   */
  descending(): this

  /**
   * If been called, the API will return random image.
   */
  random(): this
}

/**
 * Contains interface declarations of all the API responses that are sent back
 * from derpibooru. Note that though the original reponses use snake_case
 * properties naming, in TypeScript `camelCase` is more conventional, so these are
 * transformed to `camelCase` in `dinky.js`
 */
namespace responses {
  // There are no strict schema declarations, the types
  // are manually written using https://derpibooru.org/pages/api

  interface WithTotal {
    /**
     * Total number of entities that can be retreived by paginating through them.
     */
    total: number
  }

  /**
   * - [Trial link](https://derpibooru.org/api/v1/json/search/comments/?q=*)
   * - [Api docs](https://derpibooru.org/pages/api#comment-response)
   */
  export interface CommentsResponse extends WithTotal {
    comments: Comment[]
  }

  export interface Comment {
    /**
     * The comment's author.
     */
    author: string

    /**
     * The URL of the author's avatar. May be a link to the CDN path, or a data: URI.
     */
    avatar: string

    /**
     * The comment text.
     */
    body: string

    /**
     * The creation time, in UTC, of the comment.
     */
    createdAt: Date

    /**
     * The edit reason for this comment, or null if none provided.
     */
    editReason: null | string

    /**
     * The time, in UTC, this comment was last edited at, or null if it was not edited.
     */
    editedAt: null | Date

    /**
     * The comment's ID.
     */
    id: number

    /**
     * The ID of the image the comment belongs to.
     */
    imageId: number

    /**
     * The time, in UTC, the comment was last updated at.
     */
    updatedAt: Date

    /**
     * The ID of the user the comment belongs to, if any.
     */
    userId: null | number
  }


  /**
   * - [Trial link](https://derpibooru.org/api/v1/json/search/tags?q=*)
   * - [Api docs](https://derpibooru.org/pages/api#tag-response)
   */
  export interface TagsResponse extends WithTotal {
      tags: Tag[]
  }

  export interface Tag {
    /**
     * The slug of the tag this tag is aliased to, if any.
     */
    aliasedTag: null | string

    /**
     * The slugs of the tags aliased to this tag.
     */
    aliases: string[]

    /**
     * The category class of this tag. One of "character", "content-fanmade", "content-official", "error", "oc", "origin", "rating", "species", "spoiler".
     */
    category: null | TagCategory

    /**
     * The long description for the tag.
     */
    description: string

    /**
     * An array of objects containing DNP entries claimed on the tag.
     */
    dnpEntries: DnpEntry[]

    /**
     * The tag's ID.
     */
    id: number

    /**
     * The image count of the tag.
     */
    images: number

    /**
     * The slugs of the tags this tag is implied by.
     */
    impliedByTags: string[]

    /**
     * The slugs of the tags this tag implies.
     */
    impliedTags: string[]

    /**
     * The name of the tag.
     */
    name: string

    /**
     * The name of the tag in its namespace.
     */
    nameInNamespace: string

    /**
     * The namespace of the tag.
     */
    namespace: string

    /**
     * The short description for the tag.
     */
    shortDescription: string

    /**
     * The slug for the tag.
     */
    slug: string

    /**
     * The spoiler image URL for the tag.
     */
    spoilerImageUri: null | string
  }

  export interface DnpEntry {
    conditions: string
  }

  export type TagCategory =
    | "character"
    | "content-fanmade"
    | "content-official"
    | "error"
    | "oc"
    | "origin"
    | "rating"
    | "species"
    | "spoiler"

  /**
   * - [Trial link](https://derpibooru.org/api/v1/json/images/featured)
   * - [Api docs](https://derpibooru.org/pages/api#image-response)
   */
  export interface ImageResponse {
    image: Image,
    interactions: UserInteraction[]
  }

  /**
   * - [Trial link](https://derpibooru.org/api/v1/json/search/images?q=*)
   * - [Api docs](https://derpibooru.org/pages/api#image-response)
   */
  export interface ImagesResponse extends WithTotal {
    images: Image[],
    interactions: UserInteraction[]
  }

  /**
   * Discriminated union of user interactions.
   */
  export type UserInteraction =
    | UserInteraction.Hidden
    | UserInteraction.Faved
    | UserInteraction.Voted

  export namespace UserInteraction {
    interface Common {
      imageId: number
      userId: number
    }

    export type Hidden = Common & { interactionType: "hidden", value: "" }
    export type Faved = Common & { interactionType: "faved", value: "" }
    export type Voted = Common & { interactionType: "voted", value: "up" | "down" }
  }

  export interface Image {
    /**
     * The image's width divided by its height.
     */
    aspectRatio: number

    /**
     * The number of comments made on the image.
     */
    commentCount: number

    /**
     * The creation time, in UTC, of the image.
     */
    createdAt: Date

    /**
     * The hide reason for the image, or null if none provided.
     * This will only have a value on images which are deleted for a rule violation.
     */
    deletionReason: null | string

    /**
     * The image's description.
     */
    description: string

    /**
     * The number of downvotes the image has.
     */
    downvotes: number

    /**
     * The ID of the target image, or null if none provided.
     * This will only have a value on images which are merged into another image.
     */
    duplicateOf: null | number

    /**
     * The number of faves the image has.
     */
    faves: number

    /**
     * The time, in UTC, this image was first seen (before any duplicate merging).
     */
    firstSeenAt: Date

    /**
     * The file extension of this image. One of "gif", "jpg", "jpeg", "png", "svg", "webm".
     */
    format: ImageFormat

    /**
     * The image's height, in pixels.
     */
    height: number

    /**
     * Whether this image is hidden. An image is hidden if it is merged or deleted for a rule violation.
     */
    hiddenFromUsers: boolean

    /**
     * The image's ID.
     */
    id: number

    /**
     * Optional object of internal image intensity data for deduplication purposes.
     * May be null if intensities have not yet been generated.
     */
    intensities: null | {
      ne: number
      nw: number
      se: number
      sw: number
    }

    /**
     * The MIME type of this image. One of "image/gif", "image/jpeg", "image/png", "image/svg+xml", "video/webm".
     */
    mimeType: ImageMimeType

    /**
     * The filename that this image was uploaded with.
     */
    name: string

    /**
     * The SHA512 hash of this image as it was originally uploaded.
     */
    origSha512Hash: string

    /**
     * Whether the image has finished optimization.
     */
    processed: boolean

    /**
     * A mapping of representation names to their respective URLs.
     * Contains the keys "full", "large", "medium", "small", "tall", "thumb", "thumb_small", "thumb_tiny".
     */
    representations: ImageRepresentations

    /**
     * The image's number of upvotes minus the image's number of downvotes.
     */
    score: number

    /**
     * The SHA512 hash of this image after it has been processed.
     */
    sha512Hash: string

    /**
     * The current source URL of the image.
     */
    sourceUrl: null | string

    /**
     * Whether this image is hit by the current filter.
     */
    spoilered: boolean

    /**
     * The number of tags present on this image.
     */
    tagCount: number

    /**
     * A list of tag IDs this image contains.
     */
    tagIds: number[]

    /**
     * A list of tag names this image contains.
     */
    tags: string[]

    /**
     * Whether this image has finished thumbnail generation.
     * Do not attempt to load images from view_url or representations if this is false.
     */
    thumbnailsGenerated: boolean

    /**
     * The time, in UTC, the image was last updated.
     */
    updatedAt: Date

    /**
     * The image's uploader.
     */
    uploader: string

    /**
     * The ID of the image's uploader.
     */
    uploaderId: number

    /**
     * The image's number of upvotes.
     */
    upvotes: number

    /**
     * The image's view URL, including tags.
     */
    viewUrl: string

    /**
     * The image's width, in pixels.
     */
    width: number

    /**
     * The lower bound of the Wilson score interval for the image, based on its
     * upvotes and downvotes, given a z-score corresponding to a confidence of 99.5%.
     */
    wilsonScore: number
  }

  export type ImageFormat =
    | "gif"
    | "jpg"
    | "jpeg"
    | "png"
    | "svg"
    | "webm"

  export type ImageMimeType =
    | "image/gif"
    | "image/jpeg"
    | "image/png"
    | "image/svg+xml"
    | "video/webm"

  export interface ImageRepresentations {
    full: string
    large: string
    medium: string
    small: string
    tall: string
    thumb: string
    thumbSmall: string
    thumbTiny: string
  }

  /**
   * - [Trial link](https://derpibooru.org/api/v1/json/search/galleries?q=*)
   * - [Api docs](https://derpibooru.org/pages/api#gallery-response)
   */
  export interface GalleriesResponse extends WithTotal {
    galleries: Gallery[]
  }

  export interface Gallery {
    /**
     * The gallery's description.
     */
    description: string

    /**
     * The gallery's ID.
     */
    id: number

    /**
     * The gallery's spoiler warning.
     */
    spoilerWarning: string

    /**
     * The ID of the cover image for the gallery.
     */
    thumbnailId: number

    /**
     * The gallery's title.
     */
    title: string

    /**
     * The name of the gallery's creator.
     */
    user: string

    /**
     * The ID of the gallery's creator.
     */
    userId: number
  }

  /**
   * - [Trial link](https://derpibooru.org/api/v1/json/search/posts?q=*)
   * - [Api docs](https://derpibooru.org/pages/api#post-response)
   */
  export interface PostsResponse extends WithTotal {
    posts: Post[]
  }

  export interface Post {
    /**
     * The post's author.
     */
    author: string

    /**
     * The URL of the author's avatar. May be a link to the CDN path, or a data: URI.
     */
    avatar: string

    /**
     * The post text.
     */
    body: string

    /**
     * The creation time, in UTC, of the post.
     */
    createdAt: Date

    /**
     * The edit reason for this post.
     */
    editReason: null | string

    /**
     * The time, in UTC, this post was last edited at, or null if it was not edited.
     */
    editedAt: null | Date

    /**
     * The post's ID (used to identify it).
     */
    id: number

    /**
     * The time, in UTC, the post was last updated at.
     */
    updatedAt: Date

    /**
     * The ID of the user the post belongs to, if any.
     */
    userId: null | number
  }
}

export {
  dinky as default,
  dinky,
  Dinky,
}

export type {
  Images,
  Lists,
  Tags,
  Comments,
  Search,
  ImagesSearch,
  Response,
  DinkyRequestOptions,
  responses,
  NetworkError
}
