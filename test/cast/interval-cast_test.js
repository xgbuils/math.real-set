var chai = require('chai')
var expect = chai.expect
var samples = require('../interval-samples')
var raw = require('math.interval/src/raw-interval')

var Interval = require('math.interval')
var intervalCast = require('../../src/cast/interval-cast')

describe('intervalCast', function () {
    describe('when param is IntervalCastable', function () {
        var interval
        beforeEach(function () {
            interval = intervalCast(samples['[3, 5)'])
        })
        it('returns an array of 1 element', function () {
            expect(interval).to.be.an('array')
            expect(interval.length).to.be.equal(1)
        })
        it('first element is an Interval instance', function () {
            expect(interval[0]).to.be.instanceOf(Interval)
        })
        it('first element wraps the raw interval', function () {
            expect(raw(interval[0])).to.be.deep.equal(samples['[3, 5)'])
        })
    })

    describe('when param is not IntervalCastable', function () {
        it('param is the same reference to result', function () {
            var param = new RegExp('^x+c', 'i')
            var result = intervalCast(param)
            expect(result).to.be.equal(param)
        })
    })
})
