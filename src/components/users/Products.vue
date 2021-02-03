<template>
  <div class="products">
      <div class="container">
          
        <div class="intro h-100">
            <div class="row h-100 justify-content-center align-items-center">
              <div class="col-md-6">
                    <h3>Products Page</h3>
                    
                 <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.
                 </p>
              </div>
              <div class="col-md-6">
                  <img src="../../assets/svg/products.svg" alt="" class="img-fluid">
              </div>
            </div>
          </div>

          <hr>

          <div class="product-test">


            <h3 class="d-inline-block">Products list</h3>
              
              	
            <button @click="addNew" class="btn btn-primary float-right">Add Product</button>
            <button @click="addNewCatogery" class="btn btn-primary float-right mr-1">Add category</button>

            <div class="table-responsive">
              
                <table class="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Buy Price</th>
                      <th>Discount</th>
                      <th>Sale Price</th>
                      <th>Tags</th>
                      <th>Modify</th>
                    </tr>
                  </thead>

                  <tbody>
                      <tr v-for="product in products" :key="product">
                        <td>
                          {{product.name}}
                        </td>

                         <td>
                          {{product.description}}
                        </td>

                        <td>
                          ₹{{product.price}}
                        </td>

                         <td>
                          {{product.discount}}%
                        </td>

                        <td>
                          ₹{{Math.round(product.price-(product.price*product.discount/100))}}
                        </td>

                         <td>
                          {{product.tags}}
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
              <h5 class="modal-title" id="editLabel">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>

                    <div class="form-group">
                      <!-- <vue-editor v-model="product.description"></vue-editor> -->
                      <textarea class="form-control" rows="7" v-model="product.description" placeholder="add description"></textarea>
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>

                     <div class="form-group">
                      <label for="product_image">Discount(%)</label>
                     <input type="text" placeholder="Product Discount" v-model="product.discount" class="form-control">
                    </div>

                    <div class="form-group">
                      <!-- <input type="text" @keyup="addTag" placeholder="Product tags" v-model="tag" class="form-control"> -->
                      
                      <!-- <div  class="d-flex"> -->
                        <!-- <p v-for="tag in product.tags" :key="tag">
                            <span class="p-1">{{tag}}</span>
                        </p> -->
                        <label for="product_Category">Product Category</label>
                        <select v-model="product.tags" class="form-control">
                            <option disabled value="">Please select one</option>
                            <option v-for="item in this.$store.state.allCategory" :key="item" :value="item.name">{{item.name}}</option>
                        </select>

                      <!-- </div> -->
                    </div>


                    <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div>

                    <div class="form-group d-flex">
                      <div class="p-1" v-for="(image, index) in product.images" :key="index">
                          <div class="img-wrapp">
                              <!-- <img :src="image" alt="" width="80px"> -->
                              <img v-bind:src="image" :style="{width:'80px'}" /> 
                              <span class="delete-img" @click="deleteImage(image,index)">X</span>
                          </div>
                      </div>
                    </div>

                  </div>
                </div>




            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Save changes</button>
              <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button>
            </div>
          </div>
        </div>
      </div>


      <!-- modal catogory -->

      <div class="modal fade" id="category" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLabel">Edit Category</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Category Name" v-model="category.name" class="form-control">
                    </div>

                    <div class="form-group">
                      <!-- <vue-editor v-model="product.description"></vue-editor> -->
                      <textarea class="form-control" rows="7" v-model="category.description" placeholder="Add description"></textarea>
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Other Category</h4>
                    <hr>

                    <div   class="form-group">
                      <ul>
                        <li v-for="item in this.$store.state.allCategory" :key="item" >
                         {{item.name}}
                        </li>
                    </ul>
                      <!-- <input type="text" placeholder="Product price" v-model="category.price" class="form-control"> -->
                     
                    </div>


                  </div>
                </div>




            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addnewCategory()" type="button" class="btn btn-primary" v-if="modal == 'newCategory'">Save changes</button>
              <!-- <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button> -->
            </div>
          </div>
        </div>
      </div>


    
  </div>
</template>

<script>
// import { VueEditor } from "vue2-editor";
import  firebase from "firebase";
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
  firestore(){
    
      return {
        products:  db.collection('products'),
      }
  },
  methods:{
    deleteImage(img,index){
  
      let image = firebase.storage().refFromURL(img);
      this.product.images.splice(index,1);
      image.delete().then(function() {
        console.log('image deleted');
      }).catch(function(err) {
        // Uh-oh, an error occurred!
        console.log('an error occurred',err);
      });
    },
    addTag(){
    
       this.product.tags.push(this.tag);
       this.tag = "";
    },
    uploadImage(e){
    console.log(e.target.files[0]);
      if(e.target.files[0]){
        
          let file = e.target.files[0];
    
          var storageRef = firebase.storage().ref('products/'+ Math.random() + '_'  + file.name);
    
          let uploadTask  = storageRef.put(file);
    
          uploadTask.on('state_changed', (snapshot) => {
            console.log(snapshot);
          }, (error) => {
            // Handle unsuccessful uploads
            console.log(error);
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.product.images.push(downloadURL);
              console.log(this.product);
            });
          });
      }
    },
    reset(){
      
      this.product = {
          name:null,
          description:null,
          price:null,
          tags:[],
          images:[]
      }
    },
    addNew(){
      
        this.modal = 'new';
        this.reset();
        $('#product').modal('show');
    },
    addNewCatogery(){
      this.modal = 'newCategory';
      $('#category').modal('show');
    },
    updateProduct(){
      
         db.collection('products').doc(this.product.id).update(this.product);
          // Toast.fire({
          //   type: 'success',
          //   title: 'Updated  successfully'
          // })
           $('#product').modal('hide');
    },
    editProduct(product){
      
      this.modal = 'edit';
      this.product = product;
      console.log(this.product);
      $('#product').modal('show');
    },
    deleteProduct(doc){

      if(confirm("Do you really want to delete?")){  
        db.collection('products').doc(doc.id).delete();
        this.readData();
      
      }
      
      // Swal.fire({
      //   title: 'Are you sure?',
      //   text: "You won't be able to revert this!",
      //   type: 'warning',
      //   showCancelButton: true,
      //   confirmButtonColor: '#3085d6',
      //   cancelButtonColor: '#d33',
      //   confirmButtonText: 'Yes, delete it!'
      // }).then((result) => {
      //   if (result.value) {
          //  db.collection('products').doc(doc.id).delete()
          // Toast.fire({
          //   type: 'success',
          //   title: 'Deleted  successfully'
          // })
        
      //   }
      // })
      console.log(doc);
        
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
              discount:doc.data().discount,
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
    addProduct(){
      // console.log(db.collection('products'))
      //  db.collection('products').add(this.product);
      console.log(this.products)
       db.collection('products').add(this.product).then(() => {
                    // 
                    // this.user.name = ''
                    // this.user.email = ''
                    // this.user.phone = ''
                    this.readData();
                }).catch((error) => {
                    console.log(error);
                })
          // Toast.fire({
          //   type: 'success',
          //   title: 'Product created successfully'
          // })
          
      $('#product').modal('hide');
    },
    addnewCategory(){
      db.collection('productsCategory').add(this.category).then(() => {
      }).catch((error) => {
          console.log(error);
      })
       $('#category').modal('hide');
    },
     
     
  
  },
  mounted() {
    this.readData();
     this.$store.commit('readCategoryData')
  },
  // beforeMount(){
   
  // // console.log( fb.auth().currentUser.uid);
  // // alert("sada");
  // // console.log(  db.collection('products').get());
  //   db.collection("products").get()
  //   .then(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //       // doc.data() is never undefined for query doc snapshots
  //       this.product.push({
  //        name:doc.data().name,
  //         description:doc.data().description,
  //         price:doc.data().price,
  //         tags:doc.data().tags,
  //         images:doc.data().images
  //       });
  //       console.log( doc.data().name);
  //     });
  //   })
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.img-wrapp{
  position: relative;
}
.img-wrapp span.delete-img{
    position: absolute;
    top: -14px;
    left: -2px;
}
.img-wrapp span.delete-img:hover{
  cursor: pointer;
}
</style>