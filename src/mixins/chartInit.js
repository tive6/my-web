import BiHeader from './../components/biHeader'
import Utils from './../common/utils'

export default {
    components: {
        BiHeader,
    },
    data () {
        return {
            chartOpts: {},
            chartObjs: {},
            list: {},
            allRes: {},
            lineStyle: {
                lineStyle: {
                    color: 'rgba(200,200,200,0.1)',
                    width: 1,
                    type: 'solid'
                },
            },
            lineDark: {
                lineStyle: {
                    color: '#2E4466',
                    width: 1,
                    type: 'solid'
                },
            },
            textStyle: {
                textStyle: {
                    color: '#333',
                },
            },
            linesStyle: {
                lineStyle: {
                    width: 2,
                }
            },
            axisPointer: {
                axisPointer: {
                    lineStyle: {
                        color: '#D5DFFF',
                        type: 'dashed',
                    },
                },
            },
        }
    },
    mounted () {
        // 获取 chart 实例
        this.getChartsObj()
        // 获取 chart option 对象
        this.setOptions()
        // 初始化 chart
        this.initCharts()
    },
    destroyed () {
        this.els.map(id=>{
            this.chartObjs[id].clear()
            this.chartObjs[id].dispose()
        })
        // this.wmNode && this.wmNode.removeSvgBg()
    },
    methods: {
        getChartsObj(){
            // echarts 实例化
            /*
            下载或复制以下的主题保存至 *.json 文件；
            读取该 JSON 文件，并使用 obj = JSON.parse(data) 将其转换成对象；
            调用 echarts.registerTheme('walden', obj) 注册主题；
            使用 echarts.init(dom, 'walden') 创建图表，第二个参数即为刚才注册的主题名字。
            */
            // let theme = JSON.stringify(walden)
            // console.log(theme)
            // this.$echarts.registerTheme('walden', waldenTheme)
            this.els.map(id=>{
                let item = `${this.chartsIdPrefix}${id}`
                this.chartObjs[id] = this.$echarts.init(document.getElementById(item))
                // this.chartObjs[i+1+''] = this.$echarts.init(document.getElementById(item), 'walden')
            })
        },
        initCharts() {
            this.els.map(id=>{
                this.chartObjs[id].setOption(this.chartOpts[id])
            })
        },
        initChartsOption(){ // 初始化更新
            this.els.map(id=>{
                let charts = this.chartObjs[id]
                try {
                    // console.log(`执行到：${n}`)
                    charts.clear()
                    charts.setOption(this.chartOpts[id])
                } catch (e) {
                    console.log(`错误：init--id：${id}：${e}`)
                }
                this.chartObjs[id].setOption(this.chartOpts[id])
            })
        },
        numFormat(val){
            return (val/10000).toFixed(1)
        },
        numberFormat(n){
            return Utils.numberFormat(n)
        },
        formatter(val, index) {
            // console.log(val)
            let date = new Date(val)
            let day = date.getDate()
            let month = date.getMonth()+1
            // console.log(day)
            if (+day===1 || index===0) {
                return `${month}/${day}`
            } else {
                return `${day}`
            }
        },
        yAxisFormat(n) {
            return +n===0?0:(+n/10000).toFixed(1)+'万'
        },
        yAxisWanFormat(n) {
            return +n>=10000 && (+n/10000).toFixed(2)+'万' ||  this.numberFormat(+n)
        },

    }
}

