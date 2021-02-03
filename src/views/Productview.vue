<template>
 <the-navigation></the-navigation>
    <div class="home ">
            <div class="container">
       
       
           <h1>Products</h1>

        <div>
         
            
        
          <div class="products">
            <div class="row">
              <div class="col-md-3 order-md-1 mb-4">
                <div class="productFilter">
                  <div id="prdfilter">
                    <h4 class="d-flex mb-3">
                      <span class="text-muted">Filters:</span>
                    </h4>

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
import ProductsList from "../../src/components/product/ProductsList";
import { mapGetters } from "vuex";
import TheNavigation from '../components/nav/TheNavigation.vue';
import { db } from '../main';
// import { VueperSlides, VueperSlide } from 'vueperslides'
// import 'vueperslides/dist/vueperslides.css'

export default {
    name: "home",
  
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
       search:null,
    }
  },
   components: {
    TheNavigation,
    ProductsList,
  },
   methods:{

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
    margin: 15px 30px;
  }
  .pd-2{
    padding-left: 2rem;
    padding-right: 2rem;

  }
</style>