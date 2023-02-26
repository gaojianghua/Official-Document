import type { NextPage } from 'next'
import { urls } from '@/data';
import { Card } from 'components';
import { useState } from 'react';

const Links: NextPage = () => {
    const [urlList] = useState(urls)
    return (<>
        {
            urlList?.map(item => (
                <Card key={item.id} item={item}/>
            ))
        }
    </>)
}

export default Links