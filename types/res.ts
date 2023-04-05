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