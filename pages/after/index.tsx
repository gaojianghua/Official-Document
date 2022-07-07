import type { NextPage } from 'next'
import { urls } from '../data'
import { Card } from 'components';

const After: NextPage = () => {
    return (<>
        {
            urls?.map(item => (
                <Card key={item.id} item={item}></Card>
            ))
        }
    </>)
}

export default After