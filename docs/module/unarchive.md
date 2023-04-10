# unarchive 模块

[unarchive 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/unarchive_module.html) 可以解压缩档案，但是它不会解压缩不包含存档的压缩文件。

默认情况下，它会在解包之前将源文件从本地复制到远程目标机器，可以指定 `remote_src=yes` 参数用于解压缩远程目标机器上已存在的存档。

## 常用参数

| 参数名          | 是否必须 | 参数类型      | 默认值     | 说明                                |
|--------------|------|-----------|---------|-----------------------------------|
| `src`        | 是    | `string`  |         | 要复制到目标服务器的存档文件的本地绝对的或相对的路径        |
| `dest`       | 是    | `string`  |         | 解压缩远程绝对路径，此路径必须存在，因为基本目录不由当前模块创建。 |
| `remote_src` | 否    | `boolean` | `false` | `true` 则表示存档文件已经在远程系统上，而不是本地文件。   |

更多参数可以使用命令 `ansible-doc -s unarchive` 获取更多使用相关的文档或者[查看官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/unarchive_module.html#parameters)。


## 一些示例

### 复制本地文件到远程并解压缩

将本地文件 `foo.tar.gz` 提取到远程目标机器上的 `/tmp/foo`。

```bash
ansible all -i src/inventory.yml -m shell -a "mkdir /tmp/foo" # 在远程目标机器上创建目录

ansible all -i src/inventory.yml -m unarchive -a "src=./foo.tar.gz dest=/tmp/foo" # 将本地文件复制到远程及其并解压缩

ansible all -i src/inventory.yml -m shell -a "ls /tmp/foo" # 查看远程目标机器上的目录
```

### 解压缩远程机器的压缩文件

将远程主机上的 `/tmp/bar.tar.gz` 解压缩到 `/tmp/bar`。

```bash
ansible all -i src/inventory.yml -m unarchive -a "src=/tmp/bar.tar.gz dest=/tmp/bar remote_src=true" # 解压缩远程机器的文件
```

### 下载文件并解压缩

下载 [Nginx 源码包](https://nginx.org/download/nginx-1.23.4.tar.gz)并解压缩到 `/tmp` 目录下。

```bash
ansible all -i src/inventory.yml -m unarchive -a "src=https://nginx.org/download/nginx-1.23.4.tar.gz dest=/tmp remote_src=true" # 解压缩从网上下载的Nginx压缩包
```