import {
    ajax
} from "../../utils/indexz";
Page({
    /**
     * 页面的初始数据
     */
    data: {
        Pinfo: [],
    },


    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        //检查是否登录
        const login = wx.getStorageSync('login');
        if (!login) {
            wx.redirectTo({
                url: '/pages/login/login'
            });
        }
        const { info, username, avatarUrl } = options;

        if (info) {
            const Pinfo = JSON.parse(options.info);
            console.log(username);
            console.log(avatarUrl);
            console.log(Pinfo);
            this.setData({
                imageUrls: Pinfo.photourl,
                detail: Pinfo,
                avatarUrl:avatarUrl,
                username:username
              });
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})