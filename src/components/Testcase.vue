<template>
  <div class="testcase-view">
    <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
      <div class="mdl-card mdl-cell mdl-cell--12-col">
        <div class="mdl-card__supporting-text">

          <div class="mdl-cell mdl-cell--12-col-desktop">
            <div class="mdl-textfield mdl-js-textfield">
              <input class="mdl-textfield__input" type="text" id="testcase-name">
              <label class="mdl-textfield__label" for="testcase-name">Name</label>
            </div>
          </div>

          <div class="mdl-cell mdl-cell--12-col-desktop">
            <div class="mdl-textfield mdl-js-textfield">
              <textarea class="mdl-textfield__input" type="text" rows= "3" id="testcase-description" ></textarea>
              <label class="mdl-textfield__label" for="testcase-description">Description</label>
            </div>
          </div>
        </div>
      </div>
      <div class="mdl-card__actions mdl-card--border">
        <button v-on:click="saveTestCase" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          Save
        </button>
      </div>
    </section>

    <test v-for="test in testcase.tests"></test>

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
      testcase: {
        tests: [
          {
            title: 'Test 1'
          }
        ]
      }
    }
  },

  methods: {
    addTest () {
      this.testcase.tests.push({title: 'Test nakki'})
    },

    saveTestCase () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


  .add-test-btn {
    position: fixed;
    bottom: 50px;
    right: 50px;
  }
</style>
