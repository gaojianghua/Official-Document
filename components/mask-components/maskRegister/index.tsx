import type { NextPage } from 'next';
import clsx from 'clsx';
import { useStore } from '@/store';
import { Form, Input, Button, message } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { MAvatar } from 'components';
import { register } from '@/service/api';

const MaskRegister: NextPage = () => {
    const store = useStore();
    const onFinish = async (e: any) => {
        if (!e.mobile) return message.warning('请输入手机号');
        if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(e.mobile)) return message.warning('请输入正确的手机号');
        if (!e.password) return message.warning('请输入密码');
        if (!e.name) return message.warning('请输入昵称');
        let res: any = await register(e);
        if (res.code == 200) {
            store.public.setMaskShow(false);
            message.success('注册成功');
        }
    };
    // 关闭登录框
    const closeMaskRegister = () => {
        store.public.setMaskShow(false);
    };

    return (
        <div className={clsx(styles.register)}>
            <MAvatar className={styles.avatar} />
            <div className={clsx(styles.title, 'mb2', 'dflex', 'jsb', 'acenter')}>
                <div className={clsx(styles.titleText)}>用户注册</div>
                <CloseCircleOutlined className={clsx('cur')} onClick={closeMaskRegister} />
            </div>
            <Form
                name='login'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete='off'
            >
                <Form.Item
                    className={clsx(styles.formItem)}
                    name='mobile'
                >
                    <Input type={'number'} maxLength={11} placeholder='请输入手机号!'
                           className={clsx(styles.input, 'w100')} />
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem, 'w100')}
                    name='password'
                >
                    <Input placeholder='请输入密码!' className={clsx(styles.input, 'w100')} />
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem, 'w100')}
                    name='name'
                >
                    <Input placeholder='请输入昵称!' className={clsx(styles.input, 'w100')} />
                </Form.Item>
                <Form.Item className={clsx(styles.formItem, 'w100', 'mt2')}>
                    <Button className={clsx(styles.btn, styles.loginBtn)} type='primary' htmlType='submit'>
                        立即注册
                    </Button>
                </Form.Item>
            </Form>
            <div className={clsx(styles.agreement, 'dflex', 'acenter', 'jcenter', 'mt2')}>
                <span>注册登录即表示同意</span>
                <span className={clsx('ml1', 'cur')}><a rel='noreferrer' className={clsx(styles.agreChild)}
                                                        target='_blank' href='#'>用户协议</a></span>
                <span className={clsx('ml1', 'cur')}><a rel='noreferrer' className={clsx(styles.agreChild)}
                                                        target='_blank' href='#'>隐私政策</a></span>
            </div>
        </div>
    );
};

export default MaskRegister;
