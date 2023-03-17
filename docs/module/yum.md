# yum 模块

[yum 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/yum_module.html) 是使用 yum 包管理器管理软件的模块，也就是在远程主机上执行 yum 命令，比如安装，升级，降级，删除和列出软件包和组。

## 常用参数

| 参数            | 可选值	                                                                              | 默认值	   | 说明                         |
|---------------|-----------------------------------------------------------------------------------|--------|----------------------------|
| `name`        | —                                                                                 | —      | 带有版本的包名称或包说明符，例如 name-1.0  |
| `state`       | `None`<br />`absent`<br />`installed`<br />`latest`<br />`present`<br />`removed` | `None` | 是否安装或删除包                   |
| `enablerepo`  | —                                                                                 | —      | 需要启用的存储库，如果有多个存储库，使用英文逗号分隔 |
| `disablerepo` | —                                                                                 | —      | 禁用指定存储库，如果有多个存储库，使用英文逗号分隔  |


更多参数可以使用命令 `ansible-doc -s yum` 获取更多使用相关的文档或者[查看官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/yum_module.html)。


## 一些示例

### 安装软件

使用 yum 模块安装 `net-tools`，需要使用 `name` 和 `state` 参数。

```bash
ansible all -i src/inventory.yml -m yum -a "name=net-tools state=installed"

# 查看安装状态
ansible all -i src/inventory.yml -m shell -a "rpm -qa |grep net-tools"
```

### 安装软件最新版本

使用 yum 模块安装 `net-tools`，需要使用 `name` 和 `state=latest` 参数。

```bash
ansible all -i src/inventory.yml -m yum -a "name=net-tools state=latest"

# 查看安装状态
ansible all -i src/inventory.yml -m shell -a "rpm -qa |grep net-tools"
```


### 卸载软件

使用 yum 模块卸载 `net-tools`，需要使用 `name` 和 `state` 参数。

```bash
# 安装 net-tools 软件
ansible all -i src/inventory.yml -m yum -a "name=net-tools state=latest"

# 卸载 net-tools 软件
ansible all -i src/inventory.yml -m yum -a "name=net-tools state=absent"

# 查看安装状态
ansible all -i src/inventory.yml -m shell -a "rpm -qa |grep net-tools"
```

