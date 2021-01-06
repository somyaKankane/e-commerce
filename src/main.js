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
import ForgotPassword from './components/users/ForgotPassword.vue'



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
    { path: '/admin',name:'admin', component: Admin },


    { path: '/about',name:'about', component: Link }, // our-domain.com/home => Home
    { path: '/login',name:'login', component: Login },
    { path: '/registration',name:'registration', component: Registration },
    { path: '/forgotpassword',name:'forgotpassword', component: ForgotPassword },




   
    
    { path: '/home',name:'home', component: Home },
 
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

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
