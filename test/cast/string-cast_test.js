var chai = require('chai')
var expect = chai.expect
var samples = require('../interval-samples.js')
var rawInterval = require('math.interval/src/raw-interval.js')
var assert = require('assert')

var MSet = require('../../src/index')
var Interval = require('math.interval')
var stringCast = require('../../src/cast/string-cast.js')

describe('stringCast', function () {
    describe('if is a string then try to parse to array of intervals', function () {
        var intervals
        beforeEach(function () {
            intervals = stringCast('(2, 7) U {5, 7}')
        })
        it('returns an array', function () {
            expect(intervals).to.be.an('array')
        })
        it('all elements of array are Interval instances', function () {
            intervals.forEach(function (e, index) {
                assert.ok(e instanceof Interval, e + ' in position ' + index + ' is not an instance of Interval class')
            })
        })
        it('intervals has the correct values', function () {
            var expected = [
                samples['(2, 7)'],
                samples['{5}'],
                samples['{7}']
            ]
            assert.ok(intervals.length === expected.length,
                intervals.length + ' is not correct number of intervals. Expected: ' + expected.length)
            expected.forEach(function (e) {
                var errors = []
                var ok = intervals.map(rawInterval).some(function (interval) {
                    try {
                        assert.deepEqual(e, interval)
                        return true
                    } catch (err) {
                        errors.push(err)
                        return false
                    }
                })
                assert.ok(ok, e + ' is not contained in ' + intervals + '\n' + errors.join('\n'))
            })
        })
    })

    describe('when type of value is impossible to cast', function () {
        it('param is the same reference as result', function () {
            var param = new MSet('(1, 3)')
            var result = stringCast(param)
            expect(result).to.be.equal(param)
        })
    })
})

