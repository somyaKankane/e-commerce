<template>
    <div class="wrapper fadeInDown">
  <div id="formContent">
    <form class="form-signup " @submit.prevent="createAccount">
      <img class="" src="../assets/20945760.png" alt :style="{'width':'70%'}">
      <h1 class="h3 mb-3 font-weight-normal">Create an account</h1>
      <div
        class="alert alert-danger"
        role="alert"
        v-for="(error, index) in errorMessage"
        :key="index"
      >{{error}}</div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <input
            type="text"
            class="form-control"
            id="firstName"
            placeholder="First Name"
            v-model="user.firstName"
            required
          >
          <div class="invalid-feedback">Valid first name is required.</div>
        </div>
        <div class="col-md-6 mb-3">
          <input
            type="text"
            class="form-control"
            v-model="user.lastName"
            id="lastName"
            placeholder="Last Name"
            value
            required
          >
          <div class="invalid-feedback">Valid last name is required.</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md mb-3">
          <input
            type="text"
            class="form-control"
            v-model="user.email"
            id="emailId"
            placeholder="Email address"
            value
            required
          >
          <div class="invalid-feedback">Valid first name is required.</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md mb-3">
          <input
            type="text"
            class="form-control"
            id="act-password"
            placeholder="New password"
            value
            v-model="user.password"
            required
          >
          <div class="invalid-feedback">Valid first name is required.</div>
        </div>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        <i class="fa fa-spinner fa-spin mr-1" v-if="showLoader"></i>Sign Up
      </button>
    </form>
  </div>
  </div>
</template>
<script>
// import axios from "axios";
// import { successToaster, errorToaster } from "./shared/service/ErrorHandler.js";

import firebase from "firebase";
import { db } from '../main';
export default {
  name: "CreateAccount",
  data() {
    return {
      showLoader: false,
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      },
      errorMessage: []
    };
  },
  methods: {
    createAccount() {
      this.showLoader = true;

      this.errorMessage = [];

      if (this.user.firstName.length < 5) {
        this.errorMessage.push(
          "FirstName should contains more than 5 character"
        );
      }

      if (this.ValidateEmail(this.user.email) === false) {
        this.errorMessage.push("Please provide a valid Email address");
      }
      if (this.errorMessage.length === 0) {

       let userData={};
         firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: this.user.firstName +  this.user.lastName
            })
            .then(() => {
               db.collection('profiles').get()
          .then((res) => {
            
            if (res.docs.length == 0) {
                // console.log(data.docs.length,0)
             userData={
                 firstName: this.user.firstName,
                  lastName: this.user.lastName,
                  email: this.user.email,
                  role: 'admin',
                  uid: data.user.uid,
                };
                  
            }
            else{
                console.log(res.docs.length,1)
               userData={
                 firstName: this.user.firstName,
                  lastName: this.user.lastName,
                  email: this.user.email,
                  userRole: 'user',
                  uid: data.user.uid,
                };
            //         db.collection('profiles').add(userData)
            //         .then(function() {
            //             console.log("Document successfully written!");
            //         })
            //         .catch(function(error) {
            //             console.error("Error writing document: ", error);
            //         });
            //   this.$router.replace({ name: "login" });
                 
            }
              db.collection('profiles').add(userData)
                    .then(function() {
                        console.log("Document successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
              this.$router.replace({ name: "login" });

            
           }) .catch(err => {
          console.log(err)
        });
        //        console.log(data.user.uid);
               
            });
           
        })
        .catch(err => {
          this.error = err.message;
        });
      }
    },
      ValidateEmail(mail) {
      if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail)) {
        //   var re = ;
        return true;
      }
      return false;
    }


  }
};
</script>

<style>
.form-signup {
  width: 100%;
  max-width: 500px;
  padding: 15px;
  margin: auto;
}
</style>
