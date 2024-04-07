const db = wx.cloud.database()
Page({
	data: {
		article: [],
		articleIds: ''
	},
	onLoad(options) {
		// console.log("从search页获取的", options);
		// 从search页获取搜索对象的_id
		var articleString = decodeURIComponent(options.articleIds);
		var articleIds = JSON.parse(articleString);
		// console.log(articleIds);
		this.setData({
			articleIds,
		})
		console.log("搜索目标为", this.data.articleIds);

		// 从数据库中获取符合条件的日志
		const promises = [];
		for (let i = 0; i < articleIds.length; i++) {
			const id = articleIds[i];
			// console.log(id);
			const promise = db.collection('article').doc(id).get().then(res => {
				return res.data;
			}).catch(err => {
				console.log('请求失败', err);
				return null;
			});
			promises.push(promise);//逐一增加
		}
		// Promise.all处理异步查询，再更新data
		Promise.all(promises).then(results => {
			this.setData({
				article: results
			});
			// console.log('获得日志内容', this.data.article);
		});

	},
	// 跳转详情页
	goToDetails(e) {
		// console.log("点击的日志id", e.currentTarget.dataset.id);
		wx.navigateTo({
			url: '/pages/details/details?id=' + e.currentTarget.dataset.id,
		})
	},

})