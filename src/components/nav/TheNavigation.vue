<!-- <template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/teams">Teams</router-link>
        </li>
        <li>
          <router-link to="/users">Users</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>-->
<template>
  <div class="hello">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Shop</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
              <router-link class="nav-link" to="/home">Home</router-link>
              
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <!-- <li class="nav-item">
              
            </li> -->
        
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <div class="nav-item">
          <a class="nav-link pointing" :style="{color:'#28a745'}" @click.prevent="signOut">Sign out</a>
        </div>
      </div>
    </nav>

   

  </div>
  
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  name: 'NavBar',
  uid:'',
  props: {
    msg: String
  },
   computed: {
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
    beforeMount() {
      // console.log("asdad", localStorage.getItem(uid) );
      // this.uid = localStorage.uid;
      // alert(localStorage.uid);
      if(localStorage.uid == undefined || localStorage.email == undefined ){
        this.$router.replace({name: "login"});
      }else{
        this.$router.replace({name: "home"});
      }
    },

  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.clear();
          this.$router.replace({
            name: "login"
          });
        });
    },
    // beforeMount(){
    //  console.log("asdad", localStorage.getItem(uid) );
    // },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

