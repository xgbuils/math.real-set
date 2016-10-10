var typeVerify = require('type-verify')
var Interval = require('math.interval')
var toInterval = require('math.interval/src/cast')(Interval)

module.exports = function intervalCast (value) {
    var result = toInterval(value)
    return value !== result ? [new Interval(result)] : value
}
