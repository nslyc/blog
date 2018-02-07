const request = require('request');
const url = '172.20.10.166:3000';

// 查找文章列表
exports.queryArticles = () => {
    return new Promise((resolve, reject) => {
        request.get(`${url}/api/articles`, function (err, res, body) {
            if (err) {
                reject(err);
            }
            resolve(body);
        })
    });
}
// 通过id查找文章
exports.queryArticlesById = (id) => {
    return new Promise((resolve, reject) => {
        request.get(`${url}/api/articles/${id}`, function (err, res, body) {
            if (err) {
                reject(err);
            }
            resolve(body);
        })
    });
}
// 通过文章id查找文章评论
exports.queryReviewsByArticlesId = (id) => {
    return new Promise((resolve, reject) => {
        request.get(`${url}/api/reviews/articles/${id}`, function (err, res, body) {
            if (err) {
                reject(err);
            }
            resolve(body);
        })
    });
}
// 发表评论
exports.addReviews = (data) => {
    return new Promise((resolve, reject) => {
        request.post(`${url}/api/reviews`, {
            body: data
        }, function (err, res, body) {
            if (err) {
                reject(err);
            }
            resolve(body);
        })
    });
}
// 获取留言列表
exports.queryLeaves = (data) => {
    return new Promise((resolve, reject) => {
        request.get(`${url}/api/leaves`, function (err, res, body) {
            if (err) {
                reject(err);
            }
            resolve(body);
        })
    });
}
// 发表留言
exports.queryLeaves = (data) => {
    return new Promise((resolve, reject) => {
        request.post(`${url}/api/leaves`, {
            body: data
        }, function (err, res, body) {
            if (err) {
                reject(err);
            }
            resolve(body);
        })
    });
}
// 获取图片列表
exports.queryLeaves = (data) => {
    return new Promise((resolve, reject) => {
        request.get(`${url}/api/images`, function (err, res, body) {
            if (err) {
                reject(err);
            }
            resolve(body);
        })
    });
}