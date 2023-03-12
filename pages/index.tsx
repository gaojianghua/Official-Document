import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import styles from './index.module.scss'
import clsx from 'clsx';
import { Card } from 'components/index'
import { FolderAddOutlined } from '@ant-design/icons'
import { Mark } from 'types/res';
import { getCardLinks, userCardDel } from '@/service/api';
import { message } from 'antd';

const Home: NextPage = () => {
  const store = useStore();
  const { isManagement, token } = store.public.publicData;
  const { success } = store.mark.markData;
  const [ cardArr, setCardArr ] = useState<Mark[]>([])
  useEffect(() => {
    if (token || success) {
      getUserCard()
    } else {
      setCardArr(() => [])
    }
  },[token, success])
  // 获取数据
  const getUserCard = async () => {
    let res: any = await getCardLinks()
    if (res.code == 200) {
        setCardArr(res.data)
        store.mark.setSuccess(false)
    }
  }
  // 增加一个新增印记的编辑框
  const addMarkBox = () => {
    store.public.setMaskShow(true)
    store.public.setMaskComponentId(2)
    store.public.setIsAddAndEditor(1)
  }
  // 打开编辑印记框
  const editorMark = (item: Mark) => {
    store.mark.setTmpMark(item)
    store.public.setMaskShow(true)
    store.public.setMaskComponentId(2)
    store.public.setIsAddAndEditor(2)
  }
  // 移除印记
  const deleteMark = async (id: number)  => {
    let arr = cardArr
    let res: any = await userCardDel({id: String(id)})
    if (res.code == 200) {
      arr.forEach((val: Mark, i: number) => {
        if (val.id == String(id)) {
          arr.splice(i, 1)
        }
      })
      setCardArr([...arr])
      message.success('移除成功')
    }
  }
  return (
    <>
      {
        cardArr?.map(item => (
            <Card key={item.id} item={item} isManagement={isManagement} deleteMark={deleteMark} editorMark={editorMark}></Card>
        ))
      }
      {
        isManagement ? (
          <div className={clsx(styles.addMark, 'dflex', 'acenter', 'jcenter', 'cur', cardArr.length <= 5 ? 'mt0' : '')} onClick={addMarkBox}>
            <div className={clsx(styles.addMarkCont, 'dflex', 'acenter', 'jcenter', 'flexcolumn')}>
              <FolderAddOutlined className={clsx(styles.addMarkIcon)} />
              <div className={clsx(styles.text, 'mt1', 'fontdr')}>{'新增自定义印记'}</div>
            </div>
          </div>
        ) : <></>
      }
    </>
  )
}

export default observer(Home)
