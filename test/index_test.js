const chai = require('chai')
const expect = chai.expect
const RealSet = require('../src/')
const samples = require('./interval-samples.js')
const getIntervals = require('./get-intervals.js')

describe('RealSet', function() {
    describe('parse', function() {
        describe('if parameter is castable to RealSet', function() {
            it('value created is a correct set', function() {
                const set = RealSet.parse('(4, 5] U {-1} U (5, 8)')
                expect(getIntervals(set)).to.be.deep.equal([
                    samples['{-1}'],
                    samples['(4, 8)']
                ])
            })
        })

        describe('if parameter is type not parsable to RealSet', function() {
            it('throws an error', function() {
                function test() {
                    RealSet.parse(/a+/)
                }
                expect(test).to.throw('parsing error in /a+/: /a+/ cannot be parsed to a subset of Real numbers.')
            })
        })

        describe('if parameter is string not castable to RealSet', function() {
            it('throws an error', function() {
                function test() {
                    RealSet.parse('^')
                }
                expect(test).to.throw('parsing error in "^": "^" cannot be parsed to a subset of Real numbers.')
            })
        })
    })

    describe('.isEmpty()', function() {
        it('returns true if is empty set', function() {
            const set = RealSet.parse('[2, 0) U (1, 1) U (10, 0)')
            expect(set.isEmpty()).to.be.equal(true)
        })

        it('returns false if is not empty set', function() {
            const set = RealSet.parse('[2, 0) U [1, 1] U (10, 0)')
            expect(set.isEmpty()).to.be.equal(false)
        })
    })

    describe('.contains', function() {
        describe('if parameter passed is not number or RealSet', function() {
            it('returns false', function() {
                const set = RealSet.parse('(3, 8)')

                expect(set.contains(/a+/)).to.be.equal(false)
            })
        })
        describe('containing numbers', function() {
            describe('[4, 5] U [3, 9) U (10, 11]', function() {
                let set
                beforeEach(function() {
                    set = RealSet.parse('[4, 5] U [3, 9) U (10, 11]')
                })
                it('contains 8', function() {
                    expect(set.contains(8)).to.be.equal(true)
                })

                it('contains 3', function() {
                    expect(set.contains(3)).to.be.equal(true)
                })

                it('not contains 9', function() {
                    expect(set.contains(9)).to.be.equal(false)
                })

                it('not contains 2.5', function() {
                    expect(set.contains(2.5)).to.be.equal(false)
                })
            })

            describe('(4, 5) U (5, 6)', function() {
                let set
                beforeEach(function() {
                    set = RealSet.parse('(4, 5) U (5, 6)')
                })
                it('contains 4.5', function() {
                    expect(set.contains(4.5)).to.be.equal(true)
                })

                it('contains 5.01', function() {
                    expect(set.contains(5.01)).to.be.equal(true)
                })

                it('not contains 5', function() {
                    expect(set.contains(5)).to.be.equal(false)
                })

                it('not contains 100', function() {
                    expect(set.contains(100)).to.be.equal(false)
                })
            })

            describe('{1, 3, 4, 5, 7}', function() {
                let set
                beforeEach(function() {
                    set = RealSet.parse('{1, 3, 4, 5, 7}')
                })
                it('contains 1', function() {
                    expect(set.contains(1)).to.be.equal(true)
                })

                it('contains 3', function() {
                    expect(set.contains(3)).to.be.equal(true)
                })

                it('not contains 6', function() {
                    expect(set.contains(6)).to.be.equal(false)
                })

                it('not contains 7.5', function() {
                    expect(set.contains(7.5)).to.be.equal(false)
                })
            })

            describe('[1, 1]', function() {
                let set
                beforeEach(function() {
                    set = RealSet.parse('[1, 1]')
                })
                it('contains 1', function() {
                    expect(set.contains(1)).to.be.equal(true)
                })

                it('not contains 1.5', function() {
                    expect(set.contains(1.5)).to.be.equal(false)
                })

                it('not contains 0', function() {
                    expect(set.contains(0)).to.be.equal(false)
                })
            })
        })

        describe('containing real sets', function() {
            describe('(4, 5) U (5, 6)', function() {
                let set
                beforeEach(function() {
                    set = RealSet.parse('(4, 5) U (5, 6)')
                })
                it('contains (5, 6)', function() {
                    expect(set.contains(RealSet.parse('(5, 6)'))).to.be.equal(true)
                })

                it('contains (4.5, 5) U {5.5}', function() {
                    expect(set.contains(RealSet.parse('(4.5, 5) U {5.5}'))).to.be.equal(true)
                })

                it('does not contain (4, 6)', function() {
                    expect(set.contains(RealSet.parse('(4, 6)'))).to.be.equal(false)
                })

                it('does not contain {5}', function() {
                    expect(set.contains(RealSet.parse('{5}'))).to.be.equal(false)
                })

                it('does not contain (3, 4.5)', function() {
                    expect(set.contains('(3, 4.5)')).to.be.equal(false)
                })
            })

            describe('{-1} U (3, 0] U {3, 5} U (3, 5)', function() {
                let set
                beforeEach(function() {
                    set = RealSet.parse('{-1} U (3, 0] U {3, 5} U (3, 5)')
                })
                it('contains (3, 5)', function() {
                    expect(set.contains(RealSet.parse('[3, 5)'))).to.be.equal(true)
                })

                it('contains {-1}, {4, 3}', function() {
                    expect(set.contains(RealSet.parse('{-1} U {4} U [3, 3]'))).to.be.equal(true)
                })

                it('does not contain {0}', function() {
                    expect(set.contains(RealSet.parse('{0}'))).to.be.equal(false)
                })

                it('does not contain [-1, 5]', function() {
                    expect(set.contains(RealSet.parse('[-1, 5]'))).to.be.equal(false)
                })
            })
        })
    })
    describe('RealSet.union', function() {
        it('union of disjoint real sets', function() {
            const set1 = RealSet.parse('(0, 1] U [8, 9]')
            const set2 = RealSet.parse('(4, 5) U {7}')

            const result = RealSet.union(set1, set2)

            expect(getIntervals(result)).to.be.deep.equal([
                samples['(0, 1]'],
                samples['(4, 5)'],
                samples['{7}'],
                samples['[8, 9]']
            ])
        })

        it('union of intersected real sets', function() {
            const set1 = RealSet.parse('[3, 5] U {7}')
            const set2 = RealSet.parse('[5, 6) U (6, 8)')

            const result = RealSet.union(set1, set2)

            expect(getIntervals(result)).to.be.deep.equal([
                samples['[3, 6)'],
                samples['(6, 8)']
            ])
        })

        it('union of empty real sets', function() {
            const set1 = RealSet.parse('(8, 8)')
            const set2 = RealSet.parse('(3, 0]')

            const result = RealSet.union(set1, set2)

            expect(result.isEmpty()).to.be.equal(true)
        })
    })

    describe('.union()', function() {
        it('union method works in the same way that static union method', function() {
            const set1 = RealSet.parse('(4, 5) U [8, 9]')
            const set2 = RealSet.parse('{7} U [3, 5]')
            const set3 = RealSet.parse('(0, 1]')

            const result = set1.union(set2, set3)

            expect(getIntervals(result)).to.be.deep.equal([
                samples['(0, 1]'],
                samples['[3, 5]'],
                samples['{7}'],
                samples['[8, 9]']
            ])
        })
    })

    describe('.toString()', function() {
        it('returns \'{}\' if the set is empty', function() {
            const set = RealSet.parse('(2, 1] U (3, -4]')
            expect(set.toString()).to.be.equal('{}')
        })

        it('returns the simplified expression of set if it is not empty', function() {
            const set = RealSet.parse('(2, 3) U [3, 4)')
            expect(set.toString()).to.be.equal('(2, 4)')
        })

        it('groups isolated intervals', function() {
            const set = RealSet.parse('{7} U [2, 3) U [4, 4] U {-1} U {3}')
            expect(set.toString()).to.be.equal('{-1, 4, 7} U [2, 3]')
        })
    })
})
