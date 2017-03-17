<template>
  <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
    <div class="mdl-card mdl-cell mdl-cell--12-col">
      <div class="mdl-card__supporting-text">
        <div class="mdl-textfield mdl-js-textfield">
          <input v-model="test.name" class="mdl-textfield__input" type="text">
          <label class="mdl-textfield__label" for="test-name">Test name</label>
        </div>
        <CodeEditor v-model="test.code"></CodeEditor>
      </div>
    </div>
  </section>
</template>

<script>
import CodeEditor from './CodeEditor'

export default {
  name: 'test',
  components: {
    CodeEditor
  },
  props: ['test']
}
</script>

<style>
</style>
