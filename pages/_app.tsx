import '../styles/globals.css';
import '../styles/animate.css';
import '../styles/main.css';
import { StoreProvider } from '@/store';
import Layout from 'components/Layout';
import { NextPage } from 'next';
import { getClassList, getPublicKey } from '@/service/api';
import { Menu } from '@/types/res';

interface IProps {
    initialValue: Record<any, any>
    Component: NextPage,
    pageProps: any
}

function MyApp({ initialValue, Component, pageProps }: IProps) {
    return (<StoreProvider initialValue={initialValue}>
        <Layout>
            <Component {...pageProps} initialValue={initialValue} />
        </Layout>
    </StoreProvider>);
}

MyApp.getInitialProps = async () => {
    let res: any = await getClassList();
    let menu: Menu[] = [];
    if (res.code == 200) {
        res.data.forEach((item: Menu) => {
            if (item.router == '/') {
                menu.unshift(item);
            } else {
                menu.push(item);
            }
        });
    }
    let publicKey: any = await getPublicKey()
    return {
        initialValue: {
            public: {
                publicData: {
                    menu,
                    publicKey: publicKey.data
                }
            }
        },
    };
};

export default MyApp;
