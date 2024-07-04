import type { NextPage } from 'next';
import clsx from 'clsx';
import { useStore } from '@/store';
import ImgCrop from 'antd-img-crop';
import Image from 'next/image';
import { Form, Input, Button, message, Upload } from 'antd';
import { CloseCircleOutlined, FileImageOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from 'react';
import { IUserInfo } from '@/store/userStore';
import { UploadProps } from 'antd/es/upload/interface';
import { adminUserUpdate, userUpdate, getEmailCode } from '@/service/api';
import { imageType, uploadUrl } from '@/config';
import { beforeUpload, getSession, setSession } from '@/utils';
import { useRouter } from 'next/router';


const MaskUpdateUser: NextPage = () => {
    const store = useStore();
    const router = useRouter();
    const { userInfo: userData, tmpUser } = store.user.userData;
    const { isAdminPages } = store.public.publicData;
    const [loading, setLoading] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState(isAdminPages ? tmpUser : userData);
    const [isGetEmail, setIsGetEmail] = useState(true);
    const [smsText, setSmsText] = useState(59);
    const [email, setEmail] = useState(isAdminPages ? tmpUser.email : userData.email);
    const onFinish = async (e: IUserInfo) => {
        if (!e.mobile) return message.warning('请输入手机号');
        if (!/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(e.mobile + '')) return message.warning('请输入正确的手机号');
        if (!e.name) return message.warning('请输入昵称');
        if (!e.signature) return message.warning('请输入个性签名');
        updateUserInfo(e);
    };
    // 邮箱输入框变化
    const emailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    // 修改用户信息
    const updateUserInfo = async (e: IUserInfo) => {
        if (isAdminPages && !getSession('adminToken')) {
            store.public.setIsAdminPages(false);
            router.push('/home');
            return;
        }
        let obj: IUserInfo = {
            id: String(tmpUser.id) || '',
            ...e,
            mobile: Number(e.mobile!),
            avatar: userInfo.avatar,
        };
        let res: any;
        if (isAdminPages) {
            res = await adminUserUpdate(obj);
        } else {
            res = await userUpdate(obj);
        }
        if (res.code == 200) {
            if (!isAdminPages) {
                store.user.setUserInfo(res.data);
                setSession('userInfo', res.data);
            }
            closeMaskRegister();
            message.success('修改资料成功');
        }
    };
    // 获取邮箱验证码
    const getCode = async () => {
        if (!isGetEmail) return;
        if (!email) return message.warning('请输入邮箱');
        let res: any = await getEmailCode({
            email,
        });
        if (res.code == 200) {
            let num = 59;
            setIsGetEmail(false);
            let time = setInterval(() => {
                num--;
                if (num == -1) {
                    setIsGetEmail(true);
                    num = 59;
                    clearInterval(time);
                }
                setSmsText(num);
            }, 1000);
            message.success('验证码发送成功');
        }
    };
    // 关闭弹框
    const closeMaskRegister = () => {
        store.public.setMaskShow(false);
    };
    // 上传按钮
    const uploadButton = () => (
        <div className={clsx(styles.uploadBtn, 'dflex', 'acenter', 'jcenter', 'flexcolumn')}>
            {loading ? <LoadingOutlined /> : <FileImageOutlined className={clsx(styles.uploadIcon)} />}
            <div className={clsx(styles.uploadText)}>
                上传头像
            </div>
        </div>
    );
    // 上传文件的回调
    const handleAvatarChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        if (newFileList[0].status === 'uploading') {
            setLoading(true);
            return;
        }
        if (newFileList[0].status === 'done') {
            setLoading(false);
            setUserInfo({ ...userInfo, avatar: newFileList[0].response.data.url });
        }
    };

    return (
        <div className={clsx(styles.register)}>
            <div className={clsx(styles.title, 'mb2', 'dflex', 'jsb', 'acenter')}>
                <div className={clsx(styles.titleText)}>修改资料</div>
                <CloseCircleOutlined className={clsx('cur')} onClick={closeMaskRegister} />
            </div>
            <Form
                name='login'
                initialValues={userInfo}
                onFinish={onFinish}
                autoComplete='off'
            >
                <Form.Item className={clsx('w100', 'mb2')} name='avatar'>
                    <ImgCrop>
                        <Upload
                            showUploadList={false}
                            maxCount={1}
                            className={clsx(styles.drag, 'dflex', 'acenter', 'jcenter')}
                            name='image'
                            data={imageType}
                            headers={{
                                'Access-Token': 'Bearer ' + getSession('accessToken'),
                                'Refresh-Token': 'Bearer ' + getSession('refreshToken')
                            }}
                            beforeUpload={beforeUpload}
                            onChange={handleAvatarChange}
                            action={uploadUrl}>
                            {userInfo.avatar ? <Image width={100} height={100} src={userInfo.avatar} alt='avatar' style={{
                                borderRadius: '50%',
                            }} /> : uploadButton()}
                        </Upload>
                    </ImgCrop>
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem)}
                    name='name'
                >
                    <Input type={'text'} placeholder='请输入昵称!'
                        className={clsx(styles.input, 'w100')} />
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem)}
                    name='mobile'
                >
                    <Input type={'number'} placeholder='请输入手机号!'
                        className={clsx(styles.input, 'w100')} />
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem, 'w100')}
                    name='signature'
                >
                    <Input placeholder='请输入个性签名!' className={clsx(styles.input, 'w100')} />
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem, 'w100')}
                    name='email'
                >
                    <Input type={'email'} placeholder='请输入邮箱!'
                        className={clsx(styles.input, 'w100')} onChange={emailChange} />
                </Form.Item>
                {
                    !store.user.userData.userInfo.email || email != store.user.userData.userInfo.email ?
                        <Form.Item
                            className={clsx(styles.formItem, 'w100')}
                            name='code'
                        >
                            <div className={clsx(styles.group, 'dflex')}>
                                <Input type={'number'} maxLength={6} placeholder='请输入验证码!'
                                    className={clsx(styles.input, 'w100')} />
                                <Button type='primary' className={clsx(styles.btn, 'index10')}
                                        onClick={getCode}>{isGetEmail ? '获取验证码' : smsText + ' S'}</Button>
                            </div>
                        </Form.Item> : <></>
                }
                <Form.Item className={clsx(styles.formItem, 'w100', 'mt2')}>
                    <Button className={clsx(styles.btn, styles.loginBtn)} type='primary' htmlType='submit'>
                        修改资料
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default observer(MaskUpdateUser);
