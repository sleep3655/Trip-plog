import {
    ajax
} from '../../utils/indexz'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        password: '',
        confirmpwd: '',
        avatarUrl: []
    },
    toLogin() {
        wx.redirectTo({
            url: '../login/login'
        })
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
    getConfirmPwd(e) {
        this.setData({
            confirmpwd: e.detail.value
        })
    },


    uploadAvatar() {
        let {
            avatarUrl
        } = this.data
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            sizeType: ['compressed'],
            camera: 'back',
            success: res => {
                const tempFilePath = res.tempFiles[0].tempFilePath;
                console.log(res)
                wx.uploadFile({
                    url: 'http://localhost:3001/uploadImg',
                    filePath: tempFilePath,
                    name: 'file',
                    success: res => {
                        const {
                            data
                        } = res
                        let {
                            path
                        } = JSON.parse(data)[0]
                        let _path = `http://localhost:3001/${path}`
                        _path = _path.replace(/\\/g, '/');
                        avatarUrl.unshift(_path)
                        this.setData({
                            avatarUrl
                        })
                    }
                })
            },
            fail: res => {
                console.log('选择失败：' + res.errMsg);
            }
        })
    },

    async submit() {
        const {
            username,
            password,
            confirmpwd,
            avatarUrl
        } = this.data
        if (!username || !password || !confirmpwd) {
            wx.showToast({
                title: '请填写用户名和密码',
                icon: 'none'
            })
            return
        }

        if (password !== confirmpwd) {
            wx.showToast({
                title: '请确认两次密码是否一致',
                icon: 'none'
            })
            return
        }

        const params = {
            username,
            password,
            avatarUrl: avatarUrl[0] || 'https://img.yzcdn.cn/vant/cat.jpeg'
        };

        const result = await ajax('/register', 'POST', params)
        console.log(result);
        const { data } = result;
        if (data === "Registered") {
            // 这个账号已被注册
            wx.showToast({
                title: '用户名已存在!',
                icon: 'none'
            });
            return
        } else if (data === "success") {
            // 注册成功
            wx.redirectTo({
                url: '../login/login',
                success: () => {
                    wx.showToast({
                        title: '注册成功!',
                        icon: 'none'
                    })
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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