<template>
  <div>
    <section class="row">
      <div class="col s12">
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
              @click="saveTestCase"
            >
              {{saving ? 'Saving' : 'Save'}}
            </button>
            <button class="waves-effect waves-light btn blue" @click="runTestcase">Run</button>
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

    <div class="add-test-btn">
      <button @click="addTest" class="btn-floating btn-large waves-effect waves-light green">
        <i class="material-icons">add</i>
      </button>
    </div>
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

  created () {
    this.addTest()
  },

  data () {
    return {
      saving: false,
      testcase: {
        title: '',
        description: '',
        data: {
          setup: '',
          tests: []
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

      setTimeout(() => {
        document.body.scrollTop = document.body.scrollHeight
      })
    },

    removeTest (test) {
      let i = this.testcase.data.tests.indexOf(test)
      if (i !== -1) {
        this.testcase.data.tests.splice(i, 1)
      }
    },

    saveTestCase () {
      if (!this.valid) {
        return
      }

      this.saving = true

      Api.save(this.testcase).then(response => {
        this.$router.push({
          name: 'testcase',
          params: {
            id: response.id
          }
        })

        this.saving = false
      })
    },

    runTestcase () {
      const runner = new TestRunner(this.testcase.data)
      this.results = runner.run()
    }
  }
}
</script>

<style scoped>
  .add-test-btn {
    position: fixed;
    bottom: 50px;
    right: 50px;
  }

  .card-action .btn {
    width: 150px;
  }
</style>
