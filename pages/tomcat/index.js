// pages/IDCard/IDCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IDCaed: "",
    show: false,
    getdata: {},
    manageTomcat:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  /**
   * 获取用户输入 
   */
  IDCard: function (e) {
    this.setData({
      IDCaed: e.detail.value
    })
  },
  manageTomcat:function(e){
    var that = this;
    var option = e.target.dataset.opt;
    var projectName = e.target.dataset.project;
    console.log(projectName)
    var requestUrl = "https://tzwyun.top/tomcat-monitor/manage/";
    var baseUrl = ""
    if (option == "reload"){
      requestUrl += "reloadApp";
    } else if(option == "start"){
      requestUrl += "startApp";
    } else if(option == "stop"){
      requestUrl += "stopApp";
    } else{
      wx.showToast({
        title: '发了错误',
        icon: 'none',
        image: '../../images/error.png',
        duration: 2000
      })
      return false;
    }
    requestUrl += "?appPath=" + e.target.dataset.url + "&webAppName="+projectName+"&token="+wx.getStorageSync("user-token");
    wx.showLoading({
      title: '处理中',
    });
    wx.request({
      url: requestUrl,
      method: 'post',
      data: {
        appPath: e.target.dataset.url,
        webAppName: projectName
      },
      success:function(res){
        wx.hideLoading();
        console.log(res)
        if(res.data.code == "000000"){
          wx.showModal({
            title: '提示',
            content: option+"成功！",
            success: function (res) {
              
              that.setData({
                show: true
              })
            }
          })
        } else{
          wx.showModal({
            title: '提示',
            content: option + "失败！",
            success: function (res) {
              that.setData({
                show: false
              })
            }
          })
        }
        //
        that.getdata();
      }
    })
  },
  /**
   *用户点击获取数据事件 
   */
  getdata: function (e) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    var IDCard = this.data.IDCaed;
    //var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
    //if (reg.test(IDCard) === false) {
    if(IDCard != "***"){
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        image: '../../images/error.png',
        duration: 2000
      })
      return false;
    }
    //请求数据
    wx.request({
      url: "https:///tzwyun.top/tomcat-monitor/manage/find/list",
      data: {
        token:wx.getStorageSync("user-token")
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading();
        if (res.data.code == "000000") {
          if (res.data.data == "" || res.data.data == "null" || res.data.data == null || res.data.data == "undefined" || res.data.data == undefined) {
            wx.showModal({
              title: '提示',
              content: "暂无数据",
              success: function (res) {
                that.setData({
                  show: false
                })
              }
            })
          } else {
            that.setData({
              show: true,
              getdata: res.data.data
            })
          }

        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            success: function (res) {
              that.setData({
                show: false
              })
            }
          })
        }
      }
    })
  }
})
