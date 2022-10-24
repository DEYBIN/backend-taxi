<template>
  <Windows titles="Editar registro" :w="750" :h="450" :router="false">
    <div class="sub-form">
      <form :id="interaction.id_form">
        <div class="grid-auto" grid-block="200">
          <label class="label-container">Nombre: <input class="input" type="text" placeholder="Ingrese nombre"
              v-model="dom.l_nomb" _key="l_nomb" required /></label>
          <label class="label-container">Apellido paterno: <input class="input" type="text"
              placeholder="Ingrese apellido paterno" v-model="dom.l_apl1" _key="l_apl1" required /></label>
          <label class="label-container">Apellido materno: <input class="input" type="text"
              placeholder="Ingrese apellido materno" v-model="dom.l_apl2" _key="l_apl2" required /></label>
          <label class="label-container">Email: <input class="input" type="email" placeholder="Ingrese email"
              v-model="dom.l_emai" _key="l_emai" /></label>
          <label class="label-container">Celular: <input class="input" type="text" placeholder="Ingrese celular"
              v-model="dom.n_celu" _key="n_celu" required /></label>
          <label class="label-container">Cargo: <input class="input" type="text" placeholder="Ingrese cargo"
              v-model="dom.k_carg" required _key="k_carg" /></label>
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
  name: "UserUpdate",
  emits: ["updated"],
  components: {
    Windows
  },
  created() {
    API('user/get/info-cla-o/data/' + this.id_user).then(res => {
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
      id_user: this.$route.query.id_user,
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
      API("user/update/info-reg-o/data/" + this.id_user, { data, method: "PUT" }).then(res => {
        this.$emit("updated", { id_user: this.id_user, data })
        this.$router.back()
      })
    }
  },
}
</script>