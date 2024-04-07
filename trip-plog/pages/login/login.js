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
        
        const result = await ajax('/toLogin', 'POST', params)
        if (result.statusCode === 200) {
            wx.setStorageSync('login', true);
            const userId = result.data.userId; 
            wx.setStorageSync('userId', userId);
            console.log('用户ID:', userId);
            wx.switchTab({
                url: '../personal/personal',
                success: () => {
                    wx.showToast({
                        title: '登录成功!',
                        icon: 'none'
                    })

                }
            })
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
        // const openid = wx.getStorageSync('openid');
        // if (!openid) {
        //     const {
        //         code
        //     } = await wx.login();
        //     const params1 = {
        //         code
        //     };
        //     const result1 = await ajax('/login', 'GET', params1);
        //     const {
        //         data
        //     } = result1;
        //     if (data !== "error") {
        //         wx.setStorageSync('openid', data);
        //     }

        // }
    },
})