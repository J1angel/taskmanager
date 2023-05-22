import Vue from 'vue'
import App from './App.vue'
import 'babel-polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import _ from 'lodash'
import VueScrollProgressBar from '@guillaumebriday/vue-scroll-progress-bar'
import Raphael from 'raphael/raphael'
import router from './router'
import VueMoment from 'vue-moment'
import VueObserveVisibility from 'vue-observe-visibility'

Vue.config.productionTip = false

global.Raphael = Raphael
const components = require.context('@/components/sofbox')
_.forEach(components.keys(), (fileName) => {
  const componentConfig = components(fileName)
  const componentName = fileName.split('/').pop().split('.')[0]
  Vue.component(componentName, componentConfig.default || componentConfig)
})

Vue.filter('reverse', function (value) {
  // slice to make a copy of array, then reverse the copy
  return value.slice().reverse()
})
Vue.use(VueScrollProgressBar)
Vue.use(VueMoment)
Vue.use(VueObserveVisibility)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
