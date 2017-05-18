<template>
  <div id="app">
    <nav>
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
.container {
  padding-bottom: 50px;
}

.row:last-child {
  margin-bottom: 0;
}
</style>
