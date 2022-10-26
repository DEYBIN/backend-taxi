<template>
    <Windows titles="Facturacion de cliente" :w="800" :h="650" :router="false">
        <div class="sub-form">
            <div class="grid-auto" grid-block="200">
                <Search text="Buscar" placeholder="Buscar por DNI"
                    :itemProjectionJson="{code:'n_docu', detalle:'l_clie'}" url="cliente/filter-customer/"
                    @selectItem="selectItem" :on_focus_null="true" @focus="focusDelete" />
                <div class="grid-group span-4">
                    <label id="label" class="label-container">Nombres: <input class="input" type="text"
                            v-model="dom.l_clie" required disabled /></label>
                </div>
            </div>

            <Tables :height="200" @dataResp="handlerSelect" :dataReq="required.services" @dblclick="dblclicktable"
                :filter="false">
                <template #th>
                    <th>Placa</th>
                    <th>Fecha de inicio</th>
                    <th>Importe</th>
                </template>
                <template #td={item}>
                    <td>{{item.c_plac}}</td>
                    <td>{{item.f_fact}}</td>
                    <td>{{item.s_impo}}</td>
                </template>
            </Tables>
            <Tables :height="150" :filter="false" :dataReq="required.detalleFact" @dataResp="handlerSelect">
                <template #th>
                    <th>Año</th>
                    <th>Mes</th>
                    <th>Fecha de pago</th>
                    <th>Importe</th>
                    <th>Estado</th>
                </template>
                <template #td={item}>
                    <td>{{item.c_year}}</td>
                    <td>{{item.c_mes}}</td>
                    <td>{{item.f_pago}}</td>
                    <td>{{item.s_impo}}</td>
                    <td>{{item.k_stad}}</td>
                    <td>
                        <input @click="agregarPago()" type="checkbox">
                    </td>
                </template>
            </Tables>
            <Tables :dataReq="agregarPago" :height="110" :filter="false">
                <template #th>
                    <th>Pagado</th>
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
import Search from '../components/Search.vue';

export default {
    name: "Facturas",
    components: {
        Windows,Tables,SubMenu,Search
    },
    created() {

    },
    data() {
        return {
            dom: {
                id_serv: '',
                select: {},
                l_clie: ""
            },
            required: {
                clientes: [],
                services: [],
                detalleFact: []
            },
            interaction: {
                subMenu: [
                    {
                        text: "Detalle factura", icon: "event", disabled: "disabled", action: () => {
                            API("servicio/get/det-fact/" + this.dom.select.id_serv).then(resp => {
                                this.required.detalleFact = resp.detalleFact
                                console.log(resp);
                            })
                        }
                    }
                ]
            }
        }
    },
    methods: {
        handlerSelect(value) {
            this.dom.select = value
        },
        //metodo para el bloble click
        dblclicktable() {
            API("servicio/get/det-fact/" + this.dom.select.id_serv).then(resp => {
                this.required.detalleFact = resp.detalleFact
            })
        },
        //Volver a reallizar la consulta despues de insertar datos
        handlerinserted() {
            API("cliente/get/info-cls-a/data/").then(resp => {
                this.required.clientes = resp.clientes
            })
        },
        handlerupdated(item) {
            this.required.clientes.forEach(i => {
                if (item.n_docu == i.n_docu) {
                    if (item.data.l_clie) i.l_clie = item.data.l_clie
                    if (item.data.n_docu) i.n_docu = item.data.n_docu
                }
            })
        },
        //seleccionar el item del search y llamar a la consulta searchServicios
        selectItem(item) {
            this.dom.l_clie = item.l_clie
            this.searchServicios(item.n_docu)
        },
        //al hacer click en el search se limpia los campos
        focusDelete() {
            this.dom.l_clie = ""
        },
        //hacer la consulta por (campo)
        searchServicios(n_docu) {
            API("servicio/get/service-cliente/data/" + n_docu).then(resp => {
                this.required.services = resp.services
            })
        },
        //llamar al campo por id
        facturaCliente(id_serv) {
            API("servicio/get/det-fact/" + id_serv).then(resp => {
                this.required.detalleFact = resp.detalleFact
            })
        },
        //agregar el pago del cliente}
        agregarPago(){
            console.log("funcionando");
        }

    },
}
</script>