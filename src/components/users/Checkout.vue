<template>
  <div class="chekout">
       <Navbar></Navbar>

        <div class="container mt-5 pt-5">

            <div class="row">

                <div class="col-md-6">
                    <h4 class="py-4">Checkout page</h4>
                     <ul>
                        <li v-for="item in this.$store.state.cart" :key="item" class="media">
                        <img :src="item.productImage" width="80px" class="align-self-center mr-3" alt="">
                        <div class="media-body">
                            <h5 class="mt-0">{{item.productName}}

                                <span class='float-right' @click="$store.commit('removeFromCart',item)">X</span>

                            </h5>
                            <p class="mt-0">{{item.productPrice }}</p>
                            <p class="mt-0">Quantity : {{item.productQuantity }}</p>
                        </div>
                        </li>

                    </ul>
                </div>
                <div class="col-md-6">
                    <p>
                        Total Price : {{ this.$store.getters.totalPrice  }}
                    </p>

                   
  <div class="card-form">
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
        <input
          v-imask="cardMasks"
          @accept="onAcceptCardType"
          :value="cardNumber"
          autofocus
          id="cardNumber"
          class="card-input__input"
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

      <button @click="submitCard" class="card-form__button">Submit</button>
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
  </div>
</template>

<script>
// import { Card, createToken } from 'vue-stripe-elements-plus';
import CreditCard from "../craditCard/CreditCard.vue";
import { IMaskDirective } from "vue-imask";
import { cardMasks, cvvMask } from "../masks";
export default {
    data () {
    return {
      complete: false,
       cardMasks: cardMasks,
      cvvMask: cvvMask,
      cardNumber: "5373 8172 9406 5052",
      expireMonth: "",
      expireYear: "",
      name: "",
      cvv: "",
      currentYear: new Date().getFullYear(),
      showBack: false,
      symbolImage: "mastercard",
      stripeOptions: {
        // see https://stripe.com/docs/stripe.js#element-options for details
      }
    }
  },
  components: { CreditCard },
  methods: {
    pay () {
      // createToken returns a Promise which resolves in a result object with
      // either a token or an error key.
      // See https://stripe.com/docs/api#tokens for the token object.
      // See https://stripe.com/docs/api#errors for the error object.
      // More general https://stripe.com/docs/stripe.js#stripe-create-token.
    //   createToken().then(data => console.log(data.token))
    },
    submitCard() {
      alert(`
        ${this.cardNumber}\n
        ${this.name}\n
        ${this.expireMonth}/${this.expireYear}\n
        ${this.cvv}`);
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
    }
  },
    directives: {
    imask: IMaskDirective
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

.card-form {
  max-width: 570px;
  margin: auto;
  width: 100%;
}
  .card-form__inner {
    background: #fff;
    box-shadow: 0 30px 60px 0 rgba(90, 116, 148, 0.4);
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
    card-input__input:focus {
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
  

</style>