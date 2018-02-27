Page({
    data: {
        animationData: {}
    },
    onShow: function () {
        var animation = wx.createAnimation({
            duration: 6000,
            timingFunction: 'ease',
        })

        this.animation = animation

        animation.scale(2, 2).rotate(7200).step()

        this.setData({
            animationData: animation.export()
        })

        setTimeout(function () {
            animation.rotate(3600).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 6000)
    },
    rotateAndScale: function () {
        console.log(1);

        // 旋转同时放大
        this.animation.translate(0, 0).step({ duration: 1000 })
        this.animation.rotate(1800).scale(1, 1).step()
        this.setData({
            animationData: this.animation.export()
        })
    },
    rotateThenScale: function () {
        console.log(2);

        // 先旋转后放大
        this.animation.translate(0, 0).step({ duration: 1000 })
        this.animation.rotate(90).step()
        this.animation.scale(2.5, 2.5).step()
        this.setData({
            animationData: this.animation.export()
        })
    },
    rotateAndScaleThenTranslate: function () {
        console.log(3);

        // 先旋转同时放大，然后平移
        this.animation.rotate(0).scale(1.5, 1.5).step({ duration: 2000 })
        this.animation.translate(100, 100).step({ duration: 3000 })
        this.setData({
            animationData: this.animation.export()
        })
    }
})