import type { NextPage } from 'next';
import clsx from 'clsx';
import styles from './index.module.scss'
import { observer } from 'mobx-react-lite';
import { useStore } from 'store/index';
import { MaskLogin, MaskMark } from 'components/index'

const Mask: NextPage = () => {
    const store = useStore()
    const { maskShow, maskComponentId } = store.public.publicData
    const childNext = () => {
        switch (maskComponentId) {
            case 1:
                return (
                    <MaskLogin />
                )
                break;
            case 2:
                return (
                    <MaskMark />
                )
                break;
            default:
                break;
        }
        return <></>
    }
    return (
        maskShow ? (
            <div className={clsx(styles.mask)}>
                <div className={clsx(styles.maskChild, 'dflex', 'acenter', 'jcenter')}>
                    { childNext() }
                </div>
            </div>
        ) : <></>
    );
};

export default observer(Mask);