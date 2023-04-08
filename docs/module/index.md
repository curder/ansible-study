# ansible 中的模块

ansible 中有许许多多的模块，通过不同的模块之间的配合来完成批量化的操作。

在官网文档中列举出了很多内建的模块，[查看这里](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/index.html)。

## 常用模块列表

| 常用模块                     | 作用                                | 文档地址                                                                                              |
|--------------------------|-----------------------------------|---------------------------------------------------------------------------------------------------|
| [ping 模块](ping.md)       | 检测目标机器是否存活                        | [官方文档地址](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/ping_module.html)    |
| [command 模块](command.md) | 执行简单命令，不支持特殊符号比如管道符               | [官方文档地址](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/command_module.html) |
| [shell 模块](shell.md)     | 执行简单命令，支持特殊符号                     | [官方文档地址](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/shell_module.html)   |
| [copy 模块](copy.md)       | 批量分发文件                            | [官方文档地址](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/file_module.html)    |
| [file 模块](file.md)       | 管理文件和文件属性                         | [官方文档地址](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/file_module.html)    |
| [script 模块](script.md)   | 在远程节点上运行本地脚本                      | [官方文档地址](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/script_module.html)  |
| [cron 定时任务模块](cron.md)   | 管理 cron.d 和 crontab 条目            | [官方文档地址](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/cron_module.html)    |
| [group 模块](group.md)     | 添加或删除用户组                          | [官方文档地址](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/group_module.html)   |
| [user 用户模块](user.md)     | 管理用户帐户                            | [官方文档地址](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/user_module.html)    |
| [yum 模块](yum.md)         | 使用 yum 包管理器管理包                    | [官方文档地址](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/yum_module.html)     |
| [apt 模块](apt.md)         | 在 Debian/Ubuntu 机器上使用 apt 包管理器管理包 | [官方文档地址](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/apt_module.html)     |
| [package 模块](package.md) | 通用操作系统包管理器                        | [官方文档地址](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/package_module.html) |
| [systemd 模块](systemd.md) | 系统服务管理                            | [官方文档地址](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/systemd_module.html) |
| [service 模块](service.md) | 管理服务                              | [官方文档地址](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/service_module.html) |
