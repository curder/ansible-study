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
            "module/": sidebarModule(),
        }
    }
});


function nav() {
    return [
        {text: '基础', link: `/guide/install`, activeMatch: `guide/*`},
        {text: '常见模块', link: `/module/index`, activeMatch: `module/*`},
    ];
}

function sidebarInstall(prefix="/guide") {
    return [
        {
            text: "基础",
            // collapsible: true,
            // collapsed: false,
            items: [
                {text: "安装", link: `${prefix}/install`},
                {text: "主机清单", link: `${prefix}/intro-inventory`},
                {text: "认证方式", link: `${prefix}/verification-method`},
                {text: '命令颜色状态', link: `${prefix}/command-color-types`},
                {text: "临时命令模式", link: `${prefix}/ad-hoc`},
            ]
        },
    ];
}


function sidebarModule(prefix='/module') {
    return [
        {
            text: "",
            items: [
                {text: "ping 模块", link: `${prefix}/ping`},
                {text: "command 模块", link: `${prefix}/command`},
                {text: "shell 模块", link: `${prefix}/shell`},
                {text: "copy 模块", link: `${prefix}/copy`},
                {text: "file 模块", link: `${prefix}/file`},
                {text: "script 模块", link: `${prefix}/script`},
                {text: "cron 定时任务", link: `${prefix}/cron`},
                {text: "group 模块", link: `${prefix}/group`},
                {text: "user 模块", link: `${prefix}/user`},
            ],
        }
    ];
}