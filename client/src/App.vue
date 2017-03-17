<template>
  <div id="app">
    <header class="mdc-toolbar mdc-toolbar--fixed">
      <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
        <!-- Title -->
        <span class="mdc-toolbar__title">JSRace</span>
      </section>
    </header>

    <main class="mdc-toolbar-fixed-adjust">
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
  @import "../node_modules/material-components-web/dist/material-components-web.min.css";

  .mdl-layout__content {
    padding: 48px 0;
  }

  main {
    max-width: 860px;
    margin: 0 auto;
  }
</style>
