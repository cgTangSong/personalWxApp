// movies.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 因为下面方法是异步的，所以不初始化，页面加载会报错
        in_theaters: {},
        coming_soon: {},
        top250: {},
        searchMov: {},
        // 定义两个变量，来控制电影页和搜索页的切换
        bodyShow: true,
        searchShow: false,
        isLoading: false,        //是否正则加载
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log("部分源码猛戳：http://sczgodofwar.top");

        wx.showLoading({
            title: '正在加载中',
        })

        // 获取豆瓣公开api的数据
        var in_theatersUrl = app.globalData.movieBase + "/v2/movie/in_theaters";
        var coming_soonUrl = app.globalData.movieBase + "/v2/movie/coming_soon?start=0&&count=9";
        var top250Url = app.globalData.movieBase + "/v2/movie/top250?start=0&&count=6";

        this.movieList(in_theatersUrl, "in_theaters");
        this.movieList(coming_soonUrl, "coming_soon");
        this.movieList(top250Url, "top250");
    },

    //获取豆瓣电影api的数据
    movieList: function (movieUrl, movieKey) {
        var that = this;

        wx.request({
            url: movieUrl,
            data: {
                apikey: '0b2bdeda43b5688921839c8ecb20399b',
                city: '杭州',
                start: '0',
                count: '9',
                client: '',
                udid: '',
            },
            method: "GET",
            header: {
                // 这里就是填application/json报错。不填 都不报错
                "Content-Type": "application/xml",
                // 'content-type': 'application/json'
            },
            success: function (res) {
                // console.log(res.data);
                //调用电影信息提取函数
                that.movieData(res.data, movieKey);
            },
            fail: function (error) {
                console.log(error);
            },
        })
    },

    // 提取豆瓣的电影信息
    movieData: function (movies, movieKey) {
        var that = this;

        var newMovies = [];
        var head = "";

        //空值判断
        if (movies.title != null) {
            head = movies.title.substring(0, 7);
        }

        for (var num in movies.subjects) {
            var subject = movies.subjects[num];

            var movie_data = {
                alt: subject.alt,
                imageUrl: subject.images.large,
                title: subject.title,
                pingfen: subject.rating.average,
                movieId: subject.id
            }

            newMovies.push(movie_data);
        }


        // 重点理解！ 动态赋值，把三个集合，合成一个集合。
        var moviesList = {};

        // console.log("对象数据的键值(电影列表属性)：" + movieKey);

        moviesList[movieKey] = {
            head: head,
            newMovies: newMovies
        };
        
        // 数据加载完成后，将页面显示，并隐藏加载弹窗动画
        that.setData({
            isLoading: true,
        })

        wx.hideLoading();

        this.setData(moviesList);
        // 关闭正在加载提示
        wx.hideNavigationBarLoading();
        //关闭下拉刷新提示
        wx.stopPullDownRefresh();
    },

    //实现 顶部下拉 刷新电影数据,onPullDownRefresh是框架给的
    onPullDownRefresh: function () {
        var in_theatersUrl = app.globalData.movieBase + "/v2/movie/in_theaters?start=0&&count=6";
        var coming_soonUrl = app.globalData.movieBase + "/v2/movie/coming_soon?start=0&&count=9";
        var top250Url = app.globalData.movieBase + "/v2/movie/top250?start=0&&count=6";

        this.movieList(in_theatersUrl, "in_theaters");
        this.movieList(coming_soonUrl, "coming_soon");
        this.movieList(top250Url, "top250");
        // 出现正在加载的提示。
        wx.showNavigationBarLoading();
    },

    // 更多电影的点击事件
    onMoreM: function (event) {
        var moreMov = event.currentTarget.dataset.moreMov;

        console.log(moreMov);

        wx.navigateTo({
            url: 'moreMovies/moreMovies?navTitle=' + moreMov
        })
    },
    //电影 搜索页点击
    onBindfocus: function (event) {
        this.setData({
            bodyShow: false,
            searchShow: true
        });
    },

    //当搜索输入框发生改变时，执行。
    onBindchang: function (event) {
        var searchText = event.detail.value;
        var searchUrl = app.globalData.movieBase + "/v2/movie/search?q=" + searchText;

        this.movieList(searchUrl, "searchMov");
        console.log(searchUrl);
    },

    //关闭搜索页
    hideSearchView: function () {
        this.setData({
            bodyShow: true,
            searchShow: false
        });
    },

    // 电影详情的点击事件
    onMovieDetail: function (event) {
        // console.log(event);

        var movieId = event.currentTarget.dataset.movieId;

        wx.navigateTo({
            url: 'movieDetail/movieDetail?movieId=' + movieId
        })

        console.log("电影ID" + movieId);
    }
})