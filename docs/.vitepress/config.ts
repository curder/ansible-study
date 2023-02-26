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
        logo: {light: "/images/light-logo.svg", dark: "/images/dark-logo.svg", alt: "Ansible Logo",},
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
            "guide/": sidebarInstall(),
        }
    }
});

function nav() {
    return [
        {text: '基础', link: '/guide/install', activeMatch: '/guide/*'},
    ];
}

function sidebarInstall() {
    const guide_prefix = "/guide";
    const module_prefix = `${guide_prefix}/modules`;

    return [
        {
            text: "基础",
            // collapsible: true,
            // collapsed: false,
            items: [
                {text: "安装", link: `${guide_prefix}/install`},
                {text: "主机清单", link: `${guide_prefix}/intro-inventory`},
                {text: "认证方式", link: `${guide_prefix}/verification-method`},
                {text: '命令颜色状态', link: `${guide_prefix}/command-color-types`},
                {text: "临时命令模式", link: `${guide_prefix}/ad-hoc`},
            ]
        },
        {
            text: "常用模块",
            items: [
                {text: "ping 模块", link: `${module_prefix}/ping`},
            ],
        }
    ];
}