<template>
  <transition name="block-transition">
    <slot></slot>
  </transition>
</template>

<style scoped>
  .block-transition-enter-active {
    transition: max-height 0.5s;
    overflow-y: hidden;
  }

  .block-transition-enter {
    max-height: 0;
  }

  .block-transition-enter-to {
    max-height: 500px;
  }
</style>
