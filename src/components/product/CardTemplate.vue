<template>
  <div class="cardTemplate">
    <div class="card mb-4 shadow-sm">
      <img
        class="card-img-top mt-2"
        v-bind:src="item.images"
        alt="Card image cap"
        :style="{'max-height':'700px','max-width': '127.135px',margin:'auto'}"
      
      >
      <div class="card-body">
        <h6 class="card-title">{{item.name}}.</h6>
        <hr>
        <!-- <p class="card-text">{{item.description}}.</p> -->
         <div class="product-price">
        <span>₹ {{ item.price }}, 00</span>
        <span>10 x {{ Math.round(item.price / 10) }}, 00 </span>
      </div>
      </div>
      
      <div class="card-footer bg-transparent " :style="{border: 'none' }">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              v-on:click="navigateProductDetail(item)"
            >View</button>
             <button
              type="button"
              class="btn btn-sm btn-outline-secondary float-right"
              v-on:click="addToCart(item)"
            >Add To Card</button> 
      </div>

    </div>
  </div>
  
</template>

<script>
// import  firebase from "firebase";
// import { db } from '../../main';
export default {
  name: "cardTemplate",
  props: ["item"],
  data() {
    return {
      showModal: false
    };
  },
  components: {},
  methods: {
    navigateProductDetail(product) {
      console.log(product.id);
      this.$router.push({name:'productDetails',params: { id:  product.id}})  ;

    },

  

    addToCart(product) {
   
       this.$store.commit('productAddToCard', product)
     
    },


   
  },
  mounted() {}
};
</script>
<style scoped>
  .cardTemplate {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0;
  }

  .product {
    width: 300px;
    background-color: #fff;
    list-style: none;
    box-sizing: border-box;
    padding: 1em;
    margin: 1em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 7px;
  }

  .product-name {
    font-size: 1.2em;
    font-weight: normal;
  }

  .product-name:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .product-price {
    width: 100%;
    align-self: flex-start;
    display: flex;
    justify-content: space-between;
    margin-bottom: .5em;
  }

</style>