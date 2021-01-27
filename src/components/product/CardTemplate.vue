<template>
  <div class="cardTemplate">
    <div class="card mb-4 shadow-sm">
       <button v-if="currentRouteName == 'wishlist'" :style="{'margin': '-10px 0px 0px 0px'}" type="button" class="product-remove float-right" @click="removeFromWishlist(item)">X</button>
      
      <img
        class="card-img-top mt-2"
        v-bind:src="item.images"
        alt="Card image cap"
        :style="{'max-height':'700px','max-width': '127.135px',margin:'auto'}">
 
          <button v-if="currentRouteName != 'wishlist'" class="toggle-favorite img-overly" @click="toggle(item)">
              <FavoriteIcon
                class="toggle-favorite__icon"
                :class="iconClasses"
                @animationend="onIconAnimationEnds"
              />
              <transition name="favorite-particles-transition">
                <div v-if="animating" class="toggle-favorite__particles"></div>
              </transition>
          </button>


      <div class="card-body">
        <h6 class="card-title">{{item.name}}.</h6>
        <hr>
        <!-- <p class="card-text">{{item.description}}.</p> -->
         <div class="product-price">
        <span>₹ {{ item.price }}, 00</span>
        <span>10 x {{ Math.round(item.price / 10) }}, 00 </span>
      </div>
      </div>
      
      <div class="card-footer bg-transparent " :style="{border: 'none' }">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              v-on:click="navigateProductDetail(item)"
            >View</button>
            
             <button
              type="button"
              class="btn btn-sm btn-outline-secondary float-right"
              v-on:click="addToCart(item)"
            >Add To Card</button> 
      </div>

    </div>
  </div>
  
</template>

<script>
import {db } from "../../main";
import  firebase from "firebase";
import FavoriteIcon from "../heart/FavoriteIcon";

export default {
  name: "cardTemplate",
  props: ["item"],
  data() {
    return {
      showModal: false,
      favorited: false,
      animating: false
    };
  },
  computed: {
    iconClasses() {
      return {
        "toggle-favorite__icon--favorited": this.favorited,
        "toggle-favorite__icon--animate": this.animating
      };
    },
     currentRouteName() {
        return this.$route.name;
      }
  },
  components: {FavoriteIcon},
  methods: {
    navigateProductDetail(product) {
      console.log(product.id);
      this.$router.push({name:'productDetails',params: { id:  product.id}})  ;

    },

  
    addToCart(product) {
       this.$store.commit('productAddToCard', product)
        this.$swal({   
        type: "success",  
        icon: "success",
        title: "Add To Card",  
        text: "Item Added Succesfully", 
      });  
      
    },

    toggle(data) {
      // Only animate on favoriting.
        // console.log(this.favorited,data);
         const currentUser = firebase.auth().currentUser.uid;
        if(this.favorited == false){
         
          db.collection('wishlist').add({
            uid: currentUser,
            productDetais: data ,
            date:new Date().toLocaleString(),
            }).then((data) => {
              console.log(data);    
              // alert("added succesfully")    
              // localStorage.removeItem('cart');
            }).catch((error) => {
              console.log(error);
          })
        }
        else{

            db.collection("wishlist").where("uid", "==", currentUser)
            .where("productDetais.id", "==", data.id)
            .get()
             .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  // console.log(doc.id, " => ", doc.data());
                    db.collection("wishlist").doc(doc.id).delete().then(function() {
                        console.log("Document successfully deleted!");
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });

              });
            }).catch(function(error) {
              console.error("Error removing document: ", error);
            });

        }
      if (!this.favorited) {
        this.animating = true;
      }
      
        this.favorited = !this.favorited;
    
    // this.$store.commit('addToWishlist', data)
    
       // 

      
    },
    removeFromWishlist(itm){
          db.collection("wishlist").where("uid", "==", firebase.auth().currentUser.uid)
            .where("productDetais.id", "==", itm.id)
            .get()
             .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                  // console.log(doc.id, " => ", doc.data());
                    db.collection("wishlist").doc(doc.id).delete().then(function() {
                      // 
                      location.reload();
                        console.log("Document successfully deleted!");
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });

              });
            }).catch(function(error) {
              console.error("Error removing document: ", error);
            });
          //  this.$router.push({name: "wishlist"})
    },
    onIconAnimationEnds() {
      this.animating = false;
    }
    


   
  },
  mounted() {}
};
</script>
<style scoped>
  .cardTemplate {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0;
  }

  .product {
    width: 300px;
    background-color: #fff;
    list-style: none;
    box-sizing: border-box;
    padding: 1em;
    margin: 1em 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 7px;
  }

  .product-name {
    font-size: 1.2em;
    font-weight: normal;
  }

  .product-name:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .product-price {
    width: 100%;
    align-self: flex-start;
    display: flex;
    justify-content: space-between;
    margin-bottom: .5em;
  }

  @keyframes favorite-icon-animation {
	 0% {
		 opacity: 1;
		 transform: scale(0.1);
	}
	 50% {
		 opacity: 1;
		 transform: scale(1.1);
	}
	 80% {
		 opacity: 1;
		 transform: scale(0.9);
	}
	 100% {
		 opacity: 1;
		 transform: scale(1);
	}
}
 @keyframes favorite-particles-animation {
	 0% {
		 background-position: left center;
	}
	 100% {
		 background-position: right center;
	}
}
 

.toggle-favorite {
  font-size: 20px;
  position: relative;
  border: none;
  background: none;

}
  .toggle-favorite__icon {
    height: 1em;
    width: 1em;

    border: none;
    background: none;

    transition: fill-opacity 0.2s, stroke 0.2s;
    fill:  hsl(1, 89%, 61%);
    fill-opacity: 0;
    stroke: hsl(0, 0%, 10%);
  }

  .toggle-favorite__icon--favorited {
      fill-opacity: 1;
      stroke:  hsl(1, 89%, 61%);
      border: none;
      background: none;
      
    }

   
  .toggle-favorite__icon--animate {
      opacity: 0;
      transform: scale(0);
      animation-duration:  0.48s;
      animation-delay: 0.8s -  0.48s;
      animation-name: favorite-icon-animation;
      
    }
  

  .toggle-favorite__particles {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3em;
    height: 3em;
    
  }

  .img-overly{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
   
    height: 10%;
    
  }
  
</style>