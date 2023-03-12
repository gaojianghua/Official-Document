import type { NextPage } from 'next'
import { useState } from 'react';
import { getLinks } from '@/service/api';
import { observer } from 'mobx-react-lite';
import { SLink } from '@/types/res';
import { ILinkProps } from '@/types/global';
import LinkBtn from '@/components/LinkBtn'

export async function getStaticProps() {
    const res = await getLinks()
    return {
        props: {
            data: res.data as SLink[]
        }
    }
}

const Links: NextPage<ILinkProps> = ({data}) => {
    const [urlList] = useState(data)
    return (<>
        {
            urlList?.map(item => (
                <LinkBtn key={item.id} item={item}/>
            ))
        }
    </>)
}

export default observer(Links)