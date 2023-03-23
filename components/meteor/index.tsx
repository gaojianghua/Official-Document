import type { NextPage } from 'next';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';

const Meteor: NextPage = () => {
    const [arr, setArr] = useState<number[]>([])
    useEffect(() => {
        init()
    }, [])
    const init = () => {
        let cretaeArr: number[] = []
        for (let i = 0; i < 50; i++) {
            cretaeArr.push(i)
        }
        setArr(cretaeArr)
    }

    return (
        <div className={styles.meteor}>
            {
               arr.map((item,index)=>
                   <div className={styles.star} key={item}></div>
               )
            }
        </div>
    );
};


export default Meteor;
