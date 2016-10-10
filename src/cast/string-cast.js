var typeVerify = require('type-verify')
var parseMultiInterval = require('../parser/')
var Interval = require('math.interval')

module.exports = function stringCast (value) {
    return typeVerify(value, ['String'])
        ? parseMultiInterval(value).map(function (interval) {
            return new Interval(interval)
        })
        : value
}
