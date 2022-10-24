<template>
  <Windows titles="Crear nuevo registro" :w="700" :h="450" :router="false">
    <div class="sub-form">
      <form :id="interaction.id_form">
        <div class="grid-auto" grid-block="200">
          <label class="label-container">Numero de documento: <input class="input" type="text"
              placeholder="Ingrese numero de documento" _key="n_docu" required /></label>
          <label class="label-container">Codigo de documento: <input class="input" type="text"
              placeholder="Ingrese codigo de documento" _key="c_docu" required /></label>
          <div class="grid-group"></div>
          <label class="label-container">Nombre: <input class="input" type="text" placeholder="Ingrese nombre"
              _key="l_clie" required /></label>
          <label class="label-container">Genero: <input class="input" type="text" placeholder="Ingrese genero"
              _key="k_gene" required /></label>
          <label class="label-container">Fecha de nacimiento: <input class="input" type="text"
              placeholder="Ingrese apellido materno" _key="f_naci" required /></label>
          <label class="label-container">Direccion: <input class="input" type="text" placeholder="Ingrese email"
              _key="l_dire" required /></label>
          <label class="label-container">Referencia: <input class="input" type="text" placeholder="Ingrese celular"
              _key="l_refe" /></label>
          <label class="label-container">Ubigeo: <input class="input" type="text" placeholder="Ingrese cargo"
              _key="c_ubig" required /></label>
          <label class="label-container">Telefono: <input class="input" type="text" placeholder="Ingrese una contraseña"
              _key="n_tele"></label>
          <label class="label-container">Celular: <input class="input" type="text" placeholder="Confirmar contraseña"
              _key="n_celu" required /></label>
          <label class="label-container">Observacion: <input class="input" type="text"
              placeholder="Confirmar contraseña" _key="l_obse" /></label>
          <div class="grid-group"></div>
          <div class="grid-span-2"></div>
          <button id="conf-pass" class="button" type="button" @click="insertar">Crear cliente</button>
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
  name: "CustomersCreate",
  emits: ["inserted", "updated"],
  components: {
    Windows
  },
  created() {

  },
  data() {
    return {
      dom: {
      },
      interaction: {
        id_form: "id_" + uuidv4()
      }
    }
  },
  methods: {
    insertar() {
      let result = newDataGenerate(this.interaction.id_form)
      if (result.status == false) return false
      let data = result.data
      API("cliente/create/info-reg-o/data/", { data, method: "POST" }).then(res => {
        this.$emit("inserted")
        this.$router.back()
      })
    }
  },
}
</script>