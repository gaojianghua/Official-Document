import type { NextPage } from 'next'
import { urls } from '../data'
import { Card } from 'components';

const Other: NextPage = () => {
    return (<>
        {
            urls?.map(item => (
                <Card key={item.id} item={item}></Card>
            ))
        }
    </>)
}

export default Other