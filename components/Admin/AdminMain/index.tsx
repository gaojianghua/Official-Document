import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/store';
import styles from './index.module.scss'
import { getCards } from '@/service/api';
import { observer } from 'mobx-react-lite';

interface Props {
    children: any;
}

const AdminMain: NextPage<Props> = ({children}) => {
    const [urlList, setUrlList] = useState([])
    const { pathname } = useRouter();
    const store = useStore()

    return (
        <div className={styles.main}>

        </div>
    )
}

export default observer(AdminMain)