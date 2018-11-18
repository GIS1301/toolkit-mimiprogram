//index.js
//获取应用实例
const app = getApp()

const Tool = require("./calc.js");

Page({
    data: {
        lonA: 0,
        latA: 0,
        lonB: 0,
        latB: 0,
        angle: 0,
        dis: 0,
    },
    //事件处理函数
    calcDisAndAngle: function() {
        let {
            lonA,
            latA,
            lonB,
            latB
        } = this.data;
        
        if (!this.isNumber(lonA) || !this.isNumber(latA) || !this.isNumber(lonB) || !this.isNumber(latB)) {
            return wx.showModal({
                title: '提示',
                content: '请输入合法数字',
                complete:()=> {
                    this.resetCalcResult();
                },
            });
        }

        if (lonA === 0 && latA === 0 && lonB === 0 && latB === 0) {
            return wx.showModal({
                title: '提示',
                content: '无效输入',
                showCancel: false,
            });


        }
        let angle = Tool.getAngleBetweenTwoPoints(lonA, latA, lonB, latB);
        let dis = Tool.getDistanceBetweenTwoPoints(lonA, latA, lonB, latB);
        this.setData({
            angle,
            dis,
        });
    },
    resetCalcResult: function() {
        this.setData({
            lonA: 0,
            latA: 0,
            lonB: 0,
            latB: 0,
            angle: 0,
            dis: 0,
        });
    },
    changeInput: function({
        detail,
        target
    }) {
        let {
            value
        } = detail;
        let {
            key
        } = target.dataset;
        this.setData({
            [key]: value,
        });
    },
    isNumber: function(val) {
        return +val == val;
    },
    onLoad: function() {

    },
})