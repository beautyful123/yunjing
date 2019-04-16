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

<style lang='scss'>
 #app {
  height: 100vh;
  background: #e3e1e1
}
.som-radio .som-list-item__hd {
    width: 0;
    padding-right: 0;
    box-sizing: border-box
}
.som-radio--button .som-list-item__ft.som-list-item__ft{
  margin-right:0.8rem;
}
</style>
