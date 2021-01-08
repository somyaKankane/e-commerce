<template>
  <div class="login container">
    <div class="row">
      <div class="col text-center">
        <!-- <createAccount v-if="isSignUp"></createAccount> -->

        <form class="form-signin" @submit.prevent="login">
          <img class="mb-4" src="../../assets/login-img.png" alt width="72" height="72">
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <div v-if="errors.length">
                <p v-for="error in errors" :key="error"  class="alert alert-danger"
        role="alert" >
                    {{ error }}
                </p>
          </div>
            <div v-if="error" class="alert alert-danger">{{error}}</div>
          <label for="email" class="sr-only">Email address</label>
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="email"
            placeholder="Email address"
            required
            autocomplete="email"
          >
          <label for="password" class="sr-only">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            placeholder="Password"
            required
            autocomplete="current-password"
          >
          <!-- <p class="text-muted">
            <a href="javascript:;;">Forget password ?</a>
          </p> -->
          <router-link class="nav-link" to="/forgotpassword">Forget password ?</router-link>
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            <i class="fa fa-spinner fa-spin mr-1" v-if="showLoader"></i> Log In
          </button>
        </form>
        <p class="mt-3 text-muted">
          <span v-if="isSignUp">
            Already a member?
            <!-- <a href="javascript:;;" @click="toggleForm">Sign in</a> -->
          </span>
          <span v-if="!isSignUp">
            New?<router-link class="nav-link" to="/registration">Create an Account</router-link>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
    data() {
        return {
        email: "",
        password: "",
        showLoader: false,
        isSignUp: false,
        error:'',
        errors: [],
        
        };
    },
    methods: {
        login() {
            // alert("Asdsad");
        this.showLoader = true;

            this.errors = [];
            console.log(this.email);

        if (!this.email) {
            this.errors.push('Email required.');
        } else if (!this.validEmail(this.email)) {
            this.errors.push('Valid email required.');
        }
      

        firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then(data => {
        console.log(data.user);
        localStorage.setItem('uid', data.user.uid);
        localStorage.setItem('email', data.user.email);

        this.$router.replace({ name: "admin" });
      })
      .catch(err => {
        this.error = err.message;
        console.log(this.error);
      });

        
        //   const user = {
        //     email: this.email,
        //     password: this.password
        //   };

        //   axios
        //     .post(`${process.env.VUE_APP_BASE_URL}/login`, user)
        //     .then(response => {
        //       this.showLoader = false;
        //       this.ADD_LOGGED_USER(response.data[0]);
        //       event.target.reset();
        //       this.$router.push(this.$route.query.from || "/");
        //     })
        //     .catch(error => {
        //       this.showLoader = false;
        //       errorToaster("Invalid Credentials", "");
        //       console.log(error);
        //     });
        },
        validEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        }
    },
    
}
</script>
<style>


.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}



</style>
