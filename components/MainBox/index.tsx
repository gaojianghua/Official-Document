import clsx from 'clsx';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Form, Input, Button, message } from 'antd';
import styles from './index.module.scss';
import { leftList, rightList } from '@/data';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import { PlusOutlined } from '@ant-design/icons';
import { useStore } from '@/store';

interface Props {
    children: any;
}

const MainBox: NextPage<Props> = ({ children }) => {
    useStore();
    const { pathname } = useRouter();
    const [input, setInput] = useState();
    const [leftShow, setLeftShow] = useState(false);
    const [rightShow, setRightShow] = useState(false);
    const [lList] = useState(leftList);
    const [rList] = useState(rightList);
    const [lManage, setLManage] = useState(false);
    const [rManage, setRManage] = useState(false);
    const onFinish = () => {
        if (!input) return message.warning('请输入关键词');
        window.open('https://www.baidu.com/s?wd=' + input);
    };
    const leftBtnClick = () => {
        setLeftShow(!leftShow);
    };
    const rightBtnClick = () => {
        setRightShow(!rightShow);
    };
    const onChange = (e: any) => {
        setInput(e.target.value);
    };
    return (<div className={styles.container}>
        <Head>
            <title>Wolffy印记</title>
            <meta data-n-head='ssr' name='description' content='next app vue react uniapp taro' />
            <meta data-n-head='ssr' name='description' content='官网印记 灰太狼' />
            <link rel='icon' href='/Wolffy.ico' />
        </Head>
        <div className={clsx(styles.left, 'pt3', 'pb-2', 'px2', leftShow ? styles.leftOpen : styles.leftClose)}>
            <div className={clsx(styles.manage, 'cur')} onClick={()=>setLManage(!lManage)}>
            </div>
            <div className={clsx(styles.leftList, 'dflex', 'flexcolumn', 'acenter')}>
                {
                    lManage ? <Link href={'#'}>
                        <div className={clsx(styles.addLItem, 'dflex', 'cur', 'flexshrink', 'acenter', 'jcenter')}>
                            <PlusOutlined style={{ fontSize: '18px', marginRight: '5px' }} />新增
                        </div>
                    </Link> : <></>
                }
                {lList?.map((item, index) => (
                    <Link key={index} target={'_blank'} href={item?.url}>
                        <div className={clsx(styles.leftItem, 'dflex', 'cur', 'flexshrink', 'acenter', 'jcenter')}>
                            {item?.name}
                        </div>
                    </Link>
                ))}
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
                <div className={clsx(styles.manage, 'cur')} onClick={()=>setRManage(!rManage)}>
                </div>
                {
                    rManage ?
                        <div className={clsx(styles.addRItem, 'dflex', 'cur', 'flexshrink', 'acenter', 'jcenter')}>
                            新增<PlusOutlined style={{ fontSize: '18px', marginLeft: '5px' }} />
                        </div> : <></>
                }
                {rList?.map((item, index) => (
                    <Link key={index} target={'_blank'} href={item?.url}>
                        <div className={clsx(styles.rightItem, 'dflex', 'cur', 'flexshrink', 'acenter', 'jcenter')}>
                            {item?.name}
                        </div>
                    </Link>
                ))}
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
            pathname === '/' ? (
                <div className={clsx(styles.search)}>
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
                </div>
            ) : <></>
        }
        <div className={clsx(styles.content, pathname == '/' ? styles.home : styles.other)}>
            <div className={clsx(styles.list, 'dflex', 'flexwrap', 'overscr')}>
                {children}
            </div>
        </div>
    </div>);
};

export default MainBox;