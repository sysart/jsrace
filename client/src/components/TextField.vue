<template>
  <div class="input-field">
    <input
      v-if="multiline === undefined"
      :id="id"
      type="text"
      v-model="data"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />
    <textarea
      class="materialize-textarea"
      v-if="multiline !== undefined"
      :id="id"
      v-model="data"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    ></textarea>
    <label
      :for="id"
      v-text="label"
      :class="{ active: active }"
    ></label>
  </div>
</template>

<script>
export default {
  props: [
    'value',
    'label',
    'disabled',
    'multiline'
  ],
  data () {
    return {
      id: Math.random().toString(36).slice(2),
      focused: false,
      data: this.value
    }
  },
  computed: {
    active () {
      return this.focused || this.data
    }
  },
  methods: {
    onInput () {
      this.$emit('input', this.data)
    },
    onFocus () {
      this.focused = true
    },
    onBlur () {
      this.focused = false
    }
  }
}
</script>
