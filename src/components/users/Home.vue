<template>
 <the-navigation></the-navigation>
    <div class="home ">
            <div class="">
                
                    <!-- <img alt="Vue logo" src="../../assets/cardLogo2.png" :style="{width:'100px'}">
                    <h3 class="display-5 "><span style="color:#42b983">shop</span></h3>
                    <p class="lead">Inspiring store to buy more.</p> -->
                 
                    <div id="carouselExampleIndicators" class="carousel slide s-des" data-ride="carousel">
                      <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                      </ol>
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <!-- <img class="d-block w-100" src="..." alt="First slide"> -->
                          <img alt="Vue logo" class="d-block w-100" src="../../assets/download_A.jpeg" :style="{height:'400px',    'margin-bottom': '50px'}"  >
                        </div>
                        <div class="carousel-item">
                          <!-- <img class="d-block w-100" src="..." alt="Second slide"> -->
                          <img alt="Vue logo" class="d-block w-100" src="../../assets/download.jpeg"  :style="{height:'400px',    'margin-bottom': '50px'}" >
                        </div>
                        <div class="carousel-item">
                          <!-- <img class="d-block w-100" src="..." alt="Third slide"> -->
                          <img alt="Vue logo" class="d-block w-100" src="../../assets/4172581.jpg" :style="{height:'400px',    'margin-bottom': '50px'}"  >
                        </div>
                      </div>
                      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                      </a>
                      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                      </a>
                    </div>
                
                
            </div>
            <div class="container">
        <h1>Home</h1>
        <div>
          <div class="products">
            <div class="row">
              <div class="col-md-3 order-md-1 mb-4">

                <!-- <product-filter /> -->
                <div class="productFilter">
                  <div id="prdfilter">
                    <h4 class="d-flex mb-3">
                      <span class="text-muted">Filters:</span>
                    </h4>
                    <!-- <div class="form-group createProduct">
                      <button class="btn buttonGreen-outline" @click="openCreateModal">Create New Product</button>
                    </div> -->
                    <div class="form-group">
                      <label for="filterPrdCty">By Category:</label>
                      <select
                        class="form-control"
                        id="filterPrdCty"
                        v-model="selectedCategory"
                        @change="(event) => updateProductCategory(event, 'productCategory')"
                      >
                       <option
                          v-bind:value="'All'"
                        >All</option>
                        <option
                          v-for="(category, index) in categories"
                          :key="index"
                          v-bind:value="category"
                        >{{category.name}}</option>
                      </select>
                    </div>
                    
                  
                  </div>
                  <!-- <create-product ref="createProduct"/> -->
                </div>
                
              </div>
              <div class="col-md-8 order-md-2">
                <!-- <h4 class="mb-3">Billing address</h4> -->
                  <!-- <card-loader :loopCount=8 v-if="loading"/> -->
                  <products-list :products_list="product_duplicate" />
              </div>
            </div>
          </div>

        </div>
        </div>

    </div>

    


     
</template>
<script>
// import HelloWorld from "from './components/HelloWorld.vue";
import ProductsList from "../product/ProductsList";
import { mapGetters } from "vuex";
import TheNavigation from '../nav/TheNavigation.vue';
import { db } from '../../main';
// import { VueperSlides, VueperSlide } from 'vueperslides'
// import 'vueperslides/dist/vueperslides.css'

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
     products_list: [],
      product_duplicate: [],
       selectedCategory: "All",
    }
  },
   components: {
    TheNavigation,
    ProductsList,
  },
   methods:{
    getImage(images){
      return images[0];
    },
    readData(selectedCatData){
      this.products = [];
      console.log("selectedCatData",selectedCatData);
      if(selectedCatData == undefined || selectedCatData == 'All'){
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
            // console.log(doc.id, " => ", doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      }
      else{
        db.collection("products").where("tags", "==", selectedCatData.name)
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
            
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      }
     
        // console.log(this.products);

        this.products_list = this.products;
        this.product_duplicate = this.products;
    
    },
     updateProductCategory(event, productFilterID) {
      console.log('productFilterID',event,productFilterID,this.selectedCategory);
      this.readData(this.selectedCategory);
    },
  },
  mounted() {
    this.readData();
    this.$store.commit('readCategoryData');
      this.categories=this.$store.state.allCategory;

      this.$store.state.cardData=[];
      var len= localStorage.getItem('cart') || 0 ;
    console.log( len);
    if(len != 0){
      var data=JSON.parse(localStorage.getItem('cart') );
        data.forEach((value) => {
        this.$store.commit('productAlreadyExist', value);
      });
    }
  },
}
</script>
<style>
 .products{
        margin-top: 2rem;
        background: #f2f2f2;
        margin-bottom: 2rem;
  }
  .productFilter{
  padding: 25px 15px ;
  }
  .s-des{
    margin: 10px;
  }
</style>