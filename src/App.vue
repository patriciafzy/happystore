<template>
  <div>
    <h1>{{title}}</h1>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  components: {
    // 'qtyCounter' : QuantityCounter,
    // 'pageContent' : PageContent
  },

  data() {
    return {
      title:'Little Happy Store!',
      counter: 0
    }
  }
}
</script>

<style>
    h1 {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        text-align: center; 
        color: #f08080; 
    }


</style>

