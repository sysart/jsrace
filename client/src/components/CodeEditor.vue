<template>
  <codemirror :value="value" @input="codeChanged" :options="editorOption"></codemirror>
</template>

<script>
import { codemirror } from 'vue-codemirror'

export default {
  components: {
    codemirror
  },
  props: [
    'value'
  ],
  data () {
    return {
      editorOption: {
        lineNumbers: true,
        line: true,
        mode: 'text/javascript',
        matchBrackets: true,
        theme: 'monokai'
      }
    }
  },
  methods: {
    codeChanged (code) {
      this.$emit('input', code)
    }
  }
}
</script>
