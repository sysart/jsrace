<template>
  <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
    <div class="mdl-card mdl-cell mdl-cell--12-col">
      <div class="mdl-card__supporting-text">
        <div class="mdl-textfield mdl-js-textfield">
          <input v-model="test.name" class="mdl-textfield__input" type="text">
          <label class="mdl-textfield__label" for="test-name">Test name</label>
        </div>

        <codemirror v-model="test.code" :options="editorOption"></codemirror>
      </div>
    </div>
  </section>
</template>

<script>
import { codemirror } from 'vue-codemirror'

export default {
  name: 'test',
  components: {
    codemirror
  },
  props: ['test'],
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
  }
}
</script>

<style>
</style>
