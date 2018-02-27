//获取豆瓣电影api的数据的公共方法。

function movieList(movieUrl, callBack) {

    wx.request({
        url: movieUrl,
        data: {
            apikey: '0b2bdeda43b5688921839c8ecb20399b',
            city: '杭州',
            start: '0',
            count: '100',
            client: '',
            udid: '',
        },
        method: "GET",
        header: {
            // 这里就是填application/json报错。不填 都不报错
            "Content-Type": "application/xml"
        },
        success: function (res) {
            console.log(res);

            //调用电影信息提取函数
            callBack(res.data);

            wx.hideLoading();
        },
        fail: function (error) {
            console.log(error);
        },
    })
}

module.exports = {
    movieList: movieList
}