import MaybePromise from "../type/MaybePromise"

interface Task {
  (...args: unknown[]): MaybePromise
}

const step = (prev: MaybePromise, next: Task) => (
  Promise.resolve(prev).then(res => next(res))
)

function waterfall(
  tasks: Task[],
  initial: unknown = undefined
): Promise<unknown> {
  if (tasks.length <= 1) {
    return step(initial, tasks[0])
  }

  return tasks.reduce(step, initial) as Promise<unknown>
}

export default waterfall
