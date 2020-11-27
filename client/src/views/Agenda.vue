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
            <h1 class="display-2 text-white">Agenda</h1>
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
                  <h3 class="mb-0">Informação do agendamento</h3>
                </div>
                <div class="col-4 text-right">
                  <a
                    href="#/agenda"
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
                      <label
                        for="teste"
                        style="
                          color: #525f7f;
                          font-size: 0.875rem;
                          font-weight: 600;
                          margin-top: 15px;
                        "
                        >Selecione Pet</label
                      >
                      <select v-model="model.petid" class="custom-select">
                        <option v-if="pets.length <= 0" selected value="">
                          Nenhum Pet Cadastrado
                        </option>

                        <option v-if="pets.length > 0" selected value="">
                          - Selecione um Pet -
                        </option>

                        <option
                          v-for="pet in pets"
                          :key="pet.id"
                          :value="pet.id"
                        >
                          {{ pet.id }} - {{ pet.name }}
                        </option>
                      </select>
                    </div>

                    <div class="col-lg-12">
                      <label
                        for="teste"
                        style="
                          color: #525f7f;
                          font-size: 0.875rem;
                          font-weight: 600;
                          margin-top: 15px;
                        "
                        >Selecione um Endereço</label
                      >
                      <select v-model="model.enderecoid" class="custom-select">
                        <option v-if="enderecos.length <= 0" selected value="">
                          Nenhum Endereço Cadastrado
                        </option>

                        <option v-if="enderecos.length > 0" selected value="">
                          - Selecione um Endereço -
                        </option>

                        <option
                          v-for="endereco in enderecos"
                          :key="endereco.id"
                          :value="endereco.id"
                        >
                          {{ endereco.id }} - {{ endereco.name }}
                        </option>
                      </select>
                    </div>

                    <div class="col-lg-12">
                      <label
                        for="teste"
                        style="
                          color: #525f7f;
                          font-size: 0.875rem;
                          font-weight: 600;
                          margin-top: 15px;
                        "
                        >Tipo Serviço</label
                      >
                      <select v-model="model.typserv" class="custom-select">
                        <option selected value="">Selecione o tipo de serviço</option>
                        <option value="B">Banho</option>
                        <option value="T">Tosa</option>
                        <option value="A">Banho e Tosa</option>
                      </select>
                    </div>

                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Dia"
                        placeholder="Nome"
                        input-classes="form-control-alternative"
                        v-model="model.date"
                        type="date"
                      />
                    </div>

                    <div class="col-lg-6">
                      <base-input
                        alternative=""
                        label="Hora"
                        placeholder="Hora"
                        type="time"
                        input-classes="form-control-alternative"
                        v-model="model.time"
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
                        >Obeservação</label
                      >
                      <textarea
                        class="form-control"
                        rows="3"
                        aria-valuemax="2"
                        v-model="model.obs"
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
    </div>
  </div>
</template>
<script>
import Servico from "../services/models/Servico";
import Pet from "../services/models/Pet";
import Endereco from "../services/models/Endereco";

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
        state : "0",
        resp: "",
        petid: "",
        enderecoid: "",
        typserv: "",
        date: "",
        time: "",
        obs: "",
      },
      pets: {},
      enderecos: {},
      editando: false,
    };
  },
  methods: {
    save() {
      if (
        this.model.petid &&
        this.model.enderecoid &&
        this.model.typserv &&
        this.model.date &&
        this.model.time &&
        this.model.obs
      ) {
        Servico.add({ servico: this.model }).then((response) => {
          if (response.data.status == 200) {
            this.$notify({ type: "success", title: response.data.sucessMsg });
            this.clear();
          } else {
            this.$notify({ type: "danger", title: response.data.errorMsg });
          }
        });
      } else {
        this.$notify({ type: "warning", title: "informe todos os campos!" });
      }
    },
    clear() {
      this.model.petid = "";
      this.model.name = "";
      this.model.enderecoid = "";
      this.model.typserv = "";
      this.model.date = "";
      this.model.time = "";
      this.model.obs = "";
    },
    LoadDados() {
      Pet.FindByiD(this.model.resp).then((response) => {
        this.pets = response.data;
      });
      Endereco.FindByiD(this.model.resp).then((response) => {
        this.enderecos = response.data;
      });
    },
  },
};
</script>
<style></style>