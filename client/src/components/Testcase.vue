<template>
  <div>
    <section class="mdc-card">
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
        <div class="mdc-card__supporting-text">

          <div class="mdc-cell mdc-cell--12-col-desktop">
            <div class="mdc-textfield mdc-js-textfield">
              <input v-model="testcase.title" class="mdc-textfield__input" type="text">
              <label class="mdc-textfield__label" for="testcase-name">Name</label>
            </div>
          </div>

          <div class="mdc-cell mdc-cell--12-col-desktop">
            <div class="mdc-textfield mdc-js-textfield">
              <textarea v-model="testcase.description" class="mdc-textfield__input" type="text" rows="3"></textarea>
              <label class="mdc-textfield__label" for="testcase-description">Description</label>
            </div>
          </div>
        </div>
      </div>
      <div class="mdc-card__actions">
        <button @click="saveTestCase" class="mdc-button mdc-button--compact mdc-card__action">
          Save
        </button>
        <button @click="runTestcase" class="mdc-button mdc-button--compact mdc-card__action">
          Run
        </button>
      </div>
    </section>

    <TestResults :results="results"></TestResults>

    <button @click="addSetup" v-if="!hasSetup">
      Add Setup Code
    </button>

    <section v-if="hasSetup" class="mdc-card">
      <div class="mdc-card__title">
        Setup code
        <button @click="removeSetup">Remove</button>
      </div>
      <div class="mdc-card__supporting-text">
        <CodeEditor v-model="testcase.data.setup"></CodeEditor>
      </div>
    </section>

    <Test
      v-for="test in testcase.data.tests"
      :key="test.id"
      :test="test"
      @remove="removeTest"
    ></Test>

    <button @click="addTest" class="mdc-fab material-icons add-test-btn">
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
