var typeVerify = require('type-verify')

module.exports = function (value) {
    var obj = {}
    if (isFunction(value)) {
        obj.fn = value
        obj.equality = equality
    } else if (typeVerify(value, ['Object']) && isFunction(value.contains)) {
        var eq = value.equality
        obj.fn = value.contains
        obj.equality = isFunction(eq) ? eq : equality
    } else {
        return value
    }
    return {
        intervals: [],
        fns: [obj]
    }
}

function isFunction (value) {
    return typeVerify(value, ['Function'])
}

function equality (a, b) {
    return a === b
}
