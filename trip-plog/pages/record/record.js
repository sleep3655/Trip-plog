// pages/record/record.js
const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [{ text: '杭州市', value: '330100' }],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [{ text: '南京市', value: '320100' },{ text: '苏州市', value: '320111' }],
  },
];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectedImage: null,
    title: '',
    content: '',
    date: '',
    location: '',
    cost: '',
    fileList: [],
    show: false,
    showDatePicker: false,
    showLocationPicker: false,
    options,
    cascaderValue: '',   
    titleError: false,
    contentError: false,
    locationError: false,
    costError: false,
    userId:'',
    login:'',
    plogid:''
  },

  showDatePicker() {
    this.setData({ showDatePicker: true });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  confirmDate(event) {
    // const [start, end] = event.detail;
    this.setData({
      showDatePicker: false,
      date: this.formatDate(event.detail),
    });
  },
  onCloseDatePicker() {
    this.setData({
      showDatePicker: false,
    });
  },
  showLocationPicker() {
    this.setData({
      showLocationPicker: true,
    });
  },

  closeLocationPicker() {
    this.setData({
      showLocationPicker: false,
    });
  },

  finishLocationPicker(event) {
    const { selectedOptions, value } = event.detail;
    const location = selectedOptions
        .map((option) => option.text || option.name)
        .join('/');
    this.setData({
      location,
      cascaderValue: value,
      showLocationPicker: false,
    });
  },

  afterRead(event) {
    const { file } = event.detail;
    const { fileList } = this.data;
    const tempFilePath = file[0].tempFilePath;
    const fileManager = wx.getFileSystemManager();
    fileManager.saveFile({
      tempFilePath,
      success: (res) => {
        const savedFilePath = res.savedFilePath;
        fileList.push({ url: savedFilePath });
        this.setData({ fileList });
      },
      fail: (error) => {
        console.error(error);
      }
    });
  
    if (fileList.length > 9) {
      fileList.splice(0, fileList.length - 9);
    }
    this.setData({ fileList });
    
  },

  deleteImage(event) {
    const { index } = event.currentTarget.dataset;
    const { fileList } = this.data;
    fileList.splice(index, 1);
    this.setData({ fileList });},

  handleTitleInput(event) {
    const value = event.detail;
    this.setData({
      title: value,
      titleError: false  // 清除标题错误提示
    });
  },
  handleContentInput(event) {
    const value = event.detail;
    console.log("content",value)
    this.setData({
      content: value,
      contentError: false  // 清除内容错误提示
    });
  },
  handleLocationInput(event) {
    const value = event.detail.value;
    this.setData({
      location: value,
      locationError: false  // 清除位置错误提示
    });
  },
  handleCostInput(event) {
    const value = event.detail;
    this.setData({
      cost: value,
      costError: false  
    });
  },

  handlePublish() {
    const { title, content, location, cost, date } = this.data;
    const { fileList } = this.data;
    const plogid =this.data

    // 重置错误状态
    this.setData({
      titleError: false,
      contentError: false,
      locationError: false,
      costError: false
    });
  
    // 进行表单验证
    let hasError = false;
    if (!title.trim()) {
      this.setData({
        titleError: true
      });
      hasError = true;
    }
    if (!content.trim()) {
      this.setData({
        contentError: true
      });
      hasError = true;
    }
    if (!location.trim()) {
      this.setData({
        locationError: true
      });
      hasError = true;
    }
    if (!cost.trim()) {
      this.setData({
        costError: true
      });
      hasError = true;
    }
    if (!date) {
      this.setData({
        dateError: true
      });
      hasError = true;
    }
       if (Array.isArray(fileList) && fileList.length === 0) {
      this.setData({
        dateError: true
      });
      hasError = true;
    }
    if (hasError) {
      // 表单验证未通过，提示信息
      wx.showToast({
        title: '请填写完整的游记信息',
        icon: 'none'
      });
      return;
    }
    // 表单验证通过，向后端发送请求
    const formData = {
      title: title,
      content: content,
      location: location,
      cost: cost,
      date:date,
      time: new Date().toISOString(), // 当前时间
      plogid:plogid
    }; 
    wx.getStorage({
      key: 'userId',
      success: function(res) {
        const userId= res.data;
        formData.userId = userId;
      }
    })
    const uploadPromises = fileList.map((file, index) => {
      return new Promise((resolve, reject) => {
        // 压缩图片
        wx.compressImage({
          src: file.url,
          quality: 80, // 设置压缩质量
          success: (res) => {
            // 上传压缩后的图片
            wx.uploadFile({
              url: 'http://localhost:3001/publish', // 后端接口地址
              filePath: res.tempFilePath, // 使用压缩后的图片路径
              name: `file`,
              formData: formData,
              timeout: 60000, // 设置超时时间为 60 秒
              success: (res) => {
                // 上传成功处理逻辑
                console.log(`第 ${index} 个文件上传成功`, res);
                resolve();
              },
              fail: (err) => {
                // 上传失败处理逻辑
                console.error(`第 ${index} 个文件上传失败`, err);
                reject();
              }
            });
          },
          fail: (err) => {
            // 图片压缩失败处理逻辑
            console.error(`第 ${index} 张图片压缩失败`, err);
            reject();
          }
        });
      });
    });

    // 等待所有文件上传完成
    Promise.all(uploadPromises)
      .then(() => {
        // 所有文件上传完成
        // 清空表单数据和图片文件列表
        this.setData({
          title: '',
          content: '',
          location: '',
          cost: '',
          date: '',
          time: '',
          fileList: []
        });
  
        // 提示发布成功
        wx.showToast({
          title: '发布成功',
          icon: 'success'
        });
        //跳转到个人中心页面
        wx.switchTab({
          url: '/pages/personal/personal',
          fail: function(err) {
            console.error('跳转到record页失败', err);
          }
        });
      })
      .catch(() => {
        // 文件上传过程中出现错误
  
        // 提示发布失败
        wx.showToast({
          title: '发布失败',
          icon: 'none'
        });
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    //检查是否登录
    const login = wx.getStorageSync('login');
    if (!login) {
      wx.redirectTo({
        url: '/pages/login/login'
    });
    } 
    // this.setData({ fileList: this.data.fileList });
    // wx.hideTabBar();
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