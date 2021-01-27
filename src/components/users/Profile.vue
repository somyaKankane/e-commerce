<template>
<the-navigation v-if="currentRouteName == 'userprofile'"></the-navigation>
  <div class="products1">
    
      <div class="container">
          
        <div class="intro h-100">
            <div class="row h-100 align-items-center">
              <div class="col-md-6 ml-3">
                    <h3>Profile settings</h3>
                    
                 <p>
                   Change your profile settings here
                 </p>
              </div>
              <div class="col-md-5">
                  <img src="../../assets/svg/profile.svg" width="300" alt="" class="img-fluid">
              </div>
            </div>
          </div>
<!-- {{profile}} -->

          <div class="profile-content">

          <ul class="nav nav-pills ml-3" id="myTab" role="tablist">

            <li class="nav-item">
              <a class="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">Profile</a>
            </li>

            <li class="nav-item">
              <a class="nav-link"  id="account-tab" data-toggle="tab" href="#account" role="tab" aria-controls="account" aria-selected="false">Account settings</a>
            </li>
           
          </ul>

            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active pt-3" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                  <div >
                      <div class="row">
                        
                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text" name="" v-model="profile.firstName" placeholder="First name" class="form-control">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text" name="" v-model="profile.lastName" placeholder="Last name" class="form-control">
                          </div>
                        </div>



                        <div class="col-md-12">
                          <div class="form-group">
                            <input type="text"  v-model="profile.address" placeholder="Address" class="form-control">
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text"  v-model="profile.phone" placeholder="Phone" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text"  v-model="profile.postCode" placeholder="Postcode" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text"  v-model="profile.email" placeholder="Email address" class="form-control">
                          </div>
                        </div>


                        <div class="col-md-4">
                          <div class="form-group">
                              <input type="submit" @click="updateProfile" value="Save Changes" class="btn btn-primary w-100">
                          </div>
                        </div>

                      </div>
                  </div>
                
                </div>

                <div class="tab-pane fade pt-3" id="account" role="tabpanel" aria-labelledby="account-tab">
                  <div >
                      <div class="row">
                        <div class="col-md-">
                            <div class="alert alert-info">
                              Please use the Reset password email button for reseting the password. The form doens't work currently
                            </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text" readonly v-model="account.name" placeholder="User name" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="text" readonly  v-model="account.email" placeholder="Email address" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="password"  v-model="account.password" placeholder="New password" class="form-control">
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="form-group">
                            <input type="password" v-model="account.confirmPassword"  placeholder="Confirm password" class="form-control">
                          </div>
                        </div>

                        <!-- <div class="col-md-4">
                          <div class="form-group">
                              <input type="file" @change="uploadImage" class="form-control">
                           </div>
                        </div> -->

                        <div class="col-md-4">
                          <div class="form-group">
                              <input type="submit" value="Save Changes" class="btn btn-primary w-100">
                          </div>
                        </div>

                        <div class="col-md-4">
                          <div class="form-group">
                              <input type="button" @click="resetPassword" value="Reset password " class="btn btn-success w-100">
                          </div>
                        </div>
                      </div>
                  </div>
                </div>

            </div>
            
          </div>

      </div>

    
  </div>
</template>

<script>
// import { VueEditor } from "vue2-editor";
// import { firebase, db} from '../firebase';
import  firebase from "firebase";
import { db } from '../../main';
import TheNavigation from '../nav/TheNavigation.vue';

export default {
  name: "profile",

  props: {
    msg: String
  },
  data(){
    return {
        profile: {
          
        },
        account:{
            name:null,
            email:null,
            photoUrl:null,
            emailVerified:null,
            password:null,
            confirmPassword:null,
            uid:null
        }     ,  
    }
  },
   components: { TheNavigation },
  firestore(){
      const user = firebase.auth().currentUser;
      return {
        profile: db.collection('profiles').doc(user.uid),
      }
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
},
  methods:{
      resetPassword(){
          const auth = firebase.auth();   
          console.log(auth.currentUser.email);       
          var user = firebase.auth().currentUser;
// var newPassword = getASecureRandomPassword();

user.updatePassword(this.account.password).then((data)=> {
  // Update successful.
  console.log("data",data)
  //  alert("password updated successfully");
    this.$swal({  
                type: 'success',  
                icon: 'success',
                title: 'Success',  
                text: 'Password Updated Successfully'  
            });  
}).catch(function(error) {
  // An error happened.
  alert(error.message)
  console.log(error.message);
});
          // auth.sendPasswordResetEmail(auth.currentUser.email).then((data) =>  {
          //     //  Toast.fire({
          //     //   type: 'success',
          //     //   title: 'Email sent'
          //     // })
          //     console.log(data)
          //     alert("success");
          // }).catch((error) =>  {
          //     console.log(error);
          // });
      },
      dataResponse(){
        this.$store.commit('userProfile');
      },
      updateProfile(){
          // this.$firestore.profile.update(this.profile);
          // console.log(this.profile)
           db.collection('profiles').doc(this.profile.id).update(this.profile).then(() =>  {
              // alert("update success");
               this.$swal({  
                type: 'success',  
                icon: 'success',
                title: 'Success',  
                text: 'Profile Updated Successfully'  
            });  
          }).catch((error) =>  {
              console.log(error);
          });
      },
      uploadImage(){}
  },
  
  created(){
    // this.firestore();
    //  this.profile= db.collection('profiles').doc(localStorage.getItem('uid')),
    // console.log(this.profile);
    // this.$store.commit('userProfile');
    // this.profile=this.$store.state.profile;
    // console.log("sdfsd",this.profile);
   this.dataResponse();
    setTimeout(() => {
       this.profile=this.$store.state.profile;
       this.account=this.$store.state.account;
    }, 2000); 
    
  }
};
</script>

<style>
 .products1{
        margin: 2rem;
         background: #f2f2f2;
  }
  
</style>