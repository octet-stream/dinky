interface Constructable {
  new (...args: any[]): any
}

export interface Callable<T, A extends unknown[]> {
  (...args: A): T
}

// Disable due to https://github.com/typescript-eslint/typescript-eslint/issues/1824
/* eslint-disable @typescript-eslint/indent */
export interface Instaniate {
  <T extends Constructable>(Target: T): Callable<
    InstanceType<T>,
    ConstructorParameters<T>
  >
}
/* eslint-enable @typescript-eslint/indent */

/**
 * Creates decorator function that will instaniate given class
 *
 * @param Target A class to instaniate
 */
export const instaniate: Instaniate = Target => (...args) => new Target(
  ...args
)
