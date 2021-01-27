import { createStore } from 'vuex';
import {db } from "./main";
import  firebase from "firebase";
// import Vue from 'vue';



let cart = window.localStorage.getItem('cart');

const store = createStore({
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    count: 0,
    product:[],
    totalCalculatePrice: null,
    orderTotal: null,
    Shipping:null,
    cardData:[],
    allCategory:[],
    singleProduct:[],
    allOrder:[],
    wishlist:[],
  
    cart: cart ? JSON.parse(cart) : [],
    profile: {
      id:null,
      firstName: null,
      lastName:null,
      phone:null,
      address:null,
      postCode:null
    },
    account:{
        id:null,
        name:null,
        email:null,
        photoUrl:null,
        emailVerified:null,
        password:null,
        confirmPassword:null,
        uid:null
    }       
  },
  getters: {
    user(state){
      // alert("fasds");
      console.log( state.user );
    }, 
    // totalPrice: state => {
      getProductsInCart: state => state.cardData,
      getProductsInCartlength: state => state.cardData.length,


     

      
    // }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    increment (state) {
      // mutate state
      // state.count++
      var currentUser = localStorage.getItem('uid');
      this.products = [];
      db.collection("cardOrder").where("uidDetails", "==", currentUser)
        .get()
        .then((querySnapshot) => {
          
          querySnapshot.forEach((doc) => {
            console.log('change',JSON.parse(doc.data().productDetais));
            let productdata=JSON.parse(doc.data().productDetais);
            state.product.push({
             
              name: productdata.name,
              description:productdata.description,
              price:productdata.price,
              tags:productdata.tags,
              images:productdata.images
              // date: doc.data().date,
            });
            console.log("sss",state.product);
          });
          
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
        console.log(state.product);
    },
    totalPrice(state){
      let total = 0;
      // var currentUser = localStorage.getItem('uid');
     
      var data1=JSON.parse(localStorage.getItem('cart'))
      // for(i=0;i<=)
      console.log("somya",data1);
      // let price=0;
      if(data1 != null){
      data1.forEach((value, index) => {
        // arr.push(value);
        console.log(value);
        console.log(index);
        if(value.quantity != 1){
          total = total+(parseInt(value.price) * parseInt(value.quantity) );
        }
        else{
          total = total+parseInt(value.price);
        }
       
        state.totalCalculatePrice=total;
        state.Shipping=500;
        state.orderTotal=total+state.Shipping;
    });
  }
      // data1.forEach((doc) => {
      //   console.log("somya2",doc)
      //   total = total+parseInt(doc.productDetais.price);
      //   console.log( total );
        // state.totalCalculatePrice=total;
        // state.Shipping=500;
        // state.orderTotal=total+state.Shipping;
      // });

      // db.collection("cardOrder").where("uidDetails", "==", currentUser)
      // .get()
      // .then((querySnapshot) => {
        
      //   querySnapshot.forEach((doc) => {
      //     // console.log("somya",doc.data())
      //     total = total+parseInt(doc.data().productDetais.price);
      //     console.log( total );
      //     state.totalCalculatePrice=total;
      //     state.Shipping=500;
      //     state.orderTotal=total+state.Shipping;
      //   });
      //   // return total;
      // })
     
    },
    productAlreadyExist(state,product){
      // console.log(product);
     
        state.cardData.push(product);
        // set(product, 'quantity' , 1)
       
        
    },

    productAddToCard(state,product){
      console.log(product);
      let found = state.cardData.find(data => data.id == product.id );

      if(found){
        found.quantity++;
        this.commit('totalPrice');
        // alert("added succesfully")   ;
        
        // state.totalCalculatePrice=total;
        // state.Shipping=500;
        // state.orderTotal=total+state.Shipping;

      }else{
        product = Object.assign({}, product, { quantity: 1 })
        // state.cart.push(product);
        state.cardData.push(product);
        // set(product, 'quantity' , 1)
       
        // alert("added succesfully")   ;
      }

      this.commit('saveData');
    },
    saveData(state){
      console.log("1",state.cardData);
      // console.log("1",state.cart);
      window.localStorage.setItem('cart', JSON.stringify(state.cardData));
   
    },
    saveCardDataToFirebase(state,data){
      const currentUser = firebase.auth().currentUser.uid;
      console.log("hhhhh", localStorage.getItem('cart'),state.cardData);
      db.collection('cardOrder').add({
        uidDetails: currentUser,
        productDetais: JSON.parse( localStorage.getItem('cart')),
        orderStatus: 'placed',
        orderPlacedBy: localStorage.getItem('email'),
        orderuserDetails:data,
        price:state.orderTotal,
        date:new Date().toLocaleString(),
      }).then(() => {
        // console.log(data);    
        // alert("added succesfully")    
        // localStorage.removeItem('cart');
      }).catch((error) => {
        console.log(error);
      })
    },
    readCategoryData(state){
      // db.collection('productsCategory').add(this.category).then(() => {
      // }).catch((error) => {
      //     console.log(error);
      // })
      state.allCategory=[];
      db.collection("productsCategory")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          state.allCategory.push(doc.data());
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
      },


      singleProductDetails(state,productid){
        state.singleProduct=[];
        // var data=db.collection("products").document(productid)
        // .get();
        var docRef = db.collection("products").doc(productid);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                // Here you can get your data
                state.singleProduct.push( doc.data());
                // console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        });
         
      },
    

      userProfile(state){
        db.collection('profiles').where('uid','==',localStorage.getItem('uid')).get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            state.profile= {
              id:doc.id,
              firstName: doc.data().firstName,
              lastName:doc.data().lastName,
              phone:doc.data().phone,
              email: doc.data().email,
              address:doc.data().address,
              postCode:doc.data().postCode
            };
            state.account={
                id:doc.id,
                name: doc.data().firstName + ' '+doc.data().lastName,
                email: doc.data().email,
                photoUrl:null,
                emailVerified:null,
                password:null,
                confirmPassword:null,
                uid:doc.data().uid 
            }      
          });
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
      },

      orderDetails(state){
        state.allOrder=[];
        db.collection('cardOrder').where('uidDetails','==',localStorage.getItem('uid')).get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            
            console.log(doc.id, " => ", doc.data());
            // state.allOrder.push( {order:doc.data(),
            // id: doc.id});
            state.allOrder.push( {
              date:doc.data().date,
              orderPlacedBy:doc.data().orderPlacedBy,
              orderStatus:doc.data().orderStatus,
              orderuserDetails:doc.data().orderuserDetails,
              productDetais:doc.data().productDetais,
              price:doc.data().price,
              uidDetails:doc.data().uidDetails,
              id:doc.id,
                });
            
        
          });
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
      },

      userOrderDetails(state){
        state.allOrder=[];
        db.collection('cardOrder').get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            

            state.allOrder.push( {
            date:doc.data().date,
            orderPlacedBy:doc.data().orderPlacedBy,
            orderStatus:doc.data().orderStatus,
            orderuserDetails:doc.data().orderuserDetails,
            productDetais:doc.data().productDetais,
            price:doc.data().price,
            uidDetails:doc.data().uidDetails,
            id:doc.id,
              });
              console.log(state.allOrder);
        
          });
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
      },

      Wishlist(state){
        // console.log(data2);
        state.wishlist=[];
        db.collection('wishlist').where('uid','==',localStorage.getItem('uid')).get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            

            state.wishlist.push(doc.data().productDetais);
              console.log(state.wishlist);
        
          });
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
      }


    
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    }
  }
});

export default store;