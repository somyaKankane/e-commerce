<template>
  <div class="card-front">
    <img class="card-front__image" :src="backgroundImage" />
    <img class="card-front__symbol" :src="symbolImage" />
    <img class="card-front__chip" :src="'/img/chip.png'" />
    <p class="card-front__number">{{ cardNumber }}</p>
    <div class="card-front__info">
      <p>Expires</p>
      <p class="card-front__expires value">
        {{ expireMonth || "MM" }} / {{ (expireYear && sliceYear) || "YY" }}
      </p>
    </div>
    <div class="card-front__info_left">
      <p>Card Owner</p>
      <p class="value">{{ name || "name" }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backgroundImage: String,
    symbolImage: String,
    cardNumber: String,
    expireMonth: String,
    expireYear: String,
    name: String
  },
  computed: {
    sliceYear() {
      return this.expireYear.toString().slice(2);
    }
  }
};
</script>

<style >

.card-front {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  z-index: 100;
}
  .card-front__image {
    width: 100%;
    height: 100%;
    border-radius: 16px;
  }

  .card-front__number {
    position: absolute;
    font-size: 26px;
    top: 35%;
    left: 24px;
  }

  .card-front__chip {
    position: absolute;
    top: 16px;
    left: 24px;
    height: 44px;
  }

  .card-front__symbol {
    position: absolute;
    top: 16px;
    right: 24px;
    height: 48px;
  }

  .card-front__info {
    position: absolute;
    bottom: 15px;
    right: 24px;
    color: white;
    text-align: left;
    margin: 0;
  }
    .card-front__info_left {
    position: absolute;
    bottom: 15px;
    right: 75%;
    color: white;
    text-align: left;
    margin: 0;
    }

    .card-front__expires value {
      font-weight: bold;
    }

    .card-front__expires value p {
      margin: 0;
    }
  
  .card-front__expires value__expires {
    right: auto;
    /* left: $x-space; */
  }
  @media screen and (max-width: 480px) {
    .card-front__number {
      font-size: 22px;
    }
    .card-front__info {
      font-size: 12px;
    }
    .card-front__chip {
      height: 34px;
    }
    .card-front__symbol {
      height: 38px;
    }
  }
  @media screen and (max-width: 360px) {
    .card-front__number {
      font-size: 18px;
    }
  }
  
 

</style>
