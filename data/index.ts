import { IUrls, IColumn } from 'types/global'

export const navs = [
    {
        label: '常用',
        value: '/',
    },
    {
        label: '前端',
        value: '/before',
    },
    {
        label: '后端',
        value: '/after',
    },
    {
        label: '其他',
        value: '/other',
    },
]

export const leftList = [
    {
        name: '生活工具集',
        url: 'https://www.zxgj.cn/'
    },
    {
        name: '工作工具集',
        url: 'https://tool.lu/'
    },
    {
        name: '开发者工具集',
        url: 'https://smalldev.tools/'
    },
    {
        name: '文件压缩',
        url: 'https://docsmall.com/'
    },
    {
        name: '文件格式转换',
        url: 'https://www.alltoall.net/'
    },
    {
        name: '中国色彩',
        url: 'http://zhongguose.com/'
    },
    {
        name: '极简插件',
        url: 'http://zhongguose.com/'
    },
    {
        name: 'CSS3动画',
        url: 'https://www.webhek.com/post/css3-animation-sniplet-collection'
    },
    {
        name: 'CSS动画库',
        url: 'http://www.animate.net.cn/'
    },
    {
        name: 'JS动画库',
        url: 'https://www.tweenmax.com.cn/'
    },
    {
        name: '思维导图',
        url: 'https://www.processon.com/'
    },
    {
        name: 'UI灵感站',
        url: 'https://collectui.com/challenges/sign-up'
    },
    {
        name: '资源总站',
        url: 'http://z007.ysepan.com/'
    },
    {
        name: '图片素材',
        url: 'https://www.pexels.com/zh-cn/'
    },
    {
        name: 'Lottie动画素材',
        url: 'https://app.lottiefiles.com/'
    },
    {
        name: '炫彩表情符号',
        url: 'https://www.emojiall.com/zh-hans/'
    },
    {
        name: '75CDN资源库',
        url: 'https://cdn.baomitu.com/'
    },
    {
        name: 'BootCDN资源库',
        url: 'https://www.bootcdn.cn/'
    },
    {
        name: '字体库',
        url: 'https://www.fonts.net.cn/'
    },
    {
        name: 'UI配色方案',
        url: 'https://colorhunt.co/'
    },

]

export const rightList = [
    {
        name: '蓝湖',
        url: 'https://lanhuapp.com/'
    },
    {
        name: '摹客',
        url: 'https://user.mockplus.cn/'
    },
    {
        name: '阿里字体图标',
        url: 'https://www.iconfont.cn/'
    },
    {
        name: '阿里云',
        url: 'https://account.aliyun.com/'
    },
    {
        name: '网易邮箱',
        url: 'https://mail.163.com/'
    },
    {
        name: '网易企业邮箱',
        url: 'https://ym.163.com/'
    },
    {
        name: '图标大全',
        url: 'https://icones.netlify.app/'
    },
    {
        name: '阮一峰博客',
        url: 'https://www.ruanyifeng.com/blog/javascript/'
    },
    {
        name: 'GO学习基地',
        url: 'https://luboke.com/'
    },
    {
        name: '网页UI素材',
        url: 'https://www.17sucai.com/'
    },
    {
        name: '高德开放平台',
        url: 'https://lbs.amap.com/'
    },
    {
        name: '微信公众平台',
        url: 'https://mp.weixin.qq.com/'
    },
    {
        name: '淘宝开放平台',
        url: 'https://login.taobao.com/'
    },
    {
        name: 'QQ互联平台',
        url: 'https://connect.qq.com/'
    },
    {
        name: '支付宝开放平台',
        url: 'https://open.alipay.com/'
    },
    {
        name: '开源中国',
        url: 'https://www.oschina.net/'
    },
    {
        name: '五百丁简历',
        url: 'https://www.500d.me/'
    },
    {
        name: '浏览器兼容查询',
        url: 'https://caniuse.com/'
    },
    {
        name: 'CSS技巧学习',
        url: 'https://css-tricks.com/'
    }
]

export const urls:IUrls[] = [
    {
        id: 1,
        label: 'Element-Plus',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/element-plus.png',
        url: 'https://element-plus.gitee.io/zh-CN/',
        check: false,
        mark_Id: 1,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/0f66fb2d-cc0e-4250-86d8-f538f8923282.jpg'
    },
    {
        id: 2,
        label: 'UView-UI',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/uview.png',
        url: 'https://www.uviewui.com/',
        check: false,
        mark_Id: 0,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/1638860249209163886024953.png'
    },
    {
        id: 3,
        label: 'Naive-UI',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/naive.svg',
        url: 'https://www.naiveui.com/zh-CN/light',
        check: false,
        mark_Id: 0,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/1638860258269163886025882.png'
    },
    {
        id: 4,
        label: 'Uni-App',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/uniapp.png',
        url: 'https://uniapp.dcloud.io/',
        check: false,
        mark_Id: 0,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/163886061589163886061597.png'
    },
    {
        id: 5,
        label: 'GitHub',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/github.png',
        url: 'https://github.com/',
        check: false,
        mark_Id: 0,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/1638860441238163886044153.jpg'
    },
    {
        id: 6,
        label: 'Vite',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/vite.svg',
        url: 'https://vitejs.cn/',
        check: false,
        mark_Id: 0,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/1c41e41a9594d932e34ce0be021bb0fc.jpg'
    },
    {
        id: 7,
        label: 'Vue-Use',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/vueuse.svg',
        url: 'https://vueuse.org/',
        check: false,
        mark_Id: 0,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/312d43eb0d23050cdafe7958c92a7970.jpg'
    },
    {
        id: 8,
        label: 'Ant-Design',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/antd.svg',
        url: 'https://ant-design.gitee.io/',
        check: false,
        mark_Id: 0,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/8581723f0e5a4095a2c54e6cf36419eb.jpg'
    },
    {
        id: 9,
        label: 'Nuxt',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/nuxt.png',
        url: 'https://www.nuxtjs.cn/',
        check: false,
        mark_Id: 2,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/917b5eacb410c7cd8cc2433e26113b7d.jpg'
    },
    {
        id: 10,
        label: 'Nest',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/nest.svg',
        url: 'https://nestjs.com/',
        check: false,
        mark_Id: 3,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/MNm5qORqme.jpg'
    },
    {
        id: 11,
        label: 'Next',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/next.png',
        url: 'https://www.nextjs.cn/',
        check: false,
        mark_Id: 4,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/bb33e4d813e26ea35aef55e7c9a8a9e2.jpg'
    },
    {
        id: 12,
        label: 'Vue',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/vue.png',
        url: 'https://v3.cn.vuejs.org/',
        check: false,
        mark_Id: 6,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/ced7813d880f11ebb6edd017c2d2eca2.jpg'
    },
    {
        id: 13,
        label: 'React',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/reactnative.svg',
        url: 'https://react.docschina.org/',
        check: false,
        mark_Id: 7,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/qK0YKJedXO.jpg'
    },
    {
        id: 14,
        label: 'React-Native',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/reactnative.svg',
        url: 'https://reactnative.cn/',
        check: false,
        mark_Id: 8,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/wallhaven-odddrp.jpg'
    },
    {
        id: 15,
        label: 'Flutter',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/flutter.png',
        url: 'https://flutter.cn/',
        check: false,
        mark_Id: 9,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/1638860249209163886024953.png'
    },
    {
        id: 16,
        label: 'Taro',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/taro.png',
        url: 'https://taro.jd.com/',
        check: false,
        mark_Id: 10,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/1638860258269163886025882.png'
    },
    {
        id: 17,
        label: '华为云OBS文档',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/%E5%8D%8E%E4%B8%BA.png',
        url: 'https://support.huaweicloud.com/obs/index.html',
        check: false,
        mark_Id: 0,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/1638860258269163886025882.png'
    }
];


export const PFrameWork:IUrls[] = [
    {
        id: 1,
        label: 'Vue',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/vue.png',
        url: 'https://v3.cn.vuejs.org/',
        check: false,
        isAdd: true,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/ced7813d880f11ebb6edd017c2d2eca2.jpg'
    },
    {
        id: 2,
        label: 'React',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/reactnative.svg',
        url: 'https://react.docschina.org/',
        check: false,
        isAdd: true,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/qK0YKJedXO.jpg'
    },
    {
        id: 3,
        label: 'Angular',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/angular.png',
        url: 'https://angular.cn/',
        check: false,
        isAdd: false,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/qK0YKJedXO.jpg'
    }
]

export const MFrameWork:IUrls[] = [
    {
        id: 1,
        label: 'Uni-App',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/uniapp.png',
        url: 'https://uniapp.dcloud.io/',
        check: false,
        isAdd: true,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/163886061589163886061597.png'
    },
    {
        id: 2,
        label: 'React-Native',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/reactnative.svg',
        url: 'https://react.docschina.org/',
        check: false,
        isAdd: true,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/qK0YKJedXO.jpg'
    },
    {
        id: 3,
        label: 'Flutter',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/flutter.png',
        url: 'https://flutter.cn/',
        check: false,
        isAdd: true,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/1638860249209163886024953.png'
    },
    {
        id: 4,
        label: 'Taro',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/taro.png',
        url: 'https://taro.jd.com/',
        check: false,
        isAdd: true,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/1638860258269163886025882.png'
    },
    {
        id: 5,
        label: 'Weex',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/weex.svg',
        url: 'http://emas.weex.io/zh/',
        check: false,
        isAdd: false,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/1638860258269163886025882.png'
    },
]


export const ImageURL:IUrls[] = [
    {
        id: 1,
        label: '图怪兽',
        logo: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/logo/tuguaishou.png',
        url: 'https://818ps.com/',
        check: false,
        isAdd: false,
        bg_img: 'https://official-document.oss-cn-hangzhou.aliyuncs.com/ced7813d880f11ebb6edd017c2d2eca2.jpg'
    }
]



// 前端
export const Before:IColumn[] = [
    {
        column_Id: 10,
        column_Name: '三大框架',
        column_Icon: 'DesktopOutlined',
        column_Data: PFrameWork
    },
    {
        column_Id: 11,
        column_Name: '移动端框架',
        column_Icon: 'MobileOutlined',
        column_Data: MFrameWork
    },
]


// UI
export const UI:IColumn[] = [
    {
        column_Id: 1,
        column_Name: '图片资源',
        column_Icon: 'FileImageOutlined',
        column_Data: ImageURL
    }
]