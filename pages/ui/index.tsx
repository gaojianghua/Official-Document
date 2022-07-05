import type { NextPage } from 'next'
import styles from './index.module.scss'
import { UI } from '../data'
import { Column } from 'components'

const Ui: NextPage = () => {
    return (<>
        {
            UI?.map(item => (
                <Column data={item} />
            ))
        }
    </>)
}

export default Ui