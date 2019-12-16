<template>
    <div>
        <!-- <v-progress-linear :active="loadingCarteiras" indeterminate absolute color="light-purple lighten-1"></v-progress-linear>  -->

        <HeaderDefault title="Carteiras" />
        <v-row justify="center">
            <template v-for="(carteira, index) in myCarteiras">
                <v-col :key="carteira.id">
                    <Carteira :carteira="carteira" /> 
                </v-col>
            <v-responsive
                v-if="++index%2 === 0 && index+1 > 1"
                :key="`width-${index}`"
                width="100%"
            ></v-responsive>
            </template> 
            
        </v-row>
                

        <v-fab-transition>
            <v-btn
                color="primary"
                v-show="!$store.getters.carteiraIsLoading"
                fab
                dark
                large
                absolute
                bottom
                right
                class="v-btn--example"
                @click="formCarteira"
                >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-fab-transition>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Nova Carteira</span>
                </v-card-title>
                    <FormCarteira ref="formCarteira" />
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
                    <v-btn color="blue darken-1" :disabled="!dialog" text @click="saveCarteira">Salvar</v-btn>
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
                Fechar
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>

import Carteira from './../components/Carteira';
import FormCarteira from './../components/FormCarteira';
import HeaderDefault from './../components/HeaderDefault';

export default {
    components:{Carteira,FormCarteira,HeaderDefault},
   
    data() {
        return {
            
            dialog:false,
            loadingCarteiras: true,
            snackbar:false,
            errorMessage: "",
        }
    },
    computed: {
        myCarteiras() {
            return this.$store.getters.carteiras
        }
    },
    methods: {
        formCarteira() {
            this.dialog=true;
        },
        async saveCarteira() {

            const {errors, hasError} = this.$refs.formCarteira.getErrors();

            if(hasError){
                console.log(errors);
                this.errorMessage = errors[0]
                this.snackbar=true;
                // alert(msg);
                return;
            }

            const {nome, valor} = this.$refs.formCarteira.getDataForm();

            this.dialog = false;
            this.$refs.formCarteira.clearFields();
            try {
                await this.$store.dispatch('addCarteira',{nome, valor});
            }catch(e) {
                console.warn(e);
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