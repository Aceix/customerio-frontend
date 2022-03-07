<script setup lang="ts">
</script>

<template>
<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <div class="row">
      <div class="col-10">
        <router-link class="navbar-brand" to="/">
          <img src="./assets/logo.png" alt="application logo" width="30" height="30" class="d-inline-block align-text-top">
          Hello Customers
        </router-link>
      </div>
      <div class="col text-end">
        <!-- dark/light theme switch -->
      </div>
    </div>

  </div>
</nav>

<router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
