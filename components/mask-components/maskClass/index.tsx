import type { NextPage } from 'next';
import clsx from 'clsx';
import { useStore } from '@/store';
import { Form, Input, Button, message, Radio, RadioChangeEvent, Cascader, Select } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { MAvatar } from 'components';
import { classAdd, classUpdate } from '@/service/api';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';


const MaskLink: NextPage = () => {
    const store = useStore();
    const { isAddOrEdit, isOneOrTwo} = store.class.classData
    const [tmpClass] = useState(store.class.classData.tmpClass)
    const [options, setOptions] = useState([])

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        let arr: any = []
        store.public.publicData.menu.forEach((item, i) => {
            let obj = {
                value: item.class_id,
                label: item.class_name
            }
            arr.push(obj)
        })
        setOptions(arr)
    }

    const onFinish = async (e: any) => {
        console.log(e)
        if (!e.class_name) return message.warning('请输入分类名称')
        if(isOneOrTwo == 1) {
            if (!e.router) return message.warning('请输入分类路由')
        }else{
            if (!e.parent_id) return message.warning('请选择所属父级')
        }
        let res: any
        if (isAddOrEdit == 1) {
            res = await classAdd(e);
        }else {
            let obj = {
                ...e,
                id: String(tmpClass.id)
            }
            res = await classUpdate(obj);
        }
        if (res.code == 200) {
            store.class.setSuccess(true)
            store.public.setMaskShow(false);
            isAddOrEdit == 1 ? message.success('新增分类成功') : message.success('修改分类成功');
        }
    };
    // 关闭弹框
    const closeMaskRegister = () => {
        store.public.setMaskShow(false);
    };
    // radio变化
    const radioChange = (e:RadioChangeEvent) => {
        store.class.setIsOneOrTwo(e.target.value)
    }

    const onChange = () => {

    }
    return (
        <div className={clsx(styles.type)}>
            <MAvatar className={styles.avatar} />
            <div className={clsx(styles.title, 'mb2', 'dflex', 'jsb', 'acenter')}>
                <div className={clsx(styles.titleText)}>{isAddOrEdit == 1 ? '新增分类' : '编辑分类'}</div>
                <CloseCircleOutlined className={clsx('cur')} onClick={closeMaskRegister} />
            </div>
            <Form
                name='class'
                initialValues={isAddOrEdit == 1 ? {} : tmpClass}
                onFinish={onFinish}
                autoComplete='off'
            >
                {
                    isAddOrEdit == 1 ?
                        <Form.Item
                            className={clsx(styles.formItem, 'w100', 'mb', 'pl3')}
                            name='class_type'
                            initialValue={isOneOrTwo}
                        >
                            <Radio.Group className={clsx('dflex', 'jsa')} onChange={radioChange}>
                                <Radio value={1} className={clsx(isOneOrTwo == 1 ? 'textmain' : 'textwhite')}> 一级分类 </Radio>
                                <Radio value={2} className={clsx(isOneOrTwo == 2 ? 'textmain' : 'textwhite')}> 二级分类 </Radio>
                            </Radio.Group>
                        </Form.Item> :
                        <></>
                }
                <Form.Item
                    className={clsx(styles.formItem)}
                    name={'class_name'}
                >
                    <Input type={'text'} placeholder='请输入分类名称!'
                           className={clsx(styles.input, 'w100')} />
                </Form.Item>
                {
                    isOneOrTwo == 1 ? <Form.Item
                        className={clsx(styles.formItem, 'w100')}
                        name='router'
                    >
                        <Input placeholder='请输入路由地址!' className={clsx(styles.input, 'w100')} />
                    </Form.Item>
                        :
                    <Form.Item
                        className={clsx(styles.formItem, 'w100')}
                        name='parent_id'
                    >
                        <Select options={options} className={clsx(styles.input, styles.select)} bordered={false} placeholder='请选择所属父级!'></Select>
                    </Form.Item>
                }
                <Form.Item className={clsx(styles.formItem, 'w100', 'mt2')}>
                    <Button className={clsx(styles.btn, styles.loginBtn)} type='primary' htmlType='submit'>
                        {isAddOrEdit == 1 ? '新增分类' : '修改分类'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default observer(MaskLink);
