<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>
            <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
                <img src="/img/brand/main_logo.png" alt="logo">
            </router-link>

            <div class="row" slot="content-header" slot-scope="{closeMenu}">
                <div class="col-6 collapse-brand">
                    <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/">
                        <img src="/img/brand/emblem.png">
                    </a>
                </div>
                <div class="col-6 collapse-close">
                    <close-button @click="closeMenu"></close-button>
                </div>
            </div>

            <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
                <base-dropdown class="nav-item" menu-classes="dropdown-menu-xs">
                    <a slot="title" class="nav-link button" data-toggle="dropdown" role="button">
                        <i class="ni ni-ungroup d-lg-none"></i>
                        <span class="nav-link-inner--text">카테고리</span>
                    </a>
                    <div class="dropdown-menu-inner" v-for="category in categories" v-bind:key="category.id">
                        <a @click="gotoCategory(category)" class="media d-flex align-items-center button" role="button">
                            <div class="media-body ml-3">
                                <h6 class="heading mb-md-1">{{ category.name }}</h6>
                            </div>
                        </a>                
                    </div>
                </base-dropdown>
                <a slot="title" href="/mypage" class="nav-link" data-toggle="dropdown" role="button">
                    <i class="ni ni-single-02"></i>
                    <span class="nav-link-inner--text">마이 위드어스</span>
                </a>                    
                <a v-if="isLogin === false" slot="title" href="/login" class="nav-link button" data-toggle="dropdown" role="button">
                    <i class="ni ni-button-power"></i>
                    <span class="nav-link-inner--text">로그인</span>
                </a>
                <a v-if="isLogin === true" slot="title" @click="$store.dispatch('doLogout')" class="nav-link button" data-toggle="dropdown" role="button">
                    <i class="ni ni-button-power"></i>
                    <span class="nav-link-inner--text">로그아웃</span>
                </a>                     
                <a v-if="isLogin === false" slot="title" href="/register" class="nav-link" data-toggle="dropdown" role="button">
                    <i class="ni ni-circle-08"></i>
                    <span class="nav-link-inner--text">회원가입</span>
                </a>
            </ul>
            <div v-if="isLogin === true" class="userInfo">
                <i class="ni ni-circle-08"></i>
                <span class="nav-link-inner--text">{{userInfo.name}}님 환영합니다.</span>
            </div>
        </base-nav>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav"
import BaseDropdown from "@/components/BaseDropdown"
import CloseButton from "@/components/CloseButton"
import router from "../router"
import { mapState } from 'vuex'

export default {

  data() {
      return {
        categories: [
          { id:1, name:"패션·뷰티" },
          { id:2, name:"식품·생활" },
          { id:3, name:"가전·디지털" },
          { id:4, name:"도서·취미" },
          { id:5, name:"스포츠·자동차" },
        ]
      }
  },
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },
  computed: {
      ...mapState(["isLogin"]),
      ...mapState(["userInfo"])
  },
  methods: {
        gotoCategory(item) { // 상품 세부페이지로 이동            
            router.push({ name: "categories", params: {id : item.id}})
        },
  }
};
</script>
<style>
.button {
    cursor: pointer;
}

.userInfo {
    color: white;
}
</style>
