<template>
  <section class="mdc-layout-grid">
    <div class="mdc-card mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
      <div class="mdc-card__supporting-text">
        <div class="mdc-textfield mdc-js-textfield">
          <input v-model="test.name" class="mdc-textfield__input" type="text">
          <label class="mdc-textfield__label" for="test-name">Test name</label>
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
