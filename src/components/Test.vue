<template>
  <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
    <div class="mdl-card mdl-cell mdl-cell--12-col">
      <div class="mdl-card__title">
        <h2 class="mdl-card__title-text">Test 1</h2>
      </div>
      <div class="mdl-card__supporting-text">
        <div class="mdl-textfield mdl-js-textfield">
          <input class="mdl-textfield__input" type="text" id="test-name">
          <label class="mdl-textfield__label" for="test-name">Test name</label>
        </div>

        <codemirror :code.sync="code" :options="editorOption"></codemirror>
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
  data () {
    return {
      code: 'Write your test here...',
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
