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
          <div class="add-to-cart">
   
           <vue-fontawesome @click="addToCart" icon="shopping-bag" class="nav-link pointing" size="2" color="#28a745"></vue-fontawesome>      
          </div>

           <div class="mini-cart">
   
        <!-- Modal -->
        <div class="modal fade" id="miniCart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">My Bag</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                  <ul>
                    <li class="media">
                      <!-- <img :src="item.productImage" width="80px" class="align-self-center mr-3" alt=""> -->
                      <div class="media-body">
                        <h5 class="mt-0">abc
                          <span class='float-right' @click="$store.commit('removeFromCart',item)">X</span>
                        </h5>
                        <p class="mt-0">65$</p>
                        <p class="mt-0">Quantity : 5</p>
                      </div>
                    </li>

                  </ul>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Continue Shopping</button>
                <button type="button" class="btn btn-primary" @click="checkout">Checkout</button>
              </div>
            </div>
          </div>
        </div>

    
  </div>
      </div>
    </nav>

   

  </div>
  
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
import $ from 'jquery';
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
    ...mapGetters({
// map `this.user` to `this.$store.getters.user`
      user: "user"
    }),
     data(){
      return {
          item :{
            productName: this.name,
            productImage: this.image,
            productPrice: this.price,
            productId: this.pId,
            productQuantity: 1,
          }
      }
  },
    currentRouteName() {
      return this.$route.name;
    }

  },
    // beforeMount() {
    //   // console.log("asdad", localStorage.getItem(uid) );
    //   // this.uid = localStorage.uid;
    //   // alert(localStorage.uid);
    //   if(localStorage.uid == undefined || localStorage.email == undefined ){
    //     this.$router.replace({name: "login"});
    //   }else{
    //     this.$router.replace({name: "home"});
    //   }
    // },

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
      $('#miniCart').modal('show');
      this.$store.commit('addToCart', this.item)
    },
    checkout(){
      $('#miniCart').modal('hide')
      this.$router.push('/checkout')  
    }
    // beforeMount(){
    //  console.log("asdad", localStorage.getItem(uid) );
    // },
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

