<template>
  <Windows titles="Crear nuevo registro" :w="700" :h="450" :router="false">
    <div class="sub-form">
      <div class="grid-auto" grid-block="200">
        <label class="label-container">Numero de documento: <input class="input" type="text" /></label>
        <label class="label-container">Codigo de placa: <input class="input" type="text" /></label>
        <div class="grid-group"></div>
        <label class="label-container">Marca: <input class="input" type="text" /></label>
        <label class="label-container">Modelo: <input class="input" type="text" /></label>
        <label class="label-container">Color: <input class="input" type="text" /></label>
        <label class="label-container">Año: <input class="input" type="text" /></label>
        <label class="label-container">Año de modelo: <input class="input" type="text" /></label>
        <label class="label-container">N° serie: <input class="input" type="text" /></label>
        <label class="label-container">N° pasajeros: <input class="input" type="text" /></label>
        <label class="label-container">Observaciones: <input class="input" type="text" /></label>
        <label class="label-container">Estado: <input class="input" type="text" /></label>
        <div class="grid-group"></div>
        <div class="grid-span-2"></div>
        <button id="conf-pass" class="button">Crear cliente</button>
        <div class="grid-group"></div>
      </div>
    </div>
  </Windows>
</template>

<script>
import Windows from '../components/Windows.vue';
export default {
  name: "CarsCreate",
  components: {
    Windows
  },
  created() {

  },
  data() {
    return {
      dom: {
      }
    }
  },
  methods: {

  },
}
</script>