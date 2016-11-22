var parseIsolatedIntervals = require('./isolated-intervals.js')
var parseInterval = require('math.interval-utils').parser

function parseMultiInterval (str) {
    var intervals = []
    str.split('U').map(function (e) {
        return e.trim()
    }).forEach(function (interval) {
        var list = notThrow(convertToIntervals, interval)
        if (list === null) {
            throw new Error('\'' + str + '\' is not able to be parsed')
        }
        intervals.push.apply(intervals, list)
    })
    return intervals
}

function convertToIntervals (interval) {
    if (interval[0] === '{') {
        return parseIsolatedIntervals(interval)
    } else if (['(', '['].indexOf(interval[0]) !== -1) {
        return [parseInterval(interval)]
    }
    return null
}

function notThrow (cb, interval) {
    try {
        return cb(interval)
    } catch (e) {
        return null
    }
}

module.exports = parseMultiInterval
