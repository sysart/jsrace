<template>
  <codemirror :value="code" @input="codeChanged" :options="editorOptions"></codemirror>
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
      editorOptions: {
        lineNumbers: true,
        line: true,
        mode: {
          name: 'javascript',
          json: true
        },
        matchBrackets: true,
        theme: 'monokai',
        lint: {
          asi: true,
          esversion: 6
        },
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-lint-markers']
      }
    }
  },
  computed: {
    code () {
      return this.value || ''
    }
  },
  methods: {
    codeChanged (code) {
      this.$emit('input', code)
    }
  }
}
</script>
