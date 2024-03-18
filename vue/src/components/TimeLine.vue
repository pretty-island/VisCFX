<script>
import store from '@/store/store.js'
export default {
  name: "TimeLine",
  data(){
    return{
      indexNum:0,
      interval:1,
      publicHoverIndex: -1,
    }
  },
  props: {
      timelineList: {
        type: Array,
        default: () => {
          return []
        }
      }      
    },
    mounted(){
    this.interval =   setInterval(()=>{
        this.indexNum++
      },1000) //800是自动播放时间
    },
  methods:{
    // 点击时间轴跟着跳转
    getIndex(index){
      console.log(index);
      console.log("store",this.$store.state.nowIndex);
      this.$store.state.nowIndex = index
      window.location.hash = 'cfx/eventMap#text'+index;
      clearInterval(this.interval)
    },
    
    //给每一个生成一个id
    generatedId(i){
      return 'cfx/eventMap#text'+i
    },
    //自动播放
    autoScroll(index){
      window.location.hash = 'cfx/eventMap#text'+index;
    },
  },
  watch:{
    indexNum(newVal,oldVal){
     this.autoScroll(newVal)
    },
    "$store.state.flag"(newVal,oldVal){
      clearInterval(this.interval)
    }
  }
};

</script>
<template>
  <div class="TimeLineContainer">
    <div class="title">陈峰仙大事记</div>
    <el-timeline>
      <el-timeline-item  placement="top" :timestamp="(t.发生日期+'    '+t.地点)" v-for="(t, index) in timelineList" :key="index" :id="generatedId(index)" @click="getIndex(index)" >
        <el-card :class="publicHoverIndex == index ? 'link-item-hover' : 'link-item-hover-remove'" @mouseover="publicHoverIndex = index" @mouseout="publicHoverIndex = -1"  >
          <p>
            <b><h3>{{t.事件名称}}</h3></b>
            <br/>
          </p>
          
          <p>{{t.事件说明}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style scoped>
.TimeLineContainer {
  padding: 2vw;
}
.link-item-hover {
  background-color: #e5d1ba;
}
.link-item-hover-remove {
  background-color: rgb(241, 226, 209);
}
.title {
  display: table;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.5vw;
}
.el-timeline {
  padding-left: 0;
  height: 70vh;
  overflow: hidden;
  overflow-y: scroll
}
.el-timeline::-webkit-scrollbar{
  width: 10px;
  height: 5px;
}
.el-timeline::-webkit-scrollbar-thumb{
  background: rgb(205, 206, 206);
  border-radius: 5px;
}
.el-timeline::-webkit-scrollbar-corner{
  background: #fff;
}
</style>
