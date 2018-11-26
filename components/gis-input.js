// components/gis-input.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        propType: {
            type: String,
            value:"lon",
        },
        propDeg: {
            type: Object,
            value() {
                return {
                    deg: '',
                    min: '',
                    sec: '',
                };
            },
            observer(newVal, oldVal, changedPath) {
                let { deg, min, sec } = newVal;
                this.setData({
                    deg,
                    min,
                    sec,
                });
            }
        },
        propHideLabel:{
            type:Boolean,
            value:false,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isLon: true,
        isHideLabel:false,
        labelText: "经度",
        // input
        deg: "", // 度
        min: "", // 分
        sec: "", // 秒
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // v-modal
        changeVal(ev) {
            let {
                target,
                detail
            } = ev;
            let type = target.dataset.type;
            let val = detail.value;
            let isValid = this.detectRange(type, val);
            if (!isValid) {
                val = "";
            }
            this.setData({
                [type]: val,
            });
        },
        detectRange(type, value) {
            let mp = this;
            let latRange = mp.data.isLon ? 180 : 90;
            if (value < 0) return false;
            let val = Math.abs(value);
            let mode = {
                "deg": function(v) {
                    let range = latRange;
                    return v <= range;
                },
                "min": function(v) {
                    let range = 60;
                    return v <= range;
                },
                "sec": function(v) {
                    let range = 60;
                    return v <= range;
                }
            };
            let fn = mode[type];
            if (!fn) return false;
            return fn(val);
        },
        postMsgToParent() {
            let {
                deg,
                min,
                sec
            } = this.data;
            this.triggerEvent("set-coords", {
                deg,
                min,
                sec,
            });
        }
    },
    lifetimes: {
        attached() {
            let coordType = this.properties.propType;
            let isHideLabel=this.properties.propHideLabel;
            let isLon = coordType === "lon";
            let {
                deg,
                min,
                sec
            } = this.properties.propDeg;
            this.setData({
                isLon: isLon,
                isHideLabel: isHideLabel,
                labelText: isLon ? "经度" : "纬度",
                deg,
                min,
                sec,
            });
        }
    }
})