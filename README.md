# math.real-set

[![travis ci][1]][2]
[![npm version][3]][4]
[![Coverage Status][5]][6]
[![Dependency Status][7]][8]

Class to work with subsets of real numbers.

## Version
0.3.0

## Install
``` bash
npm install math.real-set
```

## Usage
``` JavaScript
const RealSet = require('math.real-set')

const A = RealSet.parse('(0, 2] U {6, 7, 8}')
const B = RealSet.parse('(5, 5)')
const C = RealSet.parse('[1, 2)')
const D = RealSet.parse('(2, 7)')
const E = RealSet.parse('(8, 9]')

// emptyness
A.isEmpty() // false
B.isEmpty() // true

// Containing numbers
A.contains(4) // false
A.contains(6) // true
B.contains(3) // false

// Containing sets
A.contains(C) // true

// joining sets
A.union(D) // A U D is equivalent to RealSet.parse('(0, 7] U {8}')
A.union(E) // A U E is equivalent to RealSet.parse('(0, 2] U {6, 7} U [8, 9]')

// converting to string
A.toString() // '{6, 7, 8} U (0, 2]'
B.toString() // '{}'
const F = RealSet.parse('[3, 3]')
F.toString() // '{3}'
```

## API

### Real subsets creation

#### parse :: String -> RealSet

Static method that takes and string as a representation of RealSet and returns a RealSet instance. It throws an error if string is not parsable to RealSet.

Example:
``` JavaScript
const RealSet = require('math.real-set')

const set = RealSet.parse('(2, 5] U {6} U [8, 9)')
```

#### fromIntervals :: [Interval] -> RealSet

Static method that takes an array of [Interval](https://github.com/xgbuils/math.interval-utils#interval)s and returns a RealSet instance.

Example:
``` JavaScript
const RealSet = require('math.real-set')

const set = RealSet.fromIntervals([
    [{value: 2, limit: 1}, {value: 5, limit: 0}], // (2, 5]
    [{value: 6, limit: 0}, {value: 6, limit: 0}], // {6}
    [{value: 8, limit: 0}, {value: 9, limit: -1}] // [8, 9)
])
```

### Predicates

#### contains :: RealSet ~> RealSet -> Boolean
Returns true or false depending on real set param is contained inside the set or not, respectively.

Example:
``` JavaScript
const RealSet = require('math.real-set')

const A = RealSet.parse('[1, 3) U [4, 8]')
const B = RealSet.parse('(1, 2) U [4, 7)')
const C = RealSet.parse('{3, 6}')

A.contains(B) // true
A.contains(C) // false
C.contains(A) // false
```

#### has :: RealSet ~> Number -> Boolean 
Returns `true` or `false` if the set has a number or not, respectively.

Example:
``` JavaScript
const RealSet = require('math.real-set')
const set = RealSet.parse('(1, 5] U {8}')

set.has(1) // false
set.has(3) // true
set.has(5) // true
set.has(7) // false
set.has(8) // true
```

#### isEmpty :: RealSet ~> Boolean

Returns true or false if set is empty or not.

Example:
``` JavaScript
const RealSet = require('math.real-set')

const A = RealSet.parse('[2, 4)')
const B = RealSet.parse('[4, 2)')

A.isEmpty() // false
B.isEmpty() // true
```

### Real subset operations

#### union :: RealSet ~> RealSet -> RealSet
Instance method that returns the union of two sets.

``` javascript
const RealSet = require('math.real-set')

const A = RealSet.parse('[1, 3) U (3, 4]')
const B = RealSet.parse('(2, 4) U {5}', '{5} U (6, 7)')

A.union(B) // [1, 4] U {5} U (6, 7)
```

#### union :: [RealSet] -> RealSet
Static method that takes an array of RealSet instances and returns a RealSet instance that represents the union of the list of sets.

``` JavaScript
const RealSet = require('math.real-set')
const A = RealSet.parse('[1, 3) U (3, 4]')
const B = RealSet.parse('(2, 4) U {5}')
const C = RealSet.parse('{5} U (6, 7)')

RealSet.union([A, B, C]) // [1, 4] U {5} (6, 7)
```

RealSet converters

#### toString :: RealSet ~> String
Converts the real set into a string representation.

``` JavaScript
const RealSet = require('math.real-set')

const A = RealSet.parse('(5, 2] U (3, 3)') // empty
const B = RealSet.parse('[2, 2] U (5, 6)') // singleton interval

A.toString() // '{}'
B.toString() // '{2} U (5, 6)'
```

#### toIntervals :: RealSet ~> [Interval]
Converts the real set into an array of disjoint [Interval](https://github.com/xgbuils/math.interval-utils#interval)s ordered from lowest to highest.

``` JavaScript
const RealSet = require('math.real-set')

const A = RealSet.parse('(5, 6) U [2, 2] U {4, 8}')

A.toIntervals() /* [
    [{value: 2, limit: 0}, {value: 2, limit: 0}], // {2}
    [{value: 4, limit: 0}, {value: 4, limit: 0}], // {4}
    [{value: 5, limit: 1}, {value: 6, limit: -1}], // (5, 6)
    [{value: 8, limit: 0}, {value: 8, limit: 0}]  // {8}
]
```

## LICENSE
MIT

  [1]: https://travis-ci.org/xgbuils/math.real-set.svg?branch=master
  [2]: https://travis-ci.org/xgbuils/math.real-set
  [3]: https://badge.fury.io/js/math.real-set.svg
  [4]: https://badge.fury.io/js/math.real-set
  [5]: https://coveralls.io/repos/github/xgbuils/math.real-set/badge.svg?branch=master
  [6]: https://coveralls.io/github/xgbuils/math.real-set?branch=master
  [7]: https://david-dm.org/xgbuils/math.real-set.svg
  [8]: https://david-dm.org/xgbuils/math.real-set
