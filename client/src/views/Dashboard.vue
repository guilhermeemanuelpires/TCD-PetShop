<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title=" qauntidade de PETS"
            :sub-title="QtdPets"
            type="gradient-red"
            icon="fas fa-paw "
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-nowrap"
                ><a href="#/pet" class="btn btn-sm btn-primary">
                  Adicionar</a
                ></span
              >
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Qauntidade de Endereços"
            :sub-title="QtdEndereco"
            type="gradient-orange"
            icon="ni ni-delivery-fast"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-nowrap"
                ><a href="#/endereco" class="btn btn-sm btn-primary">
                  Adicionar</a
                ></span
              >
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Agenda"
            type="gradient-green"
            :sub-title="QtdServico"
            icon="ni ni-calendar-grid-58"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-nowrap"
                ><a href="#/agenda" class="btn btn-sm btn-primary">
                  Adicionar</a
                ></span
              >
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6" v-if="this.model.type > 0">
          <stats-card
            title="Serviços Disponiveis"
            type="gradient-info"
            :sub-title="QtdeAllServicos"
            icon="ni ni-shop"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-nowrap"
                ><a href="#/services" class="btn btn-sm btn-primary">
                  Vereficar Servicos</a
                ></span
              >
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <!--Tables-->
    <div class="container-fluid mt--6" v-if="servicos.length > 0">
      <div class="col-xl-12 order-xl-1">
        <card shadow type="secondary">
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

                <td>
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

                <td>{{ servico.pet.name }}</td>
                <td>{{ servico.endereco.name }}</td>
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
                      <a class="dropdown-item" @click="edit(servico.id, 1)" v-if="servico.state !== 1"
                        >Cancelar</a
                      >
                      <a class="dropdown-item" @click="edit(servico.id, 0)" v-if="servico.state !== 0"
                        >Reabrir</a
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
        </card>
      </div>
    </div>

    <div class="container-fluid mt--6" v-if="servicos.length <= 0">
      <div class="col-xl-12 order-xl-1">
        <card shadow type="secondary">
          <div style="text-align: center">
            <img src="img/brand/cachorro.png" alt="" />
            <h1>Nenhum serviço cadastrado!</h1>
          </div>
        </card>
      </div>
    </div>
    <!--End tables-->
  </div>
</template>
<script>
// Tables
import Pet from "../services/models/Pet";
import Endereco from "../services/models/Endereco";
import Servico from "../services/models/Servico";

export default {
  components: {
    // LineChart
  },
  data() {
    return {
      model: {
        resp: "",
        type: "",
      },
      servicos: {},
      QtdPets: 0,
      QtdEndereco: 0,
      QtdServico: 0,
      QtdeAllServicos: 0,
    };
  },
  methods: {
    LoadCount() {
      Pet.FindByiDCount(this.model.resp).then((response) => {
        if (response.data.status == 200) {
          this.QtdPets = response.data.count;
        }
      });
      Endereco.FindByiDCount(this.model.resp).then((response) => {
        if (response.data.status == 200) {
          this.QtdEndereco = response.data.count;
        }
      });
      Servico.FindByiDCount(this.model.resp).then((response) => {
        if (response.data.status == 200) {
          this.QtdServico = response.data.count;
        }
      });
      if (this.model.type > 0) {
        Servico.FindAllCount(this.model.resp).then((response) => {
          if (response.data.status == 200) {
            this.QtdeAllServicos = response.data.count;
          }
        });
      }
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
    LoadDados() {
      Servico.FindByiD(this.model.resp).then((response) => {
        this.servicos = response.data;
      });
      this.LoadCount();
    },
    edit(id, state) {
      Servico.Edit({ servico : {id : id, state :state} }).then((response) => {
        if (response.data.status == 200) {
          this.$notify({ type: "success", title: response.data.sucessMsg });
          this.LoadDados();
        } else {
          this.$notify({ type: "danger", title: response.data.errorMsg });
        }
      });
    },
  },
  mounted() {
    this.user = localStorage.getItem("petshop-token");
    this.model.resp = JSON.parse(this.user).user.id;
    this.model.type = JSON.parse(this.user).user.type;
    this.LoadDados();
  },
};
</script>
<style></style>
