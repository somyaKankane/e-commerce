import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.vue';

import Home from './components/users/Home.vue';
import Link from './components/users/Link.vue';
import Login from '../src/views/Login.vue';
import Registration from '../src/views/Registration.vue';
import Admin from './components/users/Admin.vue';
import './assets/app.css';
import  firebase from "firebase";
import store from "./store.js";
import ForgotPassword from './components/users/ForgotPassword.vue';
import "font-awesome/css/font-awesome.min.css";
import Product from './components/users/Products.vue';
import Overview from './components/users/Overview.vue';
import Profile from './components/users/Profile.vue';
import Orders from './components/users/Orders.vue';
import Checkout from './components/users/Checkout.vue';
import ProductDetail from './components/product/ProductDetail.vue';
import VueSweetalert2 from 'vue-sweetalert2';  
import Wishlist from '../src/views/Wishlist.vue';
 import Productview from '../src/views/Productview.vue'
import Vuex from 'vuex';

require("firebase/firestore");

// /home/webwerks/Desktop/e-com/routing-05-navigation-and-dynamic-paths/src/components/adminView/Products.vue



const configOptions = {
  apiKey: "AIzaSyBcE3iZ0u_Gb9tHPsdmnXoP66-cO0xtiGE",
    authDomain: "p1ecommerce.firebaseapp.com",
    databaseURL: "https://p1ecommerce-default-rtdb.firebaseio.com",
    projectId: "p1ecommerce",
    storageBucket: "p1ecommerce.appspot.com",
    messagingSenderId: "24354891865",
    appId: "1:24354891865:web:b32efafed20b38f463a948"
};

// firebase.initializeApp(configOptions);
const firebaseApp = firebase.initializeApp(configOptions);
export const db = firebaseApp.firestore();


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', redirect: '/home'},
    { path: '/admin',name:'admin',redirect: '/admin/products', component: Admin, meta: { requiresAuth: true },
    children:[
      
      {path: '/:notFound(.*)', redirect: '/coupon'},
      {
        path: 'coupon',
        name: 'coupon',
        component: Overview
      },
      {
        path: 'products',
        name:'products',
        component: Product
      },
      {
        path: "profile",
        name: "profile",
        component: Profile
      },
      {
        path: "orders",
        name: "orders",
        component: Orders
      },
    ]  },

    
    { path: '/about',name:'about', component: Link }, // our-domain.com/home => Home
    { path: '/login',name:'login', component: Login },
    { path: '/registration',name:'registration', component: Registration },
    { path: '/forgotpassword',name:'forgotpassword', component: ForgotPassword },
    { path: '/home',name:'home', component: Home},
    { path: '/checkout',name:'checkout', component: Checkout}, 
    {
      path: '/productDetails/:id',
      name: 'productDetails',
      component: ProductDetail
    },
    {
      path: "/userprofile",
      name: "userprofile",
      component: Profile
    },
    {
      path: "/myorder",
      name: "myorder",
      component: Orders
    },
    {
      path: "/product",
      name: "product",
      component: Productview
    },
    {
      path: "/wishlist",
      name: "wishlist",
      component: Wishlist
    },
    {path: '/:notFound(.*)', redirect: '/login'}
  ],
  linkActiveClass: 'active',
  scrollBehavior(to,from,savePosition){
    if(savePosition){
      return savePosition;
    }
    return { left:0, top:0}
  }
});
window.Vuex = Vuex;
router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})

let apps = '';
firebase.auth().onAuthStateChanged(function(user) {
  console.log("1");
  if(!apps){
  console.log("user");
  console.log(user);
  }

});

const app = createApp(App);

app.use(router);
app.use(store);
app.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);
app.use(Vuex);
app.use(VueSweetalert2); 

app.mount('#app');
// export const db = firebase.firestore();