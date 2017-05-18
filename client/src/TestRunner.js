import process from 'process'
import _ from 'lodash'
import BenchmarkInit from 'benchmark'

const KEYS = [
  'hz',
  'count',
  'cycles'
]

const Benchmark = BenchmarkInit.runInContext({
  _,
  process
})

window.Benchmark = Benchmark

export default class TestRunner {
  constructor (data) {
    this.data = data
  }

  run () {
    let benchmarkMap = new Map()
    const suite = new Benchmark.Suite('test')

    let result = {
      tests: [],
      running: true,
      stop () {
        suite.abort()
      }
    }

    this.data.tests.forEach(test => {
      suite.add(test.name, test.code, {
        defer: test.defer,
        setup: this.data.setup,

        onStart: () => {
          benchmarkResult.running = true
        },
        onError: (error) => {
          benchmarkResult.error = error.message.message
        },
        onComplete: () => {
          benchmarkResult.running = false
          KEYS.forEach(k => {
            benchmarkResult[k] = benchmark[k]
          })
        }
      })

      let benchmark = suite[suite.length - 1]

      let benchmarkResult = {
        test,
        fn: benchmark.fn,
        count: null,
        hz: null,
        running: false,
        fastest: false,
        error: false
      }

      benchmarkMap.set(benchmark.id, benchmarkResult)

      result.tests.push(benchmarkResult)
    })

    suite.on('complete', () => {
      const benchmark = suite.filter('fastest')[0]
      if (benchmark && benchmark.id) {
        let benchmarkResult = benchmarkMap.get(benchmark.id)
        benchmarkResult.fastest = true
      }
      result.running = false
    })

    setTimeout(() => {
      suite.run({
        async: true
      })
    }, 500)

    return result
  }
}
