/**
 * Applys a Proxy and handlers to given target
 */
const proxy = <T extends object>(handlers: T) => (
  (target: ProxyHandler<T>) => new Proxy(target, handlers)
)

export default proxy
