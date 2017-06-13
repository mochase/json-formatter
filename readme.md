## 格式化输出json对象

##输出形式
```
[ { output: '{', indent: 0 },
  { output: 'a:1', indent: 4 },
  { output: 'b:true', indent: 4 },
  { output: 'c:null', indent: 4 },
  { output: 'd: {', indent: 4 },
  { output: 'dd:test me', indent: 8 },
  { output: 'cd:', indent: 8 },
  { ouput: '[', indent: 8 },
  { output: 1, indent: 12 },
  { output: 2, indent: 12 },
  { output: 3, indent: 12 },
  { output: 4, indent: 12 },
  { output: '{', indent: 12 },
  { output: 'bar:zz', indent: 16 },
  { output: 'foo:help', indent: 16 },
  { output: '}', indent: 12 },
  { output: ']', indent: 8 },
  { output: '}', indent: 4 },
  { output: 'e:[1, 2, 3, 4, 5]', indent: 4 },
  { output: '}', indent: 0 } ]
```

##使用
```
var parseJson = require('./index.js')
var output = parseJson(someJsonData)
```

##注意
需要ES6的支持