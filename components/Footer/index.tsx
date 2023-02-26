import type { NextPage } from 'next';
import styles from './index.module.scss'
import clsx from 'clsx'
import { Button } from 'antd'

const Footer: NextPage = () => {
    return (
        <div className={clsx(styles.footer, 'dflex', 'flexcolumn', 'acenter', 'mt2')}>
            <div className={clsx(styles.urls, 'dflex')}>
                <Button type="primary" className={clsx(styles.btnn)} target="_blank" href="#">博客社区</Button>
                <div className={clsx('px2')}/>
                <Button type="primary" className={clsx(styles.btnn)} target="_blank" href="https://gaojianghua.cn/docs/">作者文档</Button>
                <div className={clsx('px2')}/>
                <Button type="primary" className={clsx(styles.btnn)} target="_blank" href="#">服务官网</Button>
            </div>
            <div className={clsx(styles.text, 'cur')}>邮箱：g598670138@163.com 个人微信号：woshigaojianghua</div>
            <a target="_blank" rel="noreferrer" href='https://beian.miit.gov.cn' className={clsx(styles.text, 'cur')}>Copyright © 2022-{new Date().getFullYear()} JiangHua Gao 版权所有 浙ICP备2022001576号</a>
        </div>
    )
};

export default Footer;