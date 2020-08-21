/**
 * SUMMARY
 *   Sometimes I just need to know if two things are mutually exclusively set
 * 
 *   In lay terms this is called either-or-neither-but-not-both
 */
const mutuallyExclusivelySet = (a, b, isSet = (x) => x !== undefined) =>
  (!isSet(a) && !isSet(b)) || (isSet(a) ^ isSet(b)) === 1

// In case you're even more of a tightwad
const mutuallyExclusivelySetNoNulls = (a, b, isSet = (x) => x != null) =>
  (!isSet(a) && !isSet(b)) || (isSet(a) ^ isSet(b)) === 1

// Test it
const testTotals = {pass: 0, fail: 0}
const test = (a, b, {expected, nullsAreNotSet}) => {
  const actual = nullsAreNotSet
  ? mutuallyExclusivelySetNoNulls(a,b)
  : mutuallyExclusivelySet(a,b)
  
  const status = expected === actual ? 'pass' : 'fail'
  if (a === undefined) a = '<undefined>' // so it'll show up in the log
  if (b === undefined) b = '<undefined>' // so it'll show up in the log
  console.log(`${status.toUpperCase()}: ${JSON.stringify({a,b,expected,actual,nullsAreNotSet})}`)
  testTotals[status]++
}

const runtests = ({unSetValues, setValues, nullsAreNotSet}) => {
  unSetValues.forEach(unSetValue => {
    setValues.forEach(setValue => {
      test(setValue, setValue, {expected: false, nullsAreNotSet})
      test(setValue, unSetValue, {expected: true, nullsAreNotSet})
      test(unSetValue, setValue, {expected: true, nullsAreNotSet})
    })
    test(unSetValue, unSetValue, {expected: true, nullsAreNotSet})
  })
}

runtests({
  unSetValues: [undefined],
  nullsAreNotSet: false,
  setValues: [null, false, true, 0, 1, [], {}, () => false] 
})
runtests({
  unSetValues: [undefined, null],
  nullsAreNotSet: true,
  setValues: [false, true, 0, 1, [], {}, () => false] 
})
console.log(JSON.stringify(testTotals))
