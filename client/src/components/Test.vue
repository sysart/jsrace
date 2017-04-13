<template>
  <div class="card">
    <div class="card-content">

      <div class="row">
        <div class="col s12 input-field">
          <input v-model="data.test.name" type="text" :disabled="active"/>
          <label class="active" for="test-name">Test name</label>
        </div>
      </div>

      <div class="row">
        <div class="col s12 m8">
          <CodeEditor :disabled="active" v-model="data.test.code"></CodeEditor>
        </div>
        <div class="col s12 m4" v-if="data.result">
          <TestResult :result="data.result"></TestResult>
        </div>
      </div>
    </div>

    <div class="card-action">
      <button
        class="waves-effect waves-light btn red"
        @click="$emit('remove', data.test)"
        :disabled="active"
      >Remove</button>
    </div>
  </div>
</template>

<script>
import CodeEditor from './CodeEditor'
import TestResult from './TestResult'

export default {
  components: {
    CodeEditor,
    TestResult
  },
  props: [
    'data',
    'active'
  ]
}
</script>

<style scoped>
</style>
