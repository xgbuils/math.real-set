# math.set

Class to work with sets of real numbers.

## Version
0.1.0

## Install
``` bash
npm install math.set
```

## Usage
``` javascript
var MSet = require('math.set')

var set = new MSet('(0, 2] U {6, 7, 8}')

set.isEmpty() // false
set.contains(4) // false
set.contains(6) // true
set.contains('[1, 2)') // true
set.union('(2, 7)') // new MSet('(0, 7] U {8}')
set.union('(8, 9])') // new MSet('(0, 2] U {6, 7} U [8, 9]')
```

## API

### Set
#### constructor(set)

Constructor creates an instance of Set class. it throws an error if `set` is not [SetCastable](#setcastable)

#### Set#isEmpty()

It returns true or false if set is empty or not.

Example:
``` javascript
var MSet = require('math.set')

var set = new MSet('[2, 4)')

set.isEmpty() // returns false
```

#### Set#contains(set)
It returns `true` or `false` if instance contains the `set` passed by parameter. `contains` throws an exception if `set` is not [SetCastable](#setcastable)

Example:
``` javascript
var MSet = require('math.set')

var set = new MSet('[1, 3) U [4, 8]')

set.contains('(1, 2) U [4, 7)') // returns true
set.contains(new MSet('{3, 7}')) // returns false
```

#### Set#union(...sets)
It returns a set that represents the union of `sets` passed by parameter. It throws an error if some parameter is not SetCastable.

``` javascript
var MSet = require('math.set')

var set = new MSet('[1, 3) U (3, 4]')

set.union('(2, 4) U {5}', '{5} U (6, 7)')
// returns new MSet('[1, 4] U {5} (6, 7)')
```

#### Set.union(...sets)
Set also has static method that calculates the union of sets in the same way as `union` method.

``` javascript
var MSet = require('math.set')

MSet.union('[1, 3) U (3, 4]', '(2, 4) U {5}', '{5} U (6, 7)')
// returns new MSet('[1, 4] U {5} (6, 7)')
```

### SetCastable
A value is SetCastable if it is one of this list of types:
- instance of `Set`.
- string that parses to set (`'[2, 5] U {4}'`, `'[0, 5) U {-2, 8, 12.5}'`, etc).
- [IntervalCastable](https://github.com/xgbuils/math.interval#intervalcastable)
- Array of [IntervalCastable](https://github.com/xgbuils/math.interval#intervalcastable)

### Exported functions

#### rawSet(set)
It converts Set instance to array of [data structure interval](https://github.com/xgbuils/math.interval-utils) defined in `math.interval-utils` package. It is posible to import this function thus:

``` javascript
var rawSet = require('math.interval/src/raw-set.js')
```

#### cast(set)
It converts SetCastable value to array of interval [data structure interval](https://github.com/xgbuils/math.interval-utils) defined in `math.interval-utils` package. It is posible to import this function thus:

``` javascript
var rawSet = require('math.set/src/cast.js')
```

## LICENSE
MIT