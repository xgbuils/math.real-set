var chai = require('chai')
var expect = chai.expect
var samples = require('../interval-samples')
var assert = require('assert')

var Interval = require('math.interval')
var raw = require('math.interval/src/raw-interval')
var multiIntervalCast = require('../../src/cast/multi-interval-cast')

describe('multiIntervalCast', function () {
    describe('when param is an array of IntervalCastable values', function () {
        var param
        var result
        beforeEach(function () {
            param = [
                '[3, 9)',
                samples['(4, 5]'],
                samples['(3, 0]'],
                new Interval('{5}')
            ]
            result = multiIntervalCast(param)
        })
        it('returns an array', function () {
            expect(result).to.be.an('array')
        })
        it('all elements of array are Interval instances', function () {
            result.forEach(function (e, index) {
                assert.ok(e instanceof Interval, e + ' in position ' + index + ' is not an instance of Interval class')
            })
        })
        it('returns correct array of intervals', function () {
            expect(result.map(raw)).to.deep.equal([
                samples['[3, 9)'],
                samples['(4, 5]'],
                samples['(3, 0]'],
                samples['{5}']
            ])
        })
    })

    describe('when param is not an array of IntervalCastable values', function () {
        it('param is the same reference to result', function () {
            var param = true
            var result = multiIntervalCast(param)
            expect(result).to.be.equal(param)
        })
    })
})
