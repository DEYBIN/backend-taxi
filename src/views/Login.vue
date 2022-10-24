<template>
  <div class="container-form sign-in">
    <form class="formulario" :id="interaction.form_id">
      <img class="logo" src="../assets/img/newcap.png">
      <h2 class="create-account">Iniciar sesion</h2>
      <div class="iconos">
        <div class="border-icon">
          <i class='bx bxl-github'></i>
        </div>
        <div class="border-icon">
          <i class='bx bxl-facebook-circle'></i>
        </div>
        <div class="border-icon">
          <i class='bx bxl-google'></i>
        </div>
      </div>
      <p class="cuenta-gratis">¿Aún no tienes cuenta?</p>
      <input type="text" v-model="dom.users" _key="users" placeholder="Usuario">
      <input type="password" v-model="dom.password" _key="password" placeholder="Contraseña" @keydown.enter="login">
      <button class="button" type="button" @click="login">Iniciar Sesion </button>
    </form>
    <div class="welcome-back">
      <div class="message">
        <h2>Bienvenido a New Capital</h2>
        <p>Si aun no tienes una cuenta por favor registrese aqui</p>
        <button class="button" type="button" onclick="window.location.href='/registro'">Registrarse</button>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid"
export default {
  name: "Login",
  created() {
    sessionStorage.setItem("url_base", "http://192.168.0.7:5000")
  },
  data() {
    return {
      dom: {
        users: "",
        password: ""
      },
      interaction: {
        form_id: uuidv4()
      }
    }
  },
  methods: {
    login() {
      //console.log(newDataGenerate(this.interaction.form_id))
      let dat = newDataGenerate(this.interaction.form_id)
      if (!dat.status) return false
      let data = dat.data
      API("auth/login", { data, method: "PUT", token: false }).then(response => {
        sessionStorage.setItem("token", response.token)
        this.$router.push({ name: "Home" })
      })
    }
  },
}
</script>