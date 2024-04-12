const db = wx.cloud.database()
const _ = db.command
Page({
	data: {
		hot_list: ['嘉兴', '南京', '上海', '璇77', '罡酱贝壳儿', '打卡'],
		his_list: [],
		search: '',//当前搜索内容
		article: [],
		articleIds: []//获取搜索目标的_id
	},
	onShow: function () {
		if (wx.getStorageSync('search_history')) {
			this.setData({
				his_list: JSON.parse(wx.getStorageSync('search_history')).slice(0, 15)
			})
		}
	},
	handleInput(e) {
		let data = e.detail.value.replace(/(^\s*$)|(\s*$)/g, "")//去除前后空格
		if (data.trim() != '') {
			this.handleData(data)
		}
	},
	handleData(e) {
		this.data.his_list.forEach((item, index) => {
			if (e === item) {
				this.data.his_list.splice(index, 1);
			}
		})
		this.data.his_list.unshift(e);
		this.setData({
			his_list: this.data.his_list.slice(0, 15)
		})
		wx.getStorageSync('search_history', JSON.stringify(this.data.his_list))
	},
	// 热门搜索
	handleHotItem(e) {
		let { index } = e.currentTarget.dataset, { hot_list } = this.data;
		let search = hot_list[index]
		this.setData({
			search,
		})
		// 将标签存入历史搜索
		this.handleData(search)
	},
	// 历史搜索
	handleHisItem(e) {
		let { index } = e.currentTarget.dataset, { his_list } = this.data;
		let search = his_list[index]
		this.setData({
			search: search
		})
		this.handleData(search)
	},
	// 清空搜索输入，取消搜索
	clearInput() {
		console.log('清空搜索输入');
		this.setData({
			search: '',
			// 取消搜索，不应该出现在历史搜索里
			his_list: this.data.his_list.slice(1)
		})
	},
	// 清空历史
	clearHistory() {
		this.setData({
			his_list: []
		})
		wx.removeStorageSync('search_history')
	},
	// 搜索内容
	searchCon(e) {
		console.log("当前输入为", e.detail.value);
		let msg = e.detail.value
		if (msg.trim() !== '') {
			this.setData({
				search: msg
			});
		}
	},

	// 搜索跳转
	goToSearchlist(e) {
		let { search } = this.data;
		let currentSearch = search
		// 将标签存入历史搜索
		this.handleData(search)
		db.collection('article').where(_.or([{
			title: db.RegExp({//标题关键字查找
				regexp: currentSearch,
				// options: 'i'//大小写不敏感
			})
		}, {
			name: db.RegExp({//昵称查找
				regexp: currentSearch,
				options: 'i'
			})
		}])).get().then(
			res => {
				console.log('获取符合条件的日志', res.data);
				this.setData({
					article: res.data
				})
				console.log("当前article为", this.data.article)
				// 获取符合查找条件的article的_id
				const articleIds = this.data.article.map(obj => obj._id);
				this.setData({
					articleIds: articleIds
				})
				console.log('当前 article 的 _id:', articleIds);
				// 没有查询结果提示
				if (articleIds.length === 0) {
					wx.showModal({
						title: '提示',
						content: '无搜索结果',
						showCancel: false,
						confirmText: '确定'
					});
				} else {
					// 有结果跳转到搜索结果页
					wx.navigateTo({
						url: '/pages/search-list/search-list?articleIds=' + encodeURIComponent(JSON.stringify(articleIds))
					})
				}

			}
		)

	},
})