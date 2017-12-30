// start.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'qrcode_for_gh_381ce608cfb9_258.jpg',
    opacity: 0.4,
    disabled: false,
    threshold: 0,
    rule: 'up',
    items: [
      { name: 'up', value: '我们有猫了？' ,checked:'ture'},
      //{ name: 'down', value: '没有猫诶' },
    ]
  },

  radioChange: function (e) {
    //保存报警规则到当前页面的数据
    if (e.detail.value != "") {
      this.setData({
        rule: e.detail.value
      })
    }
    console.log(this.data.rule)
  },

  send: function(){
    var app = getApp();
    var value =app.globalData.temperature.now;
    if(value > 10){
      wx.showModal({
        title: '报告~',
        content: '我们有猫了',
        success: function (res) {
          if (res.confirm) {
            console.log('去看看它')
          } else if (res.cancel) {
            console.log('数据请求发生错误了')
          }
        }
      });
    }
    else{
      wx.showModal({
        title: '报告',
        content: '还是没有猫',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      });
    }
  },
  sendfood: function food() {
    var app = getApp();
   var light = app.globalData.light.now ;
    if (light> 90) {
      wx.showModal({
        title: '报告~',
        content: '猫粮没有了',
        success: function (res) {
          if (res.confirm) {
            console.log('去看看它')
          } else if (res.cancel) {
            console.log('数据请求发生错误了')
          }
        }
      });
    }
    else {
      wx.showModal({
        title: '报告',
        content: '还有猫粮',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      });
    }
  },

 

 
  getDataFromOneNet: function(){
    //从oneNET请求我们的Wi-Fi气象站的数据
    const requestTask = wx.request({
        url: 'https://api.heclouds.com/devices/20491715/datapoints?datastream_id=Light,Temperature,Humidity&limit=10',
        header: {
          'content-type': 'application/json',
          'api-key': '5=5G4Xoiz6c3Ap0DyUf99=UqQDk='
        },
      success: function (res) {
        //console.log(res.data)
        //拿到数据后保存到全局数据
        var app = getApp()
        app.globalData.temperature = res.data.data.datastreams[0]
        app.globalData.light = res.data.data.datastreams[1]
        app.globalData.humidity = res.data.data.datastreams[2],
          app.globalData.temperature.now =
          res.data.data.datastreams[0].datapoints[1].value,
        app.globalData.light.now =
          res.data.data.datastreams[1];
        console.log(1);
        console.log(res.data.data.datastreams[0]);
    console.log(res.data.data.datastreams[1]);
        console.log(res.data.data.datastreams[1]);
        //console.log(app.globalData.light)
        //跳转到天气页面，根据拿到的数据绘图
        wx.navigateTo({
          url: '../wifi_station/tianqi/tianqi',
        })
      },

      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      }
    })
  },

  change: function (e) {
    //当有输入时激活发送按钮，无输入则禁用按钮
 //  if (1) {
      this.setData({
        threshold: e.detail.value,
        opacity: 1,
        disabled: false,
     })
    //} else {
//      this.setData({
  //      threshold: 0,
    //    opacity: 0.4,
      //  disabled: true,
     // })
 //  }
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
    //从oneNET请求我们的Wi-Fi气象站的数据
    const requestTask = wx.request({
      url: 'https://api.heclouds.com/devices/20491715/datapoints?datastream_id=Light,Temperature,Humidity&limit=15',
      header: {
        'content-type': 'application/json',
        'api-key': '5=5G4Xoiz6c3Ap0DyUf99=UqQDk='
      },
      success: function (res) {
        //console.log(res.data)
        //拿到数据后保存到全局数据
        var app = getApp()
        app.globalData.temperature = res.data.data.datastreams[0];
        app.globalData.temperature.now = 
          res.data.data.datastreams[0].datapoints[1].value;
        app.globalData.light = res.data.data.datastreams[1]
        app.globalData.light.now =
          res.data.data.datastreams[1].datapoints[1].value;
        app.globalData.humidity = res.data.data.datastreams[2]
        console.log(app.globalData.temperature.now);
        console.log(res.data.data.datastreams[0]);
        console.log(app.globalData.light.now);
        console.log(res.data.data.datastreams[1]);
        console.log(app.globalData.light)
  //      //跳转到天气页面，根据拿到的数据绘图
        // wx.navigateTo({
        //   url: '../wifi_station/tianqi/tianqi',
        // })
      },

      fail: function (res) {
        console.log("fail!!!")
      },

      complete: function (res) {
        console.log("end")
      }
    })
  } ,

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
