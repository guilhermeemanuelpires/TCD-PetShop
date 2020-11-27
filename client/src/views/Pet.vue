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
            <h1 class="display-2 text-white">Cadastro de Pets</h1>
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
                  <h3 class="mb-0">Informação do Pet</h3>
                </div>
                <div class="col-4 text-right">
                  <a href="#/pet" class="btn btn-sm btn-primary" @click="save()"
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
                        label="Nome"
                        placeholder="Nome"
                        input-classes="form-control-alternative"
                        v-model="model.name"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Peso"
                        placeholder="peso"
                        type="number"
                        input-classes="form-control-alternative"
                        v-model="model.weight"
                      />
                    </div>

                    <div class="col-lg-6">
                      <label
                        for="teste"
                        style="
                          color: #525f7f;
                          font-size: 0.875rem;
                          font-weight: 600;
                        "
                        >Sexo</label
                      >
                      <select v-model="model.sex" class="custom-select">
                        <option selected value="">Selecione o Sexo</option>
                        <option value="M">Macho</option>
                        <option value="F">Fêmea</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>

      <table class="table mt-3" v-if="(pets.length > 0)">
        <thead class="thead-dark">
          <tr>
            <th class="text-white" scope="col">Nome</th>
            <th class="text-white" scope="col">Peso</th>
            <th class="text-white" scope="col">Sexo</th>
            <th class="text-white" scope="col-1"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pet in pets" :key="pet.id">
            <td>{{ pet.name }}</td>
            <td>{{ pet.weight }}</td>
            <td>
              <div v-if="pet.sex === 'F'">Fêmea</div>
              <div v-if="pet.sex === 'M'">Macho</div>
            </td>
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
                  <a class="dropdown-item" @click="edit(pet)">Editar</a>
                  <a class="dropdown-item" @click="del(pet.id)">Excluir</a>
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
import Pet from "../services/models/Pet";

export default {
  name: "Pet",
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
        weight: "",
        sex: "",
      },
      pets: {},
      editando: false,
    };
  },
  methods: {
    save() {
      if (this.model.name && this.model.weight && this.model.sex) {
        if (!this.editando) {
          Pet.add({ pet: this.model }).then((response) => {
            if (response.data.status == 200) {
              this.$notify({ type: "success", title: response.data.sucessMsg });
              this.clear();
              this.LoadDados();
            } else {
              this.$notify({ type: "danger", title: response.data.errorMsg });
            }
          });
        } else {
          Pet.Edit({ pet: this.model }).then((response) => {
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
      this.model.weight = "";
      this.model.sex = "";
    },
    LoadDados() {
      Pet.FindByiD(this.model.resp).then((response) => {
        this.pets = response.data;
      });
    },
    edit(pet) {
      this.model = pet;
      this.editando = true;
    },
    del(id) {
      Pet.Delete(id).then((response) => {
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