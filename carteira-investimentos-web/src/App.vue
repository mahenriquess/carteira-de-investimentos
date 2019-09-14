<template>
  <div>
    <Navbar />
    <b-container id="app">
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>

import Navbar from './components/Navbar';
import client from './configs/client';

client.defaults.headers['Access-Control-Allow-Origin'] = '*';

export default {
    components: {Navbar},
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
