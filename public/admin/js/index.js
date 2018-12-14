$(function () {
    barCharts()
    pieCharts()
});
var barCharts = function () {
    // 1 引入echarts.js 文件
    // 2 找到画图容器

    var box = document.querySelector('.picTable:first-child');
    /*3.初始化插件*/
    var myChart = echarts.init(box);
    var chartsData = [{
        name: '1',
        value: 123
    }]
    var optX = [],
        optY = []
    chartsData.forEach(item => {
        optX.push(item.name)
        optY.push(item.value)
    })
    var option = {
        title: [{
            text: '2018年注册人数'
        }],
        legend: [{
            data: ['注册人数']
        }],
        color: ['#3398DB'],
        tooltip: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '注册人数',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
        }]
    };
    option.xAxis[0].data = optX
    option.series[0].data = optY
    myChart.setOption(option);
}
// 饼状图
var pieCharts = function () {
    var box1 = document.querySelector('.picTable:last-child');
    /*3.初始化插件*/
    var myChart = echarts.init(box1);
    var option = {
        title: {
            text: '品牌销售占比',
            subtext: '2017年10月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['李宁', '耐克', '阿迪', '匡威', '回力']
        },
        series: [{
            name: '销售情况',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{
                    value: 335,
                    name: '李宁'
                },
                {
                    value: 310,
                    name: '耐克'
                },
                {
                    value: 234,
                    name: '阿迪'
                },
                {
                    value: 135,
                    name: '匡威'
                },
                {
                    value: 1548,
                    name: '回力'
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    }
    myChart.setOption(option);
}