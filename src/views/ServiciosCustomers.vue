<template>
    <Windows titles="Servicios de clientes" :w="500" :h="400" :router="false">
        <div class="sub-form">
            <Tables :height="250" :dataReq="required.clientes" :filter="true" @dataResp="handlerSelect"
                @dblclick="dblclicktable">
                <template #th>
                    <th>N° Documento</th>
                    <th>Cliente</th>
                </template>
                <template #td={item}>
                    <td>{{item.n_docu}}</td>
                    <td>{{item.l_clie}}</td>
                </template>
            </Tables>
        </div>
        <!-- <button class="button" @click="abrir">Nuevo Cliente</button> -->
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
    name: "Servicios",
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
            n_docu: this.$route.query.n_docu,
            dom: {
                select: {}
            },
            required: {
                clientes: []
            },
            interaction: {
                subMenu: [
                    { text: "Detalle factura", icon: "event", action: () => { this.$router.push({ name: "Facturas_List", query: { n_docu: this.dom.select.n_docu } }) } },
                    { text: "Crear nuevo servicio", icon: "event", action: () => { this.$router.push({ name: "Servicios_List", query: { n_docu: this.dom.select.n_docu } }) } }
                ]
            }
        }
    },
    methods: {
        abrir() {
            this.$router.push({ name: "" })
        },
        handlerSelect(value) {
            this.dom.select = value
        },
        dblclicktable() {
            this.$router.push({ name: "Servicios_List", query: { n_docu: this.dom.select.n_docu } })
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
                }
            })
        }
    },
}
</script>