<template>
  <div class="products">
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
            <button @click="addNew" class="btn btn-primary float-right">Add Orders</button>

            <div class="table-responsive">
              
                <table class="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Modify</th>
                    </tr>
                  </thead>

                  <tbody>
                      <tr v-for="product in products" :key="product">
                        <td>
                          {{product.name}}
                        </td>

                        <td>
                          {{product.price}}
                        </td>

                        <td>

                          <button class="btn btn-primary" @click="editProduct(product)">Edit</button>
                          <button class="btn btn-danger" @click="deleteProduct(product)">Delete</button>
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
              <h5 class="modal-title" id="editLabel">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                




            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Save changes</button>
              <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button>
            </div>
          </div>
        </div>
      </div>


    
  </div>
</template>
