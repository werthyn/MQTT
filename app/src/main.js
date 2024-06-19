import Vue from 'vue'
import ElementUI from 'element-ui';
//样式文件需要单独引入
import 'element-ui/lib/theme-chalk/index.css';
import mMQTT from '@/utils/mqtt';

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$mqtt = mMQTT;

new Vue({
  render: h => h(App),
}).$mount('#app')
