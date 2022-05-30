interface Constructable {
  new (...args: any[]): any
}

export interface Callable<T, A extends unknown[]> {
  (...args: A): T
}

export interface Instaniate {
  <T extends Constructable>(Target: T): Callable<
    InstanceType<T>,
    ConstructorParameters<T>
  >
}

/**
 * Creates decorator function that will instaniate given class
 *
 * @param Target A class to instaniate
 */
export const instaniate: Instaniate = Target => (...args) => new Target(
  ...args
)
