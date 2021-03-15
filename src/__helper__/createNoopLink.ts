import {spy, SinonSpy} from "sinon"

const createNoopLink = <
  Args extends any[] = any[],
  Result = any
>() => spy(() => Promise.resolve({})) as any as SinonSpy<Args, Result>

export default createNoopLink
