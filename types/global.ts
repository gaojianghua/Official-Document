// 数据类型
import { Mark, SLink } from '@/types/res';

export interface IColumn {
    class_id: number,
    class_name: string,
    list: Mark[]
}

// Props类型
export interface IProps {
    urlArr: Mark[]
}

export interface ICardProps {
    item: Mark,
    isManagement?: boolean,
    deleteMark?: any,
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

export interface ILinkProps {
    data: SLink[]
}