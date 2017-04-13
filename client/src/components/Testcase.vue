<template>
  <div>
    <div class="row">
      <div class="col s12">
        <TestDetails
          :testcase="testcase"
          :saving="saving"
          :valid="valid"
          @saveTestCase="saveTestCase"
          @runTests="runTests"
        ></TestDetails>
      </div>
    </div>

    <div class="row">
      <div class="col s12">
        <TestResults :results="results"></TestResults>
      </div>
    </div>

    <div class="row">
      <div class="col s12">
        <SetupCode :testcase="testcase"></SetupCode>
      </div>
    </div>

    <div
      class="row"
      v-for="test in testcase.data.tests"
      :key="test.id"
    >
      <div class="col s12">
        <Test
          :test="test"
          @remove="removeTest"
        ></Test>
      </div>
    </div>

    <div class="row">
      <div class="col s12 center-align">
        <button @click="addTest" class="waves-effect waves-light btn green">
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { TestCaseSchema } from '../schemas'
import Joi from 'joi-browser'
import Test from './Test'
import TestResults from './TestResults'
import Api from '../Api'
import uuid from 'uuid'
import SetupCode from './SetupCode'
import TestDetails from './TestDetails'
import TestRunner from '../TestRunner'

export default {
  components: {
    Test,
    TestResults,
    SetupCode,
    TestDetails
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
    },

    removeTest (test) {
      let i = this.testcase.data.tests.indexOf(test)
      if (i !== -1) {
        this.testcase.data.tests.splice(i, 1)
      }
    },

    runTests () {
      const runner = new TestRunner(this.testcase.data)
      this.results = runner.run()
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
    }
  }
}
</script>
