import sinon, {SinonSpy} from "sinon"

import Query from "../util/Query.js"

import {LinkOptions} from "../util/link.js"

const {spy} = sinon

export type LinkArguments = [string[], Query, LinkOptions]

export const createNoopLink = <Result = any>() => (
  spy(() => Promise.resolve({})) as any as SinonSpy<LinkArguments, Result>
)

export default createNoopLink
