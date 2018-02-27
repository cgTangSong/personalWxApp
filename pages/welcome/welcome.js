var app = getApp();

Page({

    data: {
        userInfo: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {



        var that = this;

        wx.getUserInfo({
            success: function (res) {
                // console.log(res);
                app.globalData.userInfo = res.userInfo;

                that.setData({
                    userInfo: res.userInfo,
                })

                console.log(that.data.userInfo);    
            }
        })
        

    },
    // 跳转页面
    onTap: function () {
        // 这个是页面跳转，父子关系 可返回。
        // wx.navigateTo({
        //     url: '../posts/posts',
        // })

        //这个是页面重定向,跳转页面没有 返回项
        // wx.redirectTo({
        //     url: '../posts/posts',
        // })

        //跳转到 有tabBar的页面上
        wx.switchTab({
            url: '../index/index',
        })
    }
})