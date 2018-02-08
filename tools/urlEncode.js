// 编码
exports.encodeId = (str) => {
    if (typeof str != 'string') {
        return str;
    }
    return new Buffer(str).toString('base64');
}
// 解码
exports.decodeId = (str) => {
    if (typeof str != 'string') {
        return str;
    }
    return new Buffer(str, 'base64').toString();
}