import type { NextPage } from 'next'
import { getLinkList } from '@/service/api';
import { observer } from 'mobx-react-lite';
import { SLink } from '@/types/res';
import { ILinkProps } from '@/types/global';
import LinkBtn from '@/components/LinkBtn'
import { useEffect, useState } from 'react';

const Links: NextPage<ILinkProps> = () => {
    const [data, setData] = useState<SLink[]>([])
    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const res:any = await getLinkList()
        setData(res.data)
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