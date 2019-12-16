<template>

    <div class="align-center">
        
        <v-row align="center" justify="center">
            <v-col cols="12" sm="5" md="5">
                <v-toolbar color="primary text-center" dark flat>
                    <v-toolbar-title>Login</v-toolbar-title>
                    <div class="flex-grow-1"></div>
                    <v-progress-linear :active="$store.getters.loading" indeterminate absolute bottom color="light-blue lighten-1"></v-progress-linear>           
                </v-toolbar> 
                <v-card class=" card elevation-12 pa-5 pb-5 pt-12">
                    <v-alert type="error" v-model="erroLogin">
                        Erro ao efetuar login!
                    </v-alert>
                    <v-card-text v-bind:class="{'disabled':($store.getters.loading)}">
                        <v-form>
                            <v-text-field  v-model="usuario.email"  label="Email" required ></v-text-field>

                            <v-text-field   v-model="usuario.senha" label="Senha" type="password" required ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions v-bind:class="{'disabled':($store.getters.loading)}">
                        <v-row>
                            <v-col sm="12">
                                <v-btn color="primary" :disabled="!formIsValid" block @click="signin">Logar</v-btn>
                            </v-col>
                            <v-col sm="12">
                                <v-btn color="accent"  block to="/cadastro">Ainda não tenho uma conta</v-btn>
                            </v-col>
                        </v-row>
                        
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import imageLogin from '../../assets/img/login_icon.png';
    
    import Loading from '../../components/Loading';

    export default {
        components: { Loading },
        data() {
            return {
                imageLogin,
                usuario: {
                    email: "",
                    senha: "",
                },
                erroLogin:false,
                successLogin:false,
                secondsToRedirect: 4,
            }
        },
        computed: {
            formIsValid() {
                return this.usuario.email.includes('@') && this.usuario.email.length > 3 && this.usuario.senha.length > 6;
            }
        },
        methods: {
            async signin() {
                this.$store.dispatch('initLoading');

                try {
                    await this.$store.dispatch('signin',this.usuario);
                    this.erroLogin = false;
                    this.successLogin = true;
                    this.$store.dispatch('atualizaUsuarioLogado');
                    setTimeout(() => {
                        this.$store.dispatch('loadCarteiras');
                    },500)
                    
                    this.$router.push('/');
                    
                }catch(e) {
                    this.erroLogin = true;
                }
                this.$store.dispatch('dismissLoading');
            }
        }
    }
</script>

<style scoped>
    #image-login{
        width: 10%;
    }

    .items-space{
        margin-bottom:1vw;
    }

    .align-center{
        height: 80vh !important;
    }

</style>