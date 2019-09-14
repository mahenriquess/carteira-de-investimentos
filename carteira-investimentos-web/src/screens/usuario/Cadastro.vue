<template>
    <div>
        <Loading v-bind:activate="loading"/>
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

        <b-button @click="goToLogin">Voltar</b-button>


        <b-modal id="modalTeste" title="Status Cadastro" ok-only  @ok="callbackOkMessage">
            <p class="my-4">{{statusCadastro}}</p>
        </b-modal>
    </div>
</template>

<script>
    import client from '../../configs/client';
    import Loading from '../../components/Loading';

    export default {
        components: {
            Loading
        },
        data() {
            return {
                usuario: {
                    nome: "",
                    sobrenome: "",
                    email: "",
                    senha: ""
                },
                loading:false,
                statusCadastro:'',
                callbackOkMessage: () => {
                }
            }
        },
        methods: {
            async cadastrar() {
                this.loading = true;
                await client.post('/signup',this.usuario)
                    .then(()=> {
                        this.statusCadastro = 'Cadastrado com sucesso';
                        this.callbackOkMessage = this.goToLogin;
                        
                        this.$bvModal.show("modalTeste");
                        
                        console.log('Cadastro efeturado');
                    })
                    .catch(err => {
                        this.callbackOkMessage = this.closeModal();
                        this.statusCadastro = 'Erro no cadastro';
                        this.$bvModal.show("modalTeste");
                        console.log('Cadastro não efeturado: '+err.response);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
            goToLogin() {
                this.$router.push('/');
            },
            closeModal() {
                this.$bvModal.hide("modalTeste");
            }
        }
    }
</script>

<style scoped>
    .items-space{
        margin-bottom:1vw;
    }
</style>