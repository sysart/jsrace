<template>
  <div></div>
</template>

<script>
window.JSHINT = require('jshint').JSHINT
const CodeMirror = window.CodeMirror = require('codemirror/lib/codemirror.js')
require('codemirror/lib/codemirror.css')
require('codemirror/mode/javascript/javascript.js')
require('codemirror/theme/monokai.css')
require('codemirror/addon/selection/active-line.js')
require('codemirror/addon/selection/mark-selection.js')
require('codemirror/addon/lint/lint.js')
require('codemirror/addon/lint/javascript-lint.js')

require('codemirror/addon/lint/lint.css')

export default {
  props: [
    'value'
  ],
  data () {
    return {
      editorOptions: {
        value: this.value,
        autofocus: false,
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
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-lint-markers'],
        inputStyle: 'contenteditable'
      }
    }
  },
  watch: {
    value (newVal, oldVal) {
      const editorValue = this.editor.getValue()
      if (newVal !== editorValue) {
        this.editor.setValue(newVal)
      }
    }
  },
  methods: {
    codeChanged (code) {
      this.$emit('input', code)
    }
  },
  mounted () {
    this.editor = new CodeMirror(this.$el, this.editorOptions)

    this.editor.on('change', (cm) => {
      this.$emit('input', cm.getValue())
    })
  },
  beforeDestroy () {
    this.editor.doc.cm.getWrapperElement().remove()
  }
}
</script>
