// 数据类型
export interface IUrls {
    id?: number,
    label: string,
    logo: string,
    url: string,
    check?: boolean,
    bg_img: string,
    mark_Id?: number, // 0表示自定义的印记 >1表示官方设置的印记
    isAdd?: boolean, // 是否已添加到常用
}

export interface IColumn {
    column_Id: number, // 0-99UI 100-199前端 200-299后端 300-&其他
    column_Name: string,
    column_Icon: string,
    column_Data: IUrls[]
}

// Props类型
export interface IProps {
    urlArr: IUrls[]
}

export interface ICardProps {
    item: IUrls,
    isManagement?: boolean,
    checkSwitchF?: any,
    editorMark?: any,
    isAdd?: boolean
}

export interface ICheckbox {
    check: boolean,
    name?: string,
    onChange: any,
    className?: any
}

export interface IAvatarProps {
    className?: any
}

export interface IColumnProps {
    data: IColumn
}