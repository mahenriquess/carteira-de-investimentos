<template>
    <div>
        <b-row>
        </b-row>
        <b-form>
            <b-row class="items-space">
                <b-col>
                    <label  for="text-password">Nome</label>
                    <b-input v-model="usuario.nome" type="text"></b-input>
                </b-col>
                <b-col>
                    <label for="text-password">Sobrenome</label>
                    <b-input v-model="usuario.sobrenome" type="text"></b-input>
                </b-col>
            </b-row>
            <b-row class="items-space">
                <b-col>
                    <label for="text-password">Email</label>
                    <b-input v-model="usuario.email" type="mail"></b-input>
                </b-col>
            </b-row>
            <b-row class="items-space">
                <b-col>
                    <label for="text-password">Senha</label>
                    <b-input v-model="usuario.senha" type="password" id="text-password"></b-input>
                    <b-form-text id="password-help-block">
                        Sua senha deve ter entre 5 e 15 caracteres, contendo letras minisculas, maisculas e caracteres especiais
                    </b-form-text>
                </b-col>
                <b-col>
                    <label for="text-password">Confirmação de senha</label>
                    <b-input type="password" id="text-password"></b-input>
                    <b-form-text id="password-help-block">
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
    import client from '../../client';
    export default {
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
        methods: {
            async cadastrar() {
                try {
                    const response = await client.post('/signup',this.usuario);
                    console.log(response);
                }catch(err) {
                    console.log("Erro comunicacao: "+err);
                } 
            }
        }
    }
</script>

<style scoped>
    .items-space{
        margin-bottom:1vw;
    }
</style>