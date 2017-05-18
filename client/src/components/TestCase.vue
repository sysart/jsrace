<template>
  <div>
    <div class="row">
      <div class="col s12">
        <TestDetails
          :testcase="testcase"
          :active="active"
          :valid="valid"
          :running="running"
          @saveTestCase="saveTestCase"
          @runTests="runTests"
          @stopTests="stopTests"
        ></TestDetails>
      </div>
    </div>

    <BlockTransition>
      <div class="row" v-show="result">
        <div class="col s12">
          <TestResults :result="result"></TestResults>
        </div>
      </div>
    </BlockTransition>

    <div class="row">
      <div class="col s12">
        <SetupCode
          :testcase="testcase"
          :active="active"
        ></SetupCode>
      </div>
    </div>

    <div
      class="row"
      v-for="test in tests"
      :key="test.id"
    >
      <div class="col s12">
        <Test
          :data="test"
          :active="active"
          @remove="removeTest"
        ></Test>
      </div>
    </div>

    <div class="row">
      <div class="col s12 center-align">
        <ActionButton @click="addTest" :disabled="active">
          <i class="material-icons left">note_add</i>
          Add
        </ActionButton>
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
import BlockTransition from './BlockTransition'
import ActionButton from './ActionButton'

export default {
  components: {
    Test,
    TestResults,
    SetupCode,
    TestDetails,
    BlockTransition,
    ActionButton
  },

  created () {
    this.reset()
  },

  data () {
    return {
      saving: false,
      testcase: null,
      result: null
    }
  },

  computed: {
    active () {
      return this.saving || (this.result && this.result.running)
    },
    running () {
      return this.result && this.result.running
    },
    valid () {
      return !Joi.validate(this.testcase, TestCaseSchema).error
    },
    tests () {
      return this.testcase.data.tests.map((test, i) => {
        return {
          test,
          result: this.result && this.result.tests[i]
        }
      })
    }
  },

  watch: {
    $route (newVal) {
      if (newVal.params.id) {
        Api.get(newVal.params.id).then(testcase => {
          this.testcase = testcase
        }, error => {
          console.error(error)
        })
      } else {
        this.reset()
      }
    }
  },

  beforeRouteEnter (to, from, next) {
    if (to.params.id) {
      Api.get(to.params.id).then(testcase => {
        next(vm => {
          vm.testcase = testcase
        })
      }, error => {
        console.error(error)
        next()
      })
    } else {
      next()
    }
  },

  methods: {
    reset () {
      this.testcase = {
        title: '',
        description: '',
        data: {
          tests: []
        }
      }
      this.addTest()
    },
    addTest () {
      this.testcase.data.tests.push({
        id: uuid.v1(),
        name: '',
        code: '',
        defer: false
      })
      this.result = null
    },

    removeTest (test) {
      let i = this.testcase.data.tests.indexOf(test)
      if (i !== -1) {
        this.testcase.data.tests.splice(i, 1)
      }
      this.result = null
    },

    runTests () {
      const runner = new TestRunner(this.testcase.data)
      this.result = runner.run()
    },

    stopTests () {
      if (this.result) {
        this.result.stop()
        this.result = null
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
    }
  }
}
</script>
