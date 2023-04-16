import type { NextPage } from 'next';
import clsx from 'clsx';
import { useStore } from '@/store';
import { Button, Form, Input, message, Radio } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { MAvatar } from 'components';
import { linkAdd, linkUpdate, userLinkAdd, userLinkUpdate } from '@/service/api';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { ULink, SLink } from '@/types/res';
import { RadioChangeEvent } from 'antd/es';


const MaskLink: NextPage = () => {
    const store = useStore();
    const { isAddOrEdit, isAdminPages, isUpdateLink } = store.public.publicData;
    const { isLOrR } = store.link.linkData;
    const [tmpLink] = useState(store.link.linkData.tmpLink)
    const [value, setValue] = useState(isLOrR)
    const onFinish = async (e: ULink) => {
        if (!e.src) return message.warning('请输入链接地址');
        let res: any;
        if (isUpdateLink) {
            if (isAddOrEdit == 1) {
                res = await linkAdd(e);
            } else {
                let obj: SLink = {
                    ...e,
                    id: String(tmpLink.id)
                }
                res = await linkUpdate(obj);
            }
        } else {
            if (!e.user_link_name) return message.warning('请输入链接名称');
            if (isAddOrEdit == 1) {
                let obj: ULink = {
                    ...e,
                    user_link_type: isLOrR == 1 ? 1 : 2,
                };
                res = await userLinkAdd(obj);
            } else {
                let obj: ULink = {
                    ...tmpLink,
                    ...e,
                    id: String(tmpLink.id)
                }
                res = await userLinkUpdate(obj);
            }
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
            <div className={clsx(styles.title, 'mb2', 'dflex', 'jsb', 'acenter')}>
                <div className={clsx(styles.titleText)}>{isAddOrEdit == 1 ? '新增链接' : '编辑链接'}
                    {isAdminPages ? '' : isLOrR == 1 ? '(工具栏)' : '(便捷栏)'}</div>
                <CloseCircleOutlined className={clsx('cur')} onClick={closeMaskRegister} />
            </div>
            <Form
                name='link'
                initialValues={isAddOrEdit == 2 || tmpLink.link_name ?  tmpLink : {}}
                onFinish={onFinish}
                autoComplete='off'
            >
                <Form.Item
                    className={clsx(styles.formItem)}
                    name={isUpdateLink || tmpLink.link_name ? 'link_name' : 'user_link_name'}
                >
                    <Input type={'text'} placeholder='请输入链接名称!'
                           className={clsx(styles.input, 'w100')} />
                </Form.Item>
                {
                    isAddOrEdit == 2 && !isAdminPages ?
                        <Form.Item
                            className={clsx(styles.formItem, 'w100', 'mb', 'pl3')}
                            name='user_link_type'
                        >
                            <Radio.Group value={value} className={clsx('dflex', 'jsa')} onChange={radioChange}>
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
