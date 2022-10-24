<template>
  <Windows titles="Lista de flotas" :w="700" :h="450">
    <button class="button" @click="abrir">Nueva Flota</button>
  </Windows>
</template>

<script>
import Windows from '../components/Windows.vue';
export default {
  name: "FlotasList",
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
    abrir() {
      this.$router.push({ name: "Flotas_Create" })
    }
  },
}
</script>