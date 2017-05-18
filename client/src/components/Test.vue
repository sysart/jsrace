<template>
  <div class="card">
    <div class="card-content">
      <div class="row">
        <div class="col s12">
          <TextField label="Test name" v-model="data.test.name" :disabled="active"/>
          <CheckBox label="Deferred" v-model="data.test.defer" :disabled="active"/>
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
      <ActionButton @click="$emit('remove', data.test)" :disabled="active">
        <i class="material-icons left">delete</i>
        Remove
      </ActionButton>
    </div>
  </div>
</template>

<script>
import CodeEditor from './CodeEditor'
import TestResult from './TestResult'
import TextField from './TextField'
import CheckBox from './CheckBox'
import ActionButton from './ActionButton'

export default {
  components: {
    CodeEditor,
    TestResult,
    TextField,
    CheckBox,
    ActionButton
  },
  props: [
    'data',
    'active'
  ],
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
