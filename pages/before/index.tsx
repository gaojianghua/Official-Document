import type { NextPage } from 'next'
import { Before } from '@/data';
import { Column } from 'components'
import { useState } from 'react';

const before: NextPage = () => {
    const [before] = useState(Before)
    return (<>
        {
            before?.map((item, index) => (
                <Column data={item} key={index} />
            ))
        }
    </>)
}

export default before