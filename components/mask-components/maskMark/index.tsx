import type { NextPage } from 'next';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store/index';
import { Image, Form, Input, Button, Upload, message } from 'antd'
import { CloseCircleOutlined, FileImageOutlined, LoadingOutlined } from '@ant-design/icons'
import type { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { IUrls } from 'types/global'
import styles from './index.module.scss'
import { useState } from 'react';
import { Avatar } from 'components';


const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const MaskMark: NextPage = () => {
    const store = useStore();
    const { isAddAndEditor } = store.public.publicData;
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ actionUrl, setaAtionUrl ] = useState<string>('');
    const [ form, setForm ] = useState<IUrls>({
        label: '',
        logo: '',
        url: '',
        bg_img: ''
    });
    // 关闭新增或者编辑弹窗
    const closeMaskMark = () => {
        store.public.setMaskShow(false)
    }
    // 提交表单
    const onFinish = () => {

    }
    // 上传文件的回调
    const handleBgImgChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, url => {
                setLoading(false);
                setForm({...form, bg_img: url});
            });
        }
    }
    // 上传文件的回调
    const handleLogoChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, url => {
                setLoading(false);
                setForm({...form, logo: url});
            });
        }
    };
    // 上传按钮
    const uploadButton = (id: number) => (
        <div className={clsx(styles.uploadBtn, 'dflex', 'acenter', 'jcenter', 'flexcolumn')}>
            {loading ? <LoadingOutlined /> : <FileImageOutlined className={clsx(styles.uploadIcon)}/>}
            <div className={clsx(styles.uploadText)}>
                {
                    id === 1 ? '添加LOGO' : '添加背景图片'
                }
            </div>
        </div>
    );
    return (
        <div className={clsx(styles.mark)}>
            <Avatar className={styles.avatar} />
            <div className={clsx(styles.title, 'mb2', 'dflex', 'jsb', 'acenter')}>
                <div className={clsx(styles.titleText)}>
                    {
                        isAddAndEditor === 1 ? '新增印记' : '编辑印记'
                    }
                </div>
                <CloseCircleOutlined className={clsx('cur')} onClick={closeMaskMark} />
            </div>
            <Form
                name="mark"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    className={clsx(styles.formItem)}
                    name="markName"
                >
                    <Input placeholder="请输入印记名称!" className={clsx(styles.input, 'w100')} />
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem, 'w100')}
                    name="markURL"
                >
                    <Input placeholder="请输入印记地址!" className={clsx(styles.input, 'w100')} />
                </Form.Item>
                <Form.Item className={clsx('w100', 'mb0')} name="markLogo">
                    <Upload 
                        showUploadList={false}
                        maxCount={1} 
                        className={clsx(styles.drag, 'dflex', 'acenter', 'jcenter')} 
                        name="files" 
                        beforeUpload={beforeUpload}
                        onChange={handleLogoChange}
                        action={actionUrl}>
                        {form.logo ? <Image preview={false} src={form.logo} alt="avatar" style={{ width: '80px', height: '80px', borderRadius: '5px' }} /> : uploadButton(1)}
                    </Upload>
                </Form.Item>
                <Form.Item className={clsx(styles.formUpload, 'w100', 'mb0')} name="markBC">
                    <Upload 
                        showUploadList={false}
                        maxCount={1} 
                        className={clsx(styles.uploadDrag, 'dflex', 'acenter', 'jcenter')} 
                        name="files" 
                        beforeUpload={beforeUpload}
                        onChange={handleBgImgChange}
                        action={actionUrl}>
                        {form.bg_img ? <Image preview={false} src={form.bg_img} alt="avatar" style={{ width: '296px', height: '156px', borderRadius: '5px' }} /> : uploadButton(2)}
                    </Upload>
                </Form.Item>

                <Form.Item className={clsx(styles.formItem, 'w100', 'mt2')}>
                    <Button className={clsx(styles.btn, styles.markBtn)} type="primary" htmlType="submit">
                        确定
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default observer(MaskMark);