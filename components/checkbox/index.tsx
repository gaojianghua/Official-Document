import type { NextPage } from 'next';
import { ICheckbox } from 'types/global'
import styles from './index.module.scss'
import clsx from 'clsx';
import { CheckOutlined } from '@ant-design/icons';

const Checkbox: NextPage<ICheckbox> = ({ check, name, onChange, className }) => {
    return (<div className={clsx(styles.box, 'dflex', 'acenter', className)} onClick={onChange}>
        {
            check ? (
                <div className={clsx(styles.choose, 'dflex', 'acenter', 'jcenter')}>
                    <CheckOutlined className={clsx(styles.icon)} />
                </div>
            ) : (
                <div className={clsx(styles.unchoose)}></div>
            )
        }
        <div className={clsx(check ? styles.text : styles.untext, 'ml')}>
            {name}
        </div>
    </div>);
};

export default Checkbox;