<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import  '~vux/src/styles/reset.less';
@import  './assets/css/common.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #F6F8FE;
  min-height: 100vh;
  width: 100%;
}
*{
  box-sizing: border-box;
}
input,
textarea {
    border: 0; /* 方法1 */
    -webkit-appearance: none; /* 方法2 */
}
</style>
