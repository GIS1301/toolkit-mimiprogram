Page({
    data: {
        lat: 0, // 纬度
        lon: 0,
    },
    onLoad(opts) {
        console.log(opts);
    },
    onShow() {
        let mp=this;
        // wx.getStorage({
        //     key: 'yan-pos',
        //     success: function({data}) {
        //         mp.setData({
        //             polyline: [{
        //                 points:data,
        //                 color: "#ff0022",
        //                 width: 2,
        //                 dottedLine: true
        //             }]
        //         },function () {
        //             // 缩放视野
        //             let map = wx.createMapContext('yanMap', this);
        //             map.includePoints({
        //                 points: mp.data.polyline[0].points,
        //             });
        //         });
        //     },
        // })
    }
})