<template>
        <div class="container pt-lg-md">
            <form v-on:submit.prevent="doRegister">
                <div class="container-login">
                    <img src="img/brand/logo.png" alt="logo" style="width:250px;" class="center">
                    <hr>
                    <h1 style="text-align:center">회원가입</h1>
                    <p>※ 아래 양식을 입력해주세요</p>
                    <label for="email"><b>이메일</b></label>
                    <input type="text" placeholder="이메일 입력" id="email" name="email" ref="email" required>

                    <label for="name"><b>이름</b></label>
                    <input type="text" placeholder="이름 입력" id="name" name="name" ref="name" required>

                    <label for="password"><b>비밀번호</b></label>
                    <input type="password" placeholder="비밀번호 입력" id="password" name="password" ref="password" required>

                    <label for="pspasswordw-repeat"><b>비밀번호 재확인</b></label>
                    <input type="password" placeholder="비밀번호 확인" name="password-repeat" required>

                    <label for="address"><b>주소</b></label>
                    <input type="text" placeholder="주소 입력" id="address" name="address" ref="address" required>

                    <label for="phone"><b>전화번호</b></label>
                    <input type="text" placeholder="전화번호 입력" id="phone" name="phone" ref="phone" required>
                    <hr>
                    <!-- 팝업창 띄우기 -->
                    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

                    <button type="submit" class="registerbtn">
                    Register
                    </button>                   
                </div>
                
                <div class="container-signin">
                    <p>Already have an account? <a href="http://localhost:9306/login">Sign in</a>.</p>
                </div>
            </form>
        </div>
</template>
<script>
import axios from "axios"
import router from "../router"

export default {
    methods: {
        // 회원가입 시도
        doRegister: function() {

        var email = this.$refs.email.value
        var password = this.$refs.password.value
        var name = this.$refs.name.value
        var address = this.$refs.address.value
        var phone = this.$refs.phone.value

        axios.post("http://localhost:9306/users", {
            email: email,
            password: password,
            name: name,
            address: address,
            phone: phone
        })
            .then(res => {
              alert(res.status)
              alert("회원가입이 정상적으로 완료되었습니다.")
              router.push({ name: "home" })
            })
            .catch(err => {
              alert('서버 오류')
              // commit("loginError")
              console.log(err)
            })
        },
      }
};
</script>
<style>

body {
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

/* Add padding to containers */
.container-login {
  padding: 16px;
  background-color: white;
}

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus, input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */
hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for the submit button */
.registerbtn {
  background-color: #656AFB;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */
a {
  color: dodgerblue;
}

/* Set a grey background color and center the text of the "sign in" section */
.signin {
  background-color: #f1f1f1;
  text-align: center;
}

img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
