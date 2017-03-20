<template>
  <section class="row">
    <div class="col s12">
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
          <a href="#" @click="$emit('remove', test)">Remove</a>
        </div>
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

<style scoped>
</style>
