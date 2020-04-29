<template>
        <div class="container pt-lg-md">
            <form>
                <div class="container-login">
                    <img src="img/brand/logo.png" alt="logo" style="width:250px;" class="center">
                    <hr>
                    <h1 style="text-align:center">회원가입</h1>
                    <p>※ 아래 양식을 입력해주세요</p>
                    <label for="email"><b>이메일</b></label>
                    <input type="text" placeholder="이메일 입력" name="email" required>

                    <label for="name"><b>이름</b></label>
                    <input type="text" placeholder="이름 입력" name="name" required>

                    <label for="password"><b>비밀번호</b></label>
                    <input type="password" placeholder="비밀번호 입력" name="password" required>

                    <label for="pspasswordw-repeat"><b>비밀번호 재확인</b></label>
                    <input type="password" placeholder="비밀번호 확인" name="password-repeat" required>

                    <label for="address"><b>주소</b></label>
                    <input type="text" placeholder="주소 입력" name="address" required>

                    <label for="phone"><b>전화번호</b></label>
                    <input type="text" placeholder="전화번호 입력" name="phone" required>
                    <hr>
                    <!-- 팝업창 띄우기 -->
                    <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

                    <button type="submit" class="registerbtn">Register</button>
                </div>
                
                <div class="container-signin">
                    <p>Already have an account? <a href="http://localhost:9306/login">Sign in</a>.</p>
                </div>
            </form>
        </div>
</template>
<script>
export default {};
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
