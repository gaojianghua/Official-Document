export interface Menu {
    id?: number
    class_id?: number
    parent_id?: number
    router?: string
    class_name?: string,
    children?: Menu[]
}

export interface SLink {
    id?: string
    link_name?: string
    src?: string
}

export interface ULink {
    id?: string
    user_link_name?: string
    user_link_type?: number
    src?: string
    sort_id?: number
}

export interface Mark {
    id?: string
    name?: string
    logo?: string
    image_bg?: string
    src?: string
    sort_id?: number,
    one_type?: number,
    two_type?: number
}

export interface Paging {
    page_num: number
    page_size: number
    search?: string
}

export interface IAdmin {
    id?: number
    ip?: string
    account?: string
    mobile?: number
    email?: string
    is_super?: number
    role_id?: number
}

export interface IRole {
    id: number
    name: string
    description?: string
    permission: string
}

export interface IPermission {
    id: number
    name: string
    sort?: string
    parent_id?: number
    icon?: string
    cn_name?: string
    menu_name?: string
    menu_show?: string
}