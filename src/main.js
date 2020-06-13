import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Argon from "./plugins/argon-kit"
import './registerServiceWorker'
import Vuelidate from 'vuelidate'
import IMP from "vue-iamport"


Vue.config.productionTip = false;
Vue.use(Argon)
Vue.use(Vuelidate)

Vue.use(IMP, 'imp12408063') //아임포트 회원가입 후 발급된 가맹점 고유 코드를 사용해주세요. 예시는 KCP공식 아임포트 데모 계정입니다. 
Vue.IMP().load()


new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.dispatch("getMemberInfo", false)
  },
  render: h => h(App)
}).$mount("#app");