/**
 * Contains interface declarations of all the API responses that are sent back
 * from derpibooru. Note that though the original reponses use snake_case
 * properties naming, in TypeScript `camelCase` is more conventional, so these are
 * transformed to `camelCase` in `dinky.js`
 */
declare namespace responses {
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

    export type Hidden = Common & {
      interactionType: "hidden", value: ""
    }

    export type Faved = Common & {
      interactionType: "faved", value: ""
    }

    export type Voted = Common & {
      interactionType: "voted", value: "up" | "down"
    }
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

  interface User {
    /**
     * The ID of the user.
     */
    id: number

    /**
     * The name of the user.
     */
    name: string

    /**
     * The slug of the user.
     */
    slug: string

    /**
     * The role of the user.
     */
    role: string

    /**
     * The description (bio) of the user.
     */
    description: string

    /**
     * The URL of the user's thumbnail. null if the avatar is not set.
     */
    avatarUrl: string

    /**
     * The creation time, in UTC, of the user.
     */
    createdAt: Date

    /**
     * The comment count of the user.
     */
    commentCount: number

    /**
     * The upload count of the user.
     */
    uploadsCount: number

    /**
     * The forum posts count of the user.
     */
    postsCount: number

    /**
     * The forum topics count of the user.
     */
    topicsCount: number

    links: Link[]
    awards: Award[]
  }

  interface UserResponse {
    user: User
  }

  interface Link {
    /**
     * The ID of the user who owns this link.
     */
    userId: number

    /**
     * The creation time, in UTC, of this link.
     */
    createdAt: Date

    /**
     * The state of this link.
     */
    state: string

    /**
     * The ID of an associated tag for this link. null if no tag linked.
     */
    tagId: number
  }

  interface Award {
    /**
     * The ID of the badge this award is derived from.
     */
    id: number

    /**
     * The title of this award.
     */
    title: string

    /**
     * The URL of this award.
     */
    imageUrl: string

    /**
     * The label of this award.
     */
    label: string

    /**
     * The time, in UTC, when this award was given.
     */
    awardedOn: Date
  }

  interface Filter {
    /**
     * The id of the filter.
     */
    id: number

    /**
     * The name of the filter.
     */
    name: string

    /**
     * The description of the filter.
     */
    description: string

    /**
     * The id of the user the filter belongs to. null if it isn't assigned to a user (usually system filters only).
     */
    userId: number

    /**
     * The amount of users employing this filter.
     */
    userCount: number

    /**
     * If true, is a system filter. System filters are usable by anyone and don't have a user_id set.
     */
    system: boolean

    /**
     * If true, is a public filter. Public filters are usable by anyone.
     */
    public: boolean

    /**
     * A list of tag IDs (as integers) that this filter will spoil.
     */
    spoileredTagIds: number[]

    /**
     * The complex spoiled filter.
     */
    spoileredComplex: string

    /**
     * A list of tag IDs (as integers) that this filter will hide.
     */
    hiddenTagIds: number[]

    /**
     * The complex hidden filter.
     */
    hiddenComlex: string
  }
}

export default responses
