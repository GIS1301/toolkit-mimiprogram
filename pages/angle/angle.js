// pages/angle/angle.js
const {
    d2dms,
    dms2d
} = require("../../tools/formatAngle.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        deg: '',
        dms: {
            deg: '',
            min: '',
            sec: '',
        },
        isDegFormat: true,
        isShowResult:false,
        uiAngle:"",
    },
    // 复制
    copy2ClipBoard() {
        wx.setClipboardData({
            data: this.data.uiAngle,
        });
    },
    getDegVal(ev) {
        let val = ev.detail.value;

        this.setData({
            deg: val,
        });
    },
    convertAngleFormat() {
        let isDeg2Dms = this.data.isDegFormat;
        let res = '';
        let mp=this;

        if (isDeg2Dms) {
            let deg=+this.data.deg;
            if (!deg) {
                return wx.showModal({
                    title: '提示',
                    content: '请输入合法数字',
                    showCancel: false,
                    success() {
                        mp.resetCalcRes();
                    },
                });
            }
            if (Math.abs(deg) > 180) {
                return wx.showModal({
                    title: '提示',
                    content: '范围超限（-180~180）',
                    showCancel:false,
                    success() {
                        mp.resetCalcRes();
                    },
                });
            }
            res = d2dms(deg);
            this.setData({
                uiAngle: `${res.deg}°${res.min}'${res.sec}''`,
            });
        } else {
            res = dms2d(this.data.dms);
            this.setData({
                uiAngle: `${res}°`,
            });
        }
        this.setData({
            isShowResult:true,
        });
    },
    resetCalcRes() {
        this.setData({
            deg: '',
            dms: {
                deg: '',
                min: '',
                sec: '',
            },
            isShowResult:false,
        });
    },
    formatChange(ev) {
        let val = ev.detail.value;
        this.resetCalcRes();
        this.setData({
            isDegFormat: val,
        });
    },
    setCoords(ev) {
        let {
            detail,
            target
        } = ev;
        if (JSON.stringify(detail) !== JSON.stringify(this.data.dms)) {
            console.count("emit");
            this.setData({
                dms: detail,
            });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})