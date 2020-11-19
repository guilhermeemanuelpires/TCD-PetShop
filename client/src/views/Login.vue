<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <h1>Autenticação</h1>
          </div>
          <!-- <div class="btn-wrapper text-center">
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="img/icons/common/github.svg"
              /></span>
              <span class="btn-inner--text">Github</span>
            </a>
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="img/icons/common/google.svg"
              /></span>
              <span class="btn-inner--text">Google</span>
            </a>
          </div> -->
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Difina suas credencias de acesso!</small>
          </div>
          <form role="form">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Usuário"
              addon-left-icon="ni ni-single-02"
              v-model="model.username"
            >
            </base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            >
            </base-input>

            <div class="text-center">
              <span style="color: #f5365c">{{ retorno.erro.errorMsg }}</span>
            </div>
            <div class="text-center">
              <span style="color: #2dce89">{{ retorno.erro.sucessMsg }}</span>
            </div>
            <div class="text-center">
              <base-button @click="Login()" type="primary" class="my-4"
                >Entrar</base-button
              >
            </div>
          </form>
        </div>
      </div>
      <div class="text-right">
        <router-link to="/register" class="text-light"
          ><small>Cria uma nova conta</small></router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
import Auth from "../services/models/Auth";

export default {
  name: "login",
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
      retorno: {
        erro: "",
      },
    };
  },
  methods: {
    Login() {
      Auth.Login(this.model).then((response) => {
        this.retorno.erro = response.data;
        if (this.retorno.erro.status === 200) {
          this.$router.push("/profile");
        }
      });
    },
  },
};
</script>
<style>
</style>
