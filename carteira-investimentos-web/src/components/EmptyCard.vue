<template>

    <v-card
        class="mx-auto empty"
        max-width="220"
        @click="onClick"
        elevation="2"
    >
        <v-subheader>Adicionar Novo</v-subheader>
        
        <!-- <v-card-actions>
        <v-btn
            text
            color="deep-purple accent-4"
            @click="deletar"
        >
            Deletar
        </v-btn>
        </v-card-actions> -->

    </v-card>
</template>

<script>

export default {
 
    props:['onClick'],
    methods: {
      async deletar() {
        try {
            // await this.$store.dispatch('deleteCarteira',this.carteira);
            
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

.empty {
    display:flex;
    justify-content: center;
    align-items: center;
    height: 21vw;
    border: 3px dotted gray !important;
    background: white !important;
}
.moreItem{
    width: 100px;
    height: 300px !important;
    font-size: 5rem;
}
</style>