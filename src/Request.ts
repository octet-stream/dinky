import type {OnFulfilled, OnRejected} from "./util/PromiseCallbacks.js"
import type {CreateLinkOptions, LinkOptions} from "./util/link.js"
import {createLink, Link} from "./util/link.js"
import type {Maybe} from "./util/Maybe"

import Query from "./util/Query.js"

const {isArray} = Array

export interface BaseRequestOptions extends CreateLinkOptions {
  readonly link?: Link
}

/**
 * @deprecated Use BaseRequestOptions instead
 */
export type RequestOptionsWithoutPath = BaseRequestOptions

export interface RequestOptions extends BaseRequestOptions {
  readonly path: string | string[]
}

export abstract class Request<T> implements PromiseLike<T> {
  protected _link: Link

  protected _path: string[]

  protected _query = new Query()

  constructor({url, path, link, linkOptions}: RequestOptions) {
    this._link = link ?? createLink({url, linkOptions})

    this._path = isArray(path) ? path : [path]
  }

  /**
   * Sets the page number
   *
   * @param value Page number to navigate to
   */
  page(value: number): this {
    this._query.set("page", value)

    return this
  }

  /**
   * Executes current Request to Philomena API
   *
   * @param options Additional request options
   */
  exec(options?: LinkOptions): Promise<T> {
    return this._link<T>(this._path, this._query, options)
  }

  then<TResult = T, TReason = never>(
    onFulfilled?: Maybe<OnFulfilled<T, TResult>>,
    onRejected?: Maybe<OnRejected<TReason>>
  ): Promise<TResult | TReason> {
    return this.exec().then(onFulfilled, onRejected)
  }

  catch<R = never>(onRejected?: OnRejected<R>): Promise<unknown> {
    return this.exec().catch(onRejected)
  }
}
