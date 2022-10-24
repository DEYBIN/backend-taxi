<template>
  <Windows titles="Servicios" :w="680" :h="500">
    <div class="sub-form">
      <Tables :height="400" :dataReq="required.detalleFact" :filter="false" @dataResp="handlerSelect"
        @dblclick="dblclicktable" data_container_table_key="2">
        <template #th>
          <th>Año</th>
          <th>Mes</th>
          <th>Factura</th>
          <th>N° Placa</th>
          <th>Importe</th>
          <th>Estado</th>
          <th>Fecha de digitacion</th>
        </template>
        <template #td={item}>
          <td>{{item.c_year}}</td>
          <td>{{item.c_mes}}</td>
          <td>{{item.f_fact}}</td>
          <td>{{item.c_plac}}</td>
          <td>{{item.s_impo}}</td>
          <td>{{item.k_stad}}</td>
          <td>{{item.f_digi}}</td>
        </template>
      </Tables>
    </div>
    <button class="button" @click="crear">Nuevo Servicio</button>
  </Windows>
  <SubMenu :dataMenu="interaction.SubMenu" key_container="2" />
</template>

<script>
import Windows from '../components/Windows.vue';
import Tables from '@/components/Table.vue';
import SubMenu from '../components/SubMenu.vue';

export default {
  name: "ServiciosCustomersList",
  components: {
    Windows, Tables, SubMenu
  },
  created() {
    API("servicio/get/det-fact/" + this.n_docu).then(resp => {
      this.required.detalleFact = resp.detalleFact

    })

  },
  data() {
    return {
      n_docu: this.$route.query.n_docu,
      k_stad: this.$route.query.k_stad,
      dom: {
        detalleFact: {}
      },
      required: {
        servicios: []
      },
      interaction: {
        SubMenu: [
          { text: "Crear nuevo servicio", icon: "money", disabled: "disabled", action: () => { this.$router.push({ name: "Servicios_Create", query: { n_docu: this.dom.select.n_docu } }) } },
          {
            text: "Dar de alta", icon: "check", disabled: "disabled", action: () => {
              // const estado = this.k_stad;
              //   if (estado == 0) {
              //     console.log("Inactivo");
              //   } else {
              //     console.log("dado de alta");
              //   }
              //   console.log(estado);
            }
          },
          {
            text: "Dar de baja", icon: "close", disabled: "disabled", action: () => {
              // const estado = k_stad;
              // if (estado == 1) {
              //   console.log("dado de baja");
              // } else {
              //   console.log("servicio inactivo");
              // }
              // console.log(estado);
            }
          }
        ]
      }
    }
  },
  methods: {
    crear() {
      this.$router.push({ name: "Servicios_Create" })
    },
    abrir() {
      this.$router.push({ name: "Facturas_Create" })
    },
    handlerSelect(value) {
      this.dom.select = value
    },
    dblclicktable() {
      this.$router.push({ name: "Servicios_Create", query: { n_docu: this.dom.select.n_docu } })
    }
  },
}
</script>