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
        list: [],

    },
    getUpdate(e) {
        const info = e.detail;
        console.log(info);
        wx.navigateTo({
            url: `../record/record?info=${JSON.stringify(info)}`,
          });
    },
    async getDelete(e) {
        const id = e.detail;
        const { data } = await ajax('/deletePlog', 'POST', {
            _id: id
        })
        if (data === "success") {
            wx.showToast({
              title: '删除成功!',
              icon: 'none',
              success: () => {
                  this.onLoad();
              }
            })
        } else {
            wx.showToast({
              title: '删除失败!',
              icon: 'none'
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */

    // async onLoad(options) {
    async onShow(options) {

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

            const publish = await ajax('/getMyPublish', 'GET', {
                userId: userId
            });
            const {
                data
            } = publish
            const reversedData = data.reverse()

            this.setData({
                list: reversedData
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
    // onShow() {

    // },

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