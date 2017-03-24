<template>
  <div>
    <section class="row">
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <div class="row">
              <div class="col s12 input-field">
                <input v-model="testcase.title" type="text">
                <label for="testcase-name" class="active">Name</label>
              </div>

              <div class="col s12 input-field">
                <textarea v-model="testcase.description" type="text" rows="3" class="materialize-textarea"></textarea>
                <label for="testcase-description" class="active">Description</label>
              </div>
            </div>

          </div>

          <div class="card-action">
            <a v-if="valid" href="#" @click="saveTestCase">Save</a>
            <a href="#" @click="runTestcase">Run</a>
          </div>
        </div>
      </div>
    </section>

    <TestResults :results="results"></TestResults>

    <section class="row">
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Setup code</span>
            <CodeEditor v-model="testcase.data.setup"></CodeEditor>
          </div>
        </div>
      </div>
    </section>

    <Test
      v-for="test in testcase.data.tests"
      :key="test.id"
      :test="test"
      @remove="removeTest"
    ></Test>

    <button @click="addTest" class="btn-floating btn-large green add-test-btn">
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
import { TestCaseSchema } from '../schemas'
import Joi from 'joi-browser'

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
        title: '',
        description: '',
        data: {
          setup: '',
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

  computed: {
    valid () {
      return !Joi.validate(this.testcase, TestCaseSchema).error
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
