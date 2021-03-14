import {ExecutionContext} from "ava"
import {spy, SinonSpy} from "sinon"

export interface CreateNoopLinkContext {
  noopLink: SinonSpy<any[], Promise<{}>>
}

export const createNoopLink = (t: ExecutionContext<CreateNoopLinkContext>) => {
  t.context.noopLink = spy(() => Promise.resolve({}))
}
