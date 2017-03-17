<template>
  <section class="mdc-card">
    <div class="mdc-card__supporting-text">
      <div class="mdc-textfield mdc-js-textfield">
        <input v-model="test.name" class="mdc-textfield__input" type="text">
        <label class="mdc-textfield__label" for="test-name">Test name</label>
        <button @click="$emit('remove', test)">Remove</button>
      </div>
      <CodeEditor v-model="test.code"></CodeEditor>
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

<style scoped>
  .mdc-card {
    margin-bottom: 32px;
  }
</style>
