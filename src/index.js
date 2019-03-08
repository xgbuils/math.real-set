const {union, numToInterval, contains} = require('math.interval-utils')
const parseToIntervals = require('./parser/')
const flatten = arr => [].concat(...arr)

const isNumber = e => ({}).toString.call(e).slice(8, -1) === 'Number' && !Number.isNaN(e)
const isIsolatedInterval = ([a, b]) => a.value === b.value && a.limit === 0 && b.limit === 0
const isNotIsolatedInterval = interval => !isIsolatedInterval(interval)

const isolatedToString = intervals => {
    const numbers = intervals.map(([{value}]) => value).join(', ')
    return numbers ? [`{${numbers}}`] : []
}
const notIsolatedToString = ([left, right]) => {
    const leftPar = left.limit ? '(' : '['
    const rightPar = right.limit ? ')' : ']'
    return `${leftPar + left.value}, ${right.value}${rightPar}`
}

const containsByIntervals = (intervals1, intervals2) => {
    return intervals2.every(function(i2) {
        return intervals1.some(i1 => contains(i1, i2))
    })
}

const toIntervals = set => set.intervals
const fromIntervals = intervals => new RealSet(union(intervals))

const realSetUnion = sets => fromIntervals(flatten(sets.map(toIntervals)))

class RealSet {
    constructor(intervals) {
        this.intervals = intervals
    }

    isEmpty() {
        return this.intervals.length === 0
    }

    contains(set) {
        return set instanceof RealSet
            ? containsByIntervals(this.intervals, set.intervals)
            : false
    }

    has(number) {
        return isNumber(number)
            ? containsByIntervals(this.intervals, [numToInterval(number)])
            : false
    }

    union(set) {
        return realSetUnion([this, set])
    }

    toString() {
        if (this.isEmpty()) {
            return '{}'
        }
        const { intervals } = this
        const isolatedIntervals = isolatedToString(intervals.filter(isIsolatedInterval))
        const notIsolatedIntervals = intervals.filter(isNotIsolatedInterval).map(notIsolatedToString)
        return [...isolatedIntervals, ...notIsolatedIntervals].join(' U ')
    }

    toIntervals() {
        return toIntervals(this)
    }
}

module.exports = {
    parse(string) {
        return parseToIntervals(string).bimap(
            err => {
                throw err
            },
            intervals => fromIntervals(union(intervals))
        ).getOrElse()
    },

    fromIntervals,

    union: realSetUnion
}
