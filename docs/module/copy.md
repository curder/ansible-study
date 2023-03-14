# copy 模块

[copy 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/copy_module.html#ansible-collections-ansible-builtin-copy-module)
是远程推送数据模块，只能将数据推送到远程主机节点。无法拉取数据到本地。

## 常用参数

| 参数名 | 是否必须 | 默认值 | 选项 | 说明 |
|---------|--|-----|-----|----|
| **`src`** | 否 | | | <small>用于定位ansible执行的机器上的文件，需要使用绝对路径。<br /> 如果拷贝的是文件夹，那么文件夹会整体拷贝。<br />如果结尾是`/`,那么只有文件夹内的东西被拷贝。</small> |
| **`content`** | 否 | | | 用于代替 `src`，用于指定文件的内容，拷贝到远程主机。|
| **`dest`** | 是 | | | <small>用于定位远程节点上的文件，需要绝对路径。<br />如果 `src` 指向的是文件夹，这个参数也必须是指向文件夹。</small> |
| **`backup`** | 否 | 否 | `true/false` | 备份远程节点上的原始文件，在拷贝之前。如果发生什么意外，原始文件还能使用。 |
| **`directory_mode`** | 否 | | | <small>进行递归复制时，设置目录的模式。<br /> 如果未设置，将使用系统默认值。<br />只对新创建的目录设置，不影响已经存在的目录。</small> |
| **`follow`** | 否 | 否 | `true/false` | 当拷贝的文件夹内有链接存在的时候，那么拷贝过去的也会有链接 |
| **`force`** | 否 | `true` | `true/false` | <small>默认为 `true` 会覆盖远程的内容不一样的文件（可能文件名一样）。<br />如果是 `false`，远程存在这个文件就不会拷贝</small> |
| **`group`** | 否 | | | 设定一个群组拥有拷贝到远程节点的文件权限 |
| **`mode`** | 否 | | | 等同于 `chmod` 命令参数，可以配置成 `u+rwx` 或者 `u=rw,g=r,o=r` |
| **`owner`** | 否 | | | 设定一个用户拥有拷贝到远程节点的文件权限 |

更多参数可以使用命令 `ansible-doc -s copy` 获取更多使用相关的文档或者[查看官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/copy_module.html#parameters)。

## 一些示例

### 发送文件

```bash
# 新建一个文件
echo 'hello world!' > /tmp/ansible-copy.txt 

# 发送 /tmp/ansible-copy.txt 文件
ansible all -i src/inventory.yml -m copy -a "src=/tmp/ansible-copy.txt dest=/tmp/"

# 查看拷贝的文件
ansible all -i src/inventory.yml -m shell -a "ls -l /tmp/ansible-copy.txt"
```

> `ansible` 模块记录了文件属性，文件md5值，得到了文件的唯一校验值，判断文件的内容是否变化，如果没有变化则不做处理，提升批量管理的效率。

### 指定文件属性

将权限修改为 **600**，文件属主修改为 `www`（保证在远程机器存在这个 `www` 用户）

```bash
# 新建 www 用户
ansible all -i src/inventory.yml -m shell -a "useradd www"

# 新建一个文件
echo 'hello world!' > /tmp/ansible-copy.txt 

# 发送 /tmp/ansible-copy.txt 文件
ansible all -i src/inventory.yml -m copy -a "src=/tmp/ansible-copy.txt dest=/tmp/ group=www owner=www mode=600"

# 查看拷贝的文件
ansible all -i src/inventory.yml -m shell -a "ls -l /tmp/ansible-copy.txt"
```

### 备份文件

使用 `backup` 参数防止覆盖远程服务器文件，提前备份目标机器文件。

```bash
# 新建一个文件
echo 'hello world!' > /tmp/ansible-copy.txt 

# 发送 /tmp/ansible-copy.txt 文件
ansible all -i src/inventory.yml -m copy -a "src=/tmp/ansible-copy.txt dest=/tmp/"

# 修改文件内容
echo 'hi world' >> /tmp/ansible-copy.txt

# 拷贝文件时添加备份
ansible all -i src/inventory.yml -m copy -a "src=/tmp/ansible-copy.txt dest=/tmp/ backup=true"
```

### 直接传递内容

```bash
ansible all -i src/inventory.yml -m copy -a "content='hi curder' dest=/tmp/ansible-copy.txt"

# 查看内容
ansible all -i src/inventory.yml -m shell -a "cat /tmp/ansible-copy.txt"
```

> 不需要提供源文件，而直接使用字符串传递到远程服务器，建议添加 `backup=true` 参数。