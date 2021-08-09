"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const step = (prev, next) => (Promise.resolve(prev).then(res => next(res)));
function waterfall(tasks, initial = undefined) {
    if (tasks.length <= 1) {
        return step(initial, tasks[0]);
    }
    return tasks.reduce(step, initial);
}
exports.default = waterfall;
