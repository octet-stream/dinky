import {createLink, Link, CreateLinkOptions, LinkOptions} from "./util/link"

import {OnFulfilled, OnRejected} from "./type/PromiseCallbacks"

import Query from "./util/Query"

const {isArray} = Array

export interface RequestOptions extends CreateLinkOptions {
  readonly path: string | string[]
  readonly link?: Link
}

export type RequestOptionsWithoutPath = Omit<RequestOptions, "path">

export class Request<T> {
  private _link: Link

  protected _path: string[]

  protected _query = new Query()

  constructor({url, path, link, linkOptions}: RequestOptions) {
    this._link = link ?? createLink({url, linkOptions})

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
