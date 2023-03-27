import type { NextPage } from 'next';
import clsx from 'clsx';
import { Form, Input, Button, message } from 'antd';
import MSearch from 'C/mSearch';
import styles from './index.module.scss';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CloseCircleOutlined } from '@ant-design/icons';

interface IProps {
    reslPerson?: any
    numberOne?: number
    numberTwo?: number
    char?: string
    closeVerCode?: any
}

const RealPersonVerification: NextPage<IProps> = (props) => {
    const { reslPerson, numberOne, numberTwo, char, closeVerCode } = props
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
                <MSearch inputSubmit={reslPerson}></MSearch>
            </div>
        </div>
    );
};

export default observer(RealPersonVerification);
