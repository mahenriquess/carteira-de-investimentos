<template>
    <div>
       <HeaderCarteira :valorDisponivel="this.carteira.valor" :colorBar="colorTheme" />
        <v-row justify="center">
            <template v-for="(ativo) in carteira.ativos">
                <v-col :key="ativo.id">
                    <Ativo :ativo="ativo"  /> 
                </v-col>
            </template> 
        </v-row>
        <v-fab-transition>
            <v-btn
                :color="colorTheme"
                fab
                dark
                large
                absolute
                bottom
                right
                class="v-btn--example"
                @click="openModalAddAtivo"
                >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-fab-transition>

        <v-dialog v-model="addAtivo" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Novo Ativo</span>
                </v-card-title>
                    <FormAtivo ref="formAtivo" :carteira="carteira"/>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="addAtivo = false">Cancelar</v-btn>
                    <v-btn color="blue darken-1" :disabled="!addAtivo || saving" :loading="saving" text @click="saveAtivo">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar
            v-model="snackbar"
            >
            {{ errorMessage }}
            <v-btn
                color="blue"
                text
                @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </div>
    
</template>

<script>

import HeaderCarteira from '../../components/HeaderCarteira';
import EmptyCard from '../../components/EmptyCard';
import FormAtivo from '../../components/FormAtivo';
import Ativo from '../../components/Ativo';

import { mapGetters } from 'vuex'

export default {
    components:{HeaderCarteira,EmptyCard,FormAtivo,Ativo},
    mounted() {
        console.log(this.carteira);
    },
    data() {
        return {
            addAtivo:false,
            saving: false,
            snackbar: false,
            errorMessage:''
        }
    },
    computed: {
        carteira() {
            
            const carteira = this.$store.getters.carteiras.find(carteira => {
                return carteira.id == this.$route.params.carteiraId
            })

            return carteira;
        },
        colorTheme() {
            if(!this.carteira.valor){
                return;
            }
            if(this.carteira.valor > 500){
                return 'green darken-1'
            }else if(this.carteira.valor > 100 && this.carteira.valor < 500) {
                return 'lime darken-1'
            }else{
                return 'red accent-4'
            }
        }
    },
    methods: {
        openModalAddAtivo() {
            this.addAtivo = true;
        }, 

        async saveAtivo() {

            const {errors, hasError} = this.$refs.formAtivo.getErrors();
            if(hasError){
                console.log(errors);
                this.errorMessage = errors[0];
                this.snackbar = true;
                // let msg = "";
                // errors.forEach(error => msg += error);
                // alert(msg);
                return;
            }
            
            const ativo = this.$refs.formAtivo.getDataForm();
            this.dialog=false;
            try {
                this.saving = true;
                await this.$store.dispatch('addAtivo',{ativo,idCarteira: this.$route.params.carteiraId});
                this.addAtivo = false;
                this.$refs.formAtivo.clearFields();
            }catch(e) {
                console.warn(e);
            }finally{
                this.saving = false;
            }
        }
    }
}
</script>

<style>
.v-btn--example {
    margin: 20px 20px 50px 50px;
  }
</style>