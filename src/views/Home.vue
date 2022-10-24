<template>
	<div class="wrapper">
		<div class="sidebar">
			<div class="user-logo-container">
				<div class="user-border">
					<img class="user_logo" src="../assets/img/user.png">
				</div>
				<br>
				<p>Bienvenido</p>
			</div>
			<ul>
				<li><a @click="abrir('Customers')"><i class="material-icons">contacts</i>Clientes</a></li>
				<li><a @click="abrir('Cars')"><i class="material-icons">local_taxi</i>Carros</a></li>
				<li><a @click="abrir('Flotas')"><i class="material-icons">warehouse</i>Flotas</a></li>
				<li><a @click="abrir('Servicios')"><i class="material-icons">payments</i>Servicios</a></li>
				<li><a @click="abrir('Facturas')"><i class="material-icons">wallet</i>Facturas</a></li>
				<li><a @click="abrir('User')"><i class="material-icons">people</i>Usuarios</a></li>
			</ul>
			<div>
				<button class="button" @click="logout"><i class="fas fa-sign-out-alt"></i></button>
			</div>
		</div>
	</div>
	<div class="control-windows">
		<router-view />
	</div>
</template>

<script>
export default {
	name: "Home",
	created() {

	},
	data() {
		return {
			dom: {
			}
		}
	},
	methods: {
		abrir(name) {
			this.$router.push({ name: name })
		},
		logout() {
			sessionStorage.clear()
			this.$router.push({ name: "Login" })
		}
	},
}

</script>