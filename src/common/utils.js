const echarts = require('echarts/lib/echarts')

export default {
    /* 获取 echarts 渐变色 */
    getEChartsLinearColors(params={}){
        let ps = params.position || [0,0,0,1]
        return new echarts.graphic.LinearGradient(
            ...ps,
            [
                {offset: 0, color: params.colors[0] },
                {offset: 1, color: params.colors[1] }
            ]
        )
    },
    /* 时间格式化 */
    formatFixedDate(date, fmt) {
        if(typeof date === 'number') {
            date = new Date(date)
        }
        if(!(date instanceof Date)) {
            return ''
        }
        var o = {
            "M+" : date.getMonth()+1, //月份
            "d+" : date.getDate(), //日
            "h+" : date.getHours()%12 === 0 ? 12 : date.getHours()%12, //小时
            "H+" : date.getHours(), //小时
            "m+" : date.getMinutes(), //分
            "s+" : date.getSeconds(), //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S" : date.getMilliseconds() //毫秒
        }
        var week = {
            "0" : "日",
            "1" : "一",
            "2" : "二",
            "3" : "三",
            "4" : "四",
            "5" : "五",
            "6" : "六"
        }
        if(/(y+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length))
        }
        if(/(E+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "星期" : "周") : "")+week[date.getDay()+""])
        }
        for(var k in o){
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)))
            }
        }
        return fmt
    },
    /* 生成随机颜色 */
    getRandomColors(){
        let r = Math.floor(Math.random()*255)
        let g = Math.floor(Math.random()*255)
        let b = Math.floor(Math.random()*255)
        return `rgba(${r},${g},${b},1)`
    },
    /* 数字格式化 */
    numberFormat(n){
        return (n+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,')
    },
    /* 设置 cookie */
    setCookie(name, value, params={}) {
        var stringifiedAttributes = '';

        // 过期时间
        if (typeof params.expires === 'number') {
            var date = new Date();
            date.setDate(date.getDate() + params.expires);
            stringifiedAttributes +=';expires=' + date;
        }

        // path
        var path = params.path ? params.path : '/';
        stringifiedAttributes +=';path=' + path;

        // domain
        if (params.domain) {
            stringifiedAttributes +=';domain=' + params.domain;
        }

        document.cookie = name + '=' + value + stringifiedAttributes;
    },
    /* 获取 cookie */
    getCookie(name) {
        var arr = document.cookie.replace(/\s/g, "").split(';');
        for (var i = 0; i < arr.length; i++) {
            var tempArr = arr[i].split('=');
            if (tempArr[0] === name) {
                return decodeURIComponent(tempArr[1]);
            }
        }
        return '';
    },
    /* 删除 cookie */
    removeCookie(name, params={}) {
        // 设置已过期，系统会立刻删除cookie
        params.expires = -1;
        this.setCookie(name, '', params);
    },

}