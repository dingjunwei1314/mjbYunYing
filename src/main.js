import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from './common/axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor);
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

var bus =new Vue();
