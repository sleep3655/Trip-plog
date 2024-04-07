import {
    ajax
} from "../../utils/indexz";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        login: '',
        avatarUrl: '',
        username: '',
        list: [{
            image: "https://img.yzcdn.cn/vant/cat.jpeg",
            title: "我是第一个",
            desc: "2021年2月23日起，若小程序已在微信开放平台进行绑定，则通过wx.login接口获取的登录凭证可直接换取unionID2021年4月28日24时后发布的小程序新版本，无法通过wx.getUserInfo与获取用户个人信息（头像、昵称、性别与地区），将直接获取匿名数据（包括userInfo与encryptedData中的用户个人信息），获取加密后的openID与unionID数据的能力不做调整。此前发布的小程序版本不受影响，但如果要进行版本更新则需要进行适配。"
        }, {
            image: "https://img.yzcdn.cn/vant/cat.jpeg",
            title: "我是第二个",
            desc: "好累好困好像睡觉"
        }],

    },

    /**
     * 生命周期函数--监听页面加载
     */

    async onLoad(options) {
        const login = wx.getStorageSync('login');
        const userId = wx.getStorageSync('userId');
        console.log(userId);
        if (login) {
            console.log(userId);
            const result = await ajax('/getUserInfo', 'GET', {
                userId: userId
            })
            this.setData({
                username: result.data.username,
                avatarUrl: result.data.avatarUrl
            })
        } else {
            wx.redirectTo({
                url: '/pages/login/login'
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