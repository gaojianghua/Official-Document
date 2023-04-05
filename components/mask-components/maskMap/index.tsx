import type { NextPage } from 'next';
import clsx from 'clsx';
import { useStore } from '@/store';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import { isWindow } from '@/utils';
import { useEffect } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';



const MaskMap: NextPage = () => {
    const store = useStore();

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        if (isWindow()) {
            const AMapLoader = require('@amap/amap-jsapi-loader')
            // @ts-ignore
            window._AMapSecurityConfig = {
                securityJsCode: 'ad3080ed989da6844f24268ab57510f0',
            };
            AMapLoader.load({
                'key': '1151a60b60eaab5a26845166bbc3098d',              // 申请好的Web端开发者Key，首次调用 load 时必填
                'version': '2.0',   // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
                'plugins': [],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap:any) => {
                const map = new AMap.Map('container', {
                    viewMode: '3D',  // 默认使用 2D 模式
                    zoom: 11,  //初始化地图层级
                    center: store.user.userData.userInfo.rectangle?.split(';')[0].split(','),  //初始化地图中心点
                });
            }).catch((e:any) => {
                console.log(e);
            });
        }
    }
    // 关闭弹框
    const closeMaskMap = () => {
        store.public.setMaskShow(false);
    };

    return (
        <div className={clsx(styles.register, 'positionrelative')}>
            <CloseCircleOutlined className={clsx(styles.close, 'cur')} onClick={closeMaskMap} />
            <div id='container' className={clsx(styles.map)}></div>
        </div>
    );
};

export default observer(MaskMap);
