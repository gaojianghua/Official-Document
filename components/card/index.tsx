import type { NextPage } from 'next';
import styles from './index.module.scss';
import clsx from 'clsx';
import { Image, Popconfirm } from 'antd';
import { ICardProps } from 'types/global';
import { DeleteOutlined, ExclamationCircleOutlined, FormOutlined } from '@ant-design/icons';

const Card: NextPage<ICardProps> = (props) => {
    const { item, isManagement, deleteMark, editorMark } = props;
    return (
        <div style={{ backgroundImage: 'url(' + `${item.image_bg}` + ')' }}
             className={clsx(styles.mark, 'dflex', 'acenter', 'jcenter', 'cur')} key={item.id}>
            <div className={clsx(styles.glass, 'dflex', 'acenter', 'jcenter')}>
                <a href={item.src} rel='noreferrer' target='_blank'
                   onClick={(e) => isManagement ? e.preventDefault() : ''}
                   className={clsx('dflex', 'acenter', 'jcenter', 'flexcolumn', 'positionrelative')}>
                    <div className={clsx(styles.cardLogo, 'dflex', 'acenter')}>
                        <Image alt={''} className={clsx(styles.cardImage, 'rounded')} preview={false} src={item.logo} />
                    </div>
                    <div className={clsx(styles.text, 'mt1', 'fontdr')}>{item.name}</div>
                    {
                        isManagement ? (
                            <div className={clsx(styles.btn, styles.editor, 'dflex', 'acenter')} onClick={() => {
                                editorMark(item);
                            }}>
                                <FormOutlined className={clsx(styles.btnIcon, 'dflex', 'acenter')} />
                                <div className={clsx(styles.btnText, 'ml')}>编辑</div>
                            </div>
                        ) : <></>
                    }
                    {
                        isManagement ? (
                            <Popconfirm
                                cancelText='取消'
                                okText='确认'
                                onConfirm={() => deleteMark(item.id)}
                                title={`确定删除 ${item?.name} 吗？`}
                                icon={<ExclamationCircleOutlined style={{ color: 'red', fontSize: '20px' }} />}>

                                <div className={clsx(styles.btn, styles.delete, 'dflex', 'acenter')}>
                                    <DeleteOutlined className={clsx(styles.btnIcon, 'dflex', 'acenter')} />
                                    <div className={clsx(styles.btnText, 'ml')}>移除</div>
                                </div>
                            </Popconfirm>
                        ) : <></>
                    }
                </a>
            </div>
        </div>
    );
};

export default Card;