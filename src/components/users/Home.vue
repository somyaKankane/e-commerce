<template>
 <the-navigation></the-navigation>
    <div class="home container">
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <img alt="Vue logo" src="../../assets/cardLogo2.png" :style="{width:'100px'}">
                    <h3 class="display-5 "><span style="color:#42b983">shop</span></h3>
                    <p class="lead">Inspiring store to buy more.</p>
                </div>
            </div>
        <h1>Home</h1>

           <div class="products" id="products">
      <div class="container">
          <h1 class="text-center p-5">Our Products List</h1>
          <div class="row">
              
              <div class="col-md-4" v-for="product in products" :key="product">
                  <!-- <div class="card product-item">

                        <carousel :perPage="1">
                          <slide v-for="(image, index) in product.images" :key="index">
                                <img :src="image" class="card-img-top" alt="..." width="250px">
                          </slide>
                        </carousel>
                
                        <div class="card-body">
                          <div class="d-flex justify-content-between">
                            <h5 class="card-title">{{ product.name }}</h5>
                            <h5 class="card-priceS">{{ product.price  }}</h5>

                          </div>
                           
                            <add-to-cart 
                                :image="getImage(product.images)"
                                :p-id="product.id"
                                :price="product.price"
                                :name="product.name">
                            </add-to-cart>
                        </div>
                    </div> -->
                    <div class="card product-item">
                          <slide v-for="(image, index) in product.images" :key="index">
                                <img :src="image" class="card-img-top" alt="..." width="250px">
                          </slide>
                        <div class="card-body">
                            <h5 class="card-title">{{ product.name }}</h5>
                             <p class="card-text">
                               {{ product.description  }}
                            </p>
                            <p class="card-priceS">
                               $ {{ product.price  }}
                            </p>
                            <a href="#" class="btn btn-primary">Add to Cart</a>
                        </div>
                    </div>
              </div>

          </div>
      </div>
    
  </div>
        
    </div>

    

    <!-- <h2>other</h2> -->
</template>
<script>
// import HelloWorld from "from './components/HelloWorld.vue";
import { mapGetters } from "vuex";
import TheNavigation from '../nav/TheNavigation.vue';
import { db } from '../../main';
export default {
    name: "home",
    // components:{
    //     HelloWorld
    // }UsersList.vue,UserItem.vue
    computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },

data(){
    return {
        products: [],
     
    }
  },
   components: {
    TheNavigation
  },
   methods:{
    getImage(images){
      return images[0];
    },
    readData(){
      this.products = [];
      db.collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.products.push({
              id: doc.id,
              name: doc.data().name,
              description:doc.data().description,
              price:doc.data().price,
              tags:doc.data().tags,
              images:doc.data().images
              // date: doc.data().date,
            });
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
        console.log(this.products);
    
    },
  },
  mounted() {
    this.readData();
  },
}
</script>
<style>
 .products{
        margin-top: 7rem;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
</style>