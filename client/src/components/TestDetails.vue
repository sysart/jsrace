<template>
  <div class="card">
    <div class="card-content">
      <span class="card-title">Details</span>
      <div class="row">
        <div class="col s12 input-field">
          <input v-model="testcase.title" type="text">
          <label for="testcase-name" class="active">Name</label>
        </div>
      </div>
      <div class="row">
        <div class="col s12 input-field">
          <textarea v-model="testcase.description" type="text" rows="3" class="materialize-textarea"></textarea>
          <label for="testcase-description" class="active">Description</label>
        </div>
      </div>
    </div>

    <div class="card-action">
      <button
        class="waves-effect waves-light btn"
        :disabled="!valid || saving"
        :class="{disabled: !valid}"
        @click="$emit('saveTestCase')"
      >
        {{saving ? 'Saving' : 'Save'}}
      </button>
      <button class="waves-effect waves-light btn blue" @click="$emit('runTests')">Run</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['testcase', 'valid', 'saving']
}
</script>

<style scoped>
  .card-action .btn {
    width: 150px;
  }
</style>
