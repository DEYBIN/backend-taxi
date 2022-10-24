const servicios = {
    path: '/servicios',
    name: 'Servicios',
    component: () => import('../../views/ServiciosCustomers.vue'),
    children: [
        {
            path: '/servicios/list',
            name: 'Servicios_List',
            component: () => import('../../views/ServiciosCustomersList.vue'),
        },
        {
            path: '/servicios/create',
            name: 'Servicios_Create',
            component: () => import('../../views/ServiciosCreate.vue')
        }
    ]
}
export default servicios