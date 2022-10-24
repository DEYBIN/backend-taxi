<template>
  <Windows titles="Crear nuevo registro" :w="700" :h="450" :router="false">
    <input type="text" placeholder="Ingresa texto" />
  </Windows>
</template>

<script>
import Windows from '../components/Windows.vue';
export default {
  name: "FlotasCreate",
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