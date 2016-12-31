var chai = require('chai')
var expect = chai.expect
var RealSet = require('../src/')
var samples = require('./interval-samples.js')
var rawSet = require('../src/raw-set.js')

describe('RealSet', function () {
    describe('constructor()', function () {
        describe('if parameter is castable to RealSet', function () {
            var set
            beforeEach(function () {
                set = new RealSet('(4, 5] U {-1} U (5, 8)')
            })
            it('value created is an instance of RealSet', function () {
                expect(set).to.be.instanceOf(RealSet)
            })
            it('value created is a correct set', function () {
                expect(rawSet(set)).to.be.deep.equal([
                    samples['{-1}'],
                    samples['(4, 8)']
                ])
            })
        })

        describe('if parameter is type not castable to RealSet', function () {
            it('throws an error', function () {
                function test () {
                    new RealSet(/a+/)
                }
                expect(test).to.throw('/a+/ is not castable to RealSet')
            })
        })

        describe('if parameter is string not castable to RealSet', function () {
            it('throws an error', function () {
                function test () {
                    new RealSet('^')
                }
                expect(test).to.throw('\'^\' is not able to be parsed')
            })
        })
    })

    describe('.isEmpty()', function () {
        it('set with predicates is imposible to know if is empty', function () {
            var set = RealSet.union(function (e) {
                return e >= 10 || e <= 5
            })
            expect(set.isEmpty()).to.be.equal(null)
        })

        it('returns true if is empty set', function () {
            var set = new RealSet('[2, 0) U (1, 1) U (10, 0)')
            expect(set.isEmpty()).to.be.equal(true)
        })

        it('returns false if is not empty set', function () {
            var set = new RealSet('[2, 0) U [1, 1] U (10, 0)')
            expect(set.isEmpty()).to.be.equal(false)
        })
    })

    describe('.contains', function () {
        describe('if parameter passed is not number or parameter castable to RealSet', function () {
            it('throws an error', function () {
                function test () {
                    var set = new RealSet('(3, 8)')
                    set.contains(/a+/)
                }
                expect(test).to.throw('/a+/ is not castable to RealSet')
            })
        })
        describe('containing numbers', function () {
            describe('[4, 5] U [3, 9) U (10, 11]', function () {
                var set
                beforeEach(function () {
                    set = new RealSet('[4, 5] U [3, 9) U (10, 11]')
                })
                it('contains 8', function () {
                    expect(set.contains(8)).to.be.equal(true)
                })

                it('contains 3', function () {
                    expect(set.contains(3)).to.be.equal(true)
                })

                it('not contains 9', function () {
                    expect(set.contains(9)).to.be.equal(false)
                })

                it('not contains 2.5', function () {
                    expect(set.contains(2.5)).to.be.equal(false)
                })
            })

            describe('(4, 5) U (5, 6)', function () {
                var set
                beforeEach(function () {
                    set = new RealSet('(4, 5) U (5, 6)')
                })
                it('contains 4.5', function () {
                    expect(set.contains(4.5)).to.be.equal(true)
                })

                it('contains 5.01', function () {
                    expect(set.contains(5.01)).to.be.equal(true)
                })

                it('not contains 5', function () {
                    expect(set.contains(5)).to.be.equal(false)
                })

                it('not contains 100', function () {
                    expect(set.contains(100)).to.be.equal(false)
                })
            })

            describe('{1, 3, 4, 5, 7}', function () {
                var set
                beforeEach(function () {
                    set = new RealSet('{1, 3, 4, 5, 7}')
                })
                it('contains 1', function () {
                    expect(set.contains(1)).to.be.equal(true)
                })

                it('contains 3', function () {
                    expect(set.contains(3)).to.be.equal(true)
                })

                it('not contains 6', function () {
                    expect(set.contains(6)).to.be.equal(false)
                })

                it('not contains 7.5', function () {
                    expect(set.contains(7.5)).to.be.equal(false)
                })
            })

            describe('[1, 1]', function () {
                var set
                beforeEach(function () {
                    set = new RealSet('[1, 1]')
                })
                it('contains 1', function () {
                    expect(set.contains(1)).to.be.equal(true)
                })

                it('not contains 1.5', function () {
                    expect(set.contains(1.5)).to.be.equal(false)
                })

                it('not contains 0', function () {
                    expect(set.contains(0)).to.be.equal(false)
                })
            })

            describe('define as a function', function () {
                var set
                beforeEach(function () {
                    set = new RealSet({
                        contains: function (e) {
                            return e > 5
                        }
                    })
                })
                it('contains 6', function () {
                    expect(set.contains(6)).to.be.equal(true)
                })

                it('not contains 5.5', function () {
                    expect(set.contains(5.5)).to.be.equal(true)
                })

                it('does not contain 5', function () {
                    expect(set.contains(5)).to.be.equal(false)
                })

                it('does not contain 3', function () {
                    expect(set.contains(3)).to.be.equal(false)
                })
            })

            describe('mixed sets (predicates & intervals)', function () {
                var set
                beforeEach(function () {
                    set = RealSet.union(function (e) {
                        return e === 5 || e === 6
                    }, '(2, 3) U [7, 9)')
                })

                it('number contained by predicate', function () {
                    expect(set.contains(5)).to.be.equal(true)
                })

                it('number contained by interval', function () {
                    expect(set.contains(8)).to.be.equal(true)
                })

                it('number not contained by predicate or interval', function () {
                    expect(set.contains(4)).to.be.equal(false)
                })
            })
        })

        describe('containing real sets', function () {
            describe('(4, 5) U (5, 6)', function () {
                var set
                beforeEach(function () {
                    set = new RealSet('(4, 5) U (5, 6)')
                })
                it('contains (5, 6)', function () {
                    expect(set.contains('(5, 6)')).to.be.equal(true)
                })

                it('contains (4.5, 5) U {5.5}', function () {
                    expect(set.contains(new RealSet('(4.5, 5) U {5.5}'))).to.be.equal(true)
                })

                it('does not contain (4, 6)', function () {
                    expect(set.contains(samples['(4, 6)'])).to.be.equal(false)
                })

                it('does not contain {5}', function () {
                    expect(set.contains([
                        samples['{5}']
                    ])).to.be.equal(false)
                })

                it('does not contain (3, 4.5)', function () {
                    expect(set.contains('(3, 4.5)')).to.be.equal(false)
                })
            })

            describe('{-1} U (3, 0] U {3, 5} U (3, 5)', function () {
                var set
                beforeEach(function () {
                    set = new RealSet('{-1} U (3, 0] U {3, 5} U (3, 5)')
                })
                it('contains (3, 5)', function () {
                    expect(set.contains(samples['[3, 5)'])).to.be.equal(true)
                })

                it('contains {-1}, {4, 3}', function () {
                    expect(set.contains([
                        samples['{-1}'],
                        '{4}',
                        '[3, 3]'
                    ])).to.be.equal(true)
                })

                it('does not contain {0}', function () {
                    expect(set.contains('{0}')).to.be.equal(false)
                })

                it('does not contain [-1, 5]', function () {
                    expect(set.contains('[-1, 5]')).to.be.equal(false)
                })
            })

            describe('mixed sets (predicates & intervals)', function () {
                var set
                beforeEach(function () {
                    set = RealSet.union(function (e) {
                        return e >= 5 || e <= 6
                    }, '(2, 3) U [7, 9)')
                })

                it('set not contained by intervals returns null if there are a predicate', function () {
                    // it's impossible to know if set is contained in predicate. Then it returns null.
                    expect(set.contains('(5, 6)')).to.be.equal(null)
                })

                it('set contained by intervals returns true', function () {
                    expect(set.contains('(7, 9) U {2.5}')).to.be.equal(true)
                })

                it('set with predicates is imposible to know if is contained inside another set', function () {
                    var container = new RealSet('[0, 10]')
                    expect(container.contains(set)).to.be.equal(null)
                })
            })
        })
    })
    describe('RealSet.union', function () {
        it('union of disjoint real sets', function () {
            var set1 = '(0, 1] U [8, 9]'
            var set2 = new RealSet('(4, 5) U {7}')

            var result = RealSet.union(set1, set2)

            expect(rawSet(result)).to.be.deep.equal([
                samples['(0, 1]'],
                samples['(4, 5)'],
                samples['{7}'],
                samples['[8, 9]']
            ])
        })

        it('union of intersected real sets', function () {
            var set1 = [
                samples['[3, 5]'],
                '{7}'
            ]
            var set2 = '[5, 6) U (6, 8)'

            var result = RealSet.union(set1, set2)

            expect(rawSet(result)).to.be.deep.equal([
                samples['[3, 6)'],
                samples['(6, 8)']
            ])
        })

        it('union of empty real sets', function () {
            var set1 = samples['(8, 8)']
            var set2 = '(3, 0]'

            var result = RealSet.union(set1, set2)

            expect(rawSet(result)).to.be.deep.equal([])
        })

        it('union of not RealSetCastable', function () {
            function test () {
                var set1 = samples['(8, 8)']
                var set2 = /a+/
                var set3 = '(3, 0]'

                RealSet.union(set1, set2, set3)
            }

            expect(test).to.throw('/a+/ is not castable to RealSet')
        })
    })

    describe('.union()', function () {
        it('union method works in the same way that static union method', function () {
            var set1 = new RealSet('(4, 5) U [8, 9]')
            var set2 = '{7} U [3, 5]'
            var set3 = samples['(0, 1]']

            var result = set1.union(set2, set3)

            expect(rawSet(result)).to.be.deep.equal([
                samples['(0, 1]'],
                samples['[3, 5]'],
                samples['{7}'],
                samples['[8, 9]']
            ])
        })
    })

    describe('.toString()', function () {
        it('returns \'predicate set\' if the set has predicate functions', function () {
            var set = new RealSet(function (a) {
                return a > 0
            })
            expect(set.toString()).to.be.equal('predicate set')
        })

        it('returns \'{}\' if the set is empty', function () {
            var set = new RealSet('(2, 1) U [3, -4]')
            expect(set.toString()).to.be.equal('{}')
        })

        it('returns the correct expression representation of set if it is not empty', function () {
            var set = new RealSet('(2, 3) U [3, 4]')
            expect(set.toString()).to.be.equal('(2, 4]')
        })
    })
})
