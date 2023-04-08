# package 模块

[package 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/package_module.html)管理目标服务器上的包而无需指定包管理器模块（如 [ansible.builtin.yum 模块](yum.md)、[ansible.builtin.apt](apt.md) 等）。

在管理不同操作系统的机器环境中使用起来很方便，而不必为每个包管理器创建特定的任务。

## 常用参数

| 参数      | 类型       | 是否必须 | 说明                        |
|---------|----------|------|---------------------------|
| `name`  | `string` | 是    | 带有版本的包名称或包说明符，例如 name-1.0 |
| `state` | `string` | 是    | 管理的软件包的状态                 |

更多参数可以使用命令 `ansible-doc -s package` 获取更多使用相关的文档或者[查看官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/package_module.html#parameters)。


## 一些示例

### 安装软件

使用 package 模块安装 `net-tools`，需要使用 `name` 和 `state=present` 参数。

```bash
ansible all -i src/inventory.yml -m package -a "name=net-tools state=present"

ansible all -i src/inventory.yml -m shell -a "ifconfig" # 查看安装情况
```

### 安装软件最新版本

使用 package 模块安装 `net-tools`，需要使用 `name` 和 `state=latest` 参数。

```bash
ansible all -i src/inventory.yml -m package -a "name=net-tools state=latest"

ansible all -i src/inventory.yml -m shell -a "ifconfig" # 查看安装情况
```

### 卸载软件

使用 package 模块卸载 `net-tools`，需要使用 `name` 和 `state=absent` 参数。

```bash
ansible all -i src/inventory.yml -m package -a "name=net-tools state=present" # 安装 net-tools 软件

ansible all -i src/inventory.yml -m package -a "name=net-tools state=absent" # 卸载 net-tools 软件

ansible all -i src/inventory.yml -m shell -a "ifconfig" # 查看安装情况
```