const test = require("ava")

const {spy} = require("sinon")

const waterfall = require("../../../lib/util/waterfall")

test("Should always return a Promise", async t => {
  t.plan(1)

  const actual = waterfall([
    () => Promise.resolve(0)
  ])

  t.true(actual instanceof Promise)

  await actual
})

test(
  "Should correctly resolve values even if tasks aren't return Promise",
  async t => {
    t.plan(2)

    t.notThrowsAsync(waterfall([() => 0]))
    t.is(await waterfall([() => 0]), 0)
  }
)

test("Should pass a result of previous task to the next", async t => {
  t.plan(1)

  const taskOne = spy(() => "Hello")

  const taskTwo = spy(res => `${res}, world!`)

  await waterfall([taskOne, taskTwo])

  const [actual] = taskTwo.lastCall.args

  const expected = taskOne.lastCall.returnValue

  t.is(actual, expected)
})

test("Should resolve a correct value", async t => {
  const actual = await waterfall([
    () => "Hello",
    prev => `${prev}, world!`
  ])

  t.is(actual, "Hello, world!")
})

test("Should throw an error given task is not a function", async t => {
  t.plan(2)

  await Promise.all([
    t.throwsAsync(waterfall([451])),

    t.throwsAsync(waterfall([() => 0, 451]))
  ])
})
