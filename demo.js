var parseJson = require('./index.js')
var t = {
    a: '1',
    b: true,
    c: null,
    e: [1, 2, 3, 4, 5],
    d: {
        dd: 'test me',
        cd: [1, 2, 3, 4, {
            bar: 'zz',
            foo: 'help'
        }]
    }
}
let output = parseJson(t)
console.log(output)
