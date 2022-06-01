import test from "ava"

import {createNoopLink} from "../__helper__/createNoopLink.js"
import {SearchGalleries} from "./SearchGalleries.js"
import type {SearchType} from "./Search.js"

test("Has correct search type", async t => {
  const link = createNoopLink()

  await new SearchGalleries({link})

  const [[, actual]] = link.firstCall.args

  t.is<string, SearchType>(actual, "galleries")
})
