import type { NextPage } from 'next'
import styles from './index.module.scss'
import { observer } from 'mobx-react-lite';
import { Button, Form, Input } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';

interface Props {
    inputSubmit: any
    name?: string,
    type?: string
}

const MSearch: NextPage<Props> = ({inputSubmit, name = '确认', type = 'text'}) => {
    const [input, setInput] = useState('');
    const onFinish = () => {
        inputSubmit(input)
        setInput('')
    };
    // 验证输入框变化事件
    const onChange = (e: any) => {
        setInput(e.target.value);
    };
    return (
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
                    <Input type={type} className={clsx(styles.input, 'w100')} value={input} onChange={onChange} />
                    <Button type='primary' className={clsx(styles.btn)} htmlType='submit'>{name}</Button>
                </Input.Group>
            </Form.Item>
        </Form>
    )
}

export default observer(MSearch)