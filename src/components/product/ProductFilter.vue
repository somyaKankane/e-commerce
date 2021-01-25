<template>
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
            v-for="(category, index) in categories"
            :key="index"
            v-bind:value="category"
          >{{category.name}}</option>
        </select>
      </div>
      
    
    </div>
    <!-- <create-product ref="createProduct"/> -->
  </div>
</template>

<script>

export default {
  name: "productFilter",
  // props: ["categories", "sellers"],
  // components: { CreateProduct },
  
  data() {
    return {
      selectedCategory: "All",
      selectedSeller: "All",
      showCreateProductModal: false,
      categories:[],
    };
  },
  methods: {
    // This method will trigger the parent Components (Prodcuts Component) function
    updateProductCategory(event, productFilterID) {
      console.log('productFilterID',productFilterID,this.selectedCategory);
      this.$parent.filterProductBy(event, productFilterID);
    },

  },
    mounted() {
    this.$store.commit('readCategoryData');
      this.categories=this.$store.state.allCategory;
    },
};
</script>

<style scoped>
.productFilter{
  padding: 25px 15px ;
}
</style>