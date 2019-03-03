module.exports = {
    '{-1}': [{
    // exactly -1
        value: -1,
        limit: 0
    }, {
    // exactly -1
        value: -1,
        limit: 0
    }],

    '(0, 1]': [{
    // 0 + infinitesimal
        value: 0,
        limit: 1
    }, {
    // exactly 1
        value: 1,
        limit: 0
    }],

    '(2, 7)': [{
        value: 2,
        limit: 1
    }, {
        value: 7,
        limit: -1
    }],

    '(2, 7]': [{
        value: 2,
        limit: 1
    }, {
        value: 7,
        limit: 0
    }],

    '[3, 5)': [{
    // exactly 3
        value: 3,
        limit: 0
    }, {
    // 5 - infinitesimal
        value: 5,
        limit: -1
    }],

    '[3, 5]': [{
    // exactly 3
        value: 3,
        limit: 0
    }, {
    // 5 - infinitesimal
        value: 5,
        limit: 0
    }],

    '[3, 6)': [{
    // exactly 3
        value: 3,
        limit: 0
    }, {
    // 5 - infinitesimal
        value: 6,
        limit: -1
    }],

    '[3, 8)': [{
        value: 3,
        limit: 0
    }, {
        value: 8,
        limit: -1
    }],

    '[3, 9)': [{
    // exactly 3
        value: 3,
        limit: 0
    }, {
    // 9 - infinitesimal
        value: 9,
        limit: -1
    }],

    '[3, 9]': [{
    // exactly 3
        value: 3,
        limit: 0
    }, {
    // exactly 9
        value: 9,
        limit: 0
    }],

    '(3, 11]': [{
    // 3 + infinitesimal
        value: 3,
        limit: 1
    }, {
    // exactly 11
        value: 11,
        limit: 0
    }],

    '[4, 5]': [{
    // exactly 4
        value: 4,
        limit: 0
    }, {
    // exactly 5
        value: 5,
        limit: 0
    }],

    '(4, 5)': [{
    // 4 + infinitesimal
        value: 4,
        limit: 1
    }, {
    // exactly 5
        value: 5,
        limit: -1
    }],

    '(4, 5]': [{
    // 4 + infinitesimal
        value: 4,
        limit: 1
    }, {
    // exactly 5
        value: 5,
        limit: 0
    }],

    '(4, 6)': [{
        value: 4,
        limit: 1
    }, {
        value: 6,
        limit: -1
    }],

    '(4, 8)': [{
    // 4 + infinitesimal
        value: 4,
        limit: 1
    }, {
    // 8 - infinitesimal
        value: 8,
        limit: -1
    }],

    '{5}': [{
    // exactly 5
        value: 5,
        limit: 0
    }, {
    // exactly 5
        value: 5,
        limit: 0
    }],

    '[5, 6)': [{
    // 4 + infinitesimal
        value: 5,
        limit: 0
    }, {
    // 8 - infinitesimal
        value: 6,
        limit: -1
    }],

    '(6, 8)': [{
    // 4 + infinitesimal
        value: 6,
        limit: 1
    }, {
    // 8 - infinitesimal
        value: 8,
        limit: -1
    }],

    '{7}': [{
    // exactly 7
        value: 7,
        limit: 0
    }, {
    // exactly 7
        value: 7,
        limit: 0
    }],

    '[8, 9]': [{
    // exactly 8
        value: 8,
        limit: 0
    }, {
    // exactly 9
        value: 9,
        limit: 0
    }],

    // empty intervals
    '(3, 0]': [{
        value: 3,
        limit: 1
    }, {
        value: 0,
        limit: 0
    }],

    '(8, 8)': [{
        value: 8,
        limit: 1
    }, {
        value: 8,
        limit: -1
    }]
}
