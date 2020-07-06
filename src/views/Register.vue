<template>
        <div class="container pt-lg-md">
            <form @submit.prevent="handleSubmit">
                <div class="container-login">
                    <img src="img/brand/register_logo.png" alt="logo" style="width:250px;" class="center">
                    <hr>
                    <h1 style="text-align:center">회원가입</h1>
                    <p>※ 아래 양식을 입력해주세요.</p>
                    <div class="form-group">
                        <label for="email">이메일</label>
                        <input type="text" v-model="user.email" id="email" name="email" class="form-control"
                         :class="{ 'is-invalid': submitted && $v.user.email.$error }" maxlength="30" />
                        <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
                            <span v-if="!$v.user.email.required">이메일은 필수입력 항목입니다.</span>
                            <span v-if="!$v.user.email.email">이메일 형식이 아닙니다.</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="name">이름</label>
                        <input type="text" v-model="user.name" id="name" name="name" class="form-control" :class="{ 'is-invalid': submitted && $v.user.name.$error }" 
                        maxlength="20"/>
                        <span v-if="submitted && !$v.user.name.required" class="invalid-feedback">이름은 필수입력 항목입니다.</span>
                    </div>
                    
                    <div class="form-group">
                        <label for="password">비밀번호</label>
                        <input type="password" v-model="user.password" id="password" name="password" class="form-control" 
                        :class="{ 'is-invalid': submitted && $v.user.password.$error }" maxlength="16" />
                        <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
                            <span v-if="!$v.user.password.required">비밀번호는 필수 입력사항입니다.</span>
                            <span v-if="!$v.user.password.minLength">비밀번호는 최소 8자리 이상 입력해주세요.</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">비밀번호 확인</label>
                        <input type="password" v-model="user.confirmPassword" id="confirmPassword" name="confirmPassword" class="form-control" 
                        :class="{ 'is-invalid': submitted && $v.user.confirmPassword.$error }" maxlength="16"/>
                        <div v-if="submitted && $v.user.confirmPassword.$error" class="invalid-feedback">
                            <span v-if="!$v.user.confirmPassword.required">비밀번호 확인은 필수 입력사항입니다.</span>
                            <span v-else-if="!$v.user.confirmPassword.sameAsPassword">비밀번호가 일치하지 않습니다.</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="zonecode">우편번호</label>
                        <input type="text" v-model="user.zonecode" @click="setAddress()" style="width:38%; margin:1% 3% 1% 1%" readonly="true"
                        id="zonecode" name="zonecode" class="form-control"/>

                        <label for="address">주소</label>
                        <input type="text" v-model="user.address" @click="setAddress()" style="width:45%; margin:1% 1% 1% 1%" readonly="true"
                        id="address" name="address" class="form-control" :class="{ 'is-invalid': submitted && $v.user.address.$error }" />
                        <div v-if="submitted && !$v.user.address.required" class="invalid-feedback">주소는 필수입력 항목입니다.</div>

                        <label for="detailAddress">상세주소</label>
                        <input type="text" v-model="user.detailAddress" style="width:90%; margin:1%"
                        id="detailAddress" name="detailAddress" class="form-control" :class="{ 'is-invalid': submitted && $v.user.detailAddress.$error }" />
                        <div v-if="submitted && !$v.user.detailAddress.required" class="invalid-feedback">상세주소는 필수입력 항목입니다.</div>
                    </div>

                    <div class="form-group">
                        
                    </div>

                    <div class="form-group">
                        <label for="phone">전화번호</label>
                        <input type="text" v-model="user.phone" id="phone" name="phone" @keyup="autoHypenPhone(user.phone)"
                         class="form-control" :class="{ 'is-invalid': submitted && $v.user.phone.$error }" />
                        <div v-if="submitted && !$v.user.phone.required" class="invalid-feedback">전화번호는 필수입력 항목입니다.</div>
                    </div>
                    <hr>
                    <!-- 팝업창 띄우기 -->
                    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

                    <button type="submit" class="registerbtn">
                    회원가입
                    </button>
                </div>
                
                <div class="container-signin">
                    <p>Already have an account? <a href="http://localhost:9306/login">로그인</a>.</p>
                </div>
            </form>
        </div>
</template>
<script>
import axios from "axios"
import router from "../router"
import {required, email, minLength, sameAs} from "vuelidate/lib/validators"

// extend('required', {
//     ...required,
//     message: '이 필드는 필수 입력란입니다.'
// })

export default {
    name: 'app',
    data() {
      return {
          user: {
            email: "",
            password: "",
            name: "",
            address: "",
            zonecode: "",
            detailAddress: "",
            phone: "",
            confirmPassword: "",
          },          
          submitted: false,
          isDetailAddrFlag: false
      }
    },
    validations: {
        user: {
          email: {required, email},
          password: {required, minLength: minLength(8)},
          name: {required},
          address: {required},
          detailAddress: {required},
          phone: {required},
          confirmPassword: {required, sameAsPassword: sameAs('password')},
        }
    },
    methods: {
        // 회원가입 시도
        doRegister: function() {        

        axios.post("http://localhost:9306/users", {
            email: this.user.email,
            password: this.user.password,
            name: this.user.name,
            address: this.user.address,
            phone: this.user.phone,
            detailAddress: this.user.detailAddress,
            zonecode: this.user.zonecode
        })
            .then(res => {
              // alert("회원가입이 정상적으로 완료되었습니다.")
              router.push({ name: "RegisterAuth" })
            })
            .catch(err => {
              alert('서버 오류')
              // commit("loginError")
              console.log(err)
            })
        },
         handleSubmit(e) {
            this.submitted = true;

            // stop here if form is invalid
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }

            this.doRegister(); 
        },
        setAddress() {

          var customer = this;  // 지역변수를 써야하는 이유 알기! (함수 내에서 this.user.address는 제대로 실행되지 않는다.)

          new daum.Postcode({
            oncomplete: function(data) {
                customer.user.address = data.address
                customer.user.zonecode = data.zonecode
            }
          }).open();          
        },
        autoHypenPhone(val) {
            var phoneNumber = val.replace(/[^0-9]/g, "");
            var res = "";

            if(phoneNumber.length < 4) {
                return phoneNumber;
            } else if(phoneNumber.length < 7) {
                res += phoneNumber.substr(0, 3);
                res += "-";
                res += phoneNumber.substr(3);
            } else if(phoneNumber.length < 11) {
                res += phoneNumber.substr(0, 3);
                res += "-";
                res += phoneNumber.substr(3, 3);
                res += "-";
                res += phoneNumber.substr(6);
            } else {
                res += phoneNumber.substr(0, 3);
                res += "-";
                res += phoneNumber.substr(3, 4);
                res += "-";
                res += phoneNumber.substr(7);
            }

            this.user.phone = res
        },
    }
};


</script>
<style>

body {
  font-family: "Nanum Gothic", Arial, Helvetica, sans-serif !important;
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
  margin: 3px 0 3px 0;
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

label {
  margin-top: 20px;
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
