import sinon, {SinonSpy} from "sinon"

import type {Link} from "../util/link.js"

const {spy} = sinon

export type LinkArguments = Parameters<Link>

export const createNoopLink = <Result = any>() => (
  spy(() => Promise.resolve({})) as any as SinonSpy<LinkArguments, Result>
)

export default createNoopLink
