/**
 * SUMMARY
 *   Because I'm tired of destructure objects by hand when I can't have lodash.get
 * 
 * DETAILS
 *   loget(o, 'a.b.2.c') // where 2 is an array index; a and b are objects, and c is the final key
 * 
 * CAVEATS
 *   I'm pretty sure I'm missing failing tests, but I can't think of any more.
 *   Let me know if you find any, happy to update it.
*/
// https://gist.github.com/harish2704/d0ee530e6ee75bad6fd30c98e5ad9dab#gistcomment-3148552
function logget (object, path, value) {
  const pathArray = Array.isArray(path) ? path : path.split('.').filter(key => key);
  const pathArrayFlat = pathArray.flatMap(part => typeof part === 'string' ? part.split('.') : part);
  const checkValue = pathArrayFlat.reduce((obj, key) => obj && obj[key], object);
  return  checkValue === undefined ? value : checkValue
}

// Test the darn thing
const testFunc = () => true
const testObj = {num: 1, func: testFunc, array: [1,{key: 'value'}], obj: {num: 1, null: null}}
const tests = [
  {
    obj: undefined,
    runs: [
      {get: null, dflt: 1, expect: {type: 'number', value: 1}},
      {get: null, expect: {type: 'undefined'}},
      {get: undefined, dflt: 1, expect: {type: 'number', value: 1}},
      {get: undefined, expect: {type: 'undefined'}},
      {get: '', dflt: 1, expect: {type: 'number', value: 1}},
      {get: '', expect: {type: 'undefined'}},
      {get: 'a', dflt: 1, expect: {type: 'number', value: 1}},
      {get: 'a', expect: {type: 'undefined'}},
      {get: ['a', 2], dflt: 1, expect: {type: 'number', value: 1}},
      {get: ['a', 2], expect: {type: 'undefined'}},
    ]
  },
  {
    obj: null,
    runs: [
      {get: null, dflt: 1, expect: {type: 'number', value: 1}},
      {get: null, expect: {type: 'undefined'}},
      {get: undefined, dflt: 1, expect: {type: 'number', value: 1}},
      {get: undefined, expect: {type: 'undefined'}},
      {get: '', dflt: 1, expect: {type: 'number', value: 1}},
      {get: '', expect: {type: 'undefined'}},
      {get: 'a', dflt: 1, expect: {type: 'number', value: 1}},
      {get: 'a', expect: {type: 'undefined'}},
      {get: 'a.2', dflt: 1, expect: {type: 'number', value: 1}},
      {get: 'a.2', expect: {type: 'undefined'}},
    ]
  },
  {
    obj: {array: [testObj]},
    runs: [
      // Not in object
      {get: null, dflt: 1, expect: {type: 'object'}},
      {get: null, expect: {type: 'object'}},
      {get: undefined, dflt: 1, expect: {type: 'object'}},
      {get: undefined, expect: {type: 'object'}},
      {get: 'a', dflt: 1, expect: {type: 'number', value: 1}},
      {get: 'a', expect: {type: 'undefined'}},
      {get: 'a.2', dflt: [], expect: {type: 'array'}},
      {get: 'a.3', expect: {type: 'undefined'}},
      // [{num: 1, func: testFunc, array: [1,{key: 'value'}], obj: {num: 1, null: null}}]
      {get: 'array', dflt: 1, expect: {type: 'array'}},
      {get: 'array', expect: {type: 'array'}},
      {get: 'array.0', dflt: 1, expect: {type: 'object'}},
      {get: 'array.0', expect: {type: 'object'}},
      {get: 'array.1', dflt: 1, expect: {type: 'number', value: 1}},
      {get: 'array.1', expect: {type: 'undefined'}},
      {get: 'array.0.num', dflt: 'a', expect: {type: 'number', value: 1}},
      {get: 'array.0.num', expect: {type: 'number', value: 1}},
      {get: 'array.0.bad', dflt: 'a', expect: {type: 'string', value: 'a'}},
      {get: 'array.0.bad', expect: {type: 'undefined'}},
      {get: 'array.0.func', dflt: 'a', expect: {type: 'function'}},
      {get: 'array.0.func', expect: {type: 'function'}},
      {get: 'array.0.func.bad', dflt: 'a', expect: {type: 'string', value: 'a'}},
      {get: 'array.0.func.bad', expect: {type: 'undefined'}},
      {get: 'array.0.array.0', dflt: 'a', expect: {type: 'number', value: 1}},
      {get: 'array.0.array.0', expect: {type: 'number', value: 1}},
      {get: 'array.0.array.1', dflt: 1, expect: {type: 'object'}},
      {get: 'array.0.array.1', expect: {type: 'object'}},
      {get: 'array.0.array.1.key', dflt: 1, expect: {type: 'string', value: 'value'}},
      {get: 'array.0.array.1.key', expect: {type: 'string', value: 'value'}},
      {get: 'array.0.obj.bad', dflt: 'a', expect: {type: 'string', value: 'a'}},
      {get: 'array.0.obj.bad', expect: {type: 'undefined'}},
      {get: 'array.0.obj.num', dflt: 'a', expect: {type: 'number', value: 1}},
      {get: 'array.0.obj.num', expect: {type: 'number', value: 1}},
      {get: 'array.0.obj.null', dflt: 1, expect: {type: 'object', value: null}},
      {get: 'array.0.obj.null', expect: {type: 'object', value: null}},
    ]
  }
]

const checkResult = (actual, expected) => {
  let isSameType = true
  if (! ('type' in expected)) isSameType = false
  if (expected.type === 'array' && !Array.isArray(actual)) isSameType = false
  if (expected.type !== 'array' && typeof actual !== expected.type) isSameType = false
  return isSameType && ('value' in expected)
    ? actual === expected.value
    : isSameType
}

const logtest = ({testnum, runnum, result, run, actual}) =>
  console.log(`Test ${testnum}.${runnum} result ${result}: actual(${actual}) run(${JSON.stringify(run)}`)


const results = { pass: 0, fail: 0, crashed: 0}
tests.forEach((test, testnum) => {
  test.runs.forEach((run, runnum) => {
    try {
      const actual = loget(test.obj, run.get, run.dflt)
      const result = checkResult(actual, run.expect)
      results[result ? 'pass' : 'fail']++
      logtest({testnum, runnum, get: run.get, result, run, actual})
    } catch(e) {
      results['crashed']++
      console.log(`Test ${testnum}.${runnum} crashed: ${JSON.stringify(run)}`)
    }
  })
})
console.log(JSON.stringify(results))
// => {"pass":54,"fail":0,"crashed":0}
