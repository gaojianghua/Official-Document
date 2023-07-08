import type { NextPage } from 'next';
import clsx from 'clsx';
import { useStore } from '@/store';
import { Form, Switch } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';


const MaskSetMenu: NextPage = () => {
    const store = useStore();
    // 关闭弹框
    const closeMask = () => {
        store.public.setMaskShow(false);
    };
    // 流星雨开关
    const meteorShowerSwitch = (e:boolean) => {
        console.log(e)
        store.common.setMeteorShowerSwitch(e)
    }

    return (
        <div className={clsx(styles.register)}>
            <div className={clsx(styles.title, 'mb2', 'dflex', 'jsb', 'acenter')}>
                <div className={clsx(styles.titleText)}>设置</div>
                <CloseCircleOutlined className={clsx('cur')} onClick={closeMask} />
            </div>
            <Form
                name='set'
                autoComplete='off'
            >
                <Form.Item className={clsx(styles.formItem, 'w100', 'mt2')}>
                    <div className={clsx('dflex', 'acenter')}>
                        <div className={clsx(store.common.commonData.meteorShowerSwitch ? 'mainColor' : 'textmuted', 'fontweight')}>{store.common.commonData.meteorShowerSwitch ? '已开启' : '已关闭'}流星雨</div>
                        <Switch className={clsx('mlauto')} onClick={meteorShowerSwitch} defaultChecked={store.common.commonData.meteorShowerSwitch} checked={store.common.commonData.meteorShowerSwitch} />
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default observer(MaskSetMenu);
