<template>
  <p>
    <input :id="id" v-model="data" type="checkbox" :disabled="disabled" @change="onChange"/>
    <label :for="id" class="active">Deferred</label>
  </p>
</template>

<script>
export default {
  props: [
    'value',
    'label',
    'disabled'
  ],
  data () {
    return {
      id: Math.random().toString(36).slice(2),
      data: this.value
    }
  },
  methods: {
    onChange () {
      this.$emit('input', this.data)
    }
  }
}
</script>
