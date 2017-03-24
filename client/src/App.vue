<template>
  <div id="app">
    <nav class="light-blue">
      <div class="nav-wrapper container">
        <a href="#" class="brand-logo center">JsRace</a>
      </div>
    </nav>

    <main class="container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  @import "../node_modules/materialize-css/dist/css/materialize.min.css";
</style>
