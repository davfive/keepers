/**
 * SUMMARY
 *   When you don't have Bluebird but really want Promise.each()
 *
 * DETAILS
 *   try/catch and initial => Promise.resolve() to ensure caller's .catch() catches everything
*/
const each1 = async function(array, fn) {
  try {
    for (item of array) await fn(item)
  } catch (e) {
    throw e
  }
}

const each2 = (array, fn) => Promise.resolve()
    .then(() => array.reduce((before, item) => Promise.all([before, fn(item)]), Promise.resolve()))

each1([1, 2, 3], console.log)
    .then(() => each2([4, 5, 6], console.log))
