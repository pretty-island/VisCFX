<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import relationships from "../data/relationship.json";
import linksdata from "../data/link.json";
import $ from 'jquery';
// window.jQuery = $;
// window.$ = $;
const chart = ref();
onMounted(() => {  
  init();
});
function init() {
//   // 初始化画布
  var myChart = echarts.init(chart.value);
  //点击节点显示标签
  myChart.on("click", {dataType: 'node'}, function (params) {
        $('#infoPanel').css('display','block')
        $("#name").html(params.name);
        $("#intro").html(params.data.des);
        if(params.data.photo==0){
$("#")
        }
        
  });
  // //点击空白关闭标签
  myChart.getZr().on('click', function (event) {
  //   // 没有 target 意味着鼠标/指针不在任何一个图形元素上，它是从“空白处”触发的。
    if (!event.target) {
      $('#infoPanel').css('display','none')
  //       // 点击在了空白处，做些什么。
  //       console.log("11111")
    }
  });
  // 处理节点数据
  var data = []
  // console.log(relationships.relationship)
  for(var i of relationships.relationship){
    if(i.图片前缀==null){
      data.push({
      name: i.name,
      des: i.人物简介,      
      symbolSize: 30,
      draggable: true,
      category: 1,  
      photo:0
    })
    }
    else{
      data.push({
      name: i.name,
      des: i.人物简介,
      symbol:`image://${i.图片前缀}${i.图片}`,
      symbolSize: 30,
      draggable: true,
      category: 1,  
      photo: 1
    })
    }    
  }  
  data[0]={
    name: "陈峰仙",
    des: relationships.relationship[0].人物简介,
    symbolSize: 60,
    draggable: true,
    zoom: 1,
    category: 1,
    itemStyle: {
        normal: {
            shadowBlur: 20,
            shadowColor: '#000',
            color: '#F2DAC3',
        }
    }
  }
  // 处理关系数据
  var links = []
  for(var j of linksdata.link){
    links.push({
      source: j.source,
      target: j.target,
      name: j.关系,
      ldes: j.关系说明,
      lineStyle: {
          normal: {
              color: {
                  type: 'linear',
              }
          }
      }
    })
  }
  var option = {
    title: {
      // text: '陈峰仙关系图谱'
    },
    tooltip: {
      trigger: 'item',      
      enterable: true,
      formatter:function(params){
        return params.data.ldes             
        }
    },
    color: ['#83e0ff', '#45f5ce', '#b158ff'],
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',

    series: [
      {
        type: 'graph',
        layout: 'force',
        force: {
          // 节点之间的斥力因子
          repulsion: 200,
          // 边的两个节点之间的距离，
          edgeLength: [90,300],
          // 节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
          // gravity: 0.05,
          // layoutAnimation:true
        },
        symbolSize: 80,
        symbol: 'circle',
        roam: true,
        draggable: true,
        label: {
          normal: {
            show:true,
            position: 'bottom',
            distance: 10,
            color: '#000',
            // 文字字体的风格
            fontStyle: 'normal',
            // 文字字体的粗细
            // fontWeight: 'bold',
            // 文字的字体系列
            fontFamily: 'Microsoft YaHei',
            // 文字的字体大小
            fontSize: 14
            // formatter: '{b}'
          }
        },
        // 边两端的标记大小
        // edgeSymbolSize: [4, 10],        
        edgeLabel: {
            normal: {
                show: true,
                textStyle: {
                    fontSize: 12,
                    color: '#000',
                },
                formatter: function (x) {
                  return x.data.name;
                }
            }
        },
        //连接线的配置
        lineStyle: {
          // color: 'source',
          // curveness: 0
            normal: {
                opacity: 0.3,
                width: 2,
            //     curveness: 0
            }
        },
        itemStyle: {
          normal: {
              // borderColor: '#b1aca6',
      //         borderWidth: 6,
              shadowBlur: 10,
              shadowColor: '#464e56',
              color: '#FAF8F1',
          }
        },
        emphasis: {
          focus: 'none',
          lineStyle: {
            width: 4,
            color: '#fff'
          }
        },
        data: data,
        links: links,
      }
    ]
  };
  myChart.setOption(option, true);
}

</script>

<template>
  <div class="container">
    <div class="theRela">
      <div ref="chart" class="relations">          
      </div>
      <div id="infoPanel" style="position:absolute; top:100px;left:10px;display: none;">
      <div class="infoBox">
        <p align="center">
          <!-- <img  width="150" οnerrοr="this.style.display='none'"/> -->
          <!-- <br/> -->
          <b id="name"></b>
        </p>
        <p align="left" id="intro">          
        </p>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.container {
  display: flex;
}
.theRela {
  flex: 1;
}
.theRela .relations {
  width: 86vw;
  height: 80vh;
}
#infoPanel{
    width: 258px;
    padding: 5px;
    background: #fff2dec9;
}
.infoBox{
  font-size: 9px;
  /* border: 1px; */
}
</style>
