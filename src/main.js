import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.vue';

import Home from './components/users/Home.vue';
import Link from './components/users/Link.vue';
import Login from './components/users/Login.vue';
import Registration from './components/users/Registration.vue';
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

require("firebase/firestore");

// /home/webwerks/Desktop/e-com/routing-05-navigation-and-dynamic-paths/src/components/adminView/Products.vue



const configOptions = {
  apiKey: "AIzaSyBbSHqC8EfjwgM4fXIMvtJVB86svfL1jmI",
  authDomain: "ecommerce-a884c.firebaseapp.com",
  databaseURL: "https://ecommerce-a884c-default-rtdb.firebaseio.com/",
  projectId: "ecommerce-a884c",
  storageBucket: "ecommerce-a884c.appspot.com",
  messagingSenderId: "780012902324",
  appId: "1:780012902324:web:03c2cc2b0aa681ee1f04e1",
  measurementId: "G-P6WDYG92LB"
};

firebase.initializeApp(configOptions);


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', redirect: '/login'},
    { path: '/admin',name:'admin', component: Admin, meta: { requiresAuth: true },children:[
      {
        path: '/',
        name:'products',
        component: Product
      },
      {path: '/:notFound(.*)', redirect: '/overview'},
      {
        path: 'overview',
        name: 'overview',
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
// router.beforeEach((to, from, next) => {

//   const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
//   const currentUser = firebase.auth().currentUser

//   if (requiresAuth && !currentUser) {
//       next('/')
//   } else if (requiresAuth && currentUser) {
//       next()
//   } else {
//       next()
//   }
// })

// let apps = '';
// firebase.auth().onAuthStateChanged(function(user) {
//   console.log("1");
//   if(!apps){
//   console.log("user");
//   console.log(user);
//   }

// });

const app = createApp(App);

app.use(router);
app.use(store);
app.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);
 

app.mount('#app');
