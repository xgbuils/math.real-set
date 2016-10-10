var parseIsolatedIntervals = require('./isolated-intervals.js')
var parseInterval = require('math.interval-utils').parser

function parseMultiInterval (str) {
    var intervals = []
    str.split('U').map(function (e) {
        return e.trim()
    }).forEach(function (interval) {
        if (interval[0] === '{') {
            intervals.push.apply(intervals, parseIsolatedIntervals(interval))
        } else if (['(', '['].indexOf(interval[0]) !== -1) {
            intervals.push(parseInterval(interval))
        }
    })
    return intervals
}

module.exports = parseMultiInterval
