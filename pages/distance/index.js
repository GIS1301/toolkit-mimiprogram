//index.js
//获取应用实例
const app = getApp()

const Tool = require("../../tools/calcDisAndAngle.js");
const {d2dms,dms2d}=require("../../tools/formatAngle.js");

const DEFAULT_DEG=function () {
    return {
        deg: '',
        min: '',
        sec: '',
    };
};
const DEFAULT_ANG ="0°0'0''";

Page({
    data: {
        isShowResult:false,
        lonA: DEFAULT_DEG(),
        latA: DEFAULT_DEG(),
        lonB: DEFAULT_DEG(),
        latB: DEFAULT_DEG(),
        angle: 0,
        dis: 0,
        uiAngle: DEFAULT_ANG,
        copyAngle:'0',
    },
    // 复制
    copy2ClipBoard({target}) {
        let txt=(target.dataset.copy)+"";
        wx.setClipboardData({
            data: txt,
        })
    },
    // 获取坐标
    setCoords(ev) {
        let {
            detail,
            target
        } = ev;
        let key = target.dataset.key;
        if (JSON.stringify(detail) !== JSON.stringify(this.data[key])) {
            console.count("emit");
            this.setData({
                [key]: detail,
            });
        }
    },
    //事件处理函数
    calcDisAndAngle() {
        let {
            lonA,
            latA,
            lonB,
            latB
        } = this.data;

        // 转换成度
        lonA = dms2d(lonA);
        latA = dms2d(latA);
        lonB = dms2d(lonB);
        latB = dms2d(latB);

        if (!this.isNumber(lonA) || !this.isNumber(latA) || !this.isNumber(lonB) || !this.isNumber(latB)) {
            return wx.showModal({
                title: '提示',
                content: '请输入合法数字',
                complete: () => {
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
        let copyAngle = angle;
        // 转成度分秒
        angle=d2dms(angle);
        angle.sec = (+angle.sec).toFixed(5);
        let uiAngle=`${angle.deg}°${angle.min}'${angle.sec}''`;

        this.setData({
            angle,
            dis,
            isShowResult:true,
            copyAngle: copyAngle,
            uiAngle: uiAngle,
        });
    },
    resetCalcResult() {
        this.setData({
            isShowResult:false,
            lonA: DEFAULT_DEG(),
            latA: DEFAULT_DEG(),
            lonB: DEFAULT_DEG(),
            latB: DEFAULT_DEG(),
            angle: 0,
            dis: 0,
            uiAngle: DEFAULT_ANG,
            copyAngle:"0",
        });
    },
    changeInput({
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
    isNumber(val) {
        return +val == val;
    },
    onHide() {
        // 传递数据
        wx.setStorage({
            key: "yan-pos",
            data: [{
                    latitude: dms2d(this.data.latA),
                    longitude:dms2d( this.data.lonA)
                },
                {
                    latitude: dms2d(this.data.latB),
                    longitude: dms2d(this.data.lonB)
                }
            ]
        })
    }
})