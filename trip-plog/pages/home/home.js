const db = wx.cloud.database()
Page({

	data: {
		article: ''
	},
	onLoad(options) {
		// 获取云开发数据
		db.collection('article').get().then(res => {
			this.setData({
				article: res.data
			})
			// console.log('获得日志内容', this.data.article);
		}).catch(err => {//请求失败
			console.log('请求失败', err)
		})
	},
	// 跳转搜索页
	goToSearch() {
		wx.navigateTo({
			url: '/pages/search/search'
		})
	},
	// 跳转详情页
	goToDetails(e) {
		// console.log("点击的日志id", e.currentTarget.dataset.id);
		wx.navigateTo({
			url: '/pages/details/details?id=' + e.currentTarget.dataset.id,
		})
		// 更新views
		// 先获取当前的 views 值
		db.collection('article').doc(e.currentTarget.dataset.id).get().then(res => {
			const currentViews = res.data.views;
			// console.log("当前浏览量", currentViews);
			// 更新 views 字段
			db.collection('article').doc(e.currentTarget.dataset.id).update({
				data: {
					views: currentViews + 1
				},
			}).then(res => {
				// 获取更新后的数据
				db.collection('article').get().then(res => {
					// 更新新的 article 字段并获取
					this.setData({
						article: res.data
					})
					// console.log('article 字段更新成功', this.data.article)
				}).catch(error => {
					console.error('获取更新后的数据失败', error);
				});
			})
		}).catch(error => {
			console.error('获取当前 views 值失败', error);
		});

	},
	//跳转游记发布页
	goToRecord: function () {
		wx.navigateTo({
			url: '/pages/record/record',
			fail: function (err) {
				console.error('跳转到record页失败', err);
			}
		});
	},

})