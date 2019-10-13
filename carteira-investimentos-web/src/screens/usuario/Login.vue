<template>
    <!-- <div>
        <Loading v-bind:activate="$store.getters.loading"/>
        <b-alert v-model="$store.getters.erroLogin" variant="danger" dismissible>Erro ao efeturar login</b-alert>
        <b-row>
            <b-col class="text-center">
                <img id="image-login" v-bind:src="imageLogin">
            </b-col>
        </b-row>
        <b-form>
            <b-row class="items-space">
                <b-col>
                    <label for="text-password">Email</label>
                    <b-input v-model="usuario.email" type="email" id="text-password" aria-describedby="password-help-block"></b-input>
                </b-col>
            </b-row>

            <b-row class="items-space">
                <b-col>
                    <label for="text-password">Senha</label>
                    <b-input v-model="usuario.senha" type="password" id="text-password" aria-describedby="password-help-block"></b-input>
                    <b-form-text id="password-help-block">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not
                    contain spaces, special characters, or emoji.
                    </b-form-text>
                </b-col>
            </b-row>
            <b-row class="items-space">
                <b-col>
                    <b-button @click="login(usuario)" block variant="primary">Logar</b-button>
                </b-col>
            </b-row>
            
        </b-form>
        <center>
            <router-link to="/cadastro"><p>Ainda não tem uma conta ?</p></router-link>
        </center>
        {{ $store.state.usuario.isLogged }}
    </div> -->
    <div class="align-center">
        
        <v-row align="center" justify="center">
            <v-col cols="12" sm="3" md="3">
                <v-toolbar color="primary text-center" dark flat>
                    <v-toolbar-title>Login</v-toolbar-title>
                    <div class="flex-grow-1"></div>
                    <v-progress-linear :active="$store.getters.loading" indeterminate absolute bottom color="light-blue lighten-1"></v-progress-linear>           
                </v-toolbar> 
                <v-card class=" card elevation-12 pa-5 pb-5 pt-12">
                    <v-alert type="error" v-model="erroLogin">
                        Erro ao efeturar login
                    </v-alert>
                    <v-card-text v-bind:class="{'disabled':($store.getters.loading)}">
                        <v-form>
                            <v-text-field  v-model="usuario.email"  label="Email" :rules="emailRules"  required ></v-text-field>

                            <v-text-field   v-model="usuario.senha" label="Senha" :rules="passwordRules" type="password" required ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions v-bind:class="{'disabled':($store.getters.loading)}">
                        <div class="flex-grow-1"></div>
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
    .card{}
</style>