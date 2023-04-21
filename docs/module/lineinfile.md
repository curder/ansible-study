# lineinfile 模块

[lineinfile 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/lineinfile_module.html)用于管理文本文件中的行。

该模块用于确保一个特定的行在一个文件中或者使用一个正则表达式替换一个现有的行。

- 如果想要改变文件中相似的多行，可以使用 replace 模块。
- 如果想要插入、更新、删除一个行块，可以使用 blockinfile 模块。

## 常用参数

| 参数名	      | 是否必须 | 参数类型            | 默认值       | 说明                                                                                               |
|-----------|------|-----------------|-----------|--------------------------------------------------------------------------------------------------|
| `path`    | 必须   | `path`/`string` |           | 要修改的文件，也可以使用 `dest`、`destfile`、`name`                                                            |
| `regexp`  | 否    | `string`        |           | 用于搜索文件中的每一行的正则表达式。对于 `state=present` 所匹配的行中的最后一行会被替换；对于 `state=present` 会删除所有匹配的行                |
| `state`   | 否    | `string`        | `present` | 用于设置 新增或替换一行，还是删除行                                                                               |
| `group`   | 否    | `string`        |           | 设置文件/目录的所属组                                                                                      |
| `owner`   | 否    | `string`        |           | 设置文件/目录的所属                                                                                       |
| `line`    | 否    | `string`        |           | 要插入或者替换的行。如果设置了backrefs参数，那么line中可以包含位置分组或命名分组，lineinfile模块会使用regexp捕获的分组填充它们                    |
| `mode`    | 否    |                 |           | 设置文件权限，模式实际上是八进制数字（如`0644`），少了前面的零可能会有意想不到的结果。从版本1.8开始，可以将模式指定为符号模式（例如 `u+rwx` 或 `u=rw,g=r,o=r`） |
| `create`	 | 否    | `boolean`       | `no`      | 与state=present一起使用。如果指定了这个参数，当要修改的文件不存在的时候，会创建它。否则会报错。                                           | 

更多参数可以使用命令 `ansible-doc -s lineinfile` 获取更多使用相关的文档或者[查看官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/lineinfile_module.html#parameters)。

## 一些示例

### 文件存在则添加行

往 `/etc/hosts` 里添加一行 `127.0.0.1 curder.com`（多次执行，不会重复添加），示例如下：

```bash
ansible all -i src/inventory.yml -m lineinfile -a "path=/etc/hosts line='127.0.0.1 curder.com'"
```

### 修改匹配行 

确保 SELinux 设置为禁用模式

```bash
ansible all -i src/inventory.yml -m lineinfile -a "path=/etc/selinux/config regexp='^SELINUX=' line=SELINUX=disabled"
```

### 删除匹配行 
确保 wheel 组不在 sudoers 配置中

```bash
ansible all -i src/inventory.yml -m lineinfile -a "path=/etc/sudoers regexp='^%wheel' state=absent"
```

### 匹配行前或后添加内容

假如有 `/etc/httpd.conf` 文件内容如下：

```txt
Listen 127.0.0.1:80
Listen 80
Port
```

#### 在匹配行前添加行

在文件的 `Listen 80` 前面添加一行 `Listen 8080`，示例如下：

```bash
ansible all -i src/inventory.yml -m lineinfile -a "path=/etc/httpd.conf insertbefore='Listen 80' line='Listen 8080'"
```


#### 在匹配行后添加

在 `Port` 后面添加一行 `just for test.`，示例如下：

```bash
ansible all -i src/inventory.yml -m lineinfile -a "path=/etc/httpd.conf insertafter='Port' line='just for test.'"
```

### 修改文件内容及权限

假如服务器上 `/etc/hosts` 文件内容如下：

```txt
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
```

将以 `127.0.0.1` 开头的行替换为 `127.0.0.1 localhost`，并将文件的属主和属组都修改为 `root`，权限改为 `644`，如下：

```bash
ansible all -i src/inventory.yml -m lineinfile -a "path=/etc/hosts regexp='^127\.0\.0\.1' line='127.0.0.1 localhost' owner=root group=root mode='0644'"
```

### 删除一行内容

假如服务器上 `/etc/hosts` 文件内容如下：

```txt
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
```

删除以 `::1` 开头的行：

```bash
ansible all -i src/inventory.yml -m lineinfile -a "path=/etc/hosts regexp='^::1' state=absent"
```


### 存在匹配行时修改否则添加

示例原文件 `/tmp/test.txt` 内容如下：

```txt
# %wheel   ALL=(ALL)   ALL
```

匹配以 `%wheel` 开头的行，匹配到，则执行替换，未匹配，则添加。因为原文件中，没有以 `%wheel` 开头的行，所以会添加一行：

```bash
ansible all -i src/inventory.yml -m lineinfile -a "path=/tmp/test.txt regexp='^%wheel' line='%wheel  ALL=(ALL)       NOPASSWD: ALL'"
```

执行完上面的命令后，得到修改后的文件是：

```txt
# %wheel  ALL=(ALL)       NOPASSWD: ALL
%wheel  ALL=(ALL)       NOPASSWD: ALL
```