<template>
  <div class="testcase-view">
    <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
      <div class="mdl-card mdl-cell mdl-cell--12-col">
        <div class="mdl-card__title">
          <h4 class="mdl-card__title-text">Testcase</h4>
        </div>

        <div class="mdl-card__supporting-text">
          Testcase description goes here
        </div>
      </div>
    </section>

    <test v-for="test in tests"></test>

    <button v-on:click="addTest" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored add-test-btn">
      <i class="material-icons">add</i>
    </button>
  </div>
</template>

<script>
import Test from './Test'

export default {

  name: 'testcase',
  components: {
    Test
  },

  data () {
    return {
      tests: [
        {
          title: 'Test 1'
        }
      ]
    }
  },

  methods: {
    addTest: function () {
      this.tests.push({title: 'Test nakki'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


  .add-test-btn {
    position: absolute;
    bottom: 50px;
    right: 50px;
  }
</style>
