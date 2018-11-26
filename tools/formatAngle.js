// 转换度-》度分秒
module.exports = {
    d2dms(d) {
        let deg = d | 0;
        let temp = (d - deg) * 60;
        let min = temp | 0;
        let sec = (temp - min) * 60;
        return {
            deg,
            min,
            sec,
        };
    },
    // 转换度分秒-》度
    dms2d({
        deg,
        min,
        sec
    }) {
        return (+deg) + (+min) / 60 + (+sec) / 3600;
    }
}