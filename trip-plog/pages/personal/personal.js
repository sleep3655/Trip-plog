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
	logout() {
		wx.showModal({
			title: '提示',
			content: '确定退出吗?',
			success: (res) => {
				const {
					confirm
				} = res;
				if (confirm) {
					wx.removeStorageSync('login');
					wx.removeStorageSync('userId');
					this.setData({
						login: false
					})
					wx.redirectTo({
						url: '../login/login',
					})


				}
			}
		})
	},
	getDetail(e) {
		const info = e.detail;
		wx.navigateTo({
			url: `../toDetail/toDetail?info=${JSON.stringify(info)}`,
		})
	},

	getUpdate(e) {
		const info = e.detail;
		wx.navigateTo({
			url: `../record/record?info=${JSON.stringify(info)}`,
		})
	},
	async getDelete(e) {
		const id = e.detail;
		const {
			data
		} = await ajax('/deletePlog', 'POST', {
			_id: id
		})
		if (data === "success") {
			wx.showToast({
				title: '删除成功!',
				icon: 'none',
				success: () => {
					this.onShow();
				}
			})
		} else {
			wx.showToast({
				title: '删除失败!',
				icon: 'none'
			})
		}
	},

    async onShow(options) {
        const login = wx.getStorageSync('login');
        const userId = wx.getStorageSync('userId');
      
        if (login) {
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
          const { data } = publish;
          const reversedData = data.reverse();
      
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