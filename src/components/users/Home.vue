<template>
 <the-navigation></the-navigation>
    <div class="home ">
            <div class="">
                
                    <!-- <img alt="Vue logo" src="../../assets/cardLogo2.png" :style="{width:'100px'}">
                    <h3 class="display-5 "><span style="color:#42b983">shop</span></h3>
                    <p class="lead">Inspiring store to buy more.</p> -->
                 
                    <div id="carouselExampleIndicators" class="carousel slide s-des" data-interval="9000" data-ride="carousel">
                      <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" ></li>
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
       
        <form class="form-inline my-2 my-lg-0" @submit.prevent="searchProduct">
           <h1>Home</h1>
          <!-- <input class="form-control mr-sm-2" :style="{'margin-left': '62%'}" type="search"  v-model="search"  placeholder="Search"  aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
        </form>
        <div>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page">Some Product</li>
              <li class="ml-auto" aria-current="page"><router-link to="/product">Show All</router-link></li>
            </ol>
            
          </nav>
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



      <!-- ////////////resecent View/////////////// -->

        <div>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item active" aria-current="page">Recent View Product</li>
              <!-- <li class="ml-auto" aria-current="page"><router-link to="/products">Show All</router-link></li> -->
            </ol>
            
          </nav>
          <div class="products">
            <div class="row pd-2" >
            <div v-if="recentViewProduct == null" :style="{'text-align': 'right', 'padding': '15px'}" >
              <img class="" src="../../assets/20943559.png" alt :style="{'width':'30%'}">
              <br>
              <span>No Product Seen Yet</span> 
              <!-- <h3>No products v...</h3> -->
            </div>
            
              <div v-else class="col-md-12 order-md-2">
                <!-- <h4 class="mb-3">Billing address</h4> -->
                  <!-- <card-loader :loopCount=8 v-if="loading"/> -->
                  <!-- <vueper-slides
                    :style="{'padding':'30px'}"
                    class="no-shadow"
                    :visible-slides="3"
                    :arrows="true"
                    :slide-ratio="1 / 3"
                    :gap="3"
                    :dragging-distance="70"> -->
                    <vueper-slides
                      :style="{'padding':'30px'}"
                      class="no-shadow"
                      :visible-slides="4"
                      slide-multiple
                      :gap="3"
                      :slide-ratio="1 / 4"
                      :dragging-distance="200"
                      :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }">
                    <vueper-slide v-for="i in recentViewProduct" :key="i" >
                       <template v-slot:content>
                          <!-- <div class="vueperslide__content-wrapper" style="flex-direction: row">
                        
                            <span>{{ i.name }}</span>
                          </div> -->
                          
                          <card-template :item="i" />
                        </template>
                      </vueper-slide>
                  </vueper-slides>
                  <!-- <products-list :products_list="recentViewProduct" /> -->
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
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import CardTemplate from '../product/CardTemplate';

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
      recentViewProduct:[],
       selectedCategory: "All",
       search:null,
    }
  },
   components: {
    TheNavigation,
    ProductsList,
    VueperSlides, VueperSlide ,
    CardTemplate
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
        .limit(5)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.products.push({
              id: doc.id,
              name: doc.data().name,
              description:doc.data().description,
              price:doc.data().price,
              tags:doc.data().tags,
              discount:doc.data().discount,
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
        .limit(5)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.products.push({
              id: doc.id,
              name: doc.data().name,
              description:doc.data().description,
              price:doc.data().price,
              tags:doc.data().tags,
              discount:doc.data().discount,
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
        console.log("recentViewProduct");
        this.recentViewProduct= JSON.parse( sessionStorage.getItem('recentView'));
        console.log("recentViewProduct==>",this.recentViewProduct);

    
    },
     updateProductCategory(event, productFilterID) {
      console.log('productFilterID',event,productFilterID,this.selectedCategory);
      this.readData(this.selectedCategory);
    },
    searchProduct(){
     console.log(this.search) ;


     var searchString = 'Bingo No Rulz Masala Curlz Puffcorn (80 g).'   //Example of value

      db.collection('products')
      .orderBy('name')
      .startAt(searchString)
      .endAt(searchString + '\uf8ff')
      .get()
      .then((querySnapshot)=>{
        console.log(querySnapshot)
      });

    }
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
        /* margin-bottom: 2rem; */

    margin-left: 20px;
    margin-right: 20px;

  }
  .productFilter{
  padding: 25px 15px ;
  }
  .s-des{
    margin: 15px 30px;
  }
  .pd-2{
    padding-left: 2rem;
    padding-right: 2rem;

  }
  .vueperslides__parallax-wrapper{
        padding-bottom: 38.3333% !important;
  }
</style>