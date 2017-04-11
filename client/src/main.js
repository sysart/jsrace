window.JSHINT = require('jshint').JSHINT
require('codemirror/addon/selection/active-line.js')
require('codemirror/addon/selection/mark-selection.js')
require('codemirror/addon/lint/lint.js')
require('codemirror/addon/lint/javascript-lint.js')

require('codemirror/addon/lint/lint.css')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
