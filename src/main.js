// import promise from 'es6-promise'
// promise.polyfill()
import Promise from 'promise-polyfill'
if (!window.Promise) {
	window.Promise=Promise;
}
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from './common/axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = axios;

var vue = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

window.vue = vue;