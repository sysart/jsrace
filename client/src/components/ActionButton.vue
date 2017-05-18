<template>
  <button class="btn waves-effect waves-light" @click="$emit('click')">
    <slot/>
  </button>
</template>

<script>
export default {
}
</script>
