import {defineConfig} from 'vitepress'

export default defineConfig({
    lang: "zh-CN",
    base: "/ansible-study/",
    title: "Ansible 学习",
    description: "Ansible 学习记录",
    lastUpdated: true,
    head: [
        ['link', {rel: 'icon', href: '/ansible-study/images/favicon.ico'}],
    ],
    themeConfig: {
        logo: {
            light: "/images/light-logo.svg",
            dark: "/images/dark-logo.svg",
            alt: "Ansible Logo",
        },
        siteTitle: "Ansible学习",
        outline: {
            label: "章节导航",
            level: 'deep',
        },
        lastUpdatedText: "最后更新时间",
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        editLink: {
            pattern: "https://github.com/curder/ansible-study/edit/master/docs/:path",
            text: '编辑它'
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/curder/ansible-study'}
        ],
        nav: nav(),
        sidebar: {
            //
        }
    }
});

function nav() {
    return [
       //
    ];
}

function sidebarInstall() {
    return [
        {
            text: "安装",
            // collapsible: true,
            // collapsed: false,
            items: [
                {text: "安装", link: "/guide/install"},
            ]
        },
    ];
}