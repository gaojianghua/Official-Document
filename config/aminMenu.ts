
interface IMenu {
    path: string
    name: string
    icon: string
}

export const MenuList:IMenu[] = [
    {
        path: '/admin/home',
        name: '数据统计',
        icon: 'RadarChartOutlined'
    },
    {
        path: '/admin/user',
        name: '用户管理',
        icon: 'TeamOutlined'
    },
    {
        path: '/admin/card',
        name: '印记管理',
        icon: 'FireOutlined'
    },
    {
        path: '/admin/link',
        name: '链接管理',
        icon: 'LinkOutlined'
    },
    {
        path: '/admin/apply',
        name: '投稿管理',
        icon: 'SnippetsOutlined'
    }
]