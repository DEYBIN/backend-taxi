<template>
  <Windows titles="Lista de usuarios" :w="750" :h="500" :router="false">
    <div class="sub-form">
      <Tables :height="300" :dataReq="required.users" :filter="true" @dataResp="handlerSelect"
        @dblclick="dblclicktable">
        <template #th>
          <th>Usuario</th>
          <th>Nombres y apellidos</th>
        </template>
        <template #td={item}>
          <td>{{item.users}}</td>
          <td>{{item.l_nomb}} {{item.l_apl1}} {{item.l_apl2}}</td>
        </template>
      </Tables>
    </div>
    <button class="button" @click="abrir">Nuevo Usuario</button>
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
  name: "UserList",
  components: {
    Windows, Tables, SubMenu
  },
  created() {
    API("user/get/info-cls-a/data/").then(resp => {
      this.required.users = resp.users
      console.log(resp);
    })
  },
  data() {
    return {
      dom: {
        select: {}
      },
      required: {
        users: []
      },
      interaction: {
        subMenu: [
          { text: "Editar", icon: "edit", disabled: "disabled", action: () => { this.$router.push({ name: "User_Update", query: { id_user: this.dom.select.id } }) } }
        ]
      }
    }
  },
  methods: {
    abrir() {
      this.$router.push({ name: "User_Create" })
    },
    handlerSelect(value) {
      this.dom.select = value
    },
    dblclicktable() {
      this.$router.push({ name: "User_Update", query: { id_user: this.dom.select.id } })
    },
    handlerinserted() {
      API("user/get/info-cls-a/data/").then(resp => {
        this.required.users = resp.users
      })
    },
    handlerupdated(item) {
      this.required.users.forEach(i => {
        if (item.id_user == i.id) {
          if (item.data.l_nomb) i.l_nomb = item.data.l_nomb
          if (item.data.l_apl1) i.l_apl1 = item.data.l_apl1
          if (item.data.l_apl2) i.l_apl2 = item.data.l_apl2
        }
      })
    }
  },
}
</script>