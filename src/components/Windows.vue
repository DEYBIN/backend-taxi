<template>
    <div class="block-windows">
        <div class="container-windows">
            <section class="form-windows" :style="interaction.style_form" @keydown.esc="cerrar">
                <div class="form-windows__title">
                    <p class="title__text">{{titles}}</p>
                    <i @click="cerrar" class="title__icon material-icons">cancel</i>
                </div>
                <slot></slot>
            </section>
            <div class="control-windows" v-if="router">
                <router-view/>

            </div>
            <div class="control-windows" v-else>
                <slot name="router-view">

                </slot>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
    name:"Windows",
    created(){
        this.interaction.style_form={
            height: this.h + "px",
            width: this.w + "px"
        }
	},
    //props = propiedades
    props:{
        titles:{type:String, default:""},
        h: {type:Number, default:450},
        w: {type:Number, default:450},
        router: {type:Boolean, default:true},
        insertar: {type:Function, default:()=>{}}
    },
    data(){
      return {
        dom:{
        },
        interaction:{
            style_form:{
                height:"450px",
                width:"700px"
            }
        }
      }
    },
    methods:{
      cerrar(){
		this.$router.back()
      }
    },
  }
</script>