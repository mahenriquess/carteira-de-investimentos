<template>
  <!-- <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title primary-title class="justify-center">
      {{carteira.title}}
    </v-card-title>

    <v-divider></v-divider>

    <v-card-subtitle class="ml-6 font-weight-light">R$ {{carteira.preco}}</v-card-subtitle>

    <v-card-actions>
      <v-btn text>Comprar</v-btn>
      <v-spacer></v-spacer>

      <v-btn
        color="red"
        text
      >
        Vender
      </v-btn>

    </v-card-actions>
  </v-card> -->

  <StatsCard
          color="green"
          icon="fa-dollar-sign"
          :title="carteira.title"
          :value="preco"
          sub-icon="mdi-calendar"
        />
</template>

<script>

import StatsCard from './StatsCard';
export default {
    components: {StatsCard},
    computed: {
      preco(){
        return `R$ ${this.carteira.preco}`
      }
    },
    props:[
        "carteira"
    ]
}
</script>

<style>

</style>