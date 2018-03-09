Page({

    data: {
        markers: [
            {
                iconPath: "/images/movie_icon/star.png",
                id: 0,
                longitude: 113.324520,
                latitude: 23.099994,
                width: 36,
                height: 36
            },
            // {
            //     iconPath: "/images/movie_icon/xx.png",
            //     id: 1,
            //     latitude: 23.069494,
            //     longitude: 113.311520,
            //     width: 36,
            //     height: 36
            // }
        ],

        circles: [
            // {
            //     color: "red",
            // }
        ]
    },

    onLoad: function () {
        var that = this;

        // for (var i = 0; i < 5; i++) {
        //     (function (j) {  // j = i
        //         setTimeout(function () {
        //             console.log(new Date, j);
        //         }, 1000);
        //     })(i);
        // }
        // console.log(new Date, i);


        // function output(i){
        //     setTimeout(function(){
        //         console.log(new Date, i)
        //     },3000)
        // }

        // for(var i = 0; i < 5;i++){
        //     output(i);
        // }
        // console.log(new Date, i);


        // for (var i = 0; i < 5; i++) {
        //     (function (j){
        //         setTimeout(function () {
        //             console.log(new Date, j)
        //         }, 1000*j)
        //     })(i);
        // }

        // setTimeout(function(){
        //     console.log(new Date, i);
        // },1000*i)


        // 编写一个javscript函数 fn，该函数有一个参数 n（数字类型），其返回值是一个数组，该数组内是 n 个随机且不重复的整数并排序，且整数取值范围是 [2, 32]。
        var arr = [];

        function fn(n) {
            for (let n = 0; n < 6; n++) {
                var rnd = that.getRand(2, 32);

                if (that.checkInArr(arr, rnd)) {
                    n--;
                } else {
                    arr.push(rnd);
                }
                // console.log(rnd);
            }

            // console.log(arr);
        }

        fn(6);

        setTimeout(function () {
            let newNum = 0;

            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr.length; j++) {
                    if (arr[j] > arr[j + 1]) {
                        newNum = arr[j + 1];
                        arr[j + 1] = arr[j];
                        arr[j] = newNum;
                    }
                }
            }

            // arr.sort();
            console.log(arr);
        }, 1000)

        function A(){};
        var a = new A();
        console.log(a instanceof A);
        console.log(a);
        console.log(typeof a);
        console.log(typeof A);

        a.__proto__ = {};
        console.log(a instanceof A);
    },

    getRand: function (n, m) {
        var random = Math.floor(Math.random() * (m - n + 1) + n);

        return random;
    },

    checkInArr: function (arr, rnd) {
        var that = this;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == rnd) {
                return true;
            }
        }
    },


    onReady: function (e) {
        // 使用 wx.createMapContext 获取 map 上下文
        this.mapCtx = wx.createMapContext('myMap')
    },

    // 获取图示中心位置坐标
    getCenterLocation: function () {
        var that = this;

        this.mapCtx.getCenterLocation({
            success: function (res) {
                console.log(res.latitude)
                console.log(res.longitude)

                that.data.markers[0].longitude = res.longitude;
                that.data.markers[0].latitude = res.latitude;

                that.setData({
                    markers: that.data.markers,
                })

                console.log(that.data.markers);
            }
        })
    },

    // 移动到当前位置
    moveToLocation: function () {
        var that = this;

        this.mapCtx.moveToLocation()

        setTimeout(function () {
            that.getCenterLocation();
        }, 100)
    },

    // translateMarker: function () {
    //     this.mapCtx.translateMarker({
    //         markerId: 0,
    //         autoRotate: true,
    //         duration: 1000,
    //         destination: {
    //             latitude: 23.10229,
    //             longitude: 113.3345211,
    //         },
    //         animationEnd() {
    //             console.log('animation end')
    //         }
    //     })
    // },

    // includePoints: function () {
    //     this.mapCtx.includePoints({
    //         padding: [10],
    //         points: [{
    //             latitude: 23.10229,
    //             longitude: 113.3345211,
    //         }, {
    //             latitude: 23.00229,
    //             longitude: 113.3345211,
    //         }]
    //     })
    // }
})