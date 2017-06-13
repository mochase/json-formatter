## 格式化输出json对象

##输出形式
```
[ { text: '{', indent: 0 },
  { text: 'a:1', indent: 4 },
  { text: 'b:true', indent: 4 },
  { text: 'c:null', indent: 4 },
  { text: 'd: {', indent: 4 },
  { text: 'dd:test me', indent: 8 },
  { text: 'cd:', indent: 8 },
  { text: '[', indent: 8 },
  { text: 1, indent: 12 },
  { text: 2, indent: 12 },
  { text: 3, indent: 12 },
  { text: 4, indent: 12 },
  { text: '{', indent: 12 },
  { text: 'bar:zz', indent: 16 },
  { text: 'foo:help', indent: 16 },
  { text: '}', indent: 12 },
  { text: ']', indent: 8 },
  { text: '}', indent: 4 },
  { text: 'e:[1, 2, 3, 4, 5]', indent: 4 },
  { text: '}', indent: 0 } ]
```

##使用
```
var parseJson = require('./index.js')
var output = parseJson(someJsonData)

参见demo.js
```

##注意
需要ES6的支持