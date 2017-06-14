/**
 * 不关心外部"{}"
 * @param {object} obj
 * @param {number} currentIndent
 */
function parseObject(obj, currentIndent) {
    let tmp = []
    let indent = currentIndent + 4
    let i = 0
    for (let key in obj) {
        if (i < Object.keys(obj).length - 1) {
            i++
            // need comma
            if (isArray(obj[key])) {
                // item 为数组
                if (isPureArray(obj[key])) {
                    tmp.push({ text: key + ': ' + parsePureArray(obj[key]) + ',', indent })
                } else {
                    tmp.push({ text: key + ': ', indent })
                    tmp.push({ text: '[', indent })
                    tmp = tmp.concat(parseArray(obj[key], indent))
                    tmp.push({ text: '],', indent })
                }
            } else if (obj[key] instanceof Object) {
                // item 为对象
                tmp.push({ text: key + ': {', indent })
                tmp = tmp.concat(parseObject(obj[key], indent))
                tmp.push({ text: '},', indent })
            } else {
                // item 为普通value
                let str = key + ': ' + obj[key] + ','
                tmp.push({ text: str, indent })
            }
        } else {
            if (isArray(obj[key])) {
                if (isPureArray(obj[key])) {
                    tmp.push({ text: key + ': ' + parsePureArray(obj[key]), indent })
                } else {
                    tmp.push({ text: key + ': ', indent })
                    tmp.push({ text: '[', indent })
                    tmp = tmp.concat(parseArray(obj[key], indent))
                    tmp.push({ text: ']', indent })
                }
            } else if (obj[key] instanceof Object) {
                tmp.push({ text: key + ': {', indent })
                tmp = tmp.concat(parseObject(obj[key], indent))
                tmp.push({ text: '}', indent })
            } else {
                let str = key + ': ' + obj[key]
                tmp.push({ text: str, indent })
            }
        }
    }
    return tmp
}
/**
 * 不关心外部"[]"
 * 嵌套数组的解析
 * @param {array} arr
 * @param {number} currentIndent
 */
function parseArray(arr, currentIndent) {
    let indent = currentIndent + 4
    let tmp = []
    arr.forEach((item, index, arr) => {
        if (index < arr.length - 1) {
            // need comma
            if (isArray(item)) {
                // item 是数组
                if (isPureArray(item)) {
                    tmp.push({ text: parsePureArray(item) + ',', indent })
                } else {
                    tmp.push({ text: '[', indent })
                    tmp = tmp.concat(parseArray(item, indent))
                    tmp.push({ text: '],', indent })
                }
            } else if (item instanceof Object) {
                // item 是对象
                tmp.push({ text: '{', indent })
                tmp = tmp.concat(parseObject(item, indent))
                tmp.push({ text: '},', indent })
            } else {
                // item 为简单value
                tmp.push({ text: item + ',', indent })
            }
        } else {
            if (isArray(item)) {
                if (isPureArray(item)) {
                    tmp.push({ text: parsePureArray(item), indent })
                } else {
                    tmp.push({ text: '[', indent })
                    tmp = tmp.concat(parseArray(item, indent))
                    tmp.push({ text: ']', indent })
                }
            } else if (item instanceof Object) {
                tmp.push({ text: '{', indent })
                tmp = tmp.concat(parseObject(item, indent))
                tmp.push({ text: '}', indent })
            } else {
                tmp.push({ text: item, indent })
            }
        }
    })
    return tmp
}

/**
 * 简单数组,以字符串形式解析
 * @param {Array} arr
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
 * @param {array} arr
 */
function isPureArray(arr) {
    if (!isArray(arr)) {
        return false
    }
    return arr.every((item) => {
        return !isArray(item) && !(item instanceof Object)
    })
}

function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]'
}

module.exports = function parseJson(formdata) {
    var tmp = []
    if (isArray(formdata)) {
        tmp.push({ text: '[', indent: 0 })
        tmp.concat(parseArray(formdata, 0))
        tmp.push({ text: ']', indent: 0 })
    } else if (formdata instanceof Object) {
        tmp.push({ text: '{', indent: 0 })
        tmp = tmp.concat(parseObject(formdata, 0))
        tmp.push({ text: '}', indent: 0 })
    }
    return tmp
}
