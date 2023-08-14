import '../styles/globals.css';
import '../styles/main.css';
import { StoreProvider } from '@/store';
import Layout from 'components/Layout';
import { NextPage, NextPageContext } from 'next';
import { getClassList, getPublicKey } from '@/service/api';
import { Menu, Paging } from '@/types/res';

interface IProps {
    initialValue: Record<any, any>
    Component: NextPage,
    pageProps: any
}

function MyApp(props: IProps) {
    return (<StoreProvider initialValue={props.initialValue}>
        <Layout>
            <props.Component {...props.pageProps} initialValue={props.initialValue} />
        </Layout>
    </StoreProvider>);
}

MyApp.getInitialProps = async (ctx: NextPageContext) => {
    // @ts-ignore
    let index = ctx?.router.pathname.indexOf('admin');
    if (index > -1) return {};
    let res: any = await getClassList({
        page_num: 1,
        page_size: 20,
    } as Paging);
    let menu: Menu[] = [];
    if (res.code == 200) {
        res.data.list.forEach((item: Menu) => {
            if (item.router == '/home') {
                menu.unshift(item);
            } else {
                menu.push(item);
            }
        });
    }
    let publicKey: any = await getPublicKey();
    return {
        initialValue: {
            public: {
                publicData: {
                    menu,
                    serverPublicKey: publicKey.data.server_public_key,
                    isInit: true
                }
            }
        }
    }
}

export default MyApp;
