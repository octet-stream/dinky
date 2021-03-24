import {createLink, Link, LinkOptions} from "./util/link.js"

import {OnFulfilled, OnRejected} from "./type/PromiseCallbacks.js"

import Query from "./util/Query.js"

const {isArray} = Array

export interface RequestOptions {
  readonly url?: string
  readonly link?: Link
  readonly path: string | string[]
  readonly linkOptions?: LinkOptions
}

export class Request<T> {
  private _link: Link

  protected _path: string[]

  protected _query = new Query()

  constructor({url, path, link, linkOptions}: RequestOptions) {
    this._link = link ? link : createLink({url, linkOptions})

    this._path = isArray(path) ? path : [path]
  }

  /**
   * Sets the page number.
   */
  page(value: number = 1): this {
    this._query.set("page", value)

    return this
  }

  exec<T>(options?: LinkOptions): Promise<T> {
    return this._link<T>(this._path, this._query, options)
  }

  then(onFulfilled?: OnFulfilled<T>, onRejected?: OnRejected): Promise<T> {
    return this.exec<T>().then(onFulfilled, onRejected) as Promise<T>
  }

  catch(onRejected?: OnRejected): Promise<unknown> {
    return this.exec<T>().catch(onRejected) as Promise<unknown>
  }
}

export default Request
