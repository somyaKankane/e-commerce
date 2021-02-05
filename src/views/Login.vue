<template>
  <div class="wrapper fadeInDown">
  <div id="formContent">
    <!-- Tabs Titles -->

    <!-- Icon -->

    <!-- Login Form -->
    <form class="form-signin" @submit.prevent="login">
          
          <img class="" src="../assets/Studio_Project.png" alt :style="{'width':'90%'}">
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
            class="form-control "
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

          <router-link class="nav-link" to="/forgotpassword">Forget password ?</router-link>
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            <i class="fa fa-spinner fa-spin mr-1" v-if="showLoader"></i> Log In
          </button>
        </form>

    <!-- Remind Passowrd -->
    <div id="formFooter">
     <!-- <p class="mt-3 text-muted"> -->
       <div>
       
       
        
    </div>
          <span v-if="isSignUp">
            Already a member?
            
          </span>
          <span v-if="!isSignUp">
            New?<router-link class="nav-link" to="/registration">Create an Account</router-link>
          </span>
          <div>
            <a @click.prevent="share(facebook)" class="fa fa-facebook faDes"></a>
            <a @click.prevent="share(twitter)" class="fa fa-twitter faDes"></a>
            <a @click.prevent="share(linkedin)" class="fa fa-linkedin faDes"></a>
          </div>
        <!-- </p> -->
    </div>

  </div>
</div>
</template>
<script>
import firebase from "firebase";
import { db } from '../main';
export default {
   props: {
            text: {
                type: String,
                required: true,
                default:""
            },
            url: {
                type: String,
                required: true,
                 default: 'https://news.vuejs.org'
            }
        },

    data() {
        return {
        email: "",
        password: "",
        showLoader: false,
        isSignUp: false,
        error:'',
        errors: [],
        // url: window.location.origin+'/home',
        providers: {
                    twitter: 'https://twitter.com/intent/tweet/?url=:url&text=:text',
                    facebook: 'https://www.facebook.com/sharer/sharer.php?u=:u&title=:title',
                    linkedin:'https://www.linkedin.com/sharing/share-offsite/?url=:u&title=:title'
                    // =https%3A%2F%2Fnews.vuejs.org%2Fissues%2F180
                }
                
        
        };
    },
    computed: {
            facebook() {
             
                return this.providers.facebook.replace(':u',this.url).replace(':title', this.text);
            },
            twitter() {
                return this.providers.twitter.replace(':url',this.url).replace(':text', this.text);
            },
            linkedin() {
             
                return this.providers.linkedin.replace(':u', 'https://news.vuejs.org',).replace(':title', this.text);
            },
        },
    methods: {
       share(url) {
                window.open(url, 'sharer', 'toolbar=0,status=0,width=648,height=395');

                return true;
            },
        login() {
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
        

         db.collection("profiles").where("uid", "==", data.user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.data());
            localStorage.setItem('role',doc.data().userRole);
            if(doc.data().role == "admin"){
               this.$router.replace({ name: "admin" });
            }
            else {
              this.$router.push({name:'home'})  ;
            }
            
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });



       
      })
      .catch(err => {
        this.error = err.message;
         this.showLoader = false;
        console.log(this.error);
      });

        
        
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

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column; 
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 15px 20px 15px 20px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 12px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}



/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}



/* FORM TYPOGRAPHY*/

input[type=button], input[type=submit], input[type=reset]  {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
  background-color: #39ace7;
}

input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type=text] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  /* padding: 15px 32px; */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

/* input[type=text]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
} */

input[type=text]:placeholder {
  color: #cccccc;
}



/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

.fadeIn {
  opacity:0;
  -webkit-animation:fadeIn ease-in 1;
  -moz-animation:fadeIn ease-in 1;
  animation:fadeIn ease-in 1;

  -webkit-animation-fill-mode:forwards;
  -moz-animation-fill-mode:forwards;
  animation-fill-mode:forwards;

  -webkit-animation-duration:1s;
  -moz-animation-duration:1s;
  animation-duration:1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after{
  width: 100%;
}



/* OTHERS */

*:focus {
    outline: none;
} 

#icon {
  width:60%;
}

.faDes {
  padding: 5px;
  font-size: 30px;
  width: 25px;
  text-align: center;
  text-decoration: none;
  margin: 5px 2px;
  border-radius: 50px;

}

.faDes:hover {
    opacity: 0.7;
}
.fa-facebook {
  background: #3B5998;
  color: white;
}

.fa-twitter {
  background: #55ACEE;
  color: white;
}
.fa-linkedin {
  background: #007bb5;
  color: white;
}




</style>
