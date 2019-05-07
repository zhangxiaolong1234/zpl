<script src="../../../resize.js"></script>
<template>
    <div id="app">
      <router-view/>
    </div>
</template>

<script>
  import resize from './js/resize';
export default {
  name: 'App',
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    color: #333;
    font-weight: 400;
    font-family: Microsoft Yahei;
    box-sizing: border-box;
  }
  html,body {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
  }
  #app {
    width: 100%;
    height: 100%;
  }
</style>
