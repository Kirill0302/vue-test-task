<template>
  <div id="app"></div>
  <div id="nav">
    <router-link to="/">Desktop</router-link> |
    <router-link to="/blockchain">Blockchain</router-link>
  </div>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
