import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import styles from './index.module.scss'
import clsx from 'clsx';
import { Card } from 'components/index'
import { FolderAddOutlined } from '@ant-design/icons'
import { Mark } from 'types/res';
import { getUserCardList, userCardDel } from '@/service/api';
import { message } from 'antd';

const Home: NextPage = () => {
  const store = useStore();
  const { isManagement, token } = store.public.publicData;
  const { success } = store.mark.markData;
  const [ cardArr, setCardArr ] = useState<Mark[]>([])
  useEffect(() => {
    if (token || success) {
      getUserCardListData()
    } else {
      setCardArr(() => [])
    }
  },[token, success])
  // 获取数据
  const getUserCardListData = async () => {
    let res: any = await getUserCardList()
    if (res.code == 200) {
        setCardArr(res.data)
        store.mark.setSuccess(false)
    }
  }
  // 增加一个新增印记的编辑框
  const addMarkBox = () => {
    store.public.setIsUpdateCard(false)
    store.public.setMaskComponentId(2)
    store.public.setIsAddAndEditor(1)
    store.public.setMaskShow(true)
  }
  // 打开编辑印记框
  const editorMark = (item: Mark) => {
    store.mark.setTmpMark(item)
    store.public.setIsUpdateCard(false)
    store.public.setMaskShow(true)
    store.public.setMaskComponentId(2)
    store.public.setIsAddAndEditor(2)
  }
  // 打开确定删除弹框
  const openDelete = (item: Mark) => {
    store.public.setMaskComponentId(7);
    store.model.setTitle('移除印记')
    store.model.setChildren(<div className={clsx('dflex', 'jcenter', 'acenter', 'textwhite')}>
      确定移除 {item.name} 吗？
    </div>)
    store.model.setConfirm(()=>{deleteMark(item.id!)})
    store.model.setCancel(()=>{store.public.setMaskShow(false)})
    store.public.setMaskShow(true);
  }
  // 移除印记
  const deleteMark = async (id: string)  => {
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
            <Card key={item.id} item={item} isManagement={isManagement} openDelete={openDelete} editorMark={editorMark}></Card>
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
