<template>

  <div class="ProductDetail">
    
    <the-navigation></the-navigation>
    <div class="container">
      
      <div v-for="item in this.$store.state.singleProduct" :key="item" class="row mb-3">
        <div class="col-sm-4">
          <div class="product-image">
            <div class="view hm-zoom z-depth-2" style="cursor: pointer">
              <img
        class="img-fluid rounded"
        v-bind:src="item.images"
        alt="Card image cap"
        :style="{'max-height':'700px','max-width': '127.135px',margin:'auto'}"
      
      >

            </div>
            <div class style="margin-top:15px">
              <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Product Price</h6>
                  </div>
                  <span
                    class="text-muted"
                    style="color:crimson !important"
                  >₹ {{item.price}}</span>
                </li>
                
              </ul>
              <button class="btn btn-primary" v-on:click="addToCart(item)">Add to Cart</button>
            </div>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="product-detail">
            <h5 class="product-head">Product Details</h5>
            <table class="table" cellspacing="0" style="max-height: 28px">
              <tbody>
                <tr>
                  <th scope="row">Product Name</th>
                  <td>{{item.name}}</td>
                </tr>
                <tr>
                  <th scope="row">Product Description</th>
                  <td>{{item.description}}</td>
                </tr>
                <tr>
                  <th scope="row">Product Category</th>
                  <td>{{item.tags}}</td>
                </tr>
                <tr>
                  <th scope="row">Product Rating</th>
                  <td>
                    <div class="stars-outer">
                      <div class="stars-inner"></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import TheNavigation from '../nav/TheNavigation.vue';
export default {

  components: { TheNavigation },
  data() {
    return {
      product: null,
      similarProduct: [],
    };
  },
  methods: {
    getSimilarProduct(productSeller) {
    
          console.log(productSeller);

    },

   
    addToCart(product) {
      // this.ADD_CART_LOCAL(product);
        this.$store.commit('productAddToCard', product)
    }
  },
  created() {
     this.$store.commit('singleProductDetails', this.$route.params.id)
   
  }
};
</script>

<style>
.product-detail {
  text-align: start;
}

.product-detail .product-head {
  padding: 10px;
  font-weight: 500;
}

.product-detail .table th {
  width: 152px;
}

.product-ship {
  height: 15rem;
}

.stars-outer {
  display: inline-block;
  position: relative;
  /* font-family: FontAwesome; */
}

.stars-outer::before {
  content: "\f006 \f006 \f006 \f006 \f006";
}

.stars-inner {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
}

.stars-inner::before {
  content: "\f005 \f005 \f005 \f005 \f005";
  color: #f8ce0b;
}
</style>
