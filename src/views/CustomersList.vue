<template>
  <Windows titles="Lista de clientes" :w="1050" :h="600" :router="false">
    <div class="sub-form">
      <Tables :height="400" :dataReq="required.clientes" :filter="true" @dataResp="handlerSelect"
        @dblclick="dblclicktable">
        <template #th>
          <th>Cliente</th>
          <th>N° Documento</th>
          <th>N° Ubigeo</th>
          <th>Fecha de nacimiento</th>
          <th>Genero</th>
          <th>Direccion</th>
          <th>Observacion</th>
          <th>Referencia</th>
          <th>N° Celular</th>
          <th>N° Telefono</th>
        </template>
        <template #td={item}>
          <td>{{item.l_clie}}</td>
          <td>{{item.n_docu}}</td>
          <td>{{item.c_ubig}}</td>
          <td>{{item.f_naci}}</td>
          <td>{{item.k_gene}}</td>
          <td>{{item.l_dire}}</td>
          <td>{{item.l_obse}}</td>
          <td>{{item.l_refe}}</td>
          <td>{{item.n_celu}}</td>
          <td>{{item.n_tele}}</td>
        </template>
      </Tables>
    </div>
    <button class="button" @click="crearCliente">Nuevo Cliente</button>
    <template #router-view>
      <router-view @inserted="handlerinserted" @updated="handlerupdated" />
    </template>
  </Windows>
  <SubMenu :dataMenu="interaction.subMenu" />
</template>

<script>
import Windows from '../components/Windows.vue';
import Tables from '@/components/Table.vue';
import SubMenu from '../components/SubMenu.vue';

export default {
  name: "CustomersList",
  components: {
    Windows,
    Tables,
    SubMenu
  },
  created() {
    API("cliente/get/info-cls-a/data/").then(resp => {
      this.required.clientes = resp.clientes
    })

  },
  data() {
    return {
      dom: {
        select: {}
      },
      required: {
        clientes: []
      },
      interaction: {
        subMenu: [
          { text: "Editar", icon: "edit", action: () => { this.$router.push({ name: "Customers_Update", query: { n_docu: this.dom.select.n_docu } }) } }
        ]
      }
    }
  },
  methods: {
    crearCliente() {
      this.$router.push({ name: "Customers_Create" })
    },
    dblclicktable() {
      this.$router.push({ name: "Customers_Update", query: { n_docu: this.dom.select.n_docu } })
    },
    handlerSelect(value) {
      this.dom.select = value
    },
    handlerinserted() {
      API("cliente/get/info-cls-a/data/").then(resp => {
        this.required.clientes = resp.clientes
      })
    },
    handlerupdated(item) {
      this.required.users.forEach(i => {
        if (item.n_docu == i.n_docu) {
          if (item.data.l_clie) i.l_clie = item.data.l_clie
          if (item.data.n_docu) i.n_docu = item.data.n_docu
          if (item.data.c_ubig) i.c_ubig = item.data.c_ubig
          if (item.data.f_naci) i.f_naci = item.data.f_naci
          if (item.data.k_gene) i.k_gene = item.data.k_gene
          if (item.data.l_dire) i.l_dire = item.data.l_dire
          if (item.data.l_obse) i.l_obse = item.data.l_obse
          if (item.data.l_refe) i.l_refe = item.data.l_refe
          if (item.data.n_celu) i.n_celu = item.data.n_celu
          if (item.data.n_tele) i.n_tele = item.data.n_tele
        }
      })
    }
  },
}
</script>