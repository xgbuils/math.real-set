var chai = require('chai')
var expect = chai.expect

var predicateCast = require('../../src/cast/predicate-cast.js')

describe('predicateCast', function () {
    describe('if it is passed a function', function () {
        var obj
        var fn
        beforeEach(function () {
            fn = function (e) {
                return e > 5
            }
            obj = predicateCast(fn)
        })
        it('returns an object', function () {
            expect(obj).to.be.an('object')
        })
        it('object `.fns` property is an array that first element has a `fn` function property with the same reference as parameter', function () {
            expect(obj.fns[0].fn).to.be.equal(fn)
        })
        it('object `.fns` property is an array that first element has an `equality` function property that represents `===` operator', function () {
            expect(obj.fns[0].equality).to.be.a('function')
            expect(obj.fns[0].equality(3, 3)).to.be.equal(true)
        })
    })

    describe('if it is passed an object with properties .contains and .equality', function () {
        var obj
        var param
        beforeEach(function () {
            param = {
                contains: function (e) {
                    return e > 5
                },
                equality: function (a, b) {
                    return Math.abs(a - b) <= 1
                }
            }
            obj = predicateCast(param)
        })
        it('returns an object', function () {
            expect(obj).to.be.an('object')
        })
        it('object `fns` property is an array that first element has a `fn` function property with the same reference as parameter.contains', function () {
            expect(obj.fns[0].fn).to.be.equal(param.contains)
        })
        it('object `fns` property is an array that first element has an `equality` function property with the same reference as parameter.equality', function () {
            expect(obj.fns[0].equality).to.be.equal(param.equality)
        })
    })

    describe('if it is passed an object with property .contains and not .equality', function () {
        var obj
        var param
        beforeEach(function () {
            param = {
                contains: function (e) {
                    return e > 5
                }
            }
            obj = predicateCast(param)
        })
        it('returns an object', function () {
            expect(obj).to.be.an('object')
        })
        it('object `fns` property is an array that first element has a `fn` function property with the same reference as parameter.contains', function () {
            expect(obj.fns[0].fn).to.be.equal(param.contains)
        })
        it('object `fns` property is an array that first element has an `equality` function property that represents `===` operator', function () {
            expect(obj.fns[0].equality).to.be.a('function')
            expect(obj.fns[0].equality(3, 3)).to.be.equal(true)
        })
    })

    describe('when type of value is impossible to cast', function () {
        it('param is the same reference as result', function () {
            var param = /a+/
            var result = predicateCast(param)
            expect(result).to.be.equal(param)
        })
    })
})

