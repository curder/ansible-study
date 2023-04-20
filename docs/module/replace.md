# replace 模块

[replace 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/replace_module.html) 有点类似于 Linux 的 `sed` 命令，主要也是基于正则进行匹配和替换。

## 常用参数

| 参数名          | 是否必须 | 参数类型      | 默认值     | 说明                                               |
|--------------|------|-----------|---------|--------------------------------------------------|
| `path`       | 是    | `string`  |         | 指定要修改的文件                                         |
| `regexp`     | 是    | `string`  |         | 指定一个正则表达式，可以是 python 正则                          |
| `replace`    | 否    | `string`  |         | 替换 `regexp` 参数匹配到的字符串                            |
| `owner`      | 否    | `string`  |         | 修改文件或目录的所属用户，相当于 `chown` 命令修改                    |
| `group`      | 否    | `string`  |         | 修改文件或目录的所属组名，相当于 `chown` 命令修改                    | 
| `mode`       | 否    | `any`     |         | 修改文件或目录的权限，与chmod命令不一致的是，replace模块的mode参数需要添加前导零 |
| `others`     | 否    | `string`  |         | 指定 `file` 模块的所有参数                                | 
| `encoding`   | 否    | `string`  |         | 用于读取和写入文件的字符编码                                   |
| `before`     | 否    | `string`  |         | 如果指定，则仅替换/删除此匹配之前的内容，可以和after参数结合使用              |
| `after`      | 否    | `string`  |         | 如果指定，则仅替换/删除此匹配之后的内容，可以和before参数结合使用             |
| `attributes` | 否    | `string`  |         | 指定文件或目录的特殊属性，相当 `chattr`，默认使用=运算符，指定文件或目录的某项属性   |
| `backup`     | 否    | `boolean` | `false` | 修改源文件前创建一个包含时间戳信息的备份文件                           |

更多参数可以使用命令 `ansible-doc -s replace` 获取更多使用相关的文档或者[查看官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/replace_module.html#parameters)。


## 一些示例

### 用新主机名替换旧主机名

替换 `/etc/hosts` 文件中的 `old.host.name` 为 `new.host.name`。

```bash
ansible all -i src/inventory.yml -m replace -a "path=/etc/hosts regexp='(\s+)old\.host\.name(\s+.*)?$' replace='\1new.host.name\2'"
```