var parseJson = require('./index.js')
var t = {
    a: '1',
    b: true,
    c: null,
    d: {
        dd: 'test me',
        cd: [1, 2, 3, 4, {
            bar: 'zz',
            foo: 'help'
        }]
    },
    e: [1, 2, 3, 4, 5]
}
let output = parseJson(t)
console.log(output)
