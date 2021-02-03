
<template>
  <div class="products">
      <div class="container">
          
        <div class="intro h-100">
            <div class="row h-100 justify-content-center align-items-center">
              <div class="col-md-6">
                <h3>Coupon Page</h3>
                 <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.
                 </p>
              </div>
              <div class="col-md-6">
                  <img src="../../assets/svg/overview.svg" alt="" class="img-fluid">
              </div>
            </div>
          </div>

          <hr>

          <div class="product-test">


            <h3 class="d-inline-block">Coupon list</h3>
              
              	
            <button @click="addNew" class="btn btn-primary float-right">Add Coupon</button>
            

            <div class="table-responsive">
              
                <table class="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Discount Type</th>
                      <th>Status</th>
                      <th>Modify</th>
                    </tr>
                  </thead>

                  <tbody>
                      <tr v-for="product in this.$store.state.allCoupon" :key="product">
                        <td  :style="{'text-transform':'uppercase'}">
                          {{product.name}}
                        </td>

                        <td>
                          {{product.description}}
                        </td>

                        <td>
                          ₹{{product.amount}}
                        </td>

                        <td>
                          {{product.discountType}}
                        </td>


                        <td>
                          {{product.status}}
                        </td>

                        <td>

                          <button class="btn btn-primary" @click="editProduct(product)"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                          <button class="btn btn-danger" @click="deleteProduct(product)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </td>

                      </tr>


                  </tbody>
                </table>
            </div>

          </div>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLabel">Edit Coupon</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <label for="product_image">Add New Coupon</label>
                      <input type="text" placeholder="Coupon Name" v-model="coupon.name"  :style="{'text-transform':'uppercase'}" class="form-control">
                    </div>

                    <div class="form-group">
                      <!-- <vue-editor v-model="product.description"></vue-editor> -->
                      <textarea class="form-control" rows="7" v-model="coupon.description" placeholder="add description"></textarea>
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <!-- <div class="form-group">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>-->

                     <div class="form-group">
                      <label for="product_image">Amount</label>
                     ₹<input type="text" placeholder="Coupon Amount" v-model="coupon.amount" class="form-control">
                    </div> 

                    <div class="form-group">

                        <label for="product_Category">Discount Type</label>
                        <select v-model="coupon.discountType" class="form-control">
                            <option disabled value="">Please select one</option>
                            <!-- <option :value="product">Product</option> -->
                            <option :value="'category'">Category</option>
                            <!-- <option :value="order">Order</option> -->
                          
                        </select>
                        
                    </div>

                    <div class="form-group">

                        <label for="product_Category">Status</label>
                        <select v-model="coupon.status" class="form-control">
                            <option disabled value="">Please select one</option>
                            <option :value="'publish'">Publish</option>
                            <option :value="'expire'">Expire</option>
                            <!-- <option :value="order">Order</option> -->
                           
                        </select>
                        
                    </div>

                   
                   


                   

                   

                  </div>
                </div>




            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Save</button>
              <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button>
            </div>
          </div>
        </div>
      </div>


     

      
    
  </div>
</template>

<script>
// import { VueEditor } from "vue2-editor";
import { db } from '../../main';
import $ from 'jquery';
import 'firebase/storage';
export default {
  name: "Products",
  components: {
    // VueEditor
  },
  props: {
    msg: String
  },
  data(){
    return {
      // employeesData: [],
      coupon:{},
        products: [],
        product: {
          name:null,
          description:null,
          price:null,
          discount:null,
          tags:[],
          images:[]
        },
         category: {
          name:null,
          description:null,
          
        
        },
        activeItem:null,
        modal: null,
        tag: null
    }
  },

  methods:{

    reset(){
      
      this.coupon = {}
    },
    addNew(){
      
        this.modal = 'new';
        this.reset();
        $('#product').modal('show');
    },

    updateProduct(){
     db.collection('coupon').doc(this.coupon.id).update(this.coupon);
      $('#product').modal('hide');
    },
    editProduct(product){
      
      this.modal = 'edit';
      this.coupon = product;
      $('#product').modal('show');
    },
    deleteProduct(doc){

      if(confirm("Do you really want to delete?")){  
        db.collection('coupon').doc(doc.id).delete();
        this.readData();
      
      }
      
      console.log(doc);
        
    },
    readData(){

       this.$store.commit('addCoupon')

    
    },
    addProduct(){
      // console.log("alert",this.coupon);
       db.collection('coupon').add(this.coupon).then(() => {
          this.readData();
          alert("added succesfully");
          this.reset();
        }).catch((error) => {
          console.log(error);
        })
      $('#product').modal('hide');
    },


     
  
  },
  mounted() {
    this.readData();
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
