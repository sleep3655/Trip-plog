const db = wx.cloud.database()
Page({
	data: {
		article: ''
	},
	onShareAppMessage() {
		return {
			title: "ding~你有一篇旅游日志请查看"
		}
	},
	onLoad(options) {
		console.log('首页点击的日志id', options.id);
		// 获取指定游记内容
		db.collection('article').doc(options.id).get().then(res => {
			this.setData({
				article: res.data
			})
			// console.log('获得日志内容', this.data.article);
		}).catch(err => {//请求失败
			console.log('请求失败', err)
		})

		// 启用分享功能
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline']
		})

	},

})