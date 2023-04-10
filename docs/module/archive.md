# archive 模块

[archive 模块](https://docs.ansible.com/ansible/latest/collections/community/general/archive_module.html) 用于创建一个或多个文件或树的压缩存档。

## 常用参数

| 参数名             | 是否必须 | 参数类型                        | 默认值     | 说明                                                  |
|-----------------|------|-----------------------------|---------|-----------------------------------------------------|
| `path`          | 是    | `list`、`string`             |         | 要压缩或存档的一个或多个文件的远程绝对路径、glob 或路径列表或 glob。             |
| `dest`          | 是    | `string`                    |         | 目标存档的文件名，注意：父目录必须存在于远程主机上。                          |
| `remove`        | `否`  | `boolean`                   | `false` | 添加到存档后删除所有添加的源文件和树                                  |
| `format`        | 否    | `bz2`、`gz`、`tar`、`xz`、`zip` | `gz`    | 要使用的压缩类型                                            |
| `exclude_path`  | 否    | `list`、`string`             | `[]`    | 要从路径列表和 glob 扩展中排除的一个或多个文件的远程绝对路径、glob 或路径列表或 glob。 |
| `force_archive` | 否    | `boolean`                   | `false` | 允许强制模块将其视为存档，即使只指定了一个文件。                            | 

更多参数可以使用命令 `ansible-doc -s archive` 获取更多使用相关的文档或者[查看官方文档](https://docs.ansible.com/ansible/latest/collections/community/general/archive_module.html#parameters)。


## 一些示例

### 将指定目录压缩到指定文件

将目录 `/etc/` 压缩成 `/tmp/etc.tar.gz`。

```bash
ansible all -i src/inventory.yml -m archive -a "path=/etc/ dest=/tmp/etc.tar.gz"
```

### 压缩指定文件并删除

将文件 `/tmp/nginx-1.23.4` 压缩到 `/tmp/nginx.tar.gz` 并将源文件删除。

```bash
ansible all -i src/inventory.yml -m archive -a "path=/tmp/nginx-1.23.4 dest=/tmp/nginx.tar.gz remove=true"
```
> **注意：** 当传递 `remove=true` 参数后，源文件 `/tmp/nginx-1.23.4` 将再打包后被删除，**请注意文件的备份**。


### 创建一个 zip 存档

通过传递参数 `format=zip` 来指定打包的压缩格式为 `zip`。

```bash
ansible all -i src/inventory.yml -m archive -a "path=/tmp/nginx-1.23.4 dest=/tmp/nginx.zip format=zip"
```

### 创建包含多个文件的 bz2 存档

使用 [ad-hoc 模式](../guide/ad-hoc.md)可以通过`,` 区分多个文件的路径。

如果使用 playbook 模式可以通过传递列表的方式指定多个文件路径。

```bash
ansible all -i src/inventory.yml -m archive -a "path=/var/log,/tmp/nginx-1.23.4 dest=/tmp/nginx-1.23.4.zip format=bz2"
```

### 创建存档时排除特定的目录名

通过传递 `excelude_path` 参数指定排除的文件名。

```bash
ansible all -i src/inventory.yml -m archive -a "path=/var/log,/tmp/nginx-1.23.4 dest=/tmp/nginx-1.23.4.zip exclude_path=/var/log/secure*,/path/to/foo/baz format=bz2"
```

### 创建单个文件的 tar.gz 存档


```bash
ansible all -i src/inventory.yml -m archive -a "path=/etc/profile dest=/tmp/profile.tar.gz format=gz force_archive=true"
```