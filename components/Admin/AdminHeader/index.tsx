import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '@/store';
import styles from './index.module.scss'
import { getCards } from '@/service/api';
import { observer } from 'mobx-react-lite';

const AdminHeader: NextPage = () => {
    const [urlList, setUrlList] = useState([])
    const { pathname } = useRouter();
    const store = useStore()
    return (
        <div className={styles.header}>

        </div>
    )
}

export default observer(AdminHeader)