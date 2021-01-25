<template>
  <!-- <the-navigation v-if="currentRouteName != 'login' && currentRouteName != 'registration' && currentRouteName != 'forgotpassword' "></the-navigation> -->
  <!-- <div>{{ currentRouteName }}</div> -->
  <main>
    <!-- <router-view></router-view> -->
    <keep-alive>
    <router-view></router-view>
</keep-alive>
  </main>
</template>

<script>
// import TheNavigation from './components/nav/TheNavigation.vue';

export default {
  components: {
    // TheNavigation
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  data() {
    return {
     
    };
  },
  provide() {
    return {
    };
  },
  mounted() {
     


  },


};
</script>

<style>

</style>