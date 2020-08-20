/**
 * SUMMARY
 *   Dynamically generate mocha tests based off of data
 *
 * DETAILS
 *   In this example, I simply create an array of numbers for the data. but a more practical use
 *   is to have subfolders with test-categories and individual test configurations, e.g., 
 *     test/
 *       mocha-dynamic-tests.js
 *       test-category-1/
 *         000_test-name/
 *           config.json
 *           data/
 *         ...
 *        ...
 *        test-category-N/
 *   
 *   And inside the addTest() below you could call different test runners based on the config.json info.
 *
*/
const assert = require('assert')
const Test = require('mocha/lib/test')

function addTest(suite, title, fn) {
  const test = new Test(title, fn)
  test.file = __filename
  suite.addTest(test)
  return test
}

const numbers = [...Array(99).keys()] // 100 dynamic tests

const suite = describe('Number Equality Check', function() {
  before(function() {
    for (number in numbers) {
      const testName = `${number} === ${number}`
      addTest(suite, testName, function() {
        assert.equal(number, number)
      })
    }
  })

  it('Dynamic Test Generation Dummy Test (always passes)', function() {
    assert.equal(1,1)
  })
})
