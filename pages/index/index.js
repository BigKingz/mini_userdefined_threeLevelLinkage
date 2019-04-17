//index.js
//获取应用实例
const app = getApp()
//引入本地json数据，这里引入的就是第一步定义的json数据
var cityData = require('../../data/city.js');
console.log(cityData);
Page({
  data: {
    multiArray: [],
    multiIndex: [0, 0, 0]
  },
  onLoad: function () {
    var that = this;
        var temp = cityData.data;
        var p = temp.findIndex(itemp => { return itemp.value == 15 }); //山东省赋值
        console.log(temp[p].children);
        var ca = temp[p].children;
        var c = ca.findIndex(itemc => { return itemc.value == 135}); //济南市赋值
        var da = ca[c].children;
        var d = da.findIndex(itemd => { return itemd.value == 1226});//天桥区赋值
        //初始化更新数据
        that.setData({
          provinces: temp,
          multiArray: [temp, ca, da],
          multiIndex: [p, c, d]
        }) 
  },
  bindMultiPickerChange(e) {
    console.log(e);
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange(e) {
    console.log(e);
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value)
    const data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    }
    data.multiIndex[e.detail.column] = e.detail.value
    //如果更新的是第一列“省”，第二列“市”和第三列“区”的数组下标置为0
    if (e.detail.column == 0) {
      data.multiIndex = [e.detail.value, 0, 0];
    } else if (e.detail.column == 1) {
      //如果更新的是第二列“市”，第一列“省”的下标不变，第三列“区”的数组下标置为0
      data.multiIndex = [data.multiIndex[0], e.detail.value, 0];
    } else if (e.detail.column == 2) {
      //如果更新的是第三列“区”，第一列“省”和第二列“市”的值均不变。
      data.multiIndex = [data.multiIndex[0], data.multiIndex[1], e.detail.value];
    }
    var temp = this.data.provinces;
    data.multiArray[0] = temp;
    if ((temp[data.multiIndex[0]].children).length > 0) {
      //如果第二列“市”的个数大于0,通过multiIndex变更multiArray[1]的值
      data.multiArray[1] = temp[data.multiIndex[0]].children;
      var areaArr = (temp[data.multiIndex[0]].children[data.multiIndex[1]]).children;
      //如果第三列“区”的个数大于0,通过multiIndex变更multiArray[2]的值；否则赋值为空数组
      data.multiArray[2] = areaArr.length > 0 ? areaArr : [];
    } else {
      //如果第二列“市”的个数不大于0，那么第二列“市”和第三列“区”都赋值为空数组
      data.multiArray[1] = [];
      data.multiArray[2] = [];
    }
    //data.multiArray = [temp, temp[data.multiIndex[0]].citys, temp[data.multiIndex[0]].citys[data.multiIndex[1]].areas];
    //setData更新数据
    this.setData(data);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
  
})
