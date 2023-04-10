import{_ as t,c as e,o as a,N as l}from"./chunks/framework.3e506893.js";const _=JSON.parse('{"title":"ansible 中的模块","description":"","frontmatter":{},"headers":[],"relativePath":"module/index.md","lastUpdated":1681143297000}'),r={name:"module/index.md"},n=l('<h1 id="ansible-中的模块" tabindex="-1">ansible 中的模块 <a class="header-anchor" href="#ansible-中的模块" aria-label="Permalink to &quot;ansible 中的模块&quot;">​</a></h1><p>ansible 中有许许多多的模块，通过不同的模块之间的配合来完成批量化的操作。</p><p>在官网文档中列举出了很多内建的模块，<a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/index.html" target="_blank" rel="noreferrer">查看这里</a>。</p><h2 id="常用模块列表" tabindex="-1">常用模块列表 <a class="header-anchor" href="#常用模块列表" aria-label="Permalink to &quot;常用模块列表&quot;">​</a></h2><table><thead><tr><th>常用模块</th><th>作用</th><th>文档地址</th></tr></thead><tbody><tr><td><a href="./ping.html">ping</a></td><td>检测目标机器是否存活</td><td><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/ping_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr><tr><td><a href="./command.html">command</a></td><td>执行简单命令，不支持特殊符号比如管道符</td><td><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/command_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr><tr><td><a href="./shell.html">shell</a></td><td>执行简单命令，支持特殊符号</td><td><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/shell_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr><tr><td><a href="./hostname.html">hostname</a></td><td>执行简单命令，支持特殊符号</td><td><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/hostname_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr><tr><td><a href="./copy.html">copy</a></td><td>批量分发文件</td><td><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/file_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr><tr><td><a href="./file.html">file</a></td><td>管理文件和文件属性</td><td><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/file_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr><tr><td><a href="./fetch.html">fetch</a></td><td>从远程节点获取文件</td><td><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/fetch_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr><tr><td><a href="./unarchive.html">unarchive</a></td><td>从本机复制存档后在远程节点解压缩存档</td><td><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/unarchive_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr><tr><td><a href="./archive.html">archive</a></td><td>从本机复制存档后在远程节点解压缩存档</td><td><a href="https://docs.ansible.com/ansible/latest/collections/community/general/archive_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr><tr><td><a href="./script.html">script</a></td><td>在远程节点上运行本地脚本</td><td><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/script_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr><tr><td><a href="./cron.html">cron</a></td><td>管理 cron.d 和 crontab 条目</td><td><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/cron_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr><tr><td><a href="./group.html">group</a></td><td>添加或删除用户组</td><td><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/group_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr><tr><td><a href="./user.html">user</a></td><td>管理用户帐户</td><td><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/user_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr><tr><td><a href="./yum.html">yum</a></td><td>在 CentOS 上使用 yum 包管理器管理包</td><td><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/yum_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr><tr><td><a href="./apt.html">apt</a></td><td>在 Debian/Ubuntu 上使用 apt 包管理器管理包</td><td><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/apt_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr><tr><td><a href="./package.html">package</a></td><td>通用操作系统包管理器</td><td><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/package_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr><tr><td><a href="./systemd.html">systemd</a></td><td>系统服务管理</td><td><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/systemd_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr><tr><td><a href="./service.html">service</a></td><td>管理服务</td><td><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/service_module.html" target="_blank" rel="noreferrer">官方文档地址</a></td></tr></tbody></table>',5),s=[n];function d(o,i,h,c,b,m){return a(),e("div",null,s)}const u=t(r,[["render",d]]);export{_ as __pageData,u as default};
