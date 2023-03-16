# group 模块

[group 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/group_module.html)用户添加或删除用户组。

## 常用参数

| 参数名      | 默认值       | 可选参数                    | 说明                      |
|----------|-----------|-------------------------|-------------------------|
| `name`   | `否`       |                         | 待创建用户组的名称               |
| `gid`    |           |                         | 组的 `GID`                |
| `state`  | `present` | `present`<br />`absent` | 移除`absent`或创建`present`组 |
| `system` | `false`   | `false`<br />`true`     | 创建的组是否为系统组              |


更多参数可以使用命令 `ansible-doc -s group` 获取更多使用相关的文档或者[查看官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/group_module.html#parameters)。

## 一些示例

### 创建tmp组并指定组ID为1234

需要使用到 group 模块的 `name` 和 `gid` 参数。

```bash
ansible all -i src/inventory.yml -m group -a "name=tmp gid=1234"

# 查看效果
ansible all -i src/inventory.yml -a "tail /etc/group"
```

### 删除组

需要使用到 group 模块的 `name`、`gid` 和 `state=absent` 参数。

```bash
ansible all -i src/inventory.yml -m group -a "name=tmp gid=1234 state=absent"

# 查看效果
ansible all -i src/inventory.yml -a "tail /etc/group"
```