var rawInterval = require('math.interval/src/raw-interval')

module.exports = function rawSet (e) {
    return e.intervals.map(rawInterval)
}
