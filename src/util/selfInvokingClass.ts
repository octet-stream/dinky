interface Ctor {
  new (...args: unknown[]): Ctor
}

/**
 * Turns an ES6 class into self-invoking one
 *
 * @return An instance of Target class
 */
const selfInvokingClass = <T extends Ctor>(
  Target: T,
  _ctx: unknown,
  args: unknown[]
) => new Target(...args)

export default selfInvokingClass
