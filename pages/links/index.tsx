import type { NextPage } from 'next'
import { useState } from 'react';
import { getLinkList } from '@/service/api';
import { observer } from 'mobx-react-lite';
import { SLink } from '@/types/res';
import { ILinkProps } from '@/types/global';
import LinkBtn from '@/components/LinkBtn'

export async function getStaticProps() {
    const res = await getLinkList()
    return {
        props: {
            data: res.data as SLink[]
        }
    }
}

const Links: NextPage<ILinkProps> = ({data}) => {
    return (<>
        {
            data?.map(item => (
                <LinkBtn key={item.id} item={item}/>
            ))
        }
    </>)
}

export default observer(Links)