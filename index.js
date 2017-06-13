/**
 * 不关心外部"{}"
 * @param {object} obj 
 * @param {number: 当前缩进} currentIndent 
 */
function parseObject(obj, currentIndent) {
    let tmp = []
    let indent = currentIndent + 4
    for (let key in obj) {
        if (isArray(obj[key])) {
            if (isPureArray(obj[key])) {
                tmp.push({output: key + ':' + parsePureArray(obj[key]), indent})
            } else {
                tmp.push({output: key + ':', indent})
                tmp.push({ouput: '[', indent})
                tmp = tmp.concat(parseArray(obj[key], indent))
                tmp.push({output: ']', indent})
            }
        } else if (obj[key] instanceof Object) {
            tmp.push({output: key + ': {', indent})
            tmp = tmp.concat(parseObject(obj[key], indent))
            tmp.push({output: '}', indent})
        } else {
            var str = key + ':' + obj[key]
            tmp.push({output: str, indent})
        }
    }
    return tmp
}
/**
 * 不关心外部"[]"
 * @param {array} arr 
 * @param {number 当前缩进} indent 
 */
function parseArray(arr, currentIndent) {
    let indent = currentIndent + 4
    let tmp = []
    arr.forEach((item) => {
        if (isArray(item)) {
            if (isPureArray(item)) {
                tmp.push({output: parsePureArray(item), indent})
            } else {
                tmp.push({output: '[', indent})
                tmp = tmp.concat(parseArray(item, indent))
                tmp.push({output: ']', indent})
            } 
        } else if (item instanceof Object) {
            tmp.push({output: '{', indent})
            tmp = tmp.concat(parseObject(item, indent))
            tmp.push({output:'}', indent})
        } else {
            tmp.push({output: item, indent})
        }
    });
    return tmp
}

/**
 * 简单数组,以字符串形式解析
 * @param {* Array} arr
 */
function parsePureArray(arr) {
    let t = '['
    arr.forEach((item, index) => {
        if (index !== 0) {
            t += ', ' + item
        } else {
            t += item
        }
    })
    t += ']'
    return t
}
/**
 * 判断是否为简单数组
 * @param {* array} arr
 */
function isPureArray(arr) {
    if (!isArray(arr)) {
        return false
    }
    return arr.every((item) => {
        return !isArray(item) && (!(item instanceof Object))
    })
}

function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]'
}

module.exports = function parseJson(formdata) {
    var tmp = []
    if (isArray(formdata)) {
        tmp.push({output: '[', indent: 0})
        tmp.concat(parseArray(formdata, 0))
        tmp.push({output: ']', indent: 0})
    } if (formdata instanceof Object) {
        tmp.push({output: '{', indent: 0})
        tmp = tmp.concat(parseObject(formdata, 0))
        tmp.push({output: '}', indent: 0})
    }
    return tmp
}
console.log(isPureArray([1, 2, 3, 4]))