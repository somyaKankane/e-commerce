<template>
  <div class="chekout">
       <!-- <Navbar></Navbar> -->
<the-navigation></the-navigation>
 <!-- <div class="intro h-100">
            <div class="row h-100 justify-content-center align-items-center">

                    <h3>Orders Page</h3>

            </div>
 </div> -->
 <form  @submit.prevent="submitCard" novalidate>
   
        <div class="container">
          <div v-if="errors.length">
            <p v-for="error in errors" :key="error"  class="alert alert-danger" role="alert" >
                {{ error }}
            </p>
          </div>
          <div v-if="proactive.length == 0" class="checkout-message">
            <h3>No products...</h3>
            <router-link to="./home">Back to list of products</router-link>
          </div>
            <div  v-else class="row">

                <div class="col-md-6">
                  <accordion>
                          <accordion-item>
                            <!-- This slot will handle the title/header of the accordion and is the part you click on -->
                            <template v-slot:accordion-trigger>
                              <h4 :style="{'padding': '5px'}">Shipping Address</h4>
                            </template>
                            <!-- This slot will handle all the content that is passed to the accordion -->
                            <template v-slot:accordion-content>
                               <div class="p-de">
                             <div class="panel panel-info">
                      
                        <div class="panel-body">
                            <!-- <div class="form-group">
                                <div class="col-md-12">
                                    <h5>Shipping Address</h5>
                                </div>
                            </div> -->
                            <div class="form-group">
                                <div class="col-md-12"><strong>Country:</strong></div>
                                <div class="col-md-12">
                                    <input type="text" class="form-control"   name="country" id="country" v-model="user.country" required/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12">
                                    <strong>First Name:</strong>
                                    <input type="text" name="first_name" class="form-control" id="first_name"  v-model="user.firstName" required/>
                                </div>
                                <div class="span1"></div>
                                <div class="col-md-12">
                                    <strong>Last Name:</strong>
                                    <input type="text" name="last_name" class="form-control" id="last_name"  v-model="user.lastName" required/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12"><strong>Address:</strong></div>
                                <div class="col-md-12">
                                    <input type="text" name="address" class="form-control" id="address" v-model="user.address" required/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12"><strong>City:</strong></div>
                                <div class="col-md-12">
                                    <input type="text" name="city" class="form-control" id="city" v-model="user.city" required/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12"><strong>State:</strong></div>
                                <div class="col-md-12">
                                    <input type="text" name="state" class="form-control" id="state" v-model="user.state" required/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12"><strong>Zip / Postal Code:</strong></div>
                                <div class="col-md-12">
                                    <input type="text" name="zip_code" class="form-control" id="zip_code"  v-model="user.postCode" required/>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12"><strong>Phone Number:</strong></div>
                                <div class="col-md-12"><input type="text" name="phone_number" class="form-control" id="phone_number"  v-model="user.phone"/></div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-12"><strong>Email Address:</strong></div>
                                <div class="col-md-12"><input type="text" name="email_address" class="form-control" id="email_address"  v-model="user.email"/></div>
                            </div>
                        </div>
                    </div>
                               </div>
                            </template>
                          </accordion-item>

                          <accordion-item>
                            <!-- This slot will handle the title/header of the accordion and is the part you click on -->
                            <template v-slot:accordion-trigger>
                              <h4 :style="{'padding': '5px'}">Payment</h4>
                            </template>
                            <!-- This slot will handle all the content that is passed to the accordion -->
                            <template v-slot:accordion-content>
                             <div class="">
    <div class="card-form__inner">
      <div class="card-container">
        <credit-card
          :expireYear="expireYear"
          :expireMonth="expireMonth"
          :cardNumber="cardNumber"
          :name="name"
          :cvv="cvv"
          :showBack="showBack"
          :symbolImage="'/img/' + symbolImage + '.png'"
        />
      </div>
      <div class="card-input">
        <label for="cardNumber" class="card-input__label">Card Number</label>
        <!-- <input
          v-imask="cardMasks"
          @accept="onAcceptCardType"
          :value="cardNumber"
          autofocus
          id="cardNumber"
          class="card-input__input"
          autocomplete="off"
        /> -->
        <input
          id="cardNumber"
          class="card-input__input"
          v-model="cardNumber"
          placeholder="xxxx xxxx xxxx xxxx"
          autocomplete="off"
        />
      </div>
      <div class="card-input">
        <label for="cardName" class="card-input__label">Card Owner</label>
        <input
          id="cardName"
          class="card-input__input"
          v-model="name"
          autocomplete="off"
        />
      </div>
      <div class="card-form__row">
        <div class="card-form__col">
          <div class="card-form__group">
            <label for="cardMonth" class="card-input__label"
              >Expiration Date</label
            >
            <select
              class="card-input__input -select"
              id="cardMonth"
              v-model="expireMonth"
            >
              <option value disabled selected>Month</option>
              <option v-for="n in 12" :key="n" :value="10 > n ? '0' + n : n">{{
                10 > n ? "0" + n : n
              }}</option>
            </select>
            <select
              class="card-input__input -select"
              id="cardYear"
              v-model="expireYear"
            >
              <option value disabled selected>Year</option>
              <option
                v-for="(n, $index) in 12"
                :value="$index + currentYear"
                :key="n"
                >{{ $index + currentYear }}</option
              >
            </select>
          </div>
        </div>
        <div class="card-form__col -cvv">
          <div class="card-input">
            <label for="cardCvv" class="card-input__label">CVV</label>
            <input
              type="text"
              class="card-input__input"
              id="cardCvv"
              :value="cvv"
              autocomplete="off"
              v-imask="cvvMask"
              @accept="onAcceptCvv"
              @focus="showBack = true"
              @blur="showBack = false"
            />
          </div>
        </div>
      </div>

      <button  class="card-form__button" type="submit">Submit</button>
    </div>
  </div>
                            </template>
                          </accordion-item>

                          
                        </accordion>
                  
                   

                </div>
                
                <div class="col-md-6">

                    <h4 >Order summery</h4>
                    <!-- <hr> -->
                     <ul>
                        <li v-for="item in proactive" :key="item" class="media">
                        <img :src="item.images" :style="{width:'80px'}" class="align-self-center mr-3" alt="">
                        <div class="media-body">
                            <p class="mt-0"><strong>{{item.name}}</strong>

                              

                            </p>  
                            <button type="button" class="product-remove" @click="remove(item)">X</button>
                            <div>
                            <!-- <p class="mt-0">Quantity : </p>  -->
                            <label for="quantity">Qty: </label>
                             <button type="button" :class="index" class="minus" @click="increase(item)">+</button>
                            {{item.quantity}}
                            <button type="button"  :class="index" class="plus" @click="decrease(item)">-</button>
        <!-- <button type="submit">Add to cart</button> -->
                                <!-- <input min="1" type="number" class="form-control w-20"  id="quantity" name="quantity" value="1" /> -->
                              <!-- <div class="quantity-toggle">
                                <button @click="decrement()">&mdash;</button>
                                <input type="text" :value="quantity" readonly />
                                <button @click="increment()">&#xff0b;</button>
                              </div> -->
                            </div>
                            
                            <p class="mt-0 float-right"><strong>₹{{item.price * item.quantity}}</strong>&nbsp;<del>₹ {{item.price }}</del></p>
                            
                           <!-- {{item.price * item.quantity}} -->
                        </div>
                        </li>

                    </ul>

                    <hr>
                            <div class="form-group">
                                <div class="col-xs-12">
                                    <strong>Subtotal</strong>
                                    <div class="pull-right"><strong>₹ {{this.$store.state.totalCalculatePrice  }} </strong></div>
                                </div>
                                <div class="col-xs-12">
                                    <strong>Shipping</strong>
                                    <div class="pull-right"><strong>₹ {{this.$store.state.Shipping  }} </strong></div>
                                </div>
                            </div>
                            <hr>
                           <div class="form-group">
                                <div class="col-xs-12">
                                    <strong>Order Total</strong>
                                    <div class="pull-right"><strong>₹ {{this.$store.state.orderTotal  }} </strong></div>
                                </div>
                            </div>
  
                    <!-- <card class='stripe-card'
                        :class='{ complete }'
                        stripe='pk_test_XXXXXXXXXXXXXXXXXXXXXXXX'
                        :options='stripeOptions'
                        @change='complete = $event.complete'
                        />

                        <button class='pay-with-stripe btn btn-primary mt-4' @click='pay' :disabled='!complete'>Pay with credit card</button> -->
                    
                </div>
            </div>

        </div>
 </form>
  </div>
</template>

<script>
// import { Card, createToken } from 'vue-stripe-elements-plus';
import CreditCard from "../craditCard/CreditCard.vue";
import { IMaskDirective } from "vue-imask";
import { cardMasks, cvvMask } from "../masks";
import TheNavigation from '../nav/TheNavigation.vue';
// import store from "../../store";
import Accordion from "../accordion.vue";
import AccordionItem from "../accordion-item.vue";

export default {
    data () {
    return {
      proactive: [],
      complete: false,
       errors: [],
        quantity: 1,
       cardMasks: cardMasks,
      cvvMask: cvvMask,
      cardNumber: "",
      expireMonth: "",
      expireYear: "",
      name: "",
      cvv: "",
      currentYear: new Date().getFullYear(),
      showBack: false,
      symbolImage: "mastercard",
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
      },
      user:{
       
      }
    }
  },
  components: { CreditCard , TheNavigation,Accordion,AccordionItem },
  // computed: {
  //   // count () {
	//   //   // console.log(this.$store.state.count)
  //   // }
  // },
  methods: {
    //  increment () {
    //   this.$store.commit('increment')
    // },
  
    pay () {
      
    },
    submitCard() {
      
        this.errors = [];
      
       if (!this.user.email) {
        //  console.log("dsfsa",this.user.email);
            this.errors.push('Email required.');
        } else if (!this.validEmail(this.user.email)) {
            this.errors.push('Valid email required.');
        }
        else if(!this.user.country||!this.user.firstName||!this.user.lastName||!this.user.address||!this.user.city||!this.user.state||!this.user.postCode||!this.user.phone||!this.user.email){
         this.errors.push('Enter required field.');
        }
        else if( this.cardNumber == ""||this.name== ""||this.expireMonth== ""||this.expireYear== ""){
          console.log("aaa",this.cardNumber);

          this.errors.push('Enter card details.');
        }

        else{
          localStorage.setItem('cart', JSON.stringify(this.proactive));
          this.$store.commit('saveCardDataToFirebase',this.user);
          console.log(this.proactive);
          localStorage.removeItem('cart');
          this.$router.push('/home')  ;
              alert("order placed");
        }
     
    },
    onAcceptCardType(e) {
      const maskRef = e.detail;
      const type = maskRef.masked.currentMask.cardtype;

      if (type !== "Unknown") {
        this.symbolImage = type;
      }

      this.cardNumber = maskRef.value;
    },
    onAcceptCvv(e) {
      const maskRef = e.detail;
      this.cvv = maskRef.value;
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    increase(daata){
      console.log(daata);
      if(daata.quantity >=1){
        daata.quantity++;
        // console.log(typeof(parseInt(daata.price)));
       
       this.$store.state.totalCalculatePrice=this.$store.state.totalCalculatePrice+Number(JSON.parse(localStorage.getItem('cart')).find(data => data.id === daata.id).price );
       this.$store.state.orderTotal = this.$store.state.orderTotal + Number(JSON.parse(localStorage.getItem('cart')).find(data => data.id === daata.id).price );

        // daata.price = ( Number(daata.price) + Number(JSON.parse(localStorage.getItem('cart')).find(data => data.id === daata.id).price ));
      }else{alert("quantity can't be smaller than 1")}
     
    },
    decrease(daata){
      // console.log(daata.quantity);
      // daata.quantity--;
       if(daata.quantity>1){
        daata.quantity--;
        this.$store.state.totalCalculatePrice=this.$store.state.totalCalculatePrice - Number(JSON.parse(localStorage.getItem('cart')).find(data => data.id === daata.id).price );
        this.$store.state.orderTotal = this.$store.state.orderTotal - Number(JSON.parse(localStorage.getItem('cart')).find(data => data.id === daata.id).price );
        // daata.price = ( Number(daata.price) - Number(JSON.parse(localStorage.getItem('cart')).find(data => data.id === daata.id).price ));
      }else{alert("quantity can't be smaller than 1")}
    },
    remove(item){
      console.log(JSON.parse(localStorage.getItem('cart')).find(data => data.id === item.id) );
       var myMovie=JSON.parse(localStorage.getItem('cart')) ;
       var i=myMovie.findIndex(movie=>movie.id===item.id);
        if(i!==-1){
          myMovie.splice(i,1);
          //localStorage.setItem('myMovie', JSON.stringify(myMovie));
        }
        localStorage.setItem('cart', JSON.stringify(myMovie))
         this.proactive = JSON.parse(localStorage.getItem('cart'));
         this.$store.state.totalCalculatePrice=this.$store.state.totalCalculatePrice - Number(item.price );
        this.$store.state.orderTotal = this.$store.state.orderTotal - Number(item.price );
       
        // console.log(myMovie);
    }
 
  


  },
    directives: {
    imask: IMaskDirective
  },
  mounted(){
    console.log(this.$store.state.totalCalculatePrice);
    //  this.$store.commit('increment');
     this.$store.commit('totalPrice');
     this.$store.commit('userProfile');
  },
  created() {
            // this.proactive = JSON.parse(localStorage.getItem('cart'));
             if(localStorage.getItem('cart') != null){
            this.proactive = JSON.parse(localStorage.getItem('cart'));
    } 
       setTimeout(() => {
       this.user=this.$store.state.profile;
       
    }, 2000); 
            console.log("sdss",this.proactive.length);
            
  }
}
</script>



<style>
/**
 * The CSS shown here will not be introduced in the Quickstart guide, but shows
 * how you can use CSS to style your Element's container.
 */
.card-container {
  margin: 30px auto 50px auto;
}
.p-de{
  padding: 20px 0px 0px 0px;
}

.w-20{
  width: 20%;
}

.card-form {
  max-width: 570px;
  margin: auto;
  width: 100%;
}
  .card-form__inner {
    background: #fff;
    /* box-shadow: 0 30px 60px 0 rgba(90, 116, 148, 0.4); */
    border-radius: 10px;
    padding: 20px;
  }

  .card-form__row {
    display: flex;
    align-items: flex-start;
  }

  .card-form__col {
    flex: auto;
    margin-right: 15px;
  }
    .card-form__col :last-child {
      margin-right: 0;
    }

    .card-form__col .-cvv {
      max-width: 150px;
    }
  

  .card-form__group {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }
    .card-input__input {
      flex: 1;
      margin-right: 15px;
    }
      .card-form:last-child {
        margin-right: 0;
      }
    
  

  .card-form__button {
    width: 100%;
    height: 55px;
    background: #38a294;
    border: none;
    border-radius: 5px;
    font-size: 22px;
    font-weight: 500;
    box-shadow: 3px 10px 20px 0px rgba(35, 100, 210, 0.3);
    color: #fff;
    margin-top: 20px;
    cursor: pointer;
  }
    .card-form:hover {
      background: darken(#38a294, 5%);
    }
  


.card-input {
  margin-bottom: 20px;
}
  .card-input__label {
    margin-bottom: 5px;
    color: #1a3b5d;
    width: 100%;
    display: block;
    text-align: left;
  }
  .card-input__input {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    box-shadow: none;
    border: 1px solid #ced6e0;
    transition: all 0.3s ease-in-out;
    font-size: 18px;
    padding: 5px 15px;
    background: none;
    color: #1a3b5d;
  }

    .card-input__input:hover,
    .card-input__input:focus {
      border-color: #38a294;
    }

    .card-input__input:focus {
      box-shadow: 0px 10px 20px -13px rgba(32, 56, 117, 0.35);
    }
    .card-input__input.-select {
      -webkit-appearance: none;
      background-image: url("/img/select.png");
      background-size: 12px;
      background-position: 90% center;
      background-repeat: no-repeat;
      padding-right: 30px;
    }
    .form-control{
      text-align: left !important;
    }
  
  .minus,
  .plus{    
    border: none;
    border-radius: 50px;
    background: #4e4c4c;
    color: white;
    font-weight: bolder;
  }
  .product-remove {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 0;
    background-color: #E0E0E0;
    color: #fff;
    cursor: pointer;
    float: right;
  }
</style>