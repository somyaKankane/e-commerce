<template>
    <div class="home container">
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <img alt="Vue logo" src="../../assets/cardLogo2.png" :style="{width:'100px'}">
                    <h3 class="display-5 "><span style="color:#42b983">shop</span></h3>
                    <p class="lead">Inspiring store to buy more.</p>
                </div>
            </div>
        <h1>Home</h1>
    </div>
</template>
<script>
// import HelloWorld from "from './components/HelloWorld.vue";
import { mapGetters } from "vuex";
export default {
    name: "home",
    // components:{
    //     HelloWorld
    // }UsersList.vue,UserItem.vue
    computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  }
}
</script>
<style>

</style>