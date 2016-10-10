var chai = require('chai')
var samples = require('./../interval-samples')
var parseIsolatedIntervals = require('../../src/parser/isolated-intervals.js')

chai.should()

describe('parseIsolatedIntervals', function () {
    it('{-1, 5, 7}', function () {
        var interval = parseIsolatedIntervals('{-1, 5, 7}')
        interval.should.be.deep.equal([
            samples['{-1}'],
            samples['{5}'],
            samples['{7}']
        ])
    })

    it('{ 5}', function () {
        var interval = parseIsolatedIntervals('{5}')
        interval.should.be.deep.equal([
            samples['{5}']
        ])
    })

    it('{5  ,-1}', function () {
        var interval = parseIsolatedIntervals('{5  ,-1}')
        interval.should.be.deep.equal([
            samples['{5}'],
            samples['{-1}']
        ])
    })
})
