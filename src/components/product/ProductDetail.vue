<template>

  <div class="ProductDetail">
    
    <the-navigation></the-navigation>
  
    <div class="container">
         
      <div v-for="item in this.$store.state.singleProduct" :key="item" class="row mb-3">
        <div class="col-md-5">
          <div class="product-image">
            <!-- <div class="view hm-zoom z-depth-2" style="cursor: pointer"> -->
                             <!-- <vueper-slides
                     
                      class="no-shadow"
                      :visible-slides="2"
                      slide-multiple
                      :gap="3"
                      :slide-ratio="1 / 4"
                      :dragging-distance="200"
                      :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }">
                    <vueper-slide v-for="i in item.images" :key="i" >
                       <template v-slot:content>
                          <img
        class="img-fluid rounded"
        v-bind:src="i"
        alt="Card image cap"
        :style="{'max-height':'700px','max-width': '127.135px',margin:'auto'}"
      
      >

                        </template>
                      </vueper-slide>
                  </vueper-slides> -->


                  <vueper-slides
                  
  ref="vueperslides1"
  :touchable="false"
  fade
  :autoplay="false"
  :bullets="false"
  @slide="$refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })"
 fixed-height="400px"
  >
  <vueper-slide
    v-for="(slide, i) in item.images"
    :key="i"
    class="imgde"
    :image="slide">
  </vueper-slide>
</vueper-slides>

<vueper-slides
  class="no-shadow thumbnails"
  ref="vueperslides2"
  @slide="$refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
  :visible-slides=" item.images.length"
  fixed-height="75px"
  :bullets="false"
  :touchable="false"
  :gap="2.5"
  :arrows="false">
  <vueper-slide
    v-for="(slide, i) in item.images"
    :key="i"
    :image="slide"
    @click="$refs.vueperslides2.goToSlide(i)">
  </vueper-slide>
</vueper-slides>

                  
             
            <!-- </div> -->
            
           
          </div>
          
          
        </div>
  <div class="col-md-1 d-flex flex-column" :style="{'padding': '10px'}">
                  <a @click.prevent="share(facebook)" class="fa fa-facebook faDeg"></a>
                <a @click.prevent="share(twitter)" class="fa fa-twitter faDeg"></a>
                <a @click.prevent="share(linkedin)" class="fa fa-linkedin faDeg"></a>
                </div>

        <div class="col-md-6">
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
                  <th scope="row">Product Buy Price</th>
                  <td>
                    <!-- <div class="stars-outer">
                      <div class="stars-inner"></div>
                    </div> -->
                    ₹ {{item.price}}

                  </td>
                </tr>
                <tr v-if="item.discount !=0">
                  <th scope="row">Product Discount</th>
                  <td>{{item.discount}} %</td>
                </tr>
              </tbody>
            </table>

             <div class style="margin-top:15px">
              <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 class="my-0">Product Price</h6>
                  </div>
                  <span
                    class="text-muted"
                    style="color:crimson !important"
                  >₹ {{Math.round(item.price-(item.price*item.discount/100))}}</span>
                </li>
                
              </ul>
              
              <button class="btn btn-primary" v-on:click="addToCart(item)">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import TheNavigation from '../nav/TheNavigation.vue';
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
   props: {
            text: {
                type: String,
                required: true,
                default:""
            },
            url: {
                type: String,
                required: true,
                 default: window.location.href
            }
        },

  components: { TheNavigation , VueperSlides, VueperSlide },
  data() {
    return {
      product: null,
      similarProduct: [],
       providers: {
                    twitter: 'https://twitter.com/intent/tweet/?url=:url&text=:text',
                    facebook: 'https://www.facebook.com/sharer/sharer.php?u=:u&title=:title',
                    linkedin:'https://www.linkedin.com/sharing/share-offsite/?url=:u&title=:title'
                    // =https%3A%2F%2Fnews.vuejs.org%2Fissues%2F180
                }
                
    };
  },
    computed: {
            facebook() {
             
                return this.providers.facebook.replace(':u',this.url).replace(':title', this.text);
            },
            twitter() {
                return this.providers.twitter.replace(':url',this.url).replace(':text', this.text);
            },
            linkedin() {
             
                return this.providers.linkedin.replace(':u',this.url,).replace(':title', this.text);
            },
        },
  methods: {
     share(url) {
                window.open(url, 'sharer', 'toolbar=0,status=0,width=648,height=395');

                return true;
            },
    getSimilarProduct(productSeller) {
    
          console.log(productSeller);

    },

   
    addToCart(product) {
      // this.ADD_CART_LOCAL(product);
        this.$store.commit('productAddToCard', product);
        this.$swal({  
        
        type: "success",  
        icon: "success",
        title: "Success",  
        text: "Item Added Succesfully", 
        
      }); 
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
.faDeg {
    padding: 5px;
    font-size: 15px;
    width: 25px;
    text-align: center;
    text-decoration: none;
    margin: 3px 0px;
    border-radius: 50px;
}



.thumbnails {
  margin: auto;
  max-width: 300px;
}

.thumbnails .vueperslide {
  box-sizing: border-box;
  border: 1px solid #fff;
  transition: 0.3s ease-in-out;
  opacity: 0.7;
  cursor: pointer;
}

.thumbnails .vueperslide--active {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  opacity: 1;
  border-color: #000;
}
.vueperslides--fixed-height .vueperslides__parallax-wrapper {
    padding-bottom: 33.3333%!important;
}
.vueperslides__arrow{
  color: black !important;
}

.imgde{
  background-repeat: no-repeat;
  background-size: 300px 300px !important;
}
</style>
