<template>
  <div class="admin">
<div  class="page-wrapper default-theme sidebar-bg bg1 toggled">
        <a id="show-sidebar" @click="closeMenu" class="btn btn-sm btn-dark" href="#">
            <vue-fontawesome icon="bars" size="1" color="lightgray"></vue-fontawesome>
        </a>
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <a href="#">Shop</a>
                    <div id="close-sidebar" @click="closeMenu">
                        <!-- <i class="fas fa-times"></i> -->
                        <vue-fontawesome icon="times" size="1" color="lightgray"></vue-fontawesome>
                    </div>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header">
                    <div class="user-pic">
                        <vue-fontawesome icon="user-circle" size="3" color="lightgray"></vue-fontawesome>

                        <!-- <img class="img-responsive img-rounded" src="/img/user.png" alt="User picture"> -->
                    </div>
                    <div class="user-info">
                        <span class="user-name">Admin
                            <strong>User</strong>
                        </span>
                        <span class="user-role"> {{email}} </span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
                    </div>
                </div>
                <!-- sidebar-search  -->
                <!-- <div class="sidebar-item sidebar-search">
                    <div>
                        <div class="input-group">
                            <input type="text" class="form-control search-menu" placeholder="Search...">
                            <div class="input-group-append">
                                <span class="input-group-text">
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div> -->
                <!-- sidebar-menu  -->
                <div class=" sidebar-item sidebar-menu">
                    <ul>
                        <li class="header-menu">
                            <span>Menu</span>
                        </li>

                        <li>
                            <router-link to="/admin/coupon">
                                <i class="fa fa-tags"></i>
                                <span>Coupon</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/products">
                                <i class="fa fa-diamond"></i>
                                <span>Products</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/orders">
                                <i class="fa fa-shopping-cart"></i>
                                <span>Orders</span>
                            </router-link>
                        </li>

                        <!-- <li>
                            <router-link to="/admin/coupon">
                                <i class="fa fa-tags"></i>
                                <span>Coupon</span>
                            </router-link>
                        </li> -->

                        <li>
                            <router-link to="/admin/profile">
                                <i class="fa fa-user"></i>
                                <span>Profile</span>
                            </router-link>
                        </li>
                        <li>
                            <a href="#" @click="logout()">
                                <i class="fa fa-power-off"></i>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- sidebar-menu  -->
            </div>
       
        </nav>
        <!-- sidebar-content  -->
        <main class="page-content pt-2">
            <!-- <div class="overview">
                <div class="container h-100">
                    <div class="intro h-100">
                        <div class="row h-100 justify-content-center align-items-center">
                        <div class="col-md-6">
                            <h3>Overview Page</h3>
                            <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.
                            </p>
                        </div>
                        <div class="col-md-6">
                            <img src="../../assets/svg/overview.svg" alt="" class="img-fluid">
                        </div>
                        </div>
                    </div>
                </div>
            </div> -->
           <router-view></router-view>
        </main>
        <!-- page-content" -->
    </div>
    <!-- page-wrapper -->




  </div>
</template>

<script>

import firebase from "firebase";
import $ from 'jquery';
export default {
  name: "admin",
  data(){
      return{
          name:null,
          email:null,
          
          
      }
  },
  components: {
    // Hero
  },
  methods:{
      closeMenu(){
       
        $(".page-wrapper").toggleClass("toggled");
      },
      logout(){
         firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.clear();
          this.$router.replace({
            name: "login"
          });
        });
      }
  },
//   created(){
//       let user = fb.auth().currentUser;
//       this.email = user.email;
//   }
};
</script>

<style>
</style>