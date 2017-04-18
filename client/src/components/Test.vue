<template>
  <div class="card">
    <div class="card-content">

      <div class="row">
        <div class="col s12 input-field">
          <input :id="nameInputId" v-model="data.test.name" type="text" :disabled="active"/>
          <label :for="nameInputId" class="active">Test name</label>
        </div>
        <div class="col s12">
          <p>
            <input :id="deferInputId" v-model="data.test.defer" type="checkbox" :disabled="active"/>
            <label :for="deferInputId" class="active">Deferred</label>
          </p>
        </div>
      </div>

      <div class="row">
        <div class="code-col col s12" :class="{'m8': data.result}">
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
  ],
  data () {
    return {
      nameInputId: Math.random().toString(36).slice(2),
      deferInputId: Math.random().toString(36).slice(2)
    }
  },
  watch: {
    'data.test.defer' (newVal, oldVal) {
      if (newVal && this.data.test.code.indexOf('deferred') === -1) {
        this.data.test.code += '\ndeferred.resolve(); // resolve deferred to mark it completed'
      }
    }
  }
}
</script>

<style scoped>
  .code-col {
    transition: width 0.5s;
  }
</style>
