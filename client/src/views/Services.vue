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
            <h1 class="display-2 text-white">Serviços</h1>
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
                <div class="col-12">
                  <h3 class="mb-0">Lista de serviços</h3>
                </div>
              </div>
            </div>
            <template>
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <th class="text-white" scope="col">Cód. Serviço</th>
                    <th class="text-white" scope="col">status</th>
                    <th class="text-white" scope="col">Pet</th>
                    <th class="text-white" scope="col">Endereco</th>
                    <th class="text-white" scope="col">Dia</th>
                    <th class="text-white" scope="col">Hora</th>
                    <th class="text-white" scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="servico in servicos" :key="servico.id" style="bac">
                    <th scope="row">{{ servico.id }}</th>

                    <td class="2">
                      <a v-if="servico.state === 0" class="text-primary"
                        >Em andamento</a
                      >
                      <a v-if="servico.state === 1" class="text-danger"
                        >Cancelado</a
                      >
                      <a v-if="servico.state === 2" class="text-success"
                        >Concluido</a
                      >
                    </td>

                    <td>
                      <!-- {{ servico.pet.name }} -->

                      <div class="card" style="width: 250px">
                        <div class="card-body">
                          <h5 class="card-title">
                            {{ servico.pet.name }}
                          </h5>
                          <h6 class="card-subtitle mb-2 text-muted">
                            {{ servico.pet.weight }}
                          </h6>
                          <h6 class="card-subtitle mb-2 text-muted">
                            <div v-if="servico.pet.sex === 'F'">Fêmea</div>
                            <div v-if="servico.pet.sex === 'M'">Macho</div>
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td clas="col-1">
                      <!-- {{ servico.endereco.name }} -->

                      <div class="card" style="width: 250px">
                        <div class="card-body">
                          <h5 class="card-title">
                            {{ servico.endereco.name }}
                          </h5>
                          <h6 class="card-subtitle mb-2 text-muted">
                            {{ servico.endereco.street }}
                          </h6>
                          <h6 class="card-subtitle mb-2 text-muted">
                            {{ servico.endereco.number }}
                          </h6>
                          <p class="card-text">
                            {{ servico.endereco.complement }}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>{{ servico.date }}</td>
                    <td>{{ servico.time }}</td>
                    <td class="text-right">
                      <base-dropdown
                        class="dropdown"
                        position="right"
                        v-if="servico.state !== 2"
                      >
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
                          <a
                            class="dropdown-item"
                            @click="edit(servico.id, 1)"
                            v-if="servico.state !== 1"
                            >Cancelar</a
                          >
                          <a
                            class="dropdown-item"
                            @click="edit(servico.id, 2)"
                            v-if="servico.state !== 2"
                            >Concluir</a
                          >
                          <a class="dropdown-item" @click="del(servico.id)"
                            >Excluir</a
                          >
                        </template>
                      </base-dropdown>
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Servico from "../services/models/Servico";

export default {
  name: "Services",
  mounted() {
    this.user = localStorage.getItem("petshop-token");
    this.model.resp = JSON.parse(this.user).user.id;
    this.LoadDados();
  },
  data() {
    return {
      model: {
        resp: "",
      },
      servicos: {},
    };
  },
  methods: {
    LoadDados() {
      Servico.FindAll().then((response) => {
        this.servicos = response.data;
      });
    },
    del(id) {
      Servico.Delete(id).then((response) => {
        if (response.data.status == 204) {
          this.$notify({ type: "success", title: response.data.sucessMsg });
          this.LoadDados();
        } else {
          this.$notify({ type: "danger", title: response.data.errorMsg });
        }
      });
    },
    edit(id, state) {
      Servico.Edit({ servico: { id: id, state: state } }).then((response) => {
        if (response.data.status == 200) {
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