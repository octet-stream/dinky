import test from "ava"

import sinon from "sinon"

import waterfall from "./waterfall.js"

const {spy} = sinon

test("Always returns a Promise", async t => {
  const actual = waterfall([
    () => Promise.resolve(0)
  ])

  t.true(actual instanceof Promise)

  await actual
})

test(
  "Correctly resolves values even if tasks aren't return Promise",
  async t => {
    t.is(await waterfall([() => 0]), 0)
  }
)

test("Passes the result of previous task to the next", async t => {
  const taskOne = spy(() => "Hello")

  const taskTwo = spy(res => `${res}, world!`)

  await waterfall([taskOne, taskTwo])

  const expected = taskOne.lastCall.returnValue

  const [actual] = taskTwo.lastCall.args

  t.is(actual, expected)
})

test("Resolves a correct value", async t => {
  const actual = await waterfall([
    () => "Hello",
    prev => `${prev}, world!`
  ])

  t.is(actual, "Hello, world!")
})

test("Throws an error given task is not a function", async t => {
  await Promise.all([
    // @ts-ignore
    t.throwsAsync(waterfall([451])),

    // @ts-ignore
    t.throwsAsync(waterfall([() => 0, 451]))
  ])
})
