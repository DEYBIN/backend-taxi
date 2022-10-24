const customers = {
    path: '/customers',
    name: 'Customers',
    component: () => import('../../views/CustomersList.vue'),
    children: [
        {
            path: '/customers/create',
            name: 'Customers_Create',
            component: () => import('../../views/CustomersCreate.vue')
        },
        {
            path: '/customers/update',
            name: 'Customers_Update',
            component: () => import('../../views/CustomersUpdate.vue')
        }
    ]
}
export default customers