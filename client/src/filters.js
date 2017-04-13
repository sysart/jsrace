import Vue from 'vue'

Vue.filter('roundNumber', (num) => {
  if (typeof num === 'number') {
    return Math.round(num)
  }
})

Vue.filter('localizeNumber', (num) => {
  if (typeof num === 'number') {
    return num.toLocaleString()
  }
})
