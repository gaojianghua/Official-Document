import type { NextPage } from 'next'
import { Column } from 'components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/store';
import { getCardList } from '@/service/api';

const Smart: NextPage = () => {
    const [urlList, setUrlList] = useState([])
    const { pathname } = useRouter();
    const store = useStore()


    useEffect(()=> {
        getCardData()
    }, [])


    const getCardData = async () => {
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
    }
    return (<>
        {
            urlList?.map((item, index) => (
                <Column data={item} key={index} />
            ))
        }
    </>)
}

export default Smart