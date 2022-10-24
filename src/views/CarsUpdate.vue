<template>
  <Windows titles="Editar registro" :w="700" :h="450" :router="false">
    <div class="sub-form">
      <form :id="interaction.id_form">
        <div class="grid-auto" grid-block="200">
          <label class="label-container">Nombre: <input class="input" type="text" placeholder="Ingrese nombre"
              v-model="dom.l_clie" _key="l_clie" required /></label>
          <label class="label-container">Direccion: <input class="input" type="text" placeholder="Ingrese email"
              v-model="dom.l_dire" _key="l_dire" required /></label>
          <label class="label-container">Referencia: <input class="input" type="text" placeholder="Ingrese celular"
              v-model="dom.l_refe" _key="l_refe" /></label>
          <label class="label-container">Telefono: <input class="input" type="text" placeholder="Ingrese una contraseña"
              v-model="dom.n_tele" _key="n_tele"></label>
          <label class="label-container">Celular: <input class="input" type="text" placeholder="Confirmar contraseña"
              v-model="dom.n_celu" _key="n_celu" required /></label>
          <label class="label-container">Observacion: <input class="input" type="text" placeholder="Observacion"
              v-model="dom.l_obse" _key="l_obse" /></label>
          <button id="conf-pass" class="button" type="button" @click="actualizar">Actualizar cliente</button>
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
  name: "CarsUpdate",
  emits: ["updated"],
  components: {
    Windows
  },
  created() {
    API('car/get/info-cla-o/data/' + this.c_plac).then(res => {
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
      c_plac: this.$route.query.c_plac,
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
      API("cliente/update/info-reg-o/data/" + this.c_plac, { data, method: "PUT" }).then(res => {
        this.$emit("updated", { id_user: this.id_user, data })
        this.$router.back()
      })
    }
  },
}
</script>