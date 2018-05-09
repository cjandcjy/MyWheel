        
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('map'));

        // geoCoordMap

        var fetchData = function(){
            let url = 'http://test.yun.sogou/api/script/speech_data.php?stime=201804042100&etime=201804042105'

            return new Promise((resolve,reject) => {
                let xhr = new XMLHttpRequest()

                let handler = function(){
                    if(this.readyState != 4){
                        return 
                    }
                    if(xhr.status === 200){
                        resolve(xhr.response)
                    }else{
                        reject("fetch data error : ",this.statusText)
                    }
                }
                xhr.open('GET',url)
                xhr.setRequestHeader("Accept","application/json")
                xhr.setRequestHeader("origin","test.yun.sogou")
                xhr.onreadystatechange = handler
                xhr.responseType = 'json'
                xhr.send()
            })
        }

        
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push(geoCoord.concat(data[i].value));
                }
            }
            return res;
        };
        
         

        // 使用刚指定的配置项和数据显示图表。
        window.onload = function(){
            fetchData().then(data => {
                let options = getOptions(data)
                myChart.setOption(options);
            }).catch(err => {
                console.log(err)
                myChart.setOption(getOptions(backData));
            })
        }
