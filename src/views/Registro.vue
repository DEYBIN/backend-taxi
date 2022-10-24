<template>
    <div class="container-form sign-up">
        <div class="welcome-back">
            <div class="message">
                <h2>Bienvenido a New Capital</h2>
                <p>Si ya tienes una cuenta por favor inicia sesion aqui</p>
                <button class="button" onclick="window.location.href='/login'">Iniciar Sesion</button>
            </div>
        </div>
        <form class="formulario">
            <img class="logo" src="../assets/img/newcap.png">
            <h2 class="create-account">Crear una cuenta</h2>
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
            <p class="cuenta-gratis">Crear una cuenta gratis</p>
            <input type="text" placeholder="Nombre">
            <input type="email" placeholder="Email">
            <input type="password" placeholder="Contraseña">
            <button class="button">Registrarse</button>
        </form>
    </div>
</template>