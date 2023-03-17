# user 模块

[user 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/user_module.html)管理用户帐户。

## 常用参数

| 参数名           | 参数类型      | 是否必填 | 可选值                         | 说明                          |
|---------------|-----------|------|-----------------------------|-----------------------------|
| `name`        | `string`  | 是    | *e.g.*`ubuntu`              | 创建用户的名称                     |
| `create_home` | `boolean` | 否    | **`true`**<br />`false`     | <small>是否为用户创建一个家目录</small> |
| `group`       | `string`  | 否    | *e.g.*`depops`              | 创建用户组                       |
| `password`    | `string`  |      | —                           | 创建用户的密码                     |
| `uid`         | `integer` | 否    | *e.g.*`1234`                | 创建用户的UID                    |
| `shell`       | `string`  | 否    | *e.g.*`/sbin/nologin`       | 用户登录的解释器                    |
| `state`       | `string`  | 否    | `absent`<br />**`present`** | 该帐户是否应该存在                   |
| `expires`     | `float`   | 否    | —                           | 账户过期时间                      |


更多参数可以使用命令 `ansible-doc -s user` 获取更多使用相关的文档或者[查看官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/user_module.html#parameters)。

## 一些示例

### 创建用户并指定uid

创建一个 `devops` 用户且设置 `uid` 为 `1234`。

使用到 user 模块的 `name` 和 `uid` 参数。

```bash
ansible all -i src/inventory.yml -m user -a "name=devops uid=1234"

# 查看用户和uid
ansible all -i src/inveotory.yml -m shell -a "id devops"
```

### 创建用户并不允许登录

创建一个 `deployer` 用户，设置 `uid` 和 `gid` 均为 `8888`，同时不创建家目录且不允许登录。

- 使用 **group** 模块创建 `deployer` 用户组并指定组id为 `8888`；使用到 `name` 和 `gid` 参数。

- 使用 **user** 模块创建 `deployer` 用户，指定用户组为 `deployer`，指定uid为 `8888`，不创建用户家目录且不允许登录；使用到 `name`、`group`、`uid`、`create_home` 和 `shell` 参数。


    ```bash
    ansible all -i src/inventory.yml -m group -a "name=deployer gid=8888"
    ansible all -i src/inventory.yml -m user -a "name=deployer group=deployer uid=8888 create_home=false shell=/sbin/nologin"

    # 查看用户和用户组信息
    ansible all -i src/inventory.yml -m shell -a "id deployer"
    ansible all -i src/inventory.yml -m shell -a "grep deployer /etc/passwd"
    ansible all -i src/inventory.yml -m shell -a "ls -ld /home/deployer"
    ```

### 删除用户

user 模块删除用户使用 `name`、`state` 和 `remove` 参数。

```bash
ansible all -i src/inventory.yml -m user -a "name=devops"

ansible all -i src/inventory.yml -m user -a "name=devops state=absent remove=true"
```

更多 user 模块的示例可以[查看官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/user_module.html#examples)。