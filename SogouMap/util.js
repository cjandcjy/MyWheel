let getOptions = function(data){
    return {
        title: {
            text: '全国主要城市空气质量',
            subtext: 'data from PM25.in',
            sublink: 'http://www.pm25.in',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        backgroundColor: '#404a49',
        visualMap: {
            min: 0,
            max: 500,
            splitNumber: 4,
            inRange: {
                color: ['#d94e5d','#eac736','#50a3ba'].reverse()
            },
            textStyle: {
                color: '#fff'
            }
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series: [{
            name: 'AQI',
            type: 'heatmap',
            coordinateSystem: 'geo',
            data: convertData(data)
        }]
    };
}