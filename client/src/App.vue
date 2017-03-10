<template>
  <div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">JSRace</span>
        <!-- Add spacer, to align navigation to the right -->
        <div class="mdl-layout-spacer"></div>
        <!-- Navigation. We hide it in small screens. -->
        <nav class="mdl-navigation mdl-layout--large-screen-only">
          <a class="mdl-navigation__link" href="">Link</a>
        </nav>
      </div>
    </header>

    <main class="mdl-layout__content">
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
  .mdl-layout__content {
    padding: 48px 0;
  }

  section.section--center {
    max-width: 860px;
  }

  .mdl-layout__content section {
    position: relative;
    margin-bottom: 48px;
  }
</style>
