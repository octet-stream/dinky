const step = (prev, next) => Promise.resolve(prev).then(res => next(res))

/**
 * @private
 */
function waterfall(tasks, initial) {
  if (tasks.length <= 1) {
    return step(initial, tasks[0])
  }

  return tasks.reduce(step, initial)
}

module.exports = waterfall
