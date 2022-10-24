const facturas = {
    path: '/facturas',
    name: 'Facturas',
    component: () => import('../../views/Facturas.vue'),
    children: [
        {
            path: '/facturas/list',
            name: 'Facturas_List',
            component: () => import('../../views/FacturasList.vue'),
        }
    ]
}
export default facturas