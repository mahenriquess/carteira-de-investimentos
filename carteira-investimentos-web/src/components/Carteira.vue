<template>

<v-card
    class="mx-auto"
    max-width="344"
    :loading="carteira.loading"
  >
    <v-card-text>
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
      <v-btn
        text
        color="deep-purple accent-4"
        @click="ativos"
      >
        Ver Ativos
      </v-btn>
    </v-card-actions>
  </v-card>
  
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
      },
      ativos() {
        this.$router.push(`/carteira-detalhe/${this.carteira.id}`);
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