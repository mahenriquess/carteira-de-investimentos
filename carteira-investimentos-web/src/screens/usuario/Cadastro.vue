<template>
<div class="align-center">
<v-row align="center" elevation justify="center">

    <v-col cols="12"  sm="6" md="6">
        <v-toolbar color="primary text-center" dark flat>
            <v-toolbar-title>Cadastrar Usuário</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-progress-linear :active="$store.getters.loading" indeterminate absolute bottom color="light-blue lighten-1"></v-progress-linear> 
        </v-toolbar>            
        <v-card  class="elevation-12  pa-5 pb-5 pt-12">
            <v-alert type="error" v-model="cadastroError">
                Erro ao efetuar cadastro. Preencha os campos adequadamente.
            </v-alert>
            <v-alert type="success" v-model="cadastroSuccess">
                Cadastro efetuado com sucesso ! Você será redirecionado.
            </v-alert>
            <v-card-text v-bind:class="{'disabled':($store.getters.loading)}">
                <v-text-field v-model="usuario.email" :rules="emailRules" label="Email" required ></v-text-field>

                <v-text-field v-model="usuario.nome" :rules="nameRules" label="Nome" required ></v-text-field>

                <v-text-field v-model="usuario.sobrenome" :rules="sobrenomeRules" label="Sobrenome" required ></v-text-field>

                <v-text-field  v-model="usuario.senha" :rules="passwordRules" label="Senha" type="password" required ></v-text-field>
            </v-card-text>
            <v-card-actions v-bind:class="{'disabled':($store.getters.loading)}">
                <v-row>
                   
                    <v-col sm="12">
                        <v-btn color="primary" :disabled="!formIsValid" block @click="signup">Cadastrar</v-btn>
                    </v-col>
                     <v-col sm="12">
                        <v-btn color="accent" block to="/login">Já tenho uma conta</v-btn> 
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-col>
    
    
</v-row>

        <!-- <center>
            <router-link to="/"><p>Ja tem uma conta ?</p></router-link>
        </center> -->

</div>
</template>

<script>
    import client from '../../configs/client';
    import Loading from '../../components/Loading';

    export default {
        components: { Loading },
        data() {
            return {
                usuario: {
                    nome: "",
                    sobrenome: "",
                    email: "",
                    senha: ""
                },
                statusCadastro: false,
                cadastroError: false,
                cadastroSuccess: false,
                secondsToRedirect: 3,
            }
        },
        computed: {
            formIsValid() {
                return this.usuario.email.includes('@') 
                        && this.usuario.email.length > 3 
                        && this.usuario.senha.length > 6
                        && this.usuario.nome.length > 0
                        && this.usuario.sobrenome.length > 0
            }
        },
        methods: {
            async signup() {
                this.$store.dispatch('initLoading',this.usuario);
                try {
                    await this.$store.dispatch('signup',this.usuario);
                    this.cadastroError = false;
                    this.cadastroSuccess = true;
                    setInterval(() => {
                        this.secondsToRedirect--;
                        if(this.secondsToRedirect==0){
                            this.$router.push('/login');
                        }
                    },1000);
                }catch(e) {
                    this.cadastroError = true;
                }
                this.$store.dispatch('dismissLoading',this.usuario);
            }
        }
    }
</script>

<style scoped>
    .items-space{
        margin-bottom:1vw;
    }
    .align-center{
        height: 80vh !important;
    }
    
</style>