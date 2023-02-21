import type { NextPage } from 'next'
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import styles from './index.module.scss'
import { urls } from '@/data'
import clsx from 'clsx';
import { Card } from 'components/index'
import { FolderAddOutlined } from '@ant-design/icons'
import { IProps, IUrls } from "types/global";

// export async function getServerSideProps() {
//   return {
//       props: {
//         urlArr: urls,
//       },
//   };
// }

const Home: NextPage<IProps> = () => {
  const store = useStore();
  const { isManagement } = store.public.publicData;
  const [ urlArr, setUrlArr ] = useState<IUrls[]>(urls)
  // 增加一个新增印记的编辑框
  const addMarkBox = () => {
    store.public.setMaskShow(true)
    store.public.setMaskComponentId(2)
    store.public.setIsAddAndEditor(1)
  }
  // 打开编辑印记框
  const editorMark = (id: number) => {
    store.public.setMaskShow(true)
    store.public.setMaskComponentId(2)
    store.public.setIsAddAndEditor(2)
  }
  // 选中移除
  const checkSwitchF = (id: number)  => {
    urlArr.forEach((val: IUrls) => {
      if (val.id === id) {
        val.check = !val.check
      }
    })
    setUrlArr([...urlArr])
  }
  return (
    <>
      {
        urlArr?.map(item => (
            <Card key={item.id} item={item} isManagement={isManagement} checkSwitchF={checkSwitchF} editorMark={editorMark}></Card>
        ))
      }
      {
        isManagement ? (
          <div className={clsx(styles.addMark, 'dflex', 'acenter', 'jcenter', 'cur')} onClick={addMarkBox}>
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
