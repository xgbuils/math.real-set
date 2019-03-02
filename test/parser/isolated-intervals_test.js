const { expect } = require('chai')
var samples = require('./../interval-samples')
var parseIsolatedIntervals = require('../../src/parser/isolated-intervals.js')

describe('parseIsolatedIntervals', function () {
    it('{-1, 5, 7}', function () {
        var interval = parseIsolatedIntervals('{-1, 5, 7}').getOrElse()
        expect(interval).to.be.deep.equal([
            samples['{-1}'],
            samples['{5}'],
            samples['{7}']
        ])
    })

    it('{ 5}', function () {
        var interval = parseIsolatedIntervals('{5}').getOrElse()
        expect(interval).to.be.deep.equal([
            samples['{5}']
        ])
    })

    it('{5  ,-1}', function () {
        const interval = parseIsolatedIntervals('{5  ,-1}').getOrElse()
        expect(interval).to.be.deep.equal([
            samples['{5}'],
            samples['{-1}']
        ])
    })

    it('[1, 5] (unparsable)', function () {
        const error = parseIsolatedIntervals('{1, 5]').swap().getOrElse()
        expect(error).to.be.equal('"{1, 5]" cannot be parsed to set of isolated numbers.')
    })
})
