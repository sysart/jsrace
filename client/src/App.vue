<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper container">
        <a href="#" class="brand-logo">JsRace</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="#">AwwYiss</a></li>
        </ul>
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
