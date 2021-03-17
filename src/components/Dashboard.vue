<template>
  <div id="app">
        <ul>
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </ul>
    <bar-chart></bar-chart>
    <API></API>
  </div>
</template>

<script>
import BarChart from './charts/BarChart.vue'
import CallAPI from './CallAPI.vue'


export default {
  name: 'app',
  components: {
    BarChart,
    'API': CallAPI
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>