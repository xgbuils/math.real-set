module.exports = function (castFunctions) {
    return function (rawValue) {
        var value
        for (var i = 0; i < castFunctions.length; ++i) {
            value = castFunctions[i](rawValue)
            if (value !== rawValue) {
                return value
            }
        }

        return rawValue
    }
}
