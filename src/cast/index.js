var castFactory = require('./cast-factory.js')
var setCastFactory = require('./set-cast.js')
var stringCast = require('./string-cast')
var Interval = require('math.interval')
var multiIntervalCast = require('./multi-interval-cast')
var intervalCast = require('./interval-cast')
var predicateCast = require('./predicate-cast.js')

module.exports = function (MSet) {
    var setCast = setCastFactory(MSet)
    return castFactory([
        setCast,
        multiIntervalToSet(compactAfter(stringCast)),
        multiIntervalToSet(compactAfter(multiIntervalCast)),
        multiIntervalToSet(intervalCast),
        predicateCast
    ])

    function compactAfter (cb) {
        return function (value) {
            var intervals = cb(value)
            return value !== intervals
                ? Interval.union.apply(null, intervals)
                : value
        }
    }

    function multiIntervalToSet (cb) {
        return function (value) {
            var intervals = cb(value)
            return intervals !== value ? {
                intervals: intervals,
                fns: []
            } : value
        }
    }
}
