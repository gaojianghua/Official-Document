import type { NextPage } from 'next';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { Button, Cascader, Form, Image, Input, message, Upload } from 'antd';
import { CloseCircleOutlined, DownOutlined, FileImageOutlined, LoadingOutlined } from '@ant-design/icons';
import type { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload/interface';
import styles from './index.module.scss';
import { useState } from 'react';
import { MAvatar } from 'components';
import { beforeUpload, getSession } from '@/utils';
import { imageType, uploadUrl } from '@/config';
import { Mark } from '@/types/res';
import { userCardAdd, userCardUpdate } from '@/service/api';

const MaskMark: NextPage = () => {
    const store = useStore();
    const { isAddAndEditor, isUpdateCard } = store.public.publicData;
    const [loading, setLoading] = useState<boolean>(false);
    const [options, setOptions] = useState([
        {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                        {
                            value: 'xihu',
                            label: 'West Lake',
                        },
                    ],
                },
            ],
        },
        {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
                {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                        {
                            value: 'zhonghuamen',
                            label: 'Zhong Hua Men',
                        },
                    ],
                },
            ],
        },
    ])
    const [tmpMark, setTmpMark] = useState<Mark>(store.mark.markData.tmpMark);
    // 关闭新增或者编辑弹窗
    const closeMaskMark = () => {
        store.public.setMaskShow(false);
    };
    // 提交表单
    const onFinish = async (e: Mark) => {
        if (!e.name) return message.warning('请输入印记卡片名称');
        if (!e.src) return message.warning('请输入印记卡片链接地址');
        let res: any;
        if (isAddAndEditor == 1) {
            let obj: Mark = {
                ...e,
                logo: tmpMark.logo,
                image_bg: tmpMark.image_bg,
            };
            res = await userCardAdd(obj);
        } else {
            let obj: Mark = {
                ...e,
                sort_id: tmpMark.sort_id,
                id: String(tmpMark.id),
                logo: tmpMark.logo,
                image_bg: tmpMark.image_bg,
            };
            res = await userCardUpdate(obj);
        }
        if (res.code == 200) {
            store.mark.setSuccess(true);
            store.public.setMaskShow(false);
            isAddAndEditor == 1 ? message.success('新增印记卡片成功') :
                message.success('编辑印记卡片成功');
        }
    };
    // 上传文件的回调
    const handleLgChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setLoading(false);
            setTmpMark({ ...tmpMark, logo: info.file.response.data.url });
        }
    };
    // 上传文件的回调
    const handleBgChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setLoading(false);
            setTmpMark({ ...tmpMark, image_bg: info.file.response.data.url });
        }
    };
    // 上传按钮
    const uploadButton = (id: number) => (
        <div className={clsx(styles.uploadBtn, 'dflex', 'acenter', 'jcenter', 'flexcolumn')}>
            {loading ? <LoadingOutlined /> : <FileImageOutlined className={clsx(styles.uploadIcon)} />}
            <div className={clsx(styles.uploadText)}>
                {
                    id === 1 ? '添加LOGO' : '添加背景图片'
                }
            </div>
        </div>
    );

    const onChange = () => {

    }

    return (
        <div className={clsx(styles.mark)}>
            <MAvatar className={styles.avatar} />
            <div className={clsx(styles.title, 'mb2', 'dflex', 'jsb', 'acenter')}>
                <div className={clsx(styles.titleText)}>
                    {
                        isAddAndEditor === 1 ? '新增印记' : '编辑印记'
                    }
                </div>
                <CloseCircleOutlined className={clsx('cur')} onClick={closeMaskMark} />
            </div>
            <Form
                name='mark'
                initialValues={isAddAndEditor == 1 ? {} : tmpMark}
                onFinish={onFinish}
                autoComplete='off'
            >
                <Form.Item
                    className={clsx(styles.formItem)}
                    name='name'
                >
                    <Input placeholder='请输入印记名称!' className={clsx(styles.input, 'w100')} />
                </Form.Item>
                <Form.Item
                    className={clsx(styles.formItem, 'w100')}
                    name='src'
                >
                    <Input placeholder='请输入印记地址!' className={clsx(styles.input, 'w100')} />
                </Form.Item>
                {
                    isUpdateCard ?
                        <Form.Item
                            className={clsx(styles.formItem,'w100')}
                            name='type'
                        >
                            <Cascader className={clsx(styles.input)} bordered={false} placeholder='请选择分类!' options={options} onChange={onChange} />
                        </Form.Item> :
                        <></>
                }
                <Form.Item className={clsx('w100', 'mb0')} name='logo'>
                    <Upload
                        showUploadList={false}
                        maxCount={1}
                        className={clsx(styles.drag, 'dflex', 'acenter', 'jcenter')}
                        name='image'
                        data={imageType}
                        headers={{
                            'Authorization': 'Bearer ' + getSession('token'),
                        }}
                        beforeUpload={beforeUpload}
                        onChange={handleLgChange}
                        action={uploadUrl}>
                        {tmpMark.logo ? <Image preview={false} src={tmpMark.logo} alt='logo' style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '5px',
                        }} /> : uploadButton(1)}
                    </Upload>
                </Form.Item>
                <Form.Item className={clsx(styles.formUpload, 'w100', 'mb0')} name='image_bg'>
                        <Upload
                            showUploadList={false}
                            maxCount={1}
                            className={clsx(styles.uploadDrag, 'dflex', 'acenter', 'jcenter')}
                            name='image'
                            data={imageType}
                            headers={{
                                'Authorization': 'Bearer ' + getSession('token'),
                            }}
                            beforeUpload={beforeUpload}
                            onChange={handleBgChange}
                            action={uploadUrl}>
                            {tmpMark.image_bg ? <Image preview={false} src={tmpMark.image_bg} alt='image_bg' style={{
                                width: '296px',
                                height: '156px',
                                borderRadius: '5px',
                            }} /> : uploadButton(2)}
                        </Upload>
                </Form.Item>

                <Form.Item className={clsx(styles.formItem, 'w100', 'mt2')}>
                    <Button className={clsx(styles.btn, styles.markBtn)} type='primary' htmlType='submit'>
                        {isAddAndEditor == 1 ? '新增' : '保存'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default observer(MaskMark);