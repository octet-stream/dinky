import test from "ava"

import flat from "./flat"

test("Returns given empty array as-is", t => {
  t.deepEqual(flat([]), [])
})

test("Flattens multiple empty arrays on 1st level", t => {
  t.deepEqual(flat([[], [], []]), [])
})

test("Flattens empty array in depth", t => {
  t.deepEqual(flat([[[[[[]]]]]], Infinity), [])
})

test("Returns flatten array", t => {
  t.deepEqual(
    flat([
      ["Testing", "Testing"],
      1,
      [2, 3]
    ]),

    // @ts-ignore
    ["Testing", "Testing", 1, 2, 3]
  )
})

test("Returns 1-level flatten array by default", t => {
  t.deepEqual(
    flat([
      [
        ["value"]
      ]
    ]),

    [
      // @ts-ignore
      ["value"]
    ]
  )
})

test("Flattens array deeply when second argument is set", t => {
  t.deepEqual(
    flat(
      [
        [
          ["value"]
        ],
        ["another value"]
      ],

      Infinity
    ),

    // @ts-ignore
    ["value", "another value"]
  )
})

test("Flattens array on given depth level", t => {
  t.deepEqual(
    flat(
      [
        [
          ["value"]
        ],
        [
          [
            ["another value"]
          ]
        ]
      ],

      2
    ),

    // @ts-ignore
    ["value", ["another value"]]
  )
})
