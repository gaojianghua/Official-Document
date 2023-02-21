import type { NextPage } from 'next';
import styles from './index.module.scss'
import clsx from 'clsx'
import { Image} from 'antd'
import { ICardProps } from "types/global";
import Checkbox from 'components/checkbox';
import { FormOutlined } from '@ant-design/icons';

const Card: NextPage<ICardProps> = (props) => {
    const { item, isManagement, checkSwitchF, editorMark } = props
    return (
        <div style={{backgroundImage: 'url(' + `${item.bg_img}` + ')'}} className={clsx(styles.mark, 'dflex', 'acenter', 'jcenter', 'cur')} key={item.id}>
            <div className={clsx(styles.glass, 'dflex', 'acenter', 'jcenter')}>
                <a href={item.url} rel="noreferrer" target="_blank" onClick={(e)=> isManagement ? e.preventDefault() : ''} className={clsx('dflex', 'acenter', 'jcenter', 'flexcolumn', 'positionrelative')}>
                    <div className={clsx(styles.cardLogo, 'dflex', 'acenter')}>
                        <Image alt={''} className={clsx(styles.cardImage, 'rounded')} preview={false} src={item.logo} />
                    </div>
                    <div className={clsx(styles.text, 'mt1', 'fontdr')}>{item.label}</div>
                    {
                        isManagement && item.mark_Id! === 0 ? (
                            <div className={clsx(styles.editor, 'dflex', 'acenter')} onClick={() => {editorMark(item.id)}} >
                                <FormOutlined className={clsx(styles.editorIcon, 'dflex', 'acenter')} />
                                <div className={clsx(styles.editorText, 'ml')}>编辑</div>
                            </div>
                        ) : <></>
                    }
                    {
                        isManagement ? (
                            <Checkbox className={clsx(styles.checkbox)} check={item.check!} name="移除" onChange={() => {
                                checkSwitchF(item.id)
                            }} />
                        ) : <></>
                    }
                </a>
            </div>
        </div>
    );
};

export default Card;