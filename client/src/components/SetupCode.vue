<template>
  <div v-if="testcase.data.setup !== undefined">
    <div class="card">
      <div class="card-content">
        <span class="card-title">Setup code</span>
        <CodeEditor v-model="testcase.data.setup"></CodeEditor>
      </div>
      <div class="card-action">
        <button class="waves-effect waves-light btn red" @click="removeSetupCode">Remove</button>
      </div>
    </div>
  </div>

  <div v-else class="center-align">
    <button @click="addSetupCode" class="waves-effect waves-light btn green">
      Add Setup Code
    </button>
  </div>
</template>

<script>
import Vue from 'vue'
import CodeEditor from './CodeEditor'

export default {
  components: {
    CodeEditor
  },

  props: ['testcase'],

  methods: {
    addSetupCode () {
      Vue.set(this.testcase.data, 'setup', '')
    },

    removeSetupCode () {
      Vue.delete(this.testcase.data, 'setup')
    }
  }
}
</script>
