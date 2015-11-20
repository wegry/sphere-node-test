import {map} from 'underscore'

export default function leTest () {
  const squares = map([1, 2, 3, 4], x => x * x)
  console.log(`${squares}`)
  return 1000
 }

leTest()