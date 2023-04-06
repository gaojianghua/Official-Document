import React from 'react';
import { NextPage } from 'next';
import styles from './index.module.scss';
import clsx from 'clsx';
import { useStore } from '@/store';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const MaskModel: NextPage = () => {
    const store = useStore()
    return (
        <div className={clsx(styles.model, 'dflex', 'jcenter', 'flexcolumn')}>
            <div className={clsx(styles.title, 'dflex', 'jcenter', 'acenter', 'positionrelative')}>
                <div className={clsx(styles.titleText)}>{store.model.modelData.title}</div>
                <CloseCircleOutlined className={clsx(styles.close, 'cur', 'positionabsolute')}
                                     onClick={store.model.modelData.cancel} />
            </div>
            <div className={clsx('p3')}>
                {store.model.modelData.children}
            </div>
            {
                store.model.modelData.isCardOrLink ? <></>
                    :
                    <div className={clsx('dflex', 'jsa', 'acenter', 'mtauto', 'pb2')}>
                        <Button className={clsx(styles.cancelBtn)} type='primary'
                                onClick={store.model.modelData.cancel}>
                            取 消
                        </Button>
                        <Button className={clsx(styles.confirmBtn)} type='primary'
                                onClick={store.model.modelData.confirm}>
                            确 认
                        </Button>
                    </div>
            }
        </div>
    );
}
export default MaskModel