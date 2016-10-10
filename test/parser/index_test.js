var chai = require('chai')
var expect = chai.expect
var samples = require('../interval-samples')
var parseMultiInterval = require('../../src/parser')

describe('parseMultiInterval', function () {
    it('[4,5]U [ 3 , 9)', function () {
        var set = parseMultiInterval('[4,5]U [ 3 , 9)')
        expect(set).to.be.deep.equal([
            samples['[4, 5]'],
            samples['[3, 9)']
        ])
    })

    it('(4, 8)   U[ 3 ,5)U{-1,7}', function () {
        var set = parseMultiInterval('(4, 8)   U[ 3 ,5)U{-1,7}')
        expect(set).to.be.deep.equal([
            samples['(4, 8)'],
            samples['[3, 5)'],
            samples['{-1}'],
            samples['{7}']
        ])
    })

    it('  {    5    }    ', function () {
        var set = parseMultiInterval('  {    5    }    ')
        expect(set).to.be.deep.equal([
            samples['{5}']
        ])
    })

    it('(3,   11  ]    ', function () {
        var set = parseMultiInterval('(3,   11  ]    ')
        expect(set).to.be.deep.equal([
            samples['(3, 11]']
        ])
    })

    it('( 2 , 7] U {5, -1} U (3, 0]', function () {
        var set = parseMultiInterval('( 2 , 7] U {5, -1} U (3, 0]')
        expect(set).to.be.deep.equal([
            samples['(2, 7]'],
            samples['{5}'],
            samples['{-1}'],
            samples['(3, 0]']
        ])
    })
})
