/**
 * SUMMARY
 *   Wraps console (or other logger) with addtional functionality
 *
 * USAGE
 *   const logger = require('./console++')                 // Not prefixed
 *   const logger = require('./console++').scope('PREFIX') // Prefix all message with PREFIX
 *   const logger.json({object}, replacer?, space?)        // Stringify then logger.info()
 *   throw logger.newError('my error')                     // log this and return new Error(msg)
 *   ... .catch(e => logger.reject('my error')             // log this and return Promise.reject(logger.newError(msg))
 *
 * DETAILS
 *   .scope(prefix) - Write all messages with prefix
 *   .newError(msg) - logger.error(msg) return new Error(msg)
 *   .reject(msg)   - Promise.reject(logger.newError(msg))
 *
 * NOTE
 *   If you change the logger to winston or something else update logLevels
*/
const logger = console
const logLevels = ['debug', 'info', 'log', 'warn', 'error']

function scope(prefix) {
  prefix = prefix ? `[${prefix}] ` : ''
  const scopedFuncs = logLevels.reduce((o, l) => {
    o[l] = (msg) => {
      logger[l](`${prefix}${msg instanceof Error ? msg.stack : msg}`)
    }
    return o
  }, {})

  scopedFuncs.json = (json, replacer, space) => logger.info(JSON.stringify(json, replacer, space))
  scopedFuncs.newError = (msg) => {
    scopedFuncs.error(msg)
    return (msg instanceof Error) ? msg : new Error(msg)
  }
  scopedFuncs.reject = (msg) => Promise.reject(scopedFuncs.newError(msg))
  scopedFuncs.scope = scope // make more scopes anytime
  return scopedFuncs
}

const logFuncs = scope() // default - no scope prefix
module.exports = logFuncs