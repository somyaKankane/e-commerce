<template>
  <div class="login container">
    <div class="row">
      <div class="col text-center">
        <!-- <createAccount v-if="isSignUp"></createAccount> -->

        <form class="form-signin" @submit.prevent="forgetPassword">
          <img class="mb-4" src="../../assets/forgotpassword.png" alt width="100" height="100">
          <h1 class="h3 mb-3 font-weight-normal">Forgot Password</h1>

          <div v-if="error" class="alert alert-danger">{{error}}</div>
          <div class="mb-3">
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
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            <i class="fa fa-spinner fa-spin mr-1" v-if="showLoader"></i> Reset password
          </button>
        </form>

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
       
        showLoader: false,
        isSignUp: false,
        error:'',
      
        
        };
    },
    methods: {
       forgetPassword() {
        firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
            // alert('Check your registered email to reset the password!')
            this.$swal({  
                  title: "Info",  
                  text: "Check your registered email to reset the password!",  
                  type: "warning",  
                  icon: 'info',
                  // showCancelButton: true,  
                  // confirmButtonColor: "#4026e3",  
                  // confirmButtonText: "Yes, remove it it!"  
                  }).then(() => { // <--  
                    this.user = {   
                      email: ''
                    }
                     this.$router.push('/login')  ;
                  });  
           
        }).catch((error) => {
          // alert(error)
           this.error = error.message;
        })
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
