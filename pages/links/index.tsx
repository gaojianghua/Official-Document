import type { NextPage } from 'next'
import { getLinkList } from '@/service/api';
import { observer } from 'mobx-react-lite';
import { Paging, SLink } from '@/types/res';
import { ILinkProps } from '@/types/global';
import LinkBtn from '@/components/LinkBtn'
import { useEffect, useState } from 'react';

const Links: NextPage<ILinkProps> = () => {
    const [data, setData] = useState<SLink[]>([])
    const [paging, setPaging] = useState<Paging>({
        page_num: 1,
        page_size: 100
    })
    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const res:any = await getLinkList(paging)
        setData(res.data.list)
    }

    return (<>
        {
            data?.map(item => (
                <LinkBtn key={item.id} item={item}/>
            ))
        }
    </>)
}

export default observer(Links)