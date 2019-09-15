import Vue from 'vue'

import VueCookies from 'vue-cookies';

import App from './App.vue'
import router from './configs/router';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import HighchartsVue from 'highcharts-vue'


Vue.use(VueCookies);
Vue.use(Loading);
Vue.use(BootstrapVue);
Vue.use(HighchartsVue);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
