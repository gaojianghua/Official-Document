/*
 * @Author: 高江华 g598670138@163.com
 * @Date: 2023-06-14 14:48:28
 * @LastEditors: 高江华
 * @LastEditTime: 2024-08-16 13:47:04
 * @Description: file content
 */
import type { NextPage } from 'next';
import styles from './index.module.scss';
import clsx from 'clsx';
import Image from 'next/image'
import { ICardProps } from 'types/global';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';

const Card: NextPage<ICardProps> = (props) => {
    const { item, isManagement, openDelete, editorMark } = props;
    return (
        <div style={{ backgroundImage: 'url(' + `${item.image_bg}` + ')' }}
            className={clsx(styles.mark, 'dflex', 'acenter', 'jcenter', 'cur')} key={item.id}>
            <div className={clsx(styles.glass, 'dflex', 'acenter', 'jcenter')}>
                <a href={item.src} rel='noreferrer' target='_blank'
                    onClick={(e) => isManagement ? e.preventDefault() : ''}
                    className={clsx('dflex', 'acenter', 'jcenter', 'flexcolumn', 'positionrelative')}>
                    <div className={clsx(styles.cardLogo, 'dflex', 'acenter')}>
                        <Image alt={'logo'} width={60} height={60} className={clsx(styles.cardImage, 'rounded')} src={item.logo!} />
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
                            <div className={clsx(styles.btn, styles.delete, 'dflex', 'acenter')} onClick={() => openDelete(item)}>
                                <DeleteOutlined className={clsx(styles.btnIcon, 'dflex', 'acenter')} />
                                <div className={clsx(styles.btnText, 'ml')}>移除</div>
                            </div>
                        ) : <></>
                    }
                </a>
            </div>
        </div>
    );
};

export default Card;
