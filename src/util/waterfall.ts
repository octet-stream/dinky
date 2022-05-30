import type {MaybePromise} from "./MaybePromise.js"

interface Task {
  (...args: any[]): MaybePromise<unknown>
}

const step = (prev: MaybePromise<unknown>, next: Task) => (
  Promise.resolve(prev).then(res => next(res))
)

function waterfall<TResult = unknown>(
  tasks: Task[],
  initial: unknown = undefined
): Promise<any> {
  if (tasks.length <= 1) {
    return step(initial, tasks[0])
  }

  return tasks.reduce(step, initial) as Promise<TResult>
}

export default waterfall
