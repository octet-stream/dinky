const util = require("util")

const isFunction = require("./isFunction")

const decorator = (fn, message, code) => util.deprecate(fn, message, code)

const deprecate = (message, code) => function wrap(target, key, descriptor) {
  if (isFunction(target) && arguments.length === 1) {
    return decorator(target, message, code)
  }

  if (isFunction(descriptor.initializer)) {
    const init = descriptor.initializer

    descriptor.initializer = function initializer() {
      return decorator(init.call(this), message, code)
    }
  } else {
    const fn = descriptor.value

    descriptor.value = decorator(fn, message, code)
  }

  return descriptor
}

module.exports = deprecate
