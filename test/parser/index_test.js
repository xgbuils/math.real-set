const chai = require('chai')
chai.use(require('chai-string'))
const expect = chai.expect
const samples = require('../interval-samples')
const parseMultiInterval = require('../../src/parser/')

describe('parseMultipleIntervals', function() {
    it('[4,5]U [ 3 , 9)', function() {
        const set = parseMultiInterval('[4,5]U [ 3 , 9)').getOrElse()
        expect(set).to.be.deep.equal([
            samples['[4, 5]'],
            samples['[3, 9)']
        ])
    })

    it('(4, 8)   U[ 3 ,5)U{-1,7}', function() {
        const set = parseMultiInterval('(4, 8)   U[ 3 ,5)U{-1,7}').getOrElse()
        expect(set).to.be.deep.equal([
            samples['(4, 8)'],
            samples['[3, 5)'],
            samples['{-1}'],
            samples['{7}']
        ])
    })

    it('  {    5    }    ', function() {
        const set = parseMultiInterval('  {    5    }    ').getOrElse()
        expect(set).to.be.deep.equal([
            samples['{5}']
        ])
    })

    it('(3,   11  ]    ', function() {
        const set = parseMultiInterval('(3,   11  ]    ').getOrElse()
        expect(set).to.be.deep.equal([
            samples['(3, 11]']
        ])
    })

    it('( 2 , 7] U {5, -1} U (3, 0]', function() {
        const set = parseMultiInterval('( 2 , 7] U {5, -1} U (3, 0]').getOrElse()
        expect(set).to.be.deep.equal([
            samples['(2, 7]'],
            samples['{5}'],
            samples['{-1}'],
            samples['(3, 0]']
        ])
    })

    it('( 2 , 7 U {}', function() {
        const unparsableSet = '( 2 , 7 U {}'
        const error = parseMultiInterval(unparsableSet).swap().getOrElse()

        expect(error).to.startsWith(`parsing error in "${unparsableSet}": `)
    })

    it('{{7}}', function() {
        const unparsableSet = '{{7}}'
        const error = parseMultiInterval('{{7}}').swap().getOrElse()

        expect(error).to.be.equal(
            `parsing error in "${unparsableSet}": "{{7}}" cannot be parsed to a set.`)
    })
})
