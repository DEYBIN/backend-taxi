<template>
  <Windows titles="Editar servicio" :w="750" :h="450" :router="false">
    <div class="sub-form">
      <form :id="interaction.id_form">
        <div class="grid-auto" grid-block="200">
          <label class="label-container">Importe: <input class="input" type="text" placeholder="Ingrese importe"
              v-model="dom.s_impo" _key="s_impo" required /></label>
          <label class="label-container">Estado: <input class="input" type="text" placeholder="Ingrese estado 0 o 1"
              v-model="dom.k_stad" _key="k_stad" required /></label>
          <div class="grid-group"></div>
          <div class="grid-span-1"></div>
          <button id="conf-pass" class="button" type="button" @click="actualizar">Actualizar</button>
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
  name: "ServiciosUpdate",
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
    actualizar() {
      let result = updateDataGenerate(this.interaction.id_form, this.required.dataInfo)
      if (result.status == false) return false
      let data = result.data
      API("servicio/update/info-reg-o/data/" + this.id_serv, { data, method: "PUT" }).then(res => {
        this.$router.back()
      })

    }
  },
}
</script>