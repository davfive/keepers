/**
 * SUMMARY
 *   When you don't have bluebird but really want Promise.mapSeries() optionally without stopping on Error
 *
 * DETAILS
 *   Behaves like normal Bluebird.mapSeries except allows continue on catch
*/
const mapSeriesAsync = (array, fnAsync, {stop=true}={}) => Promise.resolve()
    .then(() => {
      return array.reduce((before, item) => {
        return before.then(results => Promise.all(
            [...results, fnAsync(item)
                .catch(e => (stop ? Promise.reject(e) : Promise.resolve(e)))
                .then(result => result),
            ]))
      }, Promise.resolve([]))
    })

// Test It
const howFarCanIJumpAsync = feet => feet <= 5 + Math.floor(Math.random() * 16)
  ? Promise.resolve(true)
  : Promise.reject(new Error(`Failed trying to jump ${feet} feet.`))

const distances = [...Array(25).keys()]
const report = results => results.forEach((r, i) =>
  console.log(`Jumped ${distances[i]} feet: ${r === true ? 'yes' : 'no'}`))

console.log('Jump Report (all jumps)')
mapSeriesAsync(distances, howFarCanIJumpAsync, {stop: false})
    .then(report)
    .catch(console.error) // Won't hit it, but never hurts to check
    .then(() => console.log('\nJump Report (report all jumps unless I missed one)'))
    .then(() => mapSeriesAsync(distances, howFarCanIJumpAsync, {stop: true}))
    .then(report)
    .catch(e => console.log(`${e}`))
