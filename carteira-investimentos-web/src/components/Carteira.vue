<template>

<v-card
    class="mx-auto"
    max-width="344"
    :loading="carteira.loading"
  >
    <v-card-text>
      <div>Word of the Day</div>
      <p class="display-1 text--primary">
        {{carteira.nome}}
      </p>
      <p>{{valor}}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
        @click="deletar"
      >
        Deletar
      </v-btn>
    </v-card-actions>
  </v-card>
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

  <!-- <StatsCard
      color="green"
      icon="fa-dollar-sign"
      :title="carteira.nome"
      :value="valor"
      :loading="carteira.loading"
      sub-icon="mdi-calendar"
    /> -->

   

    <!-- <div slot="actions" class="text-center">
      <v-icon
        :color="subIconColor"
        size="20"
        class="mr-2"
      >
        {{ subIcon }}
      </v-icon>
      <span
        :class="subTextColor"
        class="caption font-weight-light"
        v-text="subText"
      />
    </div> -->
  
</template>

<script>

import StatsCard from './StatsCard';
export default {
    components: {StatsCard},
    computed: {
      valor() {
        return `R$ ${this.carteira.valor}`
      }
    },
    props:[
        "carteira"
    ],
    methods: {
      async deletar() {
        try {
            await this.$store.dispatch('deleteCarteira',this.carteira);
            
        }catch(e) {
            console.warn(e);
        }
      }
    }
}
</script>

<style lang="scss">
.v-card--material-stats {
  display: flex;
  flex-wrap: wrap;
  position: relative;

  .v-offset {
    display: inline-block;
    flex: 0 1;
    margin-top: 0;
    margin-left: 0;
    margin-right: auto;
    margin-bottom: 0 !important;
    max-width: auto;
    padding: 0 16px 0;
  }

  .v-card {
    border-radius: 4px;
    flex: 0 1 auto;
  }

  .v-card__text {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
  }

  .v-card__actions {
    flex: 1 0 100%;
  }
}
</style>