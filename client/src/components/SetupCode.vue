<template>
  <div>
    <BlockTransition>
      <div v-if="testcase.data.setup !== undefined">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Setup code</span>
            <p>This is ran before every test run. Inside tests you can access variables and functions defined here.</p>
            <CodeEditor v-model="testcase.data.setup"></CodeEditor>
          </div>
          <div class="card-action">
            <ActionButton @click="removeSetupCode" :disabled="active">
              <i class="material-icons left">delete</i>
              Remove
            </ActionButton>
          </div>
        </div>
      </div>
    </BlockTransition>

    <div v-if="testcase.data.setup === undefined" class="center-align">
      <ActionButton @click="addSetupCode" :disabled="active">Add Setup Code</ActionButton>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import CodeEditor from './CodeEditor'
import BlockTransition from './BlockTransition'
import ActionButton from './ActionButton'

export default {
  components: {
    CodeEditor,
    BlockTransition,
    ActionButton
  },

  props: [
    'testcase',
    'active'
  ],

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
