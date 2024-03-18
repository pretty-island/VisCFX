<script setup></script>

<template>
  <router-link :to="{ path: '/cfx' }">
    <div class="greet">
      <div class="left">走近</div>
      <div class="selfScale">
        <img src="../assets/envelope.png" class="envelope" />
      </div>
      <div class="right">陈峰仙</div>
    </div>
  </router-link>
</template>

<style scoped>
.greet {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: rgb(189, 175, 160);
  box-shadow: inset 20vw 0 12vw 0 rgba(0, 0, 0, 0.4),
    inset -20vw 0 12vw 0 rgba(0, 0, 0, 0.4);
}
.left {
  flex: 1 1 33.33%;
  align-self: center;
  padding-left: 10vw;
  text-align: center;
  font-weight: 500;
  font-size: 5vw;
  letter-spacing: 2vw;
}

.selfScale {
  cursor: pointer;
  flex: 1 1 33.33%;
  overflow: hidden;
  position: relative;
}
.envelope {
  width: 100%;
  margin-top: -10vh;
}

.right {
  flex: 1 1 33.33%;
  align-self: center;
  padding-right: 2vw;
  text-align: center;
  font-weight: 500;
  font-size: 5vw;
  letter-spacing: 2vw;
}
</style>
