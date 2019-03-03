const intervalUtils = require('math.interval-utils')
const numToInterval = intervalUtils.numToInterval
const {Right, Left} = require('data.either')
const trim = e => e.trim()
const parseToNumber = str => {
    const num = Number(str)
    return isNaN(num)
        ? Left(`"{${str}}" cannot be parsed to a set.`)
        : Right(num)
}
const append = array => item => {
    array.push(item)
    return array
}

function parseIsolatedIntervals(str) {
    const matches = /^\{\s*(\S+(?:\s*,\s*\S+)*)\s*\}$/.exec(str)

    if (!matches) {
        return Left(`"${str}" cannot be parsed to set of isolated numbers.`)
    }

    return matches[1].split(',').map(trim)
        .reduce((intervals, intervalString) => {
            return intervals.chain(intervals => {
                return parseToNumber(intervalString).map(append(intervals))
            })
        }, Right([]))
        .map(num => num.map(numToInterval))
}

module.exports = parseIsolatedIntervals
