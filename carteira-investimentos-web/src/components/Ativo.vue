<template>

    <div>
      <v-card
          class="mx-auto"
          max-width="344"
          :loading="loading"
      >
          <v-card-text>
          <p class="display-1" :class="colorVariacaoMoeda">
              {{ativo.nomeEmpresa}}{{ativo.codigoEmpresa}} ({{percentualRendimento}}%) <v-icon :color="colorButton">{{iconVariant}}</v-icon>
          </p>
          
          <p >Valor da ação no momento da compra: <strong>{{ativo.valorMoedaCompra}}</strong></p>
          <p :class="colorVariacaoMoeda">Valor de uma ação neste momento: <strong>{{ativo.valorMoedaUltimaAtualizacao}}</strong></p>
          <!-- <p :class="colorVariacaoMoeda">Percentual de rendimento: {{percentualRendimento}}%</p> -->
          <p>Quantidade de ações: <strong>{{ativo.qtdAcoes}}</strong></p>
          <p :class="colorVariacaoMoeda">Valor atual deste ativo é de <br/><span class="display-1">{{valor}}</span></p>
          </v-card-text>
          <v-card-actions>
          <v-btn
              text
              :color="colorButton"
              @click="openModalVenda"
          >
              Vender
          </v-btn>
          </v-card-actions>
      </v-card>
      <v-dialog v-model="venderAcoes" persistent max-width="600px">
          <v-card>
              <v-card-title>
                  <span class="headline">Vender Ações</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-model="qtdAcoesVenda" type="number" :rules="rules" label="Quantidade de ações" required></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" :disabled="loading" text @click="venderAcoes = false">Cancelar</v-btn>
                  <v-btn color="blue darken-1" :disabled="loading || !qtdVendaIndisponivel || qtdAcoesVenda == 0" :loading="loading" text @click="vender">Vender</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
    </div>
    
  
</template>

<script>

export default {
  data(){
    return {
      loading: false,
      venderAcoes: false,
      rules: [
        () => this.qtdVendaIndisponivel || `Você não pode vender mais ações do que obtém. (Você tem ${this.ativo.qtdAcoes} ações)`,
        () => this.qtdAcoesVenda > 0 || `Para efeturar a venda, é necessário selecionar 1 ação no mínimo.`
      ],
      qtdAcoesVenda:null
    }
  },
  computed: {
    valor() {
      return `R$ ${this.ativo.valorCompra}`
    },
    qtdVendaIndisponivel() {
      return this.qtdAcoesVenda <= this.ativo.qtdAcoes;
    },
    colorVariacaoMoeda() {
      if(parseFloat(this.ativo.valorMoedaUltimaAtualizacao) < parseFloat(this.ativo.valorMoedaCompra)){
        return ['red--text', 'font-weight-black']
      }else if(parseFloat(this.ativo.valorMoedaUltimaAtualizacao) > parseFloat(this.ativo.valorMoedaCompra)){
        return ['green--text', 'font-weight-black']
      }else {
        return 'gray--text';
      }
    },
    colorButton() {
      if(parseFloat(this.ativo.valorMoedaUltimaAtualizacao) < parseFloat(this.ativo.valorMoedaCompra)){
        return 'red accent-4'
      }else if(parseFloat(this.ativo.valorMoedaUltimaAtualizacao) > parseFloat(this.ativo.valorMoedaCompra)){
        return 'green darken-1'
      }else {
        return 'grey darken-1'
      }
    },
    percentualRendimento() {
      console.log(this.ativo);
      
      const a = parseFloat(this.ativo.valorMoedaUltimaAtualizacao);
      const b = parseFloat(this.ativo.valorMoedaCompra);
      var result = (a * 100) / b;
      
      return  parseFloat(result-100).toFixed(2);

    },
    iconVariant() {
      if(parseFloat(this.ativo.valorMoedaUltimaAtualizacao) < parseFloat(this.ativo.valorMoedaCompra)){
        return 'mdi-arrow-down-bold';
      }else if(parseFloat(this.ativo.valorMoedaUltimaAtualizacao) > parseFloat(this.ativo.valorMoedaCompra)){
        return 'mdi-arrow-up-bold';
      }
    }
  },
  props:[
      "ativo"
  ],
  methods: {
    openModalVenda() {
      this.venderAcoes = true;
    },
    async vender() {
      try {
        this.loading = true;
        await this.$store.dispatch('venderAcoes',{ativo: this.ativo, qtdAcoes: this.qtdAcoesVenda});
        this.venderAcoes = false;
      }catch(e) {
        console.warn(e);
      }finally{
        this.loading = false;
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

  .bold {
    font-weight: bold !important;
  }
}
</style>