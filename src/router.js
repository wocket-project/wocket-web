import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import Components from "./views/Components.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Profile from "./views/Profile.vue";
import Products from "./views/Products.vue";
import ProductDetail from "./views/ProductDetail.vue";
import Categories from "./views/Categories.vue";
import AddProduct from "./views/AddProduct.vue";
import MyPage from "./views/MyPage.vue";
import MyCartInfo from "./views/MyCart.vue";
import Purchase from "./views/Purchase.vue";
import PaySuccess from "./views/PaySuccess.vue";

Vue.use(Router);

const onlyAuthUser = (to, from, next) => {
  if(localStorage.getItem("accessToken") !== null) {
    next()    
  } else {
    alert("로그인이 필요한 페이지입니다. ")
    // alert(store.state.userInfo)
    next("/login")
  }
}

export default new Router({
  linkExactActiveClass: "active", // CSS적용
  base: process.env.BASE_URL, 
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },
    {
      path: "/landing",
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/mypage",
      name: "mypage",
      beforeEnter: onlyAuthUser,
      components: {
        header: AppHeader,
        default: MyPage,
        footer: AppFooter
      }
    },
    {
      path: "/myCartInfo",
      name: "myCartInfo",
      beforeEnter: onlyAuthUser,
      components: {
        header: AppHeader,
        default: MyCartInfo,
        footer: AppFooter
      }
    },
    {
      path: "/register",
      name: "register",
      components: {
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      },
    },
    {
      path: "/products",
      name: "products",
      components: {
        header: AppHeader,
        default: Products,       
        footer: AppFooter
      }
    },
    {
      path: "/purchase",
      name: "purchase",
      beforeEnter: onlyAuthUser,
      components: {
        header: AppHeader,
        default: Purchase,       
        footer: AppFooter
      }
    },
    {
      path: "/addProduct",
      name: "addProduct",
      components: {
        header: AppHeader,
        default: AddProduct,       
        footer: AppFooter
      }
    },
    {
      path: "/products/:id",
      name: "productDetail",
      components: {
        header: AppHeader,
        default: ProductDetail,       
        footer: AppFooter
      }
    },
    {
      path: "/categories/:id",
      name: "categories",
      components: {
        header: AppHeader,
        default: Categories,       
        footer: AppFooter
      }
    },
    {
      path: "/paySuccess/:purchaseId",
      name: "PaySuccess",
      components: {
        header: AppHeader,
        default: PaySuccess,
        footer: AppFooter
      }
    },
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
