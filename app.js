/** 
 * Created by 长弓唐宋.
 * 
 * 版本    V1.01.1801
*/


App({

    globalData: {
        g_isMusicBtn: false,
        g_isMusicId: -1,
        movieBase: "https://api.douban.com",
        userInfo: null,            //用户信息
    },

    onShow: function(){
        // var that = this;

        // wx.getUserInfo({
        //     success: function (res) {
        //         // console.log(res);

        //         that.globalData.userInfo = res.userInfo;

        //         console.log(that.globalData);
        //     }
        // })
    },

    /**
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     */
    onLaunch: function () {
        // wx.onBackgroundAudioPlay(function () {
        //     this.isMusicBtn = true;
        // });
        // wx.onBackgroundAudioPause(function () {
        //     this.isMusicBtn = false;
        // });
    }
})
