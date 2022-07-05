import type { NextPage } from 'next';
import clsx from 'clsx';
import { useStore } from 'store/index';
import { Image, Form, Input, Button } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import styles from './index.module.scss';
import { Avatar } from 'components';

const MaskLogin: NextPage = () => {
    const store = useStore()
    const onFinish = () => {

    }
    // 获取验证码
    const getCode = () => {

    }
    // 关闭登录框
    const closeMaskLogin = () => {
        store.public.setMaskShow(false)
    }

    return (
        <div className={clsx(styles.login)}>
            <Avatar className={styles.avatar} />
            <div className={clsx(styles.title, 'mb2', 'dflex', 'jsb', 'acenter')}>
                <div className={clsx(styles.titleText)}>手机登录</div>
                <CloseCircleOutlined className={clsx('cur')} onClick={closeMaskLogin} />
            </div>
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    className={clsx(styles.formItem)}
                    name="phone"
                >
                    <Input placeholder="请输入手机号!" className={clsx(styles.input, 'w100')} />
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem, 'w100')}
                    name="code"
                >
                    <Input.Group className={clsx(styles.group, 'dflex')} compact>
                        <Input placeholder="请输入验证码!" className={clsx(styles.input, 'w100')} />
                        <Button type="primary" className={clsx(styles.btn)} onClick={getCode}>获取验证码</Button>
                    </Input.Group>
                </Form.Item>
                <Form.Item className={clsx(styles.formItem, 'w100', 'mt2')}>
                    <Button className={clsx(styles.btn, styles.loginBtn)} type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
            <div className={clsx(styles.agreement, 'dflex', 'acenter', 'jcenter', 'mt2')}>
                <span>注册登录即表示同意</span>
                <span className={clsx('ml1', 'cur')}><a className={clsx(styles.agreChild)} target="_blank" href="http://gaojianghua.cn/tianlun">用户协议</a></span>
                <span className={clsx('ml1', 'cur')}><a className={clsx(styles.agreChild)} target="_blank" href="http://gaojianghua.cn/tianlun">隐私政策</a></span>
            </div>
        </div>
    );
};

export default MaskLogin;
