<template>
  <div class="testcase-view">
    <section class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
      <div class="mdl-card mdl-cell mdl-cell--12-col">
        <div class="mdl-card__supporting-text">

          <div class="mdl-cell mdl-cell--12-col-desktop">
            <div class="mdl-textfield mdl-js-textfield">
              <input v-model="testcase.title" class="mdl-textfield__input" type="text">
              <label class="mdl-textfield__label" for="testcase-name">Name</label>
            </div>
          </div>

          <div class="mdl-cell mdl-cell--12-col-desktop">
            <div class="mdl-textfield mdl-js-textfield">
              <textarea v-model="testcase.description" class="mdl-textfield__input" type="text" rows="3"></textarea>
              <label class="mdl-textfield__label" for="testcase-description">Description</label>
            </div>
          </div>
        </div>
      </div>
      <div class="mdl-card__actions mdl-card--border">
        <button @click="saveTestCase" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          Save
        </button>
        <button @click="runTestcase">
          Run
        </button>
      </div>
    </section>

    <testResults :results="this.results"></TestResults>

    <test :test="test" v-for="test in testcase.data.tests" :key="test.id"></test>

    <button @click="addTest" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored add-test-btn">
      <i class="material-icons">add</i>
    </button>
  </div>
</template>

<script>
import Test from './Test'
import TestResults from './TestResults'
import Api from '../Api'
import uuid from 'uuid'
import TestRunner from '../TestRunner'

export default {

  name: 'testcase',

  components: {
    Test,
    TestResults
  },

  data () {
    return {
      testcase: {
        data: {
          tests: [
            {
              id: uuid.v1(),
              name: 'Test 1',
              code: ''
            }
          ]
        }
      },
      results: null
    }
  },

  beforeRouteEnter (to, from, next) {
    if (to.params.id) {
      Api.get(to.params.id).then(testcase => {
        next(vm => {
          vm.testcase = testcase
        })
      }, err => {
        console.error(err)
        next()
      })
    } else {
      next()
    }
  },

  methods: {
    addTest () {
      this.testcase.data.tests.push({
        id: uuid.v1(),
        name: '',
        code: ''
      })
    },

    saveTestCase () {
      Api.save(this.testcase).then(response => {
        this.$router.push({
          name: 'testcase',
          params: {
            id: response.id
          }
        })
      })
    },

    runTestcase () {
      const runner = new TestRunner(this.testcase.data)
      this.results = runner.run()
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
