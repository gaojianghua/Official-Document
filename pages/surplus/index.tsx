/*
 * @Author: 高江华 g598670138@163.com
 * @Date: 2023-06-14 14:48:28
 * @LastEditors: 高江华
 * @LastEditTime: 2023-09-16 14:34:10
 * @Description: file content
 */
import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/store';
import { getCardList } from '@/service/api';
import { observer } from 'mobx-react-lite';
import { Column } from '@/components';

const Surplus: NextPage = () => {
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

export default observer(Surplus)