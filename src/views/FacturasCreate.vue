<template>
  <Windows titles="Editar servicio" :w="750" :h="450" :router="false">
    <div class="sub-form">
      <form :id="interaction.id_form">
        <div class="grid-auto" grid-block="200">
          <label class="label-container">Codigo de documento: <input class="input" type="text"
              placeholder="Código documento" v-model="dom.n_docu" _key="n_docu" required /></label>
          <label class="label-container">Fecha facturacion: <input class="input" type="text"
              placeholder="Fecha de facturación" v-model="dom.f_fact" _key="f_fact" required /></label>
          <div class="grid-group"></div>
          <label class="label-container">Importe: <input class="input" type="text" placeholder="Ingrese importe"
              v-model="dom.s_impo" _key="s_impo" required /></label>
          <label class="label-container">Estado: <input class="input" type="text" placeholder="Ingrese estado"
              v-model="dom.k_stad" _key="k_stad" required /></label>
          <label class="label-container">Fecha de digitacion: <input class="input" type="text"
              placeholder="Fecha de digitación" v-model="dom.f_digi" _key="f_digi" required /></label>
          <div class="grid-span-1"></div>
          <button id="conf-pass" class="button" type="button" @click="insertar">Generar factura</button>
          <div class="grid-group"></div>
        </div>
      </form>
    </div>
  </Windows>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import Windows from '../components/Windows.vue';

export default {
  name: "FacturasCreate",
  components: {
    Windows
  },
  created() {
    API('servicio/get/info-cla-o/data/' + this.id_serv).then(res => {
      this.dom = res
      setTimeout(() => {
        let result = getDataGenerate(this.interaction.id_form)
        console.log(result)
        if (result.status) this.required.dataInfo = result.data
      }, 50);
    })
  },
  data() {
    return {
      id_serv: this.$route.query.id_serv,
      dom: {
      },
      interaction: {
        id_form: "id_" + uuidv4()
      },
      required: {
        dataInfo: [

        ]
      }
    }
  },
  methods: {
    // insertar() {
    //   let result = newDataGenerate(this.interaction.id_form)
    //   if (result.status == false) return false
    //   let data = result.data
    //   API("fact/generate-fact/"+this.id_serv, { data, method: "POST" }).then(res => {
    //     this.$router.back()
    //   })
    // }
  },
}
</script>