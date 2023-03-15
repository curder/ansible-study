# file 模块

[file 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/file_module.html) 用于管理文件和文件属性。

主要用于目标机器创建文件、目录，以及对目标机器上的文件、目录的权限进行修改。


## 常用参数

| 参数名       | 是否必须 | 默认值                                                               | 选项                                                                         | 说明                                                          |
|-----------|------|-------------------------------------------------------------------|----------------------------------------------------------------------------|-------------------------------------------------------------|
| `path`    | 是    |                                                                   |                                                                            | 远程被管理文件或目录的路径                                               |
| `src`     | 否    |                                                                   |                                                                            | 要链接到的文件的路径，只有在 `state=link` 或者 `state=hard` 时才有效            |
| `owner`   | 否    |                                                                   |                                                                            | 远程被管理的文件或者目录所属用户                                            |
| `group`   | 否    |                                                                   |                                                                            | 远程被管理的文件或者目录所属组                                             |
| `mode`    | 否    |                                                                   |                                                                            | 生成的文件系统对象应具有的权限，比如 `0644` 或者 `0600`                         |
| `recurse` | 否    | `false`                                                           | `true`<br /> `false`                                                       | 递归地在目录内容上设置指定的文件属性，仅允许当 `state=directory` 是使用               | 
| `state`   | 否    | <small>默认是文件的当前状态（如果存在）<br />如果 `recurse=yes` 则为目录，否则为文件。</small> | `absent`<br />`directory`<br />`file`<br />`hard`<br />`link`<br />`touch` | `directory` 创建目录<br />`link` 符号链接将被创建或更改<br />`touch` 创建空文件 |


更多参数可以使用命令 `ansible-doc -s file` 获取更多使用相关的文档或者[查看官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/file_module.html)。


## 一些示例

### 远程创建文件

使用 file 模块的 `state=touch` 和 `path` 参数。

```bash
ansible all -i src/inventory.yml -m file -a "path=/tmp/ansible-file.txt state=touch"

# 查看文件状态
ansible all -i src/inventory.yml -m shell -a "ls -l /tmp/ansible-file.txt"
```

### 远程创建目录

使用 file 模块的 `state=directory` 和 `path` 参数。

```bash
ansible all -i src/inventory.yml -m file -a "path=/tmp/ansible-file state=directory"

# 查看目录状态
ansible all -i src/inventory.yml -m shell -a "ls -ld /tmp/ansible-file*"
```

### 创建软连接

使用 file 模块在远程被管理的机器上指定源文件创建软连接。使用 `src`、`dest` 和 `state=link` 参数。

```bash
ansible all -i src/inventory.yml -m file -a "src=/etc/hosts dest=/tmp/hosts state=link"

# 查看文件状态
ansible all -i src/inventory.yml -m shell -a "ls -l /tmp/hosts"
```

> `src` 参数需要配合 `state=link` 或 `state=hard` 使用才能生效。



### 设定文件权限

使用 file 模块的 `state=touch`、`path`、`owner`、`group` 和 `mode` 参数。

```bash
ansible all -i src/inventory.yml -m file -a "path=/tmp/ansible-file.txt state=touch owner=www group=www mode=0777" # 注意需要保证 www 用户和用户组在远程服务器上存在

# 查看文件状态
ansible all -i src/inventory.yml -m shell -a "ls -ld /tmp/ansible-file*"
```

- `owner` 修改文件或目录属主
- `group` 修改文件或目录属组
- `mode`  修改文件或目录权限