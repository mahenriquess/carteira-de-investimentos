<template>
    <div>
        <Loading v-bind:activate="$store.getters.loading"/>
        <b-alert v-model="mostraAlertCadastro" :variant="classAlertCadastro" dismissible>{{ $store.getters.messageCadastro }}</b-alert>
        <b-row>
        </b-row>
        <b-form>
            <b-row class="items-space">
                <b-col>
                    <label>Nome</label>
                    <b-input v-model="usuario.nome" type="text"></b-input>
                </b-col>
                <b-col>
                    <label>Sobrenome</label>
                    <b-input v-model="usuario.sobrenome" type="text"></b-input>
                </b-col>
            </b-row>
            <b-row class="items-space">
                <b-col>
                    <label>Email</label>
                    <b-input v-model="usuario.email" type="email"></b-input>
                </b-col>
            </b-row>
            <b-row class="items-space">
                <b-col>
                    <label>Senha</label>
                    <b-input v-model="usuario.senha" type="password"></b-input>
                    <b-form-text >
                        Sua senha deve ter entre 5 e 15 caracteres, contendo letras minisculas, maisculas e caracteres especiais
                    </b-form-text>
                </b-col>
                <b-col>
                    <label>Confirmação de senha</label>
                    <b-input type="password" id="text-password"></b-input>
                    <b-form-text >
                        Este campo deve ser exatamente ao digitado no campo de senha
                    </b-form-text>
                </b-col>
            </b-row>
            <b-row class="items-space">
                <b-col>
                    <b-button block variant="primary" @click="cadastrar">Cadastrar</b-button>
                </b-col>
            </b-row>
        </b-form>
            
        <center>
            <router-link to="/"><p>Ja tem uma conta ?</p></router-link>
        </center>

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
                }
            }
        },
        computed: {
            mostraAlertCadastro() {
                console.log(this.$store.getters.statusCadastro);
                return this.$store.getters.statusCadastro === true || this.$store.getters.statusCadastro === false;
            },
            classAlertCadastro() {
               if(this.$store.getters.statusCadastro === true) {
                   return 'success';
               }else {
                   return 'danger';
               }
            }
        },
        methods: {
            cadastrar() {
                this.$store.dispatch('cadastrarUsuario',this.usuario)
            }
        }
    }
</script>

<style scoped>
    .items-space{
        margin-bottom:1vw;
    }
</style>