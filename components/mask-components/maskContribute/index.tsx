import type { NextPage } from 'next';
import clsx from 'clsx';
import { useStore } from '@/store';
import { Form, Input, Button, message } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { MAvatar } from 'components';
import { observer } from 'mobx-react-lite';
import { applyContribute } from '@/service/api';

interface IContribute {
    link_name: string
    src: string
    link_desc: string
}

const MaskLink: NextPage = () => {
    const store = useStore();
    const onFinish = async (e: IContribute) => {
        let res: any = await applyContribute(e)
        if (res.code == 200) {
            message.success('感谢您的投稿, 祝您一生平安')
            closeMaskContribute()
        }
    };
    // 关闭弹框
    const closeMaskContribute = () => {
        store.public.setMaskShow(false);
    };

    return (
        <div className={clsx(styles.register)}>
            <MAvatar className={styles.avatar} />
            <div className={clsx(styles.title, 'mb2', 'dflex', 'jsb', 'acenter')}>
                <div className={clsx(styles.titleText)}>链接投稿</div>
                <CloseCircleOutlined className={clsx('cur')} onClick={closeMaskContribute} />
            </div>
            <Form
                name='contribute'
                initialValues={{}}
                onFinish={onFinish}
                autoComplete='off'
            >
                <Form.Item
                    className={clsx(styles.formItem)}
                    name='link_name'
                >
                    <Input type={'text'} placeholder='请输入链接名称!'
                           className={clsx(styles.input, 'w100')} />
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem, 'w100')}
                    name='src'
                >
                    <Input placeholder='请输入链接地址!' className={clsx(styles.input, 'w100')} />
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem, styles.textArea, 'w100')}
                    name='link_desc'
                >
                    <Input.TextArea maxLength={50} placeholder='请输入链接描述!' className={clsx(styles.input, styles.textAreaItem, 'w100')} />
                </Form.Item>
                <Form.Item className={clsx(styles.formItem, 'w100', 'mt2')}>
                    <Button className={clsx(styles.btn, styles.loginBtn)} type='primary' htmlType='submit'>
                        立即投递
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default observer(MaskLink);
