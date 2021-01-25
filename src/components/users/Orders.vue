<template>
<the-navigation v-if="currentRouteName == 'myorder'"></the-navigation>
  <div class="products1">
      <div class="container">
          
        <div class="intro h-100">
            <div class="row h-100 justify-content-center align-items-center">
              <div class="col-md-6">
                    <h3>Orders Page</h3>
                    
                 <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.
                 </p>
              </div>
              <div class="col-md-6">
                  <img src="../../assets/svg/orders.svg" alt="" class="img-fluid">
              </div>
            </div>
          </div>

          <hr>

          <div class="product-test">


            <h3 class="d-inline-block">Orders list</h3>
            <!-- <button @click="addNew" class="btn btn-primary float-right">Add Orders</button> -->

            <div class="table-responsive">
              
                <table class="table">
                  <thead>
                    <tr>
                      <th>Placed By</th>
                      <th>Products</th>
                      <th>Order Date</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th v-if="currentRouteName != 'myorder'">Modify</th>
                      
                    </tr>
                  </thead>

                  <tbody>
                      <tr v-for="product in this.$store.state.allOrder" :key="product">
                        <td>
                          {{product.orderPlacedBy}}
                        </td>

                        <td>
                          <ul v-for="orderdetais in product.productDetais" :key='orderdetais' id="demo">
                            <li >
                              {{orderdetais.name}}
                            </li>
                          </ul>
                        </td>
                        <td>
                          {{product.date}}
                        </td>

                        <td>
                          ₹{{product.price}}
                        </td>

                        <td>
                          {{product.orderStatus}}
                        </td>

                        <td v-if="currentRouteName != 'myorder'">
                          <button class="btn btn-primary" @click="editProduct(product)">Edit</button>
                          <!-- <button class="btn btn-danger" @click="deleteProduct(product)">Delete</button> -->
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
              <h5 class="modal-title" id="editLabel">Edit Order</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                
                  <div class="col-md-8">
                    <div class="form-group">
                      <h6>user Details</h6>
                      <hr>
                      <ul>
                        <li v-for='(value,name) in product.orderuserDetails' :key='name' class="pt-0 pb-0">
                        {{name}} - {{value}}
                        
                        </li>
                      </ul>
                      
                      <!-- <input type="text" placeholder="Product Name" v-model="product.orderPlacedBy" class="form-control"> -->
                      <!-- <h6>User Details</h6> -->
      
                        
                    </div>

                    <div class="form-group">
                      <h6>Product Details</h6>
                     <table class="table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Catagoris</th>
                          </tr>
                        </thead>

                        <tbody>
                            <tr v-for=" item in product.productDetais" :key="item">
                              <td>
                                {{item.name}}
                              </td>

                              <td>
                                ₹{{item.price}}
                              </td>
                              <td>
                                {{item.quantity}}
                              </td>

                              <td>
                                {{item.tags}}
                              </td>
                            </tr>
                        </tbody>
                      </table>

                      <!-- <textarea class="form-control" rows="7" v-model="product.description" placeholder="add description"></textarea> -->
                    </div>
                  </div>
                 
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                       <label >Total Price:</label>
                      <input type="text" readonly placeholder="Product price" v-model="product.price" class="form-control">
                    </div>

                    <div class="form-group">
                       <label >Oder placed on:</label>
                      <input type="text" placeholder="Product price" readonly v-model="product.date" class="form-control">
                    </div>

                    

                    <div class="form-group">
                        <label for="product_Category">Status :</label>

                        <select v-model="product.orderStatus" class="form-control">
                            <!-- <option disabled value="product.orderStatus" selected >{{product.orderStatus}}</option> -->
                            <option :selected="product.orderStatus == 'complete'" :value="'complete'">Completed</option>
                            <option :selected="product.orderStatus == 'cancle'" :value="'cancle'">Cancle</option>
                            <option :selected="product.orderStatus == 'placed'" :value="'placed'">In Process</option>
                        </select>
                    </div>


                    <!-- <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div> -->

                    <!-- <div class="form-group d-flex">
                      <div class="p-1" v-for="(image, index) in product.images" :key="index">
                          <div class="img-wrapp">
                             
                              <img v-bind:src="image" :style="{width:'80px'}" /> 
                              <span class="delete-img" @click="deleteImage(image,index)">X</span>
                          </div>
                      </div>
                    </div> -->

                  </div> 
                </div>




            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="updateOrder()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button>
            </div>
          </div>
        </div>
      </div>



    
  </div>
</template>
<script>
// import firebase from "firebase";
import TheNavigation from '../nav/TheNavigation.vue';
import { db } from '../../main';
import $ from 'jquery';
export default {
    data() {
        return {
          product: {},
        };
    },
    components: { TheNavigation },
    methods: {
      editProduct(product){
      
        this.modal = 'edit';
        this.product = product;
        console.log(product);
        $('#product').modal('show');
      },

      updateOrder(){
        db.collection('cardOrder').doc(this.product.id).update(this.product);
          $('#product').modal('hide');
          console.log(this.product.id);
          
      }
       
    },
    computed: {
      currentRouteName() {
          return this.$route.name;
      }
    },
    created() {
      console.log(this.$route.name);
      if(this.$route.name == 'myorder'){
        this.$store.commit('orderDetails');
      }else{
        this.$store.commit('userOrderDetails');
      }
     
   
    }
    
}
</script>
<style>
 .products1{
        margin: 2rem;
         background: #f2f2f2;
  }
  
</style>