import type { NextPage } from 'next';
import clsx from 'clsx';
import styles from './index.module.scss';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { MaskLogin, MaskMark, MaskRegister, MaskLink, MaskUpdateUser } from 'components/index';
import MaskContribute from 'C/mask-components/maskContribute';

const Mask: NextPage = () => {
    const store = useStore();
    const { maskShow, maskComponentId } = store.public.publicData;
    const childNext = () => {
        switch (maskComponentId) {
            case 1:
                return (
                    <MaskLogin />
                );
            case 2:
                return (
                    <MaskMark />
                );
            case 3:
                return (
                    <MaskRegister />
                );
            case 4:
                return (
                    <MaskLink />
                );
            case 5:
                return (
                    <MaskContribute />
                );
            case 6:
                return (
                    <MaskUpdateUser />
                );
            default:
                break;
        }
        return <></>;
    };
    return (
        maskShow ? (
            <div className={clsx(styles.mask)}>
                <div className={clsx(styles.maskChild, 'dflex', 'acenter', 'jcenter')}>
                    {childNext()}
                </div>
            </div>
        ) : <></>
    );
};

export default observer(Mask);