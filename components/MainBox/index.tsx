import clsx from 'clsx';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Form, Input, Button, message, Popconfirm } from 'antd';
import styles from './index.module.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { EditOutlined, PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useStore } from '@/store';
import { getUserLinks, userLinkDel } from '@/service/api';
import { observer } from 'mobx-react-lite';
import { ULink } from '@/types/res';
import Link from 'next/link';

interface Props {
    children: any;
}

const MainBox: NextPage<Props> = ({ children }) => {
    const store = useStore();
    const { pathname } = useRouter();
    const [input, setInput] = useState();
    const [leftShow, setLeftShow] = useState(false);
    const [rightShow, setRightShow] = useState(false);
    const [lList, setLList] = useState<ULink[]>([]);
    const [rList, setRList] = useState<ULink[]>([]);
    const [lManage, setLManage] = useState(false);
    const [rManage, setRManage] = useState(false);
    const { token } = store.public.publicData;
    const { success } = store.link.linkData;
    useEffect(() => {
        if (token) {
            getUserLinkList();
        } else {
            setLList(() => []);
            setRList(() => []);
        }
    }, [token]);
    useEffect(() => {
        if (success) {
            getUserLinkList();
            store.link.setSuccess(false);
        }
    }, [success]);
    // 获取数据
    const getUserLinkList = async () => {
        if (!token) return;
        let larray: ULink[] = [];
        let rarray: ULink[] = [];
        let res: any = await getUserLinks();
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
        setLeftShow(!leftShow);
    };
    // 右侧栏开关
    const rightBtnClick = () => {
        setRightShow(!rightShow);
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
    // link删除事件
    const itemDelClick = async (e: any) => {
        let res: any = await userLinkDel({ id: String(e.id) });
        if (res.code == 200) {
            getUserLinkList();
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
    return <div className={styles.container}>
        <Head>
            <title>Wolffy印记</title>
            <meta data-n-head='ssr' name='description' content='next app vue react uniapp taro' />
            <meta data-n-head='ssr' name='description' content='官网印记 灰太狼' />
            <link rel='icon' href='/Wolffy.ico' />
        </Head>
        <div className={clsx(styles.left, 'py2', 'px2', leftShow ? styles.leftOpen : styles.leftClose)}>
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
                            <Popconfirm
                                cancelText='取消'
                                okText='确认'
                                onConfirm={() => itemDelClick(item)}
                                title={`确定删除 ${item?.user_link_name} 吗？`}
                                icon={<ExclamationCircleOutlined style={{ color: 'red', fontSize: '20px' }} />}>
                                <div className={clsx(styles.leftDel, 'cur')}>
                                    <DeleteOutlined /> 删除
                                </div>
                            </Popconfirm>
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
        <div className={clsx(styles.right, 'py2', 'px2', rightShow ? styles.rightOpen : styles.rightClose)}>
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
                            <div className={clsx(styles.rightDel, 'cur')} onClick={() => itemDelClick(item)}>
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