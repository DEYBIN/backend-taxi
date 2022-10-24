<template>
  <Windows titles="Crear nuevo registro" :w="750" :h="460" :router="false">
    <div class="sub-form">
      <form :id="interaction.id_form">
        <div class="grid-auto" grid-block="200">
          <label class="label-container">Numero de documento: <input class="input" type="number" maxlength="8"
              placeholder="Ingrese doc" _key="n_docu" required /></label>
          <label class="label-container">Nombre: <input class="input" type="text" placeholder="Ingrese nombre"
              _key="l_nomb" required /></label>
          <label class="label-container">Apellido paterno: <input class="input" type="text"
              placeholder="Ingrese apellido paterno" _key="l_apl1" required /></label>
          <label class="label-container">Apellido materno: <input class="input" type="text"
              placeholder="Ingrese apellido materno" _key="l_apl2" required /></label>
          <label class="label-container">Email: <input class="input" type="email" placeholder="Ingrese email"
              _key="l_emai" /></label>
          <label class="label-container">Celular: <input class="input" type="text" placeholder="Ingrese celular"
              _key="n_celu" required /></label>
          <label class="label-container">Cargo:
            <select class="select" _key="k_carg" required>
              <option value="0">Supervisor</option>
              <option value="1">Gerente</option>
              <option value="2">Administrador</option>
              <option value="3">Cliente</option>
            </select>
          </label>
          <label class="label-container">Contraseña: <input class="input" type="password"
              placeholder="Ingrese una contraseña" _key="l_pass" required /></label>
          <label class="label-container">Confirmar Contraseña: <input class="input" type="password"
              placeholder="Confirmar contraseña" _key="repeat_pass" required /></label>
          <div class="grid-group"></div>
          <div class="grid-span-1"></div>
          <button id="conf-pass" class="button" type="button" @click="insertar">Crear usuario</button>
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
  name: "UserCreate",
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
      API("user/create/info-reg-o/data/", { data, method: "POST" }).then(res => {
        this.$emit("inserted")
        this.$router.back()
      })
    }
  },
}
</script>