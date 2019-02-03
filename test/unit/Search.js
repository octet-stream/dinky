const test = require("ava")

const createNoopLink = require("../helper/createNoopLink")

const Search = require("../../lib/Search")

test.beforeEach(createNoopLink)

test("Creates a link with path to /search.json", async t => {
  const link = t.context.noopLink

  await new Search({link})

  const [path] = link.firstCall.args

  t.deepEqual(path, ["search"])
})

test("Creates search request without tags by default", async t => {
  const link = t.context.noopLink

  await new Search({link})

  const [, query] = link.firstCall.args

  t.false(query.has("q"))
})

test("Allows to pass tags to the constructor", async t => {
  const link = t.context.noopLink

  await new Search({link, tags: ["princess luna", "safe"]})

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "princess luna, safe")
})

test("Allows to pass a one tag from the string", async t => {
  const link = t.context.noopLink

  await new Search({link, tags: "scootaloo"})

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "scootaloo")
})

test(".tags() appends more tags to request", async t => {
  const link = t.context.noopLink

  await new Search({link, tags: ["princess luna", "safe"]})
    .tags(["scootaloo", "sleepless in ponyville"])

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "princess luna, safe, scootaloo, sleepless in ponyville")
})

test(".tags() allows to add a tag from the string", async t => {
  const link = t.context.noopLink

  await new Search({link}).tags("for whom the sweetie belle toils")

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "for whom the sweetie belle toils")
})

test(".tags() appends a tag from the string", async t => {
  const link = t.context.noopLink

  await new Search({link, tags: "minuette"}).tags("amending fences")

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "minuette, amending fences")
})

test(".limit() adds the page limit (perpage param) to query", async t => {
  const link = t.context.noopLink

  await new Search({link}).limit(42)

  const [, query] = link.firstCall.args

  t.true(query.has("perpage"))
  t.is(query.get("perpage"), 42)
})

test(".random() adds random_image param to query", async t => {
  const link = t.context.noopLink

  await new Search({link}).random()

  const [, query] = link.firstCall.args

  t.true(query.has("random_image"))
  t.true(query.get("random_image"))
})

// TODO: Add test to check how

test("Throws an error when given limit is not a number", async t => {
  const link = t.context.noopLink

  const err = await t.throwsAsync(new Search({link}).limit("not a number"))

  t.true(err instanceof TypeError)
  t.is(err.message, "You must specify the limit amount as number.")
})

test("Throws an error when given limit is more than 50", async t => {
  const link = t.context.noopLink

  const err = await t.throwsAsync(new Search({link}).limit(451))

  t.true(err instanceof RangeError)
  t.is(err.message, "Limit must be a value in range between 1 and 50.")
})

test("Throws an error when given limit is less than 1", async t => {
  const link = t.context.noopLink

  const err = await t.throwsAsync(new Search({link}).limit(0))

  t.true(err instanceof RangeError)
  t.is(err.message, "Limit must be a value in range between 1 and 50.")
})
