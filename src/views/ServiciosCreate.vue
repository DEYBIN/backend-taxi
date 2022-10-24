<template>
  <Windows titles="Crear nuevo registro" :w="750" :h="450" :router="false">
    <div class="sub-form">
      <form :id="interaction.id_form">
        <div class="grid-auto" grid-block="200">
          <label class="label-container">Numero de documento: <input class="input" type="number"
              placeholder="Ingrese doc" _key="n_docu" required /></label>
          <label class="label-container">N° Placa: <input class="input" type="text" placeholder="Ingrese usuario"
              _key="c_plac" required /></label>
          <div class="grid-group"></div>
          <label class="label-container">Importe: <input class="input" type="text" placeholder="Ingrese nombre"
              _key="s_impo" required /></label>
          <label class="label-container">Año: <input class="input" type="text" placeholder="Ingrese apellido paterno"
              _key="c_year" required /></label>
          <label class="label-container">Mes: <input class="input" type="text" placeholder="Ingrese apellido materno"
              _key="c_mes" required /></label>
          <label class="label-container">Fecha Facturacion: <input class="input" type="text" placeholder="Ingrese email"
              _key="f_fact" required /></label>
          <label class="label-container">Estado: <input class="input" type="text" placeholder="Ingrese celular"
              _key="k_stad" required /></label>
          <label class="label-container">Fecha de digitacion:
            <input class="input" type="text" placeholder="Ingrese cargo" _key="f_digi" />
          </label>
          <div class="grid-span-1"></div>
          <button id="conf-pass" class="button" type="button" @click="insertar">Crear servicio</button>
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
  name: "ServiciosCreate",
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
      API("servicio/create/info-reg-o/data/", { data, method: "POST" }).then(res => {
        this.$router.back()
      })
    }
  },
}
</script>