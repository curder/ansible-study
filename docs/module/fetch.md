# fetch 模块

[fetch 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/fetch_module.html)用于从远程节点获取文件，该模块的工作方式类似于 [copy 模块](copy.md)，但功能相反。

常用参数

| 参数名    | 是否必须 | 参数类型   | 说明                                                                                                                                 |
|--------|------|--------|------------------------------------------------------------------------------------------------------------------------------------|
| `src`  | 是    | string | 要获取的远程系统上的文件。<br />**注意：** 这必须是文件，而不是目录。                                                                                           |
| `dest` | 是    | string | 将文件保存到的目录<br/>例如目标目录是 `/backup`，主机 `host.example.com` 上名为 `/etc/profile` 的 `src` 文件将保存到 `/backup/host.example.com/etc/profile` 文件中 |

更多参数可以使用命令 `ansible-doc -s fetch` 获取更多使用相关的文档或者[查看官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/fetch_module.html)。

## 一些示例

### 从远程获取文件到本地

```bash
ansible all -i src/inventory.yml -m fetch -a "src=/etc/profile dest=/tmp/"
```

将远程文件 `/etc/profile` 文件同步到本地 `/tmp/` 目录下。