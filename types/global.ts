// 数据类型
import { Mark, SLink } from '@/types/res';

export interface IColumn {
    class_id: number,
    class_name: string,
    list: Mark[]
}

export interface ICardProps {
    item: Mark,
    isManagement?: boolean,
    openDelete?: any,
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

export interface  ICalculation {
    numberOne: number
    numberTwo: number
    index: number
    integer: number
}

export interface MProps {
    model?: MModelProps
}

export interface MModelProps {
    title?: string
    children?: any
    confirm?: any
    cancel?: any
}