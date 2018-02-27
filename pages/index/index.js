// pages/index/index.js
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isCheckCode: false,
        animationData: null,        //动画
        opticy: 0,

        isTapweb: false,
    },

    // 拨打电话联系我
    contactMe: function () {
        wx.makePhoneCall({
            phoneNumber: '15055655919',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
    },

    // 添加微信,出现二维码弹窗
    addWeChat: function () {
        var that = this;

        // that.setData({
        //     isCheckCode: true,
        // });

        wx.hideTabBar({
            animation: true,
        })

        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "ease",
            delay: 0
        });

        that.animation = animation;
        animation.scale(0, 0).step(0);

        that.setData({
            animationData: animation.export(),
            isCheckCode: true,
        });


        setTimeout(function () {
            animation.scale(1, 1).step();
            that.setData({
                animationData: animation.export()
            })
        }.bind(that), 0)


        var shadeInterval = setInterval(function () {
            var opticy = that.data.opticy;
            opticy = opticy + 0.01;

            that.setData({
                opticy: opticy,
            })

            if (that.data.opticy >= 0.5) {
                clearInterval(shadeInterval);
            }
        }, 7)
    },

    // 隐藏二维码名片弹窗
    cancelQr: function () {
        var that = this;

        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "ease",
            delay: 0
        })

        that.animation = animation;
        animation.scale(0, 0).step(200);

        var shadeInterval = setInterval(function () {
            var opticy = that.data.opticy;
            opticy = opticy - 0.02;

            that.setData({
                opticy: opticy,
            })

            if (that.data.opticy <= 0) {
                clearInterval(shadeInterval);
            }
        }, 7)


        that.setData({
            animationData: animation.export(),
        })

        setTimeout(function () {
            that.setData({
                animationData: animation.export(),
                isCheckCode: false
            })
        }.bind(that), 200)

        wx.showTabBar({
            animation: true,
        })
    },

    // 保存二维码图片
    saveQrCode: function () {
        var that = this;

        wx.showModal({
            title: '提示',
            content: '是否保存此帅哥的二维码？',
            confirmText: '欣然同意',
            cancelText: '残忍拒绝',
            cancelColor: '#e1e1e1',
            success: function (res) {
                if (res.confirm) {
                    wx.saveImageToPhotosAlbum({
                        filePath: '/images/icon/myWeChat.png',
                        success: function (res) {
                            console.log(res);
                        }
                    })
                }
            }
        })
    },

    //提示
    prompt: function () {
        var that = this;

        that.setData({
            isTapweb: false,
        }) 

        if (that.data.isTapweb == false) {
            wx.showModal({
                title: '提示',
                showCancel: false,
                confirmText: '我知道了',
                content: '很遗憾，个人小程序暂不支持外链连接，敬请期待！可长按复制链接使用浏览器打开',
            })
        }

    },

    // 长按链接
    longTap: function () {
        var that = this;

        that.setData({
            isTapweb: true,
        })
    },

    stopscorll: function () {
        console.log(0);
    },

})