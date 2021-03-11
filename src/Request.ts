import TypedObject from "./type/TypedObject"

import {createLink, LinkOptions} from "./util/link"

import {OnFulfilled, OnRejected} from "./type/PromiseCallbacks"

import Query from "./util/Query"

const {isArray} = Array

export interface RequestOptions {
  readonly url?: string
  readonly path: string | string[]
  readonly link: ReturnType<typeof createLink>
}

export class Request<R extends TypedObject = TypedObject> {
  private _link: ReturnType<typeof createLink>

  protected _path: string[]

  protected _query = new Query()

  constructor({link, path}: RequestOptions) {
    this._link = link

    this._path = isArray(path) ? path : [path]
  }

  /**
   * Sets the page number.
   */
  page(value: number = 1) {
    this._query.set("page", value)
  }

  exec(options?: LinkOptions): Promise<R> {
    return this._link<R>(this._path, this._query, options)
  }

  then(onFulfilled?: OnFulfilled<R>, onRejected?: OnRejected): Promise<R> {
    return this.exec().then(onFulfilled, onRejected) as Promise<R>
  }

  catch(onRejected?: OnRejected): Promise<unknown> {
    return this.exec().catch(onRejected) as Promise<unknown>
  }
}

export default Request
