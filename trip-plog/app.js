App({

	onLaunch: function () {
		wx.cloud.init({
			env: 'trip-plog-3go75etna6f71cc8' //云开发
		})
	},

	/**
	 * 当小程序启动，或从后台进入前台显示，会触发 onShow
	 */
	onShow: function (options) {

	},

	/**
	 * 当小程序从前台进入后台，会触发 onHide
	 */
	onHide: function () {

	},

	/**
	 * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
	 */
	onError: function (msg) {

	}
})
