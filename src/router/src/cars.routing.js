const cars = {
    path: '/cars',
    name: 'Cars',
    component: () => import('../../views/CarsList.vue'),
    children: [
        {
            path: '/cars/create',
            name: 'Cars_Create',
            component: () => import('../../views/CarsCreate.vue')
        },
        {
            path: '/cars/update',
            name: 'Cars_Update',
            component: () => import('../../views/CarsUpdate.vue')
        }
    ]
}
export default cars