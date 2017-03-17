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

    <TestResults :results="results"></TestResults>

    <button @click="addSetup" v-if="!hasSetup">
      Add Setup Code
    </button>

    <section v-if="hasSetup" class="section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp">
      <div class="mdl-card mdl-cell mdl-cell--12-col">
        <div class="mdl-card__title mdl-card--expand">
          Setup code
          <button @click="removeSetup">Remove</button>
        </div>
        <div class="mdl-card__supporting-text">
          <CodeEditor v-model="testcase.data.setup"></CodeEditor>
        </div>
      </div>
    </section>

    <Test
      v-for="test in testcase.data.tests"
      :key="test.id"
      :test="test"
      @remove="removeTest"
    ></Test>

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
import CodeEditor from './CodeEditor'

export default {

  name: 'testcase',

  components: {
    Test,
    TestResults,
    CodeEditor
  },

  data () {
    return {
      testcase: {
        data: {
          setup: false,
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

  computed: {
    hasSetup () {
      return this.testcase.data.setup !== false
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

    removeTest (test) {
      let i = this.testcase.data.tests.indexOf(test)
      if (i !== -1) {
        this.testcase.data.tests.splice(i, 1)
      }
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

    addSetup () {
      this.testcase.data.setup = ''
    },

    removeSetup () {
      this.testcase.data.setup = false
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
