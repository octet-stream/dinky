const test = require("ava")
const pq = require("proxyquire")

const {spy} = require("sinon")

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
  t.is(query.get("q"), "princess luna,safe")
})

test(".tags() allows to pass an empty array as an argument", async t => {
  const link = t.context.noopLink

  await new Search({link}).tags([])

  const [, query] = link.firstCall.args

  t.false(query.has("q"))
})

test(".tags() allows to pass multiple empty arrays as an argument", async t => {
  const link = t.context.noopLink

  await new Search({link}).tags([], [], [])

  const [, query] = link.firstCall.args

  t.false(query.has("q"))
})

test(".tags() will not set any tags when called without arguments", async t => {
  const link = t.context.noopLink

  await new Search({link}).tags()

  const [, query] = link.firstCall.args

  t.false(query.has("q"))
})

test(".tags() allows to pass a one tag from the string", async t => {
  const link = t.context.noopLink

  await new Search({link}).tags("scootaloo")

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
  t.is(query.get("q"), "princess luna,safe,scootaloo,sleepless in ponyville")
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

  await new Search({link, tags: ["minuette"]}).tags("amending fences")

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "minuette,amending fences")
})

test(".tags() allows to set tags from multiple strings", async t => {
  const link = t.context.noopLink

  await new Search({link}).tags("artist:rainbow", "scootaloo")

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "artist:rainbow,scootaloo")
})

test(".tags() allows to set tags from multiple arrays", async t => {
  const link = t.context.noopLink

  await new Search({link}).tags(["artist:rainbow"], ["scootaloo"])

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "artist:rainbow,scootaloo")
})

test(".faves() sets my:faves to request", async t => {
  const link = t.context.noopLink

  await new Search({link}).faves()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "my:faves")
})

test(".faves() appends my:faves to the existent tags set", async t => {
  const link = t.context.noopLink

  await new Search({link}).tags(["scootaloo", "safe"]).faves()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "scootaloo,safe,my:faves")
})

test(".watched() sets my:watched to request", async t => {
  const link = t.context.noopLink

  await new Search({link}).watched()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "my:watched")
})

test(".watched() appends my:watched to the existent tags set", async t => {
  const link = t.context.noopLink

  await new Search({link}).tags(["scootaloo", "safe"]).watched()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "scootaloo,safe,my:watched")
})

test(".upvotes() sets my:upvotes to request", async t => {
  const link = t.context.noopLink

  await new Search({link}).upvotes()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "my:upvotes")
})

test(".upvotes() appends my:upvotes to the existent tags set", async t => {
  const link = t.context.noopLink

  await new Search({link}).tags(["scootaloo", "safe"]).upvotes()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "scootaloo,safe,my:upvotes")
})

test(".downvotes() sets my:downvotes to request", async t => {
  const link = t.context.noopLink

  await new Search({link}).downvotes()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "my:downvotes")
})

test(".downvotes() appends my:downvotes to the existent tags set", async t => {
  const link = t.context.noopLink

  await new Search({link}).tags(["scootaloo", "safe"]).downvotes()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "scootaloo,safe,my:downvotes")
})

test(".uploads() sets my:uploads to request", async t => {
  const link = t.context.noopLink

  await new Search({link}).uploads()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "my:uploads")
})

test(".uploads() appends my:uploads to the existent tags set", async t => {
  const link = t.context.noopLink

  await new Search({link}).tags(["scootaloo", "safe"]).uploads()

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "scootaloo,safe,my:uploads")
})

test(".favedBy() sets faved_by parameter with the given user", async t => {
  const link = t.context.noopLink

  await new Search({link}).favedBy("minuette")

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "faved_by:minuette")
})

test(".uploadedBy() sets uploader parameter with the given user", async t => {
  const link = t.context.noopLink

  await new Search({link}).uploadedBy("minuette")

  const [, query] = link.firstCall.args

  t.is(query.get("q"), "uploader:minuette")
})

test(".limit() adds the page limit (perpage param) to query", async t => {
  const link = t.context.noopLink

  await new Search({link}).limit(42)

  const [, query] = link.firstCall.args

  t.is(query.get("perpage"), 42)
})

test(".minScore() adds the minimal images score to query", async t => {
  const link = t.context.noopLink

  await new Search({link}).minScore(420)

  const [, query] = link.firstCall.args

  t.is(query.get("min_score"), 420)
})

test(".maxScore() adds the maximal images score to query", async t => {
  const link = t.context.noopLink

  await new Search({link}).maxScore(2600)

  const [, query] = link.firstCall.args

  t.is(query.get("max_score"), 2600)
})

test(".ascending() sets ordering to the ascending", async t => {
  const link = t.context.noopLink

  await new Search({link}).ascending()

  const [, query] = link.firstCall.args

  t.is(query.get("sd"), "asc")
})

test(".descending() sets ordering to the descending", async t => {
  const link = t.context.noopLink

  await new Search({link}).descending()

  const [, query] = link.firstCall.args

  t.is(query.get("sd"), "desc")
})

test(".sortBy() sets sorting param with given field", async t => {
  const link = t.context.noopLink

  await new Search({link}).sortBy("score")

  const [, query] = link.firstCall.args

  t.is(query.get("sf"), "score")
})

test(".random() adds random_image param to query", async t => {
  const link = t.context.noopLink

  await new Search({link}).random()

  const [, query] = link.firstCall.args

  t.true(query.get("random_image"))
})

test(
  ".random() sends another request to get an image with returned ID",
  async t => {
    const expected = 1328192

    const link = spy((_, query) => {
      if (query.get("q") === "scootaloo") {
        return {id: expected}
      }
    })

    const dinky = pq("../../lib/Dinky", {"./util/link": () => link})()

    await new Search({link, dinky}).tags("scootaloo").random()

    t.true(link.calledTwice)

    const [[, actual]] = link.lastCall.args

    t.is(actual, expected)
  }
)

test(
  ".random() will apply the * wildcard when no tags has been set", async t => {
    const link = spy((_, query) => {
      if (query.has("q")) {
        return {id: 1328192}
      }
    })

    const dinky = pq("../../lib/Dinky", {"./util/link": () => link})()

    await new Search({link, dinky}).random()

    t.true(link.calledTwice)

    const [, actual] = link.firstCall.args

    t.is(actual.get("q"), "*")
  }
)

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

test("Throws an error when given MINIMAL score is not a number", async t => {
  const link = t.context.noopLink

  const err = await t.throwsAsync(new Search({link}).minScore("not a number"))

  t.true(err instanceof TypeError)
  t.is(err.message, "You must specify minimal score as a number.")
})

test("Throws an error when given MAXIMAL score is not a number", async t => {
  const link = t.context.noopLink

  const err = await t.throwsAsync(new Search({link}).maxScore("not a number"))

  t.true(err instanceof TypeError)
  t.is(err.message, "You must specify maximal score as a number.")
})
