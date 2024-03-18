<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import * as echarts from "echarts";
import mapData from "../data/mapdata.json";
import EventData from "../data/cfxEvent.json";

import TimeLine from "./TimeLine.vue";

//全局变量调用
const store = useStore();
const chart = ref();
onMounted(() => {
  init();
});
function init() {
  // 初始化画布
  var myChart = echarts.init(chart.value);
  echarts.registerMap("china", { geoJSON: mapData });
  //点击时间轴，右边时间轴相应跳转
  myChart.on("click", function (params) {
    if (params.componentType === "timeline") {
      let selectText = "text"+params.dataIndex
      window.location.hash = selectText;
      console.log("store.state.flag ",store.state.flag);
      store.state.flag = store.state.flag +1;
    } 
  });

  //存储事件时间
  var tData = [];
  for (var i of EventData.cfxEvent) {
    tData.push(i.发生日期);
  }
  // 存储所有地点
  var cdata = [];
  var tlcdata = [];
  var ccdata = [];
  for (var i of EventData.cfxEvent) {
    cdata.push({
      name: i.地点,
      // "地图地点":i.地图地点,
      value: i.经纬度,
      title: i.事件名称,
    });
  }

  tlcdata[0] = [];
  tlcdata[0] = [cdata[0]];

  for (var i = 1; i < 36; i++) {
    tlcdata[i] = [];
    tlcdata[i] = [...tlcdata[i - 1], cdata[i]];
  }
  for (var i = 0; i < 36; i++) {
    ccdata.push([cdata[i]]);
  }
  ccdata[35] = tlcdata[35];

  // 存储迁徙地点数据
  var cdt = [];
  var ftdata = [];
  var total = [];
  for (var i of EventData.cfxEvent) {
    cdt.push(i.经纬度);
  }
  ftdata.push([[], []]);
  for (var i = 0; i < cdt.length - 1; i++) {
    ftdata.push([cdt[i], cdt[i + 1]]);
  }
  total[0] = [];
  total[0] = [ftdata[0]];
  for (var i = 1; i < cdt.length; i++) {
    total[i] = [];
    total[i] = [...total[i - 1], ftdata[i]];
  }
  var option = {
    baseOption: {
      timeline: {
        axisType: "category",
        autoPlay: true,
        loop: false,
        playInterval: 1000,
        width: null,
        height: 50,
        data: tData,
        currentIndex: 0,
        label: {
          show: false,
          position: "right",
        },
        itemStyle: {
            color: '#F2DCBB',
        },
        lineStyle:{
          color:"#F2DCBB"
        },
        checkpointStyle: {
          color: '#CC9B6D',
        },
        progress:{
          lineStyle:{
            color:"#CC9B6D",
          },
          itemStyle:{
            color:"#CC9B6D",
          }
        },
        controlStyle:{
          color: "#F2DCBB",
          borderColor: "#F2DCBB"
        },
        emphasis:{
          itemStyle:{
            color:"#CC9B6D"
          },
          controlStyle:{
            color:"#CC9B6D",
            borderColor:"#CC9B6D"
          }

        }
      },
      // 提示框
      tooltip: {
        formatter:function(params){
        return params.name             
        }
      },
      geo: {
        type: "map",
        map: "china",
        roam: true,
        center: [102.97, 34.71],
        geoIndex: 0,
        zoom: 1.56, //地图的比例
        //地图区域的各个省份图形样式
        itemStyle: {
          show: true,
          areaColor: "rgb(247, 242, 226)", //地图区域颜色
        },
        // 高亮地图区域
        emphasis: {
          itemStyle: {
            areaColor: "rgb(246, 233, 192)",
          },
          label: {
            color: "#fff", //选中后的字体颜色
          },
        },
      },
    },
    options: [],
  };

  for (var n = 0; n < cdata.length; n++) {
    option.options.push({
      series: [
        {
          type: "scatter",
          coordinateSystem: "geo",
          color: "#000",
          zlevel: 2,
          symbolSize: 10,

          label: {
            show: true,
            position: "auto",
            formatter: "{b}",
            color: "#000",
            borderWidth: 1,
            padding: 0,
            show: true,
            position: "right",
          },
          labelLayout: {
            moveOverlSap: "shiftY",
            hideOverlap: true,
            align: "left",
            draggable: true,
          },
          data: ccdata[n],
        },
        {
          type: "lines",
          // polyline: true,
          coordinateSystem: "geo",
          // symbol:['','arrow'],
          zlevel: 1,
          effect: {
            // show: true,
            period: 1, //特效动画的时间，单位为 s。
            trailLength: 0.3, //特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长
            scale: 0, //波纹圆环最大限制，值越大波纹越大 ,重要，否则显示越来越多
            symbol: "pin", //箭头图标
            symbolSize: 8, //图标的大小
            color: "#000",
          },
          lineStyle: {
            normal: {
              color: "#ae9473",
              width: 3, //尾迹航线宽度
              opacity: 0.6, //尾迹线条透明度
              curveness: 0.2, //线的弯曲度
            },
          },
          data: total[n],
        },
      ],
    });
  }
  myChart.setOption(option, true);
}
  watch(
    ()=>store.state.nowIndex,
    (newVal,oldVal) =>{

      
      if (myChart != null && myChart != "" && myChart != undefined) {
        myChart.dispose(); //销毁
      }
      var myChart = echarts.init(chart.value);
      echarts.registerMap("china", { geoJSON: mapData });
      //存储事件时间
      var tData = [];
      for (var i of EventData.cfxEvent) {
        tData.push(i.发生日期);
      }
      // 存储所有地点
      var cdata = [];
      var tlcdata = [];
      var ccdata = [];
      for (var i of EventData.cfxEvent) {
        cdata.push({
          name: i.地点,
          // "地图地点":i.地图地点,
          value: i.经纬度,
          title: i.事件名称,
        });
      }

      tlcdata[0] = [];
      tlcdata[0] = [cdata[0]];

      for (var i = 1; i < 36; i++) {
        tlcdata[i] = [];
        tlcdata[i] = [...tlcdata[i - 1], cdata[i]];
      }
      for (var i = 0; i < 36; i++) {
        ccdata.push([cdata[i]]);
      }
      ccdata[35] = tlcdata[35];

      // 存储迁徙地点数据
      var cdt = [];
      var ftdata = [];
      var total = [];
      for (var i of EventData.cfxEvent) {
        cdt.push(i.经纬度);
      }
      ftdata.push([[], []]);
      for (var i = 0; i < cdt.length - 1; i++) {
        ftdata.push([cdt[i], cdt[i + 1]]);
      }
      total[0] = [];
      total[0] = [ftdata[0]];
      for (var i = 1; i < cdt.length; i++) {
        total[i] = [];
        total[i] = [...total[i - 1], ftdata[i]];
      }
      var option = {
        baseOption: {
          timeline: {
            axisType: "category",
            autoPlay: false,
            loop: false,
            playInterval: 1000,
            width: null,
            height: 50,
            data: tData,
            currentIndex: newVal,
            label: {
              show: false,
              position: "right",
            },
        itemStyle: {
            color: '#F2DCBB',
        },
        lineStyle:{
          color:"#F2DCBB"
        },
        checkpointStyle: {
          color: '#CC9B6D',
        },
        progress:{
          lineStyle:{
            color:"#CC9B6D",
          },
          itemStyle:{
            color:"#CC9B6D",
          }
        },
        controlStyle:{
          color: "#F2DCBB",
          borderColor: "#F2DCBB"
        },
        emphasis:{
          itemStyle:{
            color:"#CC9B6D"
          },
          controlStyle:{
            color:"#CC9B6D",
            borderColor:"#CC9B6D"
          }

        }
          },
          // 提示框
          tooltip: {},
          geo: {
            type: "map",
            map: "china",
            roam: true,
            center: [102.97, 34.71],
            geoIndex: 0,
            zoom: 1.56, //地图的比例
            //地图区域的各个省份图形样式
            itemStyle: {
              show: true,
              areaColor: "rgb(247, 242, 226)", //地图区域颜色
            },
            // 高亮地图区域
            emphasis: {
              itemStyle: {
                areaColor: "rgb(246, 233, 192)",
              },
              label: {
                color: "#fff", //选中后的字体颜色
              },
            },
          },
        },
        options: [],
      };

      for (var n = 0; n < cdata.length; n++) {
        option.options.push({
          series: [
            {
              type: "scatter",
              coordinateSystem: "geo",
              color: "#000",
              symbolSize: 10,
              zlevel: 2,
              label: {
                show: true,
                position: "auto",
                formatter: "{b}",
                color: "#000",
                borderWidth: 1,
                padding: 0,
                show: true,
                position: "right",
              },
              labelLayout: {
                moveOverlSap: "shiftY",
                hideOverlap: true,
                align: "left",
                draggable: true,
              },
              data: ccdata[n],
            },
            {
              type: "lines",
              // polyline: true,
              coordinateSystem: "geo",
              zlevel: 1,
              // symbol:['','arrow'],
              effect: {
                // show: true,
                period: 1, //特效动画的时间，单位为 s。
                trailLength: 0.3, //特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长
                scale: 0, //波纹圆环最大限制，值越大波纹越大 ,重要，否则显示越来越多
                symbol: "pin", //箭头图标
                symbolSize: 8, //图标的大小
                color: "#000",
              },
              lineStyle: {
                normal: {
                  color: "#ae9473",
                  width: 3, //尾迹航线宽度
                  opacity: 0.6, //尾迹线条透明度
                  curveness: 0.2, //线的弯曲度
                },
              },
              data: total[n],
            },
          ],
        });
      }
      myChart.setOption(option, true);
    }
  )
</script>

<template>
  <div class="eventMapContainer">
    <div class="theMap">
      <div ref="chart" class="mapBoard"></div>
    </div>
    <div class="theTimeLine">
      <TimeLine :timelineList="EventData.cfxEvent" />
    </div>
  </div>
</template>

<style scoped>
.eventMapContainer {
  display: flex;
}

.theMap {
  flex: 1;
}
.theMap .mapBoard {
  width: 55vw;
  height: 80vh;
}

.theTimeLine {
  flex: 1;
}
</style>
