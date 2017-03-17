<template>
  <section class="mdc-layout-grid">
    <div class="mdc-card mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
      <div class="mdc-card__supporting-text">
        <div class="mdc-textfield mdc-js-textfield">
          <input v-model="test.name" class="mdc-textfield__input" type="text">
          <label class="mdc-textfield__label" for="test-name">Test name</label>
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
