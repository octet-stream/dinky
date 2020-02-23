const test = require("ava")

const createNoopLink = require("../helper/createNoopLink")

const Search = require("../../lib/Search")

test.beforeEach(createNoopLink)

test("Creates a link to /api/v1/json/search", async t => {
  const link = t.context.noopLink

  await new Search({link})

  const [[actual]] = link.firstCall.args

  t.is(actual, "search")
})

test("Sets default search type to images", async t => {
  const link = t.context.noopLink

  await new Search({link})

  const [[, actual]] = link.firstCall.args

  t.is(actual, "images")
})

test(".comments() sets the search type to comments", async t => {
  const link = t.context.noopLink

  await new Search({link}).comments()

  const [[, actual]] = link.firstCall.args

  t.is(actual, "comments")
})

test(".galleries() sets the search type to galleries", async t => {
  const link = t.context.noopLink

  await new Search({link}).galleries()

  const [[, actual]] = link.firstCall.args

  t.is(actual, "galleries")
})

test(".posts() sets the search type to posts", async t => {
  const link = t.context.noopLink

  await new Search({link}).posts()

  const [[, actual]] = link.firstCall.args

  t.is(actual, "posts")
})

test(".tags() sets the search type to tags", async t => {
  const link = t.context.noopLink

  await new Search({link}).tags()

  const [[, actual]] = link.firstCall.args

  t.is(actual, "tags")
})

test(".images() sets the search type to images", async t => {
  const link = t.context.noopLink

  await new Search({link}).images()

  const [[, actual]] = link.firstCall.args

  t.is(actual, "images")
})

test("Creates search request without tags by default", async t => {
  const link = t.context.noopLink

  await new Search({link})

  const [, query] = link.firstCall.args

  t.false(query.has("q"))
})

test("Allows to pass tags to the constructor", async t => {
  const link = t.context.noopLink

  await new Search({link, query: ["princess luna", "safe"]})

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "princess luna,safe")
})

test(".query() allows to pass an empty array as an argument", async t => {
  const link = t.context.noopLink

  await new Search({link}).query([])

  const [, query] = link.firstCall.args

  t.false(query.has("q"))
})

test(
  ".query() allows to pass multiple empty arrays as an argument",
  async t => {
    const link = t.context.noopLink

    await new Search({link}).query([], [], [])

    const [, query] = link.firstCall.args

    t.false(query.has("q"))
  }
)

test(
  ".query() will not set any tags when called without arguments",
  async t => {
    const link = t.context.noopLink

    await new Search({link}).query()

    const [, query] = link.firstCall.args

    t.false(query.has("q"))
  }
)

test(".query() allows to pass a one tag from the string", async t => {
  const link = t.context.noopLink

  await new Search({link}).query("scootaloo")

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "scootaloo")
})

test(".query() appends more tags to request", async t => {
  const link = t.context.noopLink

  await new Search({link, query: ["princess luna", "safe"]})
    .query(["scootaloo", "sleepless in ponyville"])

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "princess luna,safe,scootaloo,sleepless in ponyville")
})

test(".query() allows to add a tag from the string", async t => {
  const link = t.context.noopLink

  await new Search({link}).query("for whom the sweetie belle toils")

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "for whom the sweetie belle toils")
})

test(".query() appends a tag from the string", async t => {
  const link = t.context.noopLink

  await new Search({link, query: ["minuette"]}).query("amending fences")

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "minuette,amending fences")
})

test(".query() allows to set tags from multiple strings", async t => {
  const link = t.context.noopLink

  await new Search({link}).query("artist:rainbow", "scootaloo")

  const [, query] = link.firstCall.args

  t.true(query.has("q"))
  t.is(query.get("q"), "artist:rainbow,scootaloo")
})

test(".query() allows to set tags from multiple arrays", async t => {
  const link = t.context.noopLink

  await new Search({link}).query(["artist:rainbow"], ["scootaloo"])

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

  await new Search({link}).query(["scootaloo", "safe"]).faves()

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

  await new Search({link}).query(["scootaloo", "safe"]).watched()

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

  await new Search({link}).query(["scootaloo", "safe"]).upvotes()

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

  await new Search({link}).query(["scootaloo", "safe"]).downvotes()

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

  await new Search({link}).query(["scootaloo", "safe"]).uploads()

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

  t.is(query.get("per_page"), 42)
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

test(".random() adds sf=random param to query", async t => {
  const link = t.context.noopLink

  await new Search({link}).random()

  const [, query] = link.firstCall.args

  t.is(query.get("sf"), "random")
})

test(
  ".random() will apply the * wildcard when no tags has been set", async t => {
    const link = t.context.noopLink

    await new Search({link}).random()

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
