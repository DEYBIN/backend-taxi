<template>
    <Windows titles="Facturacion de cliente" :w="450" :h="320" :router="false">
        <div class="sub-form">
            <Tables :height="130" :dataReq="required.detalleFact" :filter="false" @dataResp="handlerSelect"
                @dblclick="dblclicktable">
                <template #th>
                    <th>Año</th>
                    <th>Mes</th>
                </template>
                <template #td={item}>
                    <td>{{item.c_year}}</td>
                    <td>{{item.c_mes}}</td>
                </template>
            </Tables>
        </div>
        <button class="button" @click="abrir">Nuevo Cliente</button>
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
    name: "Facturas",
    components: {
        Windows,
        Tables,
        SubMenu
    },
    created() {
        API("servicio/get-det-fact/" + this.n_docu).then(resp => {
            this.required.detalleFact = resp.detalleFact
        })
    },
    data() {
        return {
            n_docu: this.$route.query.n_docu,
            dom: {
                select: {}
            },
            required: {
                detalleFact: []
            },
            interaction: {
                subMenu: [
                    { text: "Detalle factura", icon: "event", action: () => { this.$router.push({ name: "Factura_list", query: { n_docu: this.dom.select.n_docu } }) } },
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