<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="
        min-height: 400px;
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
            <h1 class="display-2 text-white">Cadastro de Endereços</h1>
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
                  <h3 class="mb-0">Informação do Endereço</h3>
                </div>
                <div class="col-4 text-right">
                  <a href="#/endereco" class="btn btn-sm btn-primary" @click="save()"
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
                        label="Descrição"
                        placeholder="Descrição"
                        input-classes="form-control-alternative"
                        v-model="model.name"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Rua"
                        placeholder="Rua "
                        input-classes="form-control-alternative"
                        v-model="model.street"
                      />
                    </div>

                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Número"
                        placeholder="Número"
                        input-classes="form-control-alternative"
                        type="number"
                        v-model="model.number"
                      />
                    </div>

                    <div class="col-lg-12">
                      <label
                        for="exampleFormControlTextarea1"
                        style="
                          color: #525f7f;
                          font-size: 0.875rem;
                          font-weight: 600;
                        "
                        >Complemento</label>
                      <textarea
                        class="form-control"
                        rows="3"
                        aria-valuemax="2"
                        v-model="model.complement"
                      >
                      
                      </textarea>
                    </div>
                  </div>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>

      <table class="table mt-3" v-if="(enderecos.length > 0)">
        <thead class="thead-dark">
          <tr>
            <th class="text-white" scope="col">Descrição</th>
            <th class="text-white" scope="col">Rua</th>
            <th class="text-white" scope="col">Número</th>
            <th class="text-white" scope="col">Complemento</th>
            <th class="text-white" scope="col-1"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="endereco in enderecos" :key="endereco.id">
            <td>{{ endereco.name }}</td>
            <td>{{ endereco.street }}</td>
            <td>{{ endereco.number }}</td>
            <td>{{ endereco.complement }}</td>
            <td class="text-right">
              <base-dropdown class="dropdown" position="right">
                <a
                  slot="title"
                  class="btn btn-sm btn-icon-only text-light"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-ellipsis-v"></i>
                </a>

                <template>
                  <a class="dropdown-item" @click="edit(endereco)">Editar</a>
                  <a class="dropdown-item" @click="del(endereco.id)">Excluir</a>
                </template>
              </base-dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Endereco from "../services/models/Endereco";

export default {
  name: "Endereco",
  mounted() {
    this.user = localStorage.getItem("petshop-token");
    this.model.resp = JSON.parse(this.user).user.id;
    this.LoadDados();
  },
  data() {
    return {
      model: {
        resp: "",
        name: "",
        street: "",
        number: "",
        complement: "",
      },
      enderecos: {},
      editando: false,
    };
  },
  methods: {
    save() {      
      if (this.model.name && this.model.street && this.model.number && this.model.complement) {
        if (!this.editando) {
          Endereco.add({ endereco: this.model }).then((response) => {
            if (response.data.status == 200) {
              this.$notify({ type: "success", title: response.data.sucessMsg });
              this.clear();
              this.LoadDados();
            } else {
              this.$notify({ type: "danger", title: response.data.errorMsg });
            }
          });
        } else {
          Endereco.Edit({ endereco: this.model }).then((response) => {
            if (response.data.status == 200) {
              this.$notify({ type: "success", title: response.data.sucessMsg });
              this.clear();
              this.LoadDados();
            } else {
              this.$notify({ type: "danger", title: response.data.errorMsg });
            }
          });
        }
      } else {
        this.$notify({ type: "warning", title: "informe todos os campos" });
      }
    },
    clear() {
      this.model.name = "";
      this.model.street = "";
      this.model.number = "";
      this.model.complement = "";
    },
    LoadDados() {
      Endereco.FindByiD(this.model.resp).then((response) => {
        this.enderecos = response.data;
      });
    },
    edit(endereco) {
      this.model = endereco;
      this.editando = true;
    },
    del(id) {
      Endereco.Delete(id).then((response) => {
        if (response.data.status == 204) {
          this.$notify({ type: "success", title: response.data.sucessMsg });
          this.LoadDados();
        } else {
          this.$notify({ type: "danger", title: response.data.errorMsg });
        }
      });
    },
  },
};
</script>
<style></style>