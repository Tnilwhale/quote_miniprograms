// pages/store_operation_update/store_operation_update.js

const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:[],
    img:[],
    img2:[],
    name:"",
    price:"",
    detail:"",
    id:""
  },
  delete_product:function(e){
    let that = this
    db.collection('product').doc(that.data.id).remove({
      success: function(res) {
        console.log('删除成功',res.data)
        wx.cloud.deleteFile({
          fileList: that.data.img,
          success: res => {
            // handle success
            console.log(res.fileList)
          },
          fail: err => {
            // handle error
          },
        })
        wx.redirectTo({
          url: '../store_operation_gl/store_operation_gl',
        })
      }
    })
  },
  // 上传图片1
  upload_img:function(){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        console.log("当前时间戳为：" + timestamp);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath: 'product/'+timestamp+'.png',
          filePath: tempFilePaths[0], // 文件路径
          success: function(res) {
            // get resource ID
            console.log(res.fileID)
            that.setData({
              img:that.data.img.concat(res.fileID)
            })
          },
          fail: function(res) {
            // handle error
          }
        })
      }
    })
  },
  // 删除图片
  // 删除数组中指定下标
  delete: function (e) {
    let that = this
    console.log(that.data.img)
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id;
    var img= that.data.img;
    img.splice(id,1)
    that.setData({
      img: img
    })
    wx.cloud.deleteFile({
      fileList: [e.currentTarget.dataset.src],
      success: res => {
        // handle success
        console.log(res.fileList)
      },
      fail: err => {
        // handle error
      },
    })
    console.log(that.data.img)
  },

      // 上传图片2
      upload_img2:function(){
        let that = this
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success (res) {
            var timestamp2 = Date.parse(new Date());
            timestamp2 = timestamp2 / 1000;
            console.log("当前时间戳为：" + timestamp2);
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths2 = res.tempFilePaths
            console.log(tempFilePaths2)
            wx.cloud.uploadFile({
              cloudPath: 'product/'+timestamp2+'.png',
              filePath: tempFilePaths2[0], // 文件路径
              success: function(res) {
                // get resource ID
                console.log(res.fileID)
                that.setData({
                  img2:that.data.img2.concat(res.fileID)
                })
              },
              fail: function(res) {
                // handle error
              }
            })
          }
        })
      },
      // 删除图片2
      // 删除数组中指定下标
      delete2: function (e) {
        let that = this
        console.log(that.data.img2)
        console.log(e.currentTarget.dataset.id)
        var id = e.currentTarget.dataset.id;
        var img2= that.data.img2;
        img2.splice(id,1)
        that.setData({
          img2: img2
        })
        wx.cloud.deleteFile({
          fileList: [e.currentTarget.dataset.src],
          success: res => {
            // handle success
            console.log(res.fileList)
          },
          fail: err => {
            // handle error
          },
        })
        console.log(that.data.img2)
      },

      
  submit:function(e){
    let that = this
    console.log(e)
    if(e.detail.value.name!==""&&e.detail.value.price!==""&&e.detail.value.category!==""&&e.detail.value.detail!==""&&that.data.img.length!==0&&that.data.img2.length!==0){
      db.collection('product').doc(that.data.id).update({
        data:{
          name:e.detail.value.name,
          price:e.detail.value.price,
          category:e.detail.value.category,
          detail:e.detail.value.detail,
          src:that.data.img,
          num:0,
          product_detail_src:that.data.img2
        },success:function(res){
          wx.showToast({
            title: '提交成功',
          })
          wx.redirectTo({
            url: '../store_operation_update/store_operation_update',
          })
        }
      })
    }else{
      wx.showToast({
        title: '您还有未填信息',
        icon:"none"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      id:options.id
    })
    db.collection('category').get({
      success:function(res){
        console.log('分类获取成功',res)
        that.setData({
          category:res.data
        })
      },fail:function(res){
        console.log('分类获取失败',res)
      }
    })
    db.collection('product').doc(options.id).get({
      success:function(res){
        console.log('信息获取成功',res)
        that.setData({
          name:res.data.name,
          price:res.data.price,
          detail:res.data.detail,
          img2:res.data.product_detail_src,
          img:res.data.src,
        })
      },fail:function(res){
        console.log('信息获取失败',res)
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
    let that = this
    wx.redirectTo({
      url: '../store_operation_update/store_operation_update',
    })
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