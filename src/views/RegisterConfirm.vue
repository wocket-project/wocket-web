<template>
<div></div>
</template>
<script>
import axios from "axios"
import router from "../router"

export default {
    data() {
      return {
      }
    },
    beforeMount() {
      this.checkEmailAuth()
    },
    methods: {
        // 이메일 인증
        checkEmailAuth() {
          axios.get("http://localhost:9306/users/registerConfirm?uid=" + this.$route.query.uid
          + "&email=" + this.$route.query.email + "&authKey=" + this.$route.query.authKey
          )
          .then(res => {            
            if(res.status === 201) {
              alert("회원가입이 완료되었습니다.")
            }
            if(res.status === 208) {
              alert("이미 인증이 완료된 이메일입니다.")
            }            
            router.push({ name: "home" })
          })
          .catch(err => {
            alert("인증코드가 일치하지 않습니다.")
            router.push({ name: "home" })
          })
        },
    }
}
</script>
<style>
</style>
