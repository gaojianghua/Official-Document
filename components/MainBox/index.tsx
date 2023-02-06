import clsx from 'clsx';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Form, Input, Button } from 'antd'
import styles from './index.module.scss'
import { useRouter } from 'next/router';
import { ChangeEventHandler, useState } from 'react';

interface Props {
    children: any;
}

const MainBox: NextPage<Props> = ({ children }) => {
    const { pathname } = useRouter();
    const [input, setInput] = useState()
    const onFinish = () => {
        window.open('https://www.baidu.com/s?wd=' + input)
    };
    const onChange = (e: any) => {
        setInput(e.target.value)
    }
    return (<div className={styles.container}>
        <Head>
            <title>Wolffy印记</title>
            <meta data-n-head="ssr" name="description" content="next app vue react uniapp taro" />
            <meta data-n-head="ssr" name="description" content="官网印记 灰太狼" />
            <link rel="icon" href="/Wolffy.ico" />
        </Head>
        {
            pathname === '/' ? (
                <div className={clsx(styles.search)}>
                    <Form
                        name="search"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >

                        <Form.Item
                            className={clsx(styles.formItem, 'w100')}
                            name="input"
                        >
                            <Input.Group className={clsx(styles.group, 'dflex')} compact>
                                <Input className={clsx(styles.input, 'w100')} value={input} onChange={onChange} />
                                <Button type="primary" className={clsx(styles.btn)} htmlType="submit">百度一下</Button>
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