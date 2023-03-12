import type { NextPage } from 'next';
import clsx from 'clsx';
import { useStore } from '@/store';
import { Form, Input, Button, message, Radio } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { MAvatar } from 'components';
import { userLinkAdd, userLinkUpdate } from '@/service/api';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { ULink } from '@/types/res';
import { RadioChangeEvent } from 'antd/es';


const MaskLink: NextPage = () => {
    const store = useStore();
    const { isAddOrEdit } = store.public.publicData
    const { isLOrR } = store.link.linkData
    const [tmpLink] = useState(store.link.linkData.tmpLink)
    const [value, setValue] = useState(isLOrR)
    const onFinish = async (e: ULink) => {
        if (!e.user_link_name) return message.warning('请输入链接名称')
        if (!e.src) return message.warning('请输入链接地址')
        let res: any
        if (isAddOrEdit == 1) {
            let obj: ULink = {
                ...e,
                user_link_type: isLOrR == 1 ? 1 : 2
            }
            res = await userLinkAdd(obj);
        }else {
            let obj: ULink = {
                ...e,
                id: String(tmpLink.id),
                sort_id: 20
            }
            res = await userLinkUpdate(obj);
        }
        if (res.code == 200) {
            store.link.setSuccess(true)
            store.public.setMaskShow(false);
            isAddOrEdit == 1 ? message.success('新增链接成功') :
                message.success('编辑链接成功');
        }
    };
    // 关闭弹框
    const closeMaskRegister = () => {
        store.public.setMaskShow(false);
    };
    // radio变化
    const radioChange = (e:RadioChangeEvent) => {
        setValue(e.target.value)
    }

    return (
        <div className={clsx(styles.register)}>
            <MAvatar className={styles.avatar} />
            <div className={clsx(styles.title, 'mb2', 'dflex', 'jsb', 'acenter')}>
                <div className={clsx(styles.titleText)}>{isAddOrEdit == 1 ? '新增链接' : '编辑链接'}({isLOrR == 1 ? '工具栏' : '便捷栏'})</div>
                <CloseCircleOutlined className={clsx('cur')} onClick={closeMaskRegister} />
            </div>
            <Form
                name='login'
                initialValues={isAddOrEdit == 1 ? {} : tmpLink}
                onFinish={onFinish}
                autoComplete='off'
            >
                <Form.Item
                    className={clsx(styles.formItem)}
                    name='user_link_name'
                >
                    <Input type={'text'} placeholder='请输入链接名称!'
                           className={clsx(styles.input, 'w100')} />
                </Form.Item>
                {
                    isAddOrEdit == 2 ?
                        <Form.Item
                            className={clsx(styles.formItem, 'w100', 'mb', 'pl3')}
                            name='user_link_type'
                        >
                            <Radio.Group value={value} onChange={radioChange}>
                                <Radio value={1} className={clsx(value == 1 ? 'textmain' : 'textwhite')}> 工具栏 </Radio>
                                <Radio value={2} className={clsx(value == 2 ? 'textmain' : 'textwhite')}> 便捷栏 </Radio>
                            </Radio.Group>
                        </Form.Item> :
                        <></>
                }
                <Form.Item
                    className={clsx(styles.formItem, 'w100')}
                    name='src'
                >
                    <Input placeholder='请输入链接地址!' className={clsx(styles.input, 'w100')} />
                </Form.Item>
                <Form.Item className={clsx(styles.formItem, 'w100', 'mt2')}>
                    <Button className={clsx(styles.btn, styles.loginBtn)} type='primary' htmlType='submit'>
                        {isAddOrEdit == 1 ? '新增链接' : '编辑链接'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default observer(MaskLink);
