<template>
  <div class="card">
    <div class="card-content">
      <TextField label="Name" v-model="testcase.title" :disabled="active"/>
      <TextField label="Description" v-model="testcase.description" :disabled="active" multiline/>
    </div>

    <div class="card-action">
      <ActionButton
        :disabled="!valid || active"
        :class="{disabled: !valid}"
        @click="$emit('saveTestCase')"
      >
        <i class="material-icons left">save</i>
        Save
      </ActionButton>
      <ActionButton
        @click="$emit('runTests')"
        :disabled="active"
      >
        <i class="material-icons left">play_arrow</i>
        Run
      </ActionButton>
      <ActionButton
        @click="$emit('stopTests')"
        v-if="running"
      >
        <i class="material-icons left">stop</i>
        Stop
      </ActionButton>
    </div>
  </div>
</template>

<script>
import TextField from './TextField'
import ActionButton from './ActionButton'

export default {
  components: {
    TextField,
    ActionButton
  },
  props: [
    'testcase',
    'valid',
    'active',
    'running'
  ]
}
</script>
