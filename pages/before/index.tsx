import type { NextPage } from 'next';
import { Column } from 'components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCards } from '@/service/api';
import { useStore } from '@/store';
import { observer } from 'mobx-react-lite';

const Before: NextPage = () => {
    const [before, setBefore] = useState([]);
    const { pathname } = useRouter();
    const store = useStore();
    useEffect(() => {
        getCardData()
    });
    // 获取card数据
    const getCardData = async () => {
        let uid: string;
        store.public.publicData.menu.forEach((item) => {
            if (item.router == pathname) {
                uid = String(item.class_id);
            }
        });
        // @ts-ignore
        const res: any = await getCards({ id: uid });
        if (res.code == 200) {
            setBefore(res.data);
        }
    };
    return (<>
        {
            before?.map((item, index) => (
                <Column data={item} key={index} />
            ))
        }
    </>);
};

export default observer(Before);