<template>
  <div class="card">
    <div class="card-content">
      <TextField label="Name" v-model="testcase.title" :disabled="active"/>
      <TextField label="Description" v-model="testcase.description" :disabled="active" multiline/>
    </div>

    <div class="card-action">
      <button
        class="waves-effect waves-light btn"
        :disabled="!valid || active"
        :class="{disabled: !valid}"
        @click="$emit('saveTestCase')"
      >
        {{saving ? 'Saving' : 'Save'}}
      </button>
      <button
        class="waves-effect waves-light btn blue"
        @click="$emit('runTests')"
        :disabled="active"
      >
        {{running ? 'Running' : 'Run'}}
      </button>
    </div>
  </div>
</template>

<script>
import TextField from './TextField'

export default {
  components: {
    TextField
  },
  props: [
    'testcase',
    'valid',
    'active',
    'saving',
    'running'
  ]
}
</script>

<style scoped>
  .card-action .btn {
    width: 150px;
  }
</style>
