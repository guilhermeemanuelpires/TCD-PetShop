<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <!-- <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Sign up with</small>
          </div>
          <div class="btn-wrapper text-center">
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
          </div>
        </div> -->
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Cadastro de Usuario</small>
          </div>
          <form role="form">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Nome"
              addon-left-icon="ni ni-satisfied"
              v-model="model.name"
            >
            </base-input>

            <base-input
              class="input-group-alternative mb-3"
              placeholder="Usuário"
              addon-left-icon="ni ni-single-02"
              v-model="model.username"
            >
            </base-input>

            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="model.email"
            >
            </base-input>

            <base-input
              class="input-group-alternative mb-3"
              placeholder="Telefone"
              addon-left-icon="ni ni-mobile-button"
              v-model="model.fone"
            >
            </base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Senha"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            >
            </base-input>
            <!-- 
                        <div class="text-muted font-italic">
                            <small>password strength: <span class="text-success font-weight-700">strong</span></small>
                        </div>

                        <div class="row my-4">
                            <div class="col-12">
                                <base-checkbox class="custom-control-alternative">
                                    <span class="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                                </base-checkbox>
                            </div>
                        </div> -->
            <div class="text-center">
              <base-button type="primary" class="my-4" @click="Register()"
                >Cadastrar-se</base-button
              >
            </div>
          </form>
        </div>
      </div>

      <div class="text-right">
        <router-link to="/login" class="text-light">
          <small>Entre na sua conta</small>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Auth from "../services/models/Auth";
export default {
  name: "register",
  data() {
    return {
      model: {
        name: "",
        username: "",
        email: "",
        fone: "",
        password: "",
      },
      retorno: "",
    };
  },
  methods: {
    Register() {
      //   alert(JSON.stringify({ user: this.model }));
      Auth.Register({ user: this.model }).then((response) => {
        this.retorno.erro = response.data;
      });
    },
  },
};
</script>
<style>
</style>
