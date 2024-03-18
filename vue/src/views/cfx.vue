<script setup>
import { RouterLink, RouterView } from "vue-router";

defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="cfxContainer">
    <div class="head">
      <h1>陈峰仙</h1>
      <div class="nav">
        <router-link to="/cfx/eventMap" class="link">轨迹</router-link>
        <router-link to="/cfx/relationship" class="link">关系</router-link>
      </div>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.cfxContainer {
  width: 100%;
  height: 100%;
  background: no-repeat center top / 100% 100%;
  background-image: linear-gradient(
      to top,
      rgba(255, 255, 255, 1),
      rgba(255, 255, 255, 0)
    ),
    url(../assets/letter.png);
}

.head {
  display: flex;
  margin: 0 5vw;
  margin-bottom: 1vh;
  padding: 1.5vh 10vw;
  justify-content: flex-end;
  align-items: center;
  color: #fff;
  background-color: rgba(131, 126, 126, 0.614);
}
.head h1 {
  flex: 1;
  font-size: 8vh;
  font-weight: 600;
  letter-spacing: 2vw;
}
.head .nav .link {
  margin-right: 2vw;
  font-size: 3.5vh;
  color: #fff;
}

.main {
  margin: 0 5vw;
  background-color: rgb(248, 245, 236);
}
</style>
