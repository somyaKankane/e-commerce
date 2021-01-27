
<template>
  <div class="hello">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- <img alt="Vue logo" src="../assets/cardLogo2.png" width="50px"> -->
      <img alt="Vue logo" src="../../assets/cardLogo2.png" :style="{width:'50px'}">
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
         <li v-if="currentRouteName == 'admin'" class="nav-item ">
              <router-link class="nav-link" to="/profile">Profile</router-link>
              
          </li>
          
          <li v-if="currentRouteName == 'admin' " class="nav-item">
            <router-link class="nav-link" to="/addproduct">Add Product</router-link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <div class="nav-item">
          <!-- <a class="nav-link pointing" :style="{color:'#28a745'}" @click.prevent="signOut">Sign out</a> -->
          <!-- <i class="fa fa-line-chart"></i> -->
          <!-- <vue-fontawesome icon="shopping-bag" class="nav-link pointing" size="2" color="#28a745"></vue-fontawesome> -->
        </div>
         <div   class="add-to-cart pointing">
            
   
           <div class="dropdown">
            <!-- <button class="add-to-cart pointing" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> -->
            <vue-fontawesome  icon="user"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link  btn btn-small  btn-popup" size="1.5" color="#28a745"></vue-fontawesome>
            <!-- </button> -->
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <!-- <router-link class="dropdown-item"  to="/profile">  -->
               <a class="dropdown-item" @click="profilePagr()">
              <i class="fa fa-user"></i>
                &nbsp;<span>Profile</span>  
              </a>
              <a class="dropdown-item" @click="order()">
                <i class="fa fa-shopping-basket"></i>
                &nbsp;<span>Orders</span>
              </a>
              <a class="dropdown-item" @click="wishlist()">
                <i class="fa fa-heart" ></i>
                &nbsp;<span>Wishlist</span>
              </a>
              <a class="dropdown-item" @click="logout()">
                <i class="fa fa-power-off"></i>
                &nbsp;<span>Logout</span>
              </a>
              <!-- <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a> -->
            </div>
          </div>
               
              
         
          
          </div>

          <div v-if="currentRouteName != 'checkout'" @click="addToCart" class="add-to-cart pointing">
            
   
           <vue-fontawesome  icon="shopping-bag" class="nav-link  btn btn-small  btn-popup" size="1.5" color="#28a745"></vue-fontawesome>      
          <span class="btn-circle" >
           {{ getProductsInCart.length }}
        </span>
          
          </div>

          
          
      </div>
    </nav>

   

  </div>
  
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import $ from 'jquery';
import { db } from '../../main';
export default {
  name: 'NavBar',
  uid:'',
  props: {
    msg: String,
     name: String,
    price: String,
    image: String,
    pId: String
  },
   computed: {
    ...mapGetters([
      'getProductsInCart',
    ]),
     data(){
      return {
          item : [],
          products: [],
      }
  },
    currentRouteName() {
      return this.$route.name;
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
     addToCart(){
      // this.$store.commit('saveCardDataToFirebase');
         this.checkout();
      
     

    },
    checkout(){
       this.$router.push({name:'checkout',params: { id: localStorage.getItem("cart") }})  ;
    },

 
    catchData(){
    var currentUser = localStorage.getItem('uid');
      this.products = [];
      db.collection("cardOrder").where("uidDetails", "==", currentUser)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.products.push({
             
              name: doc.data().productDetais.name,
              description:doc.data().productDetais.description,
              price:doc.data().productDetais.price,
              tags:doc.data().productDetais.tags,
              images:doc.data().productDetais.images
              // date: doc.data().date,
            });
            
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
          console.log("dfsd",this.products);
           window.localStorage.setItem('cart', JSON.stringify(this.products));
        $('#miniCart').modal('show')

    
  },
  profilePagr(){
    this.$router.replace({name: "userprofile"});
  },
  order(){
    this.$router.replace({name: "myorder"});
  },
  wishlist(){
    this.$router.replace({name: "wishlist"});
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
      },
   hasProduct() {
      return this.getProductsInCart.length > 0;
    },

    
  },
  mounted() {
    // console.log( JSON.parse(localStorage.getItem('cart')) );
    // // this.catchData();
    // var data=JSON.parse(localStorage.getItem('cart') );
    //   data.forEach((value) => {
    //   this.$store.commit('productAlreadyExist', value)
    // });
    // this.$store.commit('productAddToCard', product)
  },

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-circle {
   width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    right: 20px;
    background-color: red;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>

