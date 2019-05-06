<template>
    <div id="app">
      <MyHeader></MyHeader>
      <router-view/>
      <MyFooter></MyFooter>
    </div>
</template>

<script>
import MyHeader from "./components/MyHeader";
import MyFooter from "./components/MyFooter";
export default {
  name: 'App',
  components: {MyFooter, MyHeader}
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  html,body {
    width: 100%;
    height: 100%;
  }
  #app {
    width: 100%;
    height: 100%;
  }
</style>
