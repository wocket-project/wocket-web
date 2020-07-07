<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="text-muted text-center mb-3">
                                <img src="img/brand/main_logo.png" alt="logo" style="width:200px;" class="center">
                            </div>
                            <!-- <div class="btn-wrapper text-center">
                                <base-button type="neutral">
                                    <img slot="icon" src="img/icons/common/google.svg">
                                    Google
                                </base-button>
                            </div> -->
                        </template>
                        <template>
                            <form>
                                <div class="form-group">
                                    <input alternative
                                            type="text"
                                            v-model="email"
                                            class="form-control"
                                            placeholder="이메일"
                                            addon-left-icon="ni ni-email-83"/>
                                </div>
                                <div class="form-group">
                                <input alternative
                                            class="form-control"
                                            v-model="password"
                                            type="password"
                                            placeholder="비밀번호"
                                            addon-left-icon="ni ni-lock-circle-open"/>
                                </div>
                                <base-checkbox>
                                    Remember me
                                </base-checkbox>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="doLogin({email, password})">로그인</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="#" class="text-light">
                                <small>Forgot password?</small>
                            </a>
                        </div>
                        <div class="col-6 text-right">
                            <a href="/register" class="text-light">
                                <small>Create new account</small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import {mapState, mapActions} from "vuex"

export default {
    data() {
        return {
            email: null,
            password: null,            
        }
    },
    computed: {
        ...mapState(["isLogin", "isLoginError"])
    },
    methods: {
        ...mapActions(["doLogin"]),
    }
}
</script>
<style scoped>
.container {
  font-family: "Nanum Gothic" !important;
}

</style>
