import type { NextPage } from 'next';
import clsx from 'clsx';
import { useStore } from '@/store';
import { Form, Input, Button, message } from 'antd';
import styles from './index.module.scss';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';

interface IProps {
    reslPerson?: any
}

const RealPersonVerification: NextPage<IProps> = (props) => {
    const { reslPerson } = props
    const [input, setInput] = useState('');
    const onFinish = () => {
        reslPerson(input)
    };
    // 验证输入框变化事件
    const onChange = (e: any) => {
        setInput(e.target.value);
    };
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
            </div>
            <Form
                name='verification'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete='off'
            >
                <Form.Item
                    className={clsx(styles.formItem, 'w100')}
                    name='input'
                >
                    <Input.Group className={clsx(styles.group, 'dflex')} compact>
                        <Input type={'number'} className={clsx(styles.input, 'w100')} value={input} onChange={onChange} />
                        <Button type='primary' className={clsx(styles.btn)} htmlType='submit'>确认</Button>
                    </Input.Group>
                </Form.Item>
            </Form>
        </div>
    );
};

export default observer(RealPersonVerification);
