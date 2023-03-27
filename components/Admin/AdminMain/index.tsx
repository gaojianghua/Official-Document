import type { NextPage } from 'next'
import styles from './index.module.scss'
import { observer } from 'mobx-react-lite';

interface Props {
    children: any;
}

const AdminMain: NextPage<Props> = ({children}) => {
    return (
        <div className={styles.main}>
            {children}
        </div>
    )
}

export default observer(AdminMain)