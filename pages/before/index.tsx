import type { NextPage } from 'next'
import { Before } from '../data'
import { Column } from 'components'

const before: NextPage = () => {
    return (<>
        {
            Before?.map(item => (
                <Column data={item} />
            ))
        }
    </>)
}

export default before