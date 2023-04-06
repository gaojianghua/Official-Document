import clsx from 'clsx';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Button, Form, Input, message } from 'antd';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CloseOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useStore } from '@/store';
import { getUserLinkList, userLinkDel } from '@/service/api';
import { observer } from 'mobx-react-lite';
import { ULink } from '@/types/res';
import Link from 'next/link';
import { imageType } from '@/config';

interface Props {
    children: any;
}

const MainBox: NextPage<Props> = ({ children }) => {
    const store = useStore();
    const { pathname } = useRouter();
    const [input, setInput] = useState('');
    const [leftShow, setLeftShow] = useState(0);
    const [rightShow, setRightShow] = useState(0);
    const [lList, setLList] = useState<ULink[]>([]);
    const [rList, setRList] = useState<ULink[]>([]);
    const [lManage, setLManage] = useState(false);
    const [rManage, setRManage] = useState(false);
    const { token } = store.public.publicData;
    const { success } = store.link.linkData;
    useEffect(() => {
        if (token) {
            getUserLinkListData();
        } else {
            setLList(() => []);
            setRList(() => []);
        }
        if (success) {
            getUserLinkListData();
            store.link.setSuccess(false);
        }
    }, [token,success]);
    // 获取数据
    const getUserLinkListData = async () => {
        if (!token) return;
        let larray: ULink[] = [];
        let rarray: ULink[] = [];
        let res: any = await getUserLinkList();
        if (res?.code == 200) {
            res.data.forEach((item: any) => {
                if (item.user_link_type == 1) {
                    larray.push(item);
                } else if (item.user_link_type == 2) {
                    rarray.push(item);
                }
            });
            larray.sort((a, b) => {
                return a.sort_id! - b.sort_id!;
            });
            rarray.sort((a, b) => {
                return a.sort_id! - b.sort_id!;
            });
            larray.length == 0 ? setLManage(true) : setLManage(false);
            rarray.length == 0 ? setRManage(true) : setRManage(false);
            setLList(larray);
            setRList(rarray);
        }
    };
    // 搜索
    const onFinish = () => {
        if (!input) return message.warning('请输入关键词');
        window.open('https://www.baidu.com/s?wd=' + input);
    };
    // 左侧栏开关
    const leftBtnClick = () => {
        leftShow == 1 ? setLeftShow(2) : setLeftShow(1);
    };
    // 右侧栏开关
    const rightBtnClick = () => {
        rightShow == 1 ? setRightShow(2) : setRightShow(1);
    };
    // 左侧链接管理开关
    const openLManage = () => {
        if (!token) return message.warning('请先登录');
        setLManage(!lManage);
    };
    // 右侧链接管理开关
    const openRManage = () => {
        if (!token) return message.warning('请先登录');
        setRManage(!rManage);
    };
    // 输入框内容变化
    const onChange = (e: any) => {
        setInput(e.target.value);
    };
    // link新增事件
    const addLink = (e: number) => {
        store.link.setIsLOrR(e);
        store.public.setMaskComponentId(4);
        store.public.setIsAddOrEdit(1);
        store.public.setMaskShow(true);
    };
    // 打开确定删除弹框
    const openDelete = (item: ULink) => {
        store.public.setMaskComponentId(7);
        store.model.setTitle('移除链接');
        store.model.setChildren(<div className={clsx('dflex', 'jcenter', 'acenter', 'textwhite')}>
            确定移除 {item.user_link_name} 吗？
        </div>);
        store.model.setConfirm(() => {
            itemDelClick(item.id!);
        });
        store.model.setCancel(() => {
            store.public.setMaskShow(false);
        });
        store.public.setMaskShow(true);
    };
    // link删除事件
    const itemDelClick = async (id: string) => {
        let res: any = await userLinkDel({ id: String(id) });
        if (res.code == 200) {
            getUserLinkListData();
            store.public.setMaskShow(false);
            message.success('删除成功');
        }
    };
    // link编辑事件
    const itemEditClick = (e: any) => {
        store.public.setMaskComponentId(4);
        store.public.setIsAddOrEdit(2);
        store.link.setTmpLink(e);
        store.public.setMaskShow(true);
    };
    // 清空input
    const closeInput = () => {
        setInput('')
    }
    return <div className={styles.container}>
        <Head>
            <title>Wolffy印记</title>
            <meta data-n-head='ssr' name='description' content='next app vue react uniapp taro' />
            <meta data-n-head='ssr' name='description' content='官网印记 灰太狼' />
            <link rel='icon' href={imageType.ico} />
        </Head>
        <div className={clsx(styles.left, 'py2', 'px2', leftShow == 1 ? styles.leftOpen : leftShow == 2 ? styles.leftClose : '')}>
            <div className={clsx(styles.manage, lManage ? 'bc-color' : '', 'cur')} onClick={openLManage}>
            </div>
            <div className={clsx(styles.leftList, 'dflex', 'flexcolumn', 'acenter')}>
                {
                    lManage ?
                        <div className={clsx(styles.addLItem, 'dflex', 'cur', 'flexshrink', 'acenter', 'jcenter')}
                             onClick={() => addLink(1)}>
                            <PlusOutlined style={{ fontSize: '18px', marginRight: '5px' }} />新增
                        </div> : <></>
                }
                {lList?.map((item, index) => <div key={index} className={clsx(styles.leftBox, 'positionrelative')}>
                    {
                        lManage ? <div className={clsx('dflex')}>
                            <div className={clsx(styles.leftEdit, 'cur')} onClick={() => itemEditClick(item)}>
                                <EditOutlined /> 编辑
                            </div>
                            <div className={clsx(styles.leftDel, 'cur')} onClick={() => openDelete(item)}>
                                <DeleteOutlined /> 删除
                            </div>
                        </div> : <></>
                    }
                    <Link key={index} target={'_blank'} href={item?.src!}>
                        <div className={clsx(styles.leftItem, 'dflex', 'cur', 'flexshrink', 'acenter', 'jcenter')}>
                            {item?.user_link_name}
                        </div>
                    </Link>
                </div>)}
            </div>
            <div className={styles.leftbtn} onClick={leftBtnClick}>
                <div className={clsx(styles.btn, 'dflex', 'jsa', 'acenter', 'jcenter', 'cur')}>
                    <p>工</p>
                    <p>具</p>
                    <p>栏</p>
                </div>
            </div>
        </div>
        <div className={clsx(styles.right, 'py2', 'px2', rightShow == 1 ? styles.rightOpen : rightShow == 2 ? styles.rightClose : '')}>
            <div className={clsx(styles.rightList, 'dflex', 'flexcolumn', 'acenter')}>
                <div className={clsx(styles.manage, rManage ? 'bc-color' : '', 'cur')} onClick={openRManage}>
                </div>
                {
                    rManage ?
                        <div className={clsx(styles.addRItem, 'dflex', 'cur', 'flexshrink', 'acenter', 'jcenter')}
                             onClick={() => addLink(2)}>
                            新增<PlusOutlined style={{ fontSize: '18px', marginLeft: '5px' }} />
                        </div> : <></>
                }
                {rList?.map((item, index) => <div key={index} className={clsx(styles.rightBox, 'positionrelative')}>
                    {
                        rManage ? <div className={clsx('dflex')}>
                            <div className={clsx(styles.rightDel, 'cur')} onClick={() => openDelete(item)}>
                                <DeleteOutlined /> 删除
                            </div>
                            <div className={clsx(styles.rightEdit, 'cur')} onClick={() => itemEditClick(item)}>
                                <EditOutlined /> 编辑
                            </div>
                        </div> : <></>
                    }
                    <Link key={index} target={'_blank'} href={item?.src!}>
                        <div className={clsx(styles.rightItem, 'dflex', 'cur', 'flexshrink', 'acenter', 'jcenter')}>
                            {item?.user_link_name}
                        </div>
                    </Link>
                </div>)}
            </div>
            <div className={styles.rightbtn} onClick={rightBtnClick}>
                <div className={clsx(styles.btn, 'dflex', 'jsa', 'acenter', 'jcenter', 'cur')}>
                    <p>栏</p>
                    <p>捷</p>
                    <p>便</p>
                </div>
            </div>
        </div>
        {
            pathname === '/' ? <div className={clsx(styles.search)}>
                <Form
                    name='search'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete='off'
                >
                    <Form.Item
                        className={clsx(styles.formItem, 'w100')}
                        name='input'
                    >
                        <Input.Group className={clsx(styles.group, 'dflex')} compact>
                            <Input className={clsx(styles.input, 'w100')} value={input} onChange={onChange} />
                            {input ? <div className={clsx(styles.close, 'dflex', 'jcenter', 'acenter', 'cur')} onClick={closeInput}>
                                <CloseOutlined />
                            </div>: <></>}
                            <Button type='primary' className={clsx(styles.btn)} htmlType='submit'>百度一下</Button>
                        </Input.Group>
                    </Form.Item>
                </Form>
            </div> : <></>
        }
        <div className={clsx(styles.content, pathname == '/' ? styles.home : styles.other)}>
            <div className={clsx(styles.list, 'dflex', 'flexwrap', 'overscr')}>
                {children}
            </div>
        </div>
    </div>;
};

export default observer(MainBox);