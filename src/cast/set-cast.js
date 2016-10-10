module.exports = function (TSet) {
    return function setCast (value) {
        return value instanceof TSet ? {
            intervals: value.intervals,
            fns: value.fns
        } : value
    }
}
