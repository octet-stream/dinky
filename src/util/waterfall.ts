import MaybePromise from "./MaybePromise.js"

interface Task {
  (...args: any[]): MaybePromise<unknown>
}

const step = (prev: MaybePromise, next: Task) => (
  Promise.resolve(prev).then(res => next(res))
)

function waterfall(
  tasks: Task[],
  initial: unknown = undefined
): Promise<any> {
  if (tasks.length <= 1) {
    return step(initial, tasks[0])
  }

  return tasks.reduce(step, initial) as Promise<unknown>
}

export default waterfall
