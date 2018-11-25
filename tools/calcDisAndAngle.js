class Tool {
    static RADIUS_EARTH_METER = 6378137; //WGS1984坐标系： 6378137.0，这个值应该是地球半径，根据坐标系不同也不同

    /**
     * 计算两个坐标之间的方位角
     * @param lon1 坐标1的经度
     * @param lat1 坐标1的纬度
     * @param lon2 坐标2的经度
     * @param lat2 坐标2的纬度
     * @return
     */
    static getAngleBetweenTwoPoints(lon1, lat1, lon2, lat2) {
        let dx = 0,
            dy = 0,
            angle = 0;
        dx = lat2 - lat1;
        dy = lon2 - lon1;
        if (lat2 == lat1) {
            angle = Math.PI / 2.0;
            if (lon2 == lon1) {
                angle = 0.0;
            } else if (lon2 < lon1) {
                angle = 3.0 * Math.PI / 2.0;
            }
        } else if ((lat2 > lat1) && (lon2 > lon1)) {
            angle = Math.atan(dx / dy);
        } else if ((lat2 > lat1) && (lon2 < lon1)) {
            angle = Math.PI / 2 + Math.atan(-dy / dx);
        } else if ((lat2 < lat1) && (lon2 < lon1)) {
            angle = Math.PI + Math.atan(dx / dy);
        } else if ((lat2 < lat1) && (lon2 > lon1)) {
            angle = 3.0 * Math.PI / 2.0 + Math.atan(dy / -dx);
        }
        return (angle * 180 / Math.PI);
    }
    /**
     * 计算两个坐标之间的距离
     * @param lon1 坐标1的经度
     * @param lat1 坐标1的纬度
     * @param lon2 坐标2的经度
     * @param lat2 坐标2的纬度
     * @return
     */
    static getDistanceBetweenTwoPoints(lon1, lat1, lon2, lat2) {
        let a = Tool.Rad(lat1) - Tool.Rad(lat2);
        let b = Tool.Rad(lon1) - Tool.Rad(lon2);
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(Tool.Rad(lat1)) * Math.cos(Tool.Rad(lat2)) * Math.pow(Math.sin(b / 2), 2)));
        s = s * Tool.RADIUS_EARTH_METER;
        s = Math.round(s * 10000) / 10000;
        return s;
    }
    static Rad(d) {
        return d * Math.PI / 180.0;
    }
}

module.exports = Tool;