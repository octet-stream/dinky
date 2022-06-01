import test from "ava"

import {createNoopLink} from "../__helper__/createNoopLink.js"
import type {SearchType} from "./Search.js"
import {SearchTags} from "./SearchTags.js"

test("Has correct search type", async t => {
  const link = createNoopLink()

  await new SearchTags({link})

  const [[, actual]] = link.firstCall.args

  t.is<string, SearchType>(actual, "tags")
})
