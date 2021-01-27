<template>
<the-navigation></the-navigation>
  <div class="products1">
      <div class="container">
          
        <div class="intro h-100">
            <div class="row h-100 justify-content-center align-items-center">
              <div class="col-md-6">
                    <h3>Wishlist Page</h3>
                    
                 <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.
                 </p>
              </div>
              <div class="col-md-6">
                  <img src="../assets/svg/20943429.png" :style="{'width': '80%'}" alt="" class="img-fluid">
              </div>
            </div>
          </div>

          <hr>

          <div class="product-test">


            <h3 class="d-inline-block">Product list</h3>
            <!-- <button @click="addNew" class="btn btn-primary float-right">Add Orders</button> -->
            <hr>

            <div class="table-responsive">
              
                 <products-list :products_list="this.$store.state.wishlist" />
            </div>

          </div>
      </div>

      <!-- Modal -->
      



    
  </div>
</template>
<script>
// import firebase from "firebase";
import TheNavigation from '../components/nav/TheNavigation.vue';
import ProductsList from "../components/product/ProductsList";

export default {
    data() {
        return {
          product: {},
        };
    },
    components: { TheNavigation, ProductsList },
    methods: {



       
    },
    computed: {
      
    },
    created() {
     
        this.$store.commit('Wishlist');
      
     
   
    }
    
}
</script>
<style>
 .products1{
        margin: 2rem;
         background: #f2f2f2;
  }
  
</style>