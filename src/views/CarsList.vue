<template>
  <Windows titles="Lista de carros" :w="1000" :h="550" :router="false">
    <div class="sub-form">
      <Tables :height="300" :dataReq="required.clienteCars" :filter="true" @dataResp="handlerSelect"
        @dblclick="dblclicktable">
        <template #th>
          <th>N° Documento</th>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Color</th>
          <th>Año</th>
          <th>Año de modelo</th>
          <th>N° serie</th>
          <th>N° pasajeros</th>
          <th>N° placa</th>
        </template>
        <template #td={item}>
          <td>{{item.n_docu}}</td>
          <td>{{item.l_marc}}</td>
          <td>{{item.l_mode}}</td>
          <td>{{item.l_color}}</td>
          <td>{{item.c_year}}</td>
          <td>{{item.c_mode}}</td>
          <td>{{item.n_seri}}</td>
          <td>{{item.n_pasa}}</td>
          <td>{{item.c_plac}}</td>
        </template>
      </Tables>
    </div>
    <button class="button" @click="nuevocarro">Nuevo Carro</button>
  </Windows>
  <SubMenu :dataMenu="interaction.SubMenu" />
</template>

<script>
import Windows from '../components/Windows.vue';
import Tables from '@/components/Table.vue';
import SubMenu from '../components/SubMenu.vue'

export default {
  name: "CarsList",
  components: {
    Windows, Tables, SubMenu
  },
  created() {
    API("car/get/info-cls-a/data/").then(resp => {
      this.required.clienteCars = resp.clienteCars
    })
  },
  data() {
    return {
      dom: {
        select: {}
      },
      required: {
        clienteCars: []
      },
      interaction: {
        SubMenu: [
          { text: "Editar", icon: "edit", disabled: "disabled", action: () => { this.$router.push({ name: "Cars_Update", query: { c_plac: this.dom.select.c_plac } }) } },
        ]
      }
    }
  },
  methods: {
    nuevocarro() {
      this.$router.push({ name: "Cars_Create" })
    },
    handlerSelect(value) {
      this.dom.select = value
    },
    dblclicktable() {
      this.$router.push({ name: "Cars_Update", query: { c_plac: this.dom.select.c_plac } })
    }
  },
}
</script>