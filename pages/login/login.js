// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

      winWidth:0,
      winHeight:0,
      currentTab:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;

      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            winWidth: res.windowWidth,
            winHeight: res.windowHeight
          });
        },
      })
  },

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },

  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  wxLogin: function(e){
    var that = this;
    wx.login({
      success: function(e){
        if(e.code){
            wx.request({
                url: 'https://www.twperson.top/tomcat-monitor/wx/checkCode',
                data:{code:e.code},
                success: function(res){
                    if(res.data.code == "000000"){
                      console.log(res)
                       wx.setStorageSync("login-token", res.data.data);
                       
                       wx.getUserInfo({
                         success:function(ures){
                           if (ures.errMsg == "getUserInfo:ok"){
                             wx.showToast({
                               title: '您好！' + ures.userInfo.nickName,
                               icon:"success",
                               duration:10000,
                               mask:true
                             })
                             setTimeout(function(){
                                let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                                let prevPage = pages[pages.length - 2];
                                prevPage.setData({
                                  userInfo: ures.userInfo
                                })
                                wx.navigateBack({
                                  delta: 1
                                })
                             },1000)
                             
                           }
                         }
                       })
                    }
                }
            })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})