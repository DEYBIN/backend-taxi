const users = {
    path: '/user',
    name: 'User',
    component: () => import('../../views/UserList.vue'),
    children: [
        {
            path: '/user/create',
            name: 'User_Create',
            component: () => import('../../views/UserCreate.vue')
        },
        {
            path: '/user/update',
            name: 'User_Update',
            component: () => import('../../views/UserUpdate.vue')
        }
    ]
}
export default users