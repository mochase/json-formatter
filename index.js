// 自己来写一个简易版 JSON.stringify()

function $JSON_stringify (jsondata, split) {
    // html string
    let tmp = ''
    // 当前迭代器深度
    let deep = 0
    if (Array.isArray(jsondata)) {
        tmp += '['
        deep++
        parser(jsondata)
        deep--
        tmp += '\n]'
    } else if (jsondata instanceof Object) {
        tmp += '{'
        deep++
        parser(jsondata)
        deep--
        tmp += '\n}'
    }

    function parser (acc) {
        const space = _getSpace()
        for (const key in acc) {
            if (Array.isArray(acc[key])) {
                deep++
                tmp += space + `"${key}": [`
                parser(acc[key])
                tmp += space + ']'
                deep--
            }
            else if (acc[key] instanceof Object) {
                deep++
                tmp += space + `"${key}": {`
                parser(acc[key])
                tmp += space + '}'
                deep--
            }
            else {
                if (Array.isArray(acc)) {
                    tmp += space + acc[key]
                } else {
                    tmp += space + `"${key}"` + ': ' + acc[key]
                }  
            }
        }
    }
    return tmp

    function _getSpace () {
        let indence = '\n'
        let i = 0;
        while (i++ < deep) {
            indence += split
        }
        return  indence
    }
}