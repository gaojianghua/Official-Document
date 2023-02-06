import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/animate.css'
import '../styles/main.css'
import { StoreProvider } from 'store/index';
import Layout from 'components/Layout';
import { NextPage } from 'next';

interface IProps {
    initialValue: Record<any, any>
    Component: NextPage,
    pageProps: any
}

function MyApp({ initialValue, Component, pageProps }: IProps) {
    return (<StoreProvider initialValue={initialValue}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </StoreProvider>)
}

// MyApp.getInitialProps = async (ctx: any) => {
//   if (ctx.ctx.req) {
//       const { userId, nickname, avatar } = await ctx?.ctx.req.cookies
//       return {
//           initialValue: {
//               user: {
//                   userInfo: {
//                       userId,
//                       nickname,
//                       avatar
//                   }
//               }
//           }
//       }
//   }else {
//       const { userId, nickname, avatar } = document.cookie as any
//       return {
//           initialValue: {
//               user: {
//                   userInfo: {
//                       userId,
//                       nickname,
//                       avatar
//                   }
//               }
//           }
//       }
//   }
// }

export default MyApp
