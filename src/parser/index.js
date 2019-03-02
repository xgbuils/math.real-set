const { Left, Right } = require('data.either')
const parseIsolatedIntervals = require('./isolated-intervals.js')
const { parser } = require('math.interval-utils')
const trim = (e) => e.trim()
const append = array => items => {
    array.push.apply(array, items)
    return array
}
const identity = x => x
const cannotBeParsedToASet = set =>
    Left(`${set} cannot be parsed to a subset of Real numbers.`)

const convertToIntervals = (set) => {
    if (set[0] === '{') {
        return parseIsolatedIntervals(set)
    } else if (['(', '['].indexOf(set[0]) !== -1) {
        return parser(set).map(interval => [interval])
    }
    return cannotBeParsedToASet(`"${set}"`)
}

const parseMultipleIntervals = (set) => {
    return set.split('U').map(trim).reduce((intervalList, intervalString) => {
        return intervalList.chain(intervalList => {
            return convertToIntervals(intervalString).map(append(intervalList))
        })
    }, Right([]))
}

module.exports = (set) => {
    let result
    if (typeof set !== 'string') {
        result = cannotBeParsedToASet(set)
    } else {
        result = parseMultipleIntervals(set)
        set = `"${set}"`
    }
    return result.bimap((error) => `parsing error in ${set}: ${error}`, identity)
}
