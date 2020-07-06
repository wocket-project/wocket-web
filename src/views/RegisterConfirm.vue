<template>
<div>dfsfsdf</div>
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

          alert(this.$route.query.email)

        axios.get("http://localhost:9306/users/registerConfirm?uid=" + this.$route.query.uid
        + "&email=" + this.$route.query.email + "&authKey=" + this.$route.query.authKey
        )
        .then(res => {
          alert("회원가입이 완료되었습니다.")
          router.push({ name: "home" })
        })
        .catch(err => {
          alert('이미 완료된 인증메일입니다.')
          console.log(err)
          router.push({ name: "home" })
        })
        },
    }
}
</script>
<style>
</style>
