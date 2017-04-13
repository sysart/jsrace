<template>
  <div class="card">
    <div class="card-content">

      <div class="row">
        <div class="col s12 input-field">
          <input v-model="test.name" type="text">
          <label class="active" for="test-name">Test name</label>
        </div>
      </div>

      <CodeEditor v-model="test.code"></CodeEditor>
    </div>

    <div class="card-action">
      <button class="waves-effect waves-light btn red" @click="$emit('remove', test)">Remove</button>
    </div>
  </div>
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
</style>
