var typeVerify = require('type-verify')
var Interval = require('math.interval')
var toInterval = require('math.interval/src/cast')(Interval)

function multiIntervalCast (value) {
    var intervalList = []
    var isIntervalList = typeVerify(value, ['Array']) && value.every(function (e) {
        var partialResult = toInterval(e)
        if (e !== partialResult) {
            return intervalList.push(new Interval(partialResult))
        }
        return false
    })
    return isIntervalList ? intervalList : value
}

module.exports = multiIntervalCast
