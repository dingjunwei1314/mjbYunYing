// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './common/css/common.css'
import axios from './common/js/axios'
import {url} from './common/js/urlLocation'
import setFontsize from './common/js/setFontsize'
import fastclick from 'fastclick'
setFontsize();
fastclick.attach(document.body);
Vue.prototype.$http=axios;
Vue.prototype.$url=url;
Vue.use(ElementUI);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
