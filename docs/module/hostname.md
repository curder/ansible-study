# hostname 模块

[hostname 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/hostname_module.html)用于管理主机名。

hostname 模块支持大多数操作系统/发行版。

## 常用参数

| 参数名    | 是否必须 | 默认值 | 选项                                                                                                                     | 说明           |
|--------|------|-----|------------------------------------------------------------------------------------------------------------------------|--------------|
| `name` | 是    |     |                                                                                                                        | 主机名称         |
| `use`  | 否    |     | `alpine`、`debian`、`freebsd`、`generic`、`macos`、`macosx`、`darwin`、`openbsd`、`openrc`、`redhat`、`sles`、`solaris`、`systemd` | 使用指定策略来更新主机名 |


更多参数可以使用命令 `ansible-doc -s hostname` 获取更多使用相关的文档或者[查看官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/hostname_module.html)。

## 一些示例

### 设置主机名

```bash
ansible all -i src/inventory.yml -m hostname -a "name=centos"
```

### 设置主机名时指定策略
```bash
ansible all -i src/inventory.yml -m hostname -a "name=centos use=systemd"
```