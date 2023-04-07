# apt 模块

[apt 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/apt_module.html) 用于在 `Debian` 或者 `Ubuntu` 上管理 apt 包。

## 常用参数

| 参数            | 可选值	                                                                            | 默认值	      | 说明                         |
|---------------|---------------------------------------------------------------------------------|-----------|----------------------------|
| `name`        | —                                                                               | —         | 带有版本的包名称或包说明符，例如 name=1.0  |
| `state`       | `None`<br />`absent`<br />`build-dep`<br />`latest`<br />`present`<br />`fixed` | `present` | 是否安装或删除包                   |

更多参数可以使用命令 `ansible-doc -s apt` 获取更多使用相关的文档或者[查看官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/apt_module.html#parameters)。

## 一些示例

### 安装软件

使用 apt 模块安装 `net-tools`，需要使用 `name` 和 `state=present` 参数。

```bash
ansible all -i src/inventory.yml -m apt -a "name=net-tools state=present"

ansible all -i src/inventory.yml -m shell -a "rpm -qa |grep net-tools" # 查看安装情况
```

### 安装软件最新版本

使用 apt 模块安装 `net-tools`，需要使用 `name` 和 `state=latest` 参数。

```bash
ansible all -i src/inventory.yml -m apt -a "name=net-tools state=latest"

ansible all -i src/inventory.yml -m shell -a "rpm -qa |grep net-tools" # 查看安装情况
```

### 卸载软件

使用 apt 模块卸载 `net-tools`，需要使用 `name` 和 `state=absent` 参数。

```bash
# 安装 net-tools 软件
ansible all -i src/inventory.yml -m apt -a "name=net-tools state=present"

# 卸载 net-tools 软件
ansible all -i src/inventory.yml -m apt -a "name=net-tools state=absent"

# 查看安装状态
ansible all -i src/inventory.yml -m shell -a "rpm -qa |grep net-tools"
```