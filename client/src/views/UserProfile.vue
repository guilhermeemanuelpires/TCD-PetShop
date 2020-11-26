<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="
        min-height: 450px;
        background-size: cover;
        background-position: center top;
      "
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-12 col-md-10">
            <h1 class="display-2 text-white">Olá {{ model.name }}</h1>
            <p class="text-white col-lg-12">
              Esse é seu perfil, aqui você pode ediar seus dados pessoais!
            </p>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--9">
      <div class="row">
        <div class="col-xl-12 order-xl-1">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Minha Conta</h3>
                </div>
                <div class="col-4 text-right">
                  <a
                    href="#/profile"
                    class="btn btn-sm btn-primary"
                    @click="save()"
                    >Salvar</a
                  >
                </div>
              </div>
            </div>
            <template>
              <form @submit.prevent>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-12">
                      <base-input
                        alternative=""
                        label="Usuário"
                        placeholder="Username"
                        input-classes="form-control-alternative"
                        v-model="model.username"
                        readonly="false"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="E-mail"
                        placeholder="jesse@example.com"
                        input-classes="form-control-alternative"
                        v-model="model.email"
                      />
                    </div>

                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Fone"
                        placeholder="jesse@example.com"
                        input-classes="form-control-alternative"
                        v-model="model.fone"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Auth from "../services/models/Auth";
export default {
  name: "user-profile",
  mounted() {
    this.user = localStorage.getItem("petshop-token");
    this.user = JSON.parse(this.user).user;
    this.model = this.user;
  },
  data() {
    return {
      model: {
        id: 0,
        name: "",
        username: "",
        email: "",
        fone: "",
      },
      user: "",
      retorno: {},
    };
  },
  methods: {
    save() {
      Auth.Update({ user: this.model }).then((response) => {
        this.retorno = response.data;
        if (this.retorno.status == 200) {
          this.$notify({ type: "success", title: this.retorno.sucessMsg });

          localStorage.removeItem("petshop-token");
          localStorage.setItem(
            "petshop-token",
            JSON.stringify({ user: this.retorno.user })
          );

          this.$router.push("/profile");
        } else {
          this.$notify({ type: "danger", title: this.retorno.errorMsg });
        }
      });
    },
  },
};
</script>
<style></style>
