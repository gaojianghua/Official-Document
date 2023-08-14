import type { NextPage } from 'next'
import { Column } from 'components';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/store';
import { getCardList } from '@/service/api';
import { router } from 'next/client';

const Smart: NextPage = () => {
    const [urlList, setUrlList] = useState([])
    const { pathname } = useRouter();
    const store = useStore()
    const getCardData = useCallback(async () => {
        let uid: string
        store.public.publicData.menu.forEach((item) => {
            if (item.router == pathname) {
                uid = String(item.class_id)
            }
        })
        // @ts-ignore
        const res: any = await getCardList({id: uid})
        if(res.code == 200) {
            setUrlList(res.data)
        }
    },[pathname, store.public.publicData.menu])

    useEffect(()=> {
        getCardData()
    }, [getCardData])

    return (<>
        {
            urlList?.map((item, index) => (
                <Column data={item} key={index} />
            ))
        }
    </>)
}

export default Smart
