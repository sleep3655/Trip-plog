import {
    ajax
} from '../../utils/indexz'
Page({
    toRegister() {
        wx.redirectTo({
            url: '../register/register'
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        password: '',
    },

    getUsername(e) {
        this.setData({
            username: e.detail.value
        })
    },

    getPassword(e) {
        this.setData({
            password: e.detail.value
        })
    },

    async submit() {
        const {
            username,
            password,
        } = this.data
        if (!username || !password) {
            wx.showToast({
                title: '请填写用户名和密码',
                icon: 'none'
            })
            return
        }
        const params = {
            username,
            password
        };
        const result = await ajax('/login', 'POST', params)
        if (result.statusCode === 200) {
            wx.showToast({
                title: '用户登录成功!',
                icon: 'none'
            })

            setTimeout(() => {
                wx.navigateTo({
                    url: '/pages/myPage/myPage'
                })
            }, 1000)
        } else if (result.statusCode === 401) {
            wx.showToast({
                title: '用户名或密码不正确!',
                icon: 'none'
            });
        } else {
            console.log('用户注册失败');
            // TODO: 进行注册失败的逻辑处理
        }
    },


    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        const openid = wx.getStorageSync('openid');

        if (wx.getStorageSync('login_account')) {
            wx.switchTab({
                url: '../index/index',
            })
        } else {
            if (!openid) {
                const {
                    code
                } = await wx.login();
                const params1 = {
                    code
                };
                const result1 = await ajax('/login', 'GET', params1);
                const {
                    data
                } = result1;
                if (data !== "error") {
                    wx.setStorageSync('openid', data);
                }
            }
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