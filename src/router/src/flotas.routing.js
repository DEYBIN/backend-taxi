const flotas = {
    path: '/flotas',
    name: 'Flotas',
    component: () => import('../../views/FlotasList.vue'),
    children: [
        {
            path: '/flotas/create',
            name: 'Flotas_Create',
            component: () => import('../../views/FlotasCreate.vue')
        }
    ]
}
export default flotas