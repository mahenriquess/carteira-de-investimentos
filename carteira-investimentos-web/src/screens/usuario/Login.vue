<template>
    <div>
        <Loading v-bind:activate="loading"/>
        <b-alert v-model="loginSuccess" variant="success" show>Logado com sucesso</b-alert>
        <b-alert v-model="loginError" variant="danger" dismissible>
            Erro ao efeturar login
        </b-alert>
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
                    <b-button @click="logar" block variant="primary">Logar</b-button>
                </b-col>
            </b-row>
            
        </b-form>
        <center>
            <router-link to="/cadastro"><p>Ainda não tem uma conta ?</p></router-link>
        </center>
    </div>
</template>

<script>
    import imageLogin from '../../assets/img/login_icon.png';
    import client from '../../configs/client';
    import Loading from '../../components/Loading';
    export default {
        components: {Loading},
        data() {
            return {
                imageLogin,
                usuario: {
                    email: "",
                    senha: "",
                },
                loading: false,
                loginSuccess: false,
                loginError: false,
                usuarioLogado: ''
            }
        },
        methods: {
            async logar() {
                this.loading = true;

                await client.post('/signin', this.usuario)
                    .then(({ data }) => {
                        console.log(data);
                        this.$cookies.set('usuario', data, {expires: '30s'});
                        this.$parent.updateUsuarioLogado();
                        this.loginError = false;
                        this.loginSuccess = true;
                    })
                    .catch(err => {
                        this.loginSuccess = false;
                        this.loginError = true;
                        console.log("Erro no login: " +err.response);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
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

    
</style>