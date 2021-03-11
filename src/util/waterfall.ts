const step = (prev: unknown, next: Function) => (
  Promise.resolve(prev).then(res => next(res))
)

function waterfall(tasks: Function[], initial: unknown = undefined) {
  if (tasks.length <= 1) {
    return step(initial, tasks[0])
  }

  return tasks.reduce(step, initial)
}

export default waterfall
