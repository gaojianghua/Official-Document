import type { NextPage } from 'next';
import clsx from 'clsx';
import { Form, Input, Button, message } from 'antd';
import MSearch from 'C/mSearch';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CloseCircleOutlined } from '@ant-design/icons';
import { getRandomNum } from '@/utils';
import { ICalculation } from '@/types/global';

interface IProps {
    reslPerson?: any
    closeVerCode?: any,
    calculation: boolean
}

const RealPersonVerification: NextPage<IProps> = (props) => {
    const { reslPerson, closeVerCode, calculation } = props
    const arr = ['＋', '－', '＊']
    const [numberOne, setNumberOne] = useState(0);
    const [numberTwo, setNumberTwo] = useState(0);
    const [char, setChar] = useState('');

    useEffect(() => {
        init()
    }, [calculation])

    const init = () => {
        let num = getRandomNum(0, 3)
        let numberOne = getRandomNum(3, 100)
        setNumberOne(numberOne)
        setChar(arr[num])
        num == 1 ? setNumberTwo(getRandomNum(0, numberOne)) : setNumberTwo(getRandomNum(0, 100))
    }
    const filterReslPerson = (e: number) => {
        let integer: number = 0
        let index: number = arr.map(item => item).indexOf(char)
        switch (index) {
            case 0:
                integer = numberOne + numberTwo
                break;
            case 1:
                integer = numberOne - numberTwo
                break;
            case 2:
                integer = numberOne * numberTwo
                break;
        }
        let obj: ICalculation = {
            numberOne,
            numberTwo,
            index,
            integer
        }
        let jsonObj = JSON.stringify(obj)
        integer == e ? reslPerson(true, jsonObj) : reslPerson(false, jsonObj)
    }
    return (
        <div className={clsx(styles.real)}>
            <div className={clsx(styles.verImg)}>
                <div className={clsx(styles.gContainer)}>
                    <div className={clsx(styles.gGroup)}>
                        <div className={clsx(styles.item, styles.itemRight)}></div>
                        <div className={clsx(styles.item, styles.itemLeft)}></div>
                        <div className={clsx(styles.item, styles.itemTop)}></div>
                        <div className={clsx(styles.item, styles.itemBottom)}></div>
                        <div className={clsx(styles.item, styles.itemMiddle)}></div>
                    </div>
                    <div className={clsx(styles.gGroup)}>
                        <div className={clsx(styles.item, styles.itemRight)}></div>
                        <div className={clsx(styles.item, styles.itemLeft)}></div>
                        <div className={clsx(styles.item, styles.itemTop)}></div>
                        <div className={clsx(styles.item, styles.itemBottom)}></div>
                        <div className={clsx(styles.item, styles.itemMiddle)}></div>
                    </div>
                </div>
                <div className={clsx(styles.verCode, 'dflex', 'jcenter', 'acenter', 'flexwrap')}>
                    <div className={clsx(styles.verText, 'dflex', 'jcenter', 'acenter', 'px1')}>
                        {numberOne}
                    </div>
                    <div className={clsx(styles.verText, 'dflex', 'jcenter', 'acenter', 'px1')}>
                        {char}
                    </div>
                    <div className={clsx(styles.verText, 'dflex', 'jcenter', 'acenter', 'px1')}>
                        {numberTwo}
                    </div>
                    <div className={clsx(styles.verText, 'dflex', 'jcenter', 'acenter', 'px2')}>
                        =
                    </div>
                    <div className={clsx(styles.verText, 'dflex', 'jcenter', 'acenter', 'px2')}>
                        ?
                    </div>
                </div>
                <CloseCircleOutlined className={clsx(styles.close, 'cur')} onClick={closeVerCode} />
            </div>
            <div className={styles.versform}>
                <MSearch placeholder="请输入计算结果" inputSubmit={filterReslPerson} type={'number'}></MSearch>
            </div>
        </div>
    );
};

export default observer(RealPersonVerification);
