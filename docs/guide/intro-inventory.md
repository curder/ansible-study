# 主机清单

主机清单是一个包含主机和组列表的文件，默认位置是 `/etc/ansible/hosts`，可以在命令行中使用选项或在配置中使用 `-i <path>` 指定不同的清单文件。

## 主机清单基础

主机清单的内容由格式、主机和组所组成。

可以使用多种格式中任意选择一种格式来创建清单文件，具体取决于使用的[主机清单插件](https://docs.ansible.com/ansible/latest/plugins/inventory.html#inventory-plugins)。

最常见的格式是 `ini` 和 `yaml`。比如：

::: code-group 主机清单格式
```ini [ini格式]
mail.example.com

# 括号中的标题是组名，用于对主机进行分类并决定在什么时间以及出于什么目的控制哪些主机。
# 组名不能以数字开头，也不能使用除 _ 以外的其他符号，比如不能使用 - 等
[web_servers]
foo.example.com
192.168.1.1

[db_servers]
one.example.com
two.example.com
ww[1:3].example.com
```

```yaml [yaml格式]
ungrouped:
  hosts:
    mail.example.com:

web_servers:
  hosts:
    foo.example.com:
    192.168.1.1:
db_servers:
  hosts:
    one.example.com:
    two.example.com:
    ww[1:3].example.com:
```
:::

以上定义的主机清单文件中包含有 `ungrouped`、`all`、`web_servers` 和 `db_servers` 组。其中`ungrouped` 和 `all` 组是 ansible 默认创建的组。

### 默认组

即使没有在清单文件中定义任何组，Ansible 也会创建两个默认组：`all` 和 `ungrouped`。

- `all`组包含每个主机
- `ungrouped` 组包含除了 `all` 之外没有其他组的所有主机

每个主机将始终属于至少 2 个组（`all` 和 `ungrouped` 或 `all` 以及自定义的组）。

例如上面的主机清单中，主机 `mail.example.com` 属于 `all` 组和 `ungrouped` 组，主机 `foo.example.com` 属于 `all` 组和 `db_servers` 组。

尽管 `all` 和 `ungrouped` 始终存在，但它们是隐式的。

### 多组主机

在编写主机清单配置时，根据业务可以且可能会将同一个主机放在多个组中，比如根据主机包含的业务（What），主机存放的区域（Where），主机资源阶段（When）比如标记为开发阶段避免对线上资源进行测试。

扩展前面的 yaml 主机清单，包括内容、时间和地点：

```yaml {15-30}
ungrouped:
  hosts:
    mail.example.com:

web_servers:
  hosts:
    foo.example.com:
    192.168.1.1:
db_servers:
  hosts:
    one.example.com:
    two.example.com:
    ww[1:10].example.com:

singapore:
  hosts:
    foo.example.com:
    ww[1:10].example.com:
hongkong:
  hosts:
    one.example.com:
    two.example.com:
prod:
  hosts:
    foo.example.com:
    ww[1:10].example.com:
test:
  hosts:
    one.example.com:
    two.example.com:
```

可以看到 `one.example.com` 主机存在于 `db_servers`、`test`、和 `hongkong`组中。

### 父/子组关系

可以在组之间创建父/子关系。父组也称为嵌套组或组的组。

为组创建父/子关系：

- 在 `ini` 格式中，使用 `:children` 后缀
- 在 `yaml` 格式中，使用 `children:` 条目

```yaml {24-25,27-28}
ungrouped:
  hosts:
    mail.example.com:

web_servers:
  hosts:
    foo.example.com:
    192.168.1.1:
db_servers:
  hosts:
    one.example.com:
    two.example.com:
    ww[1:10].example.com:

singapore:
  hosts:
    foo.example.com:
    ww[1:10].example.com:
hongkong:
  hosts:
    one.example.com:
    two.example.com:
prod:
  children:
    singapore:
test:
  children:
    hongkong:
```
子组有几个属性需要注意：

- 作为子组成员的任何主机自动成为父组的成员。
- 组可以有多个父子，但不能有循环关系。
- 主机也可以在多个组中，但在运行时只会有一个主机实例。Ansible 合并来自多个组的数据。

### 添加主机范围

如果有很多具有相似模式的主机，可以将它们添加为一个范围而不是单独列出每个主机名：

:::code-group
```ini
[web_servers]
www[1:5].example.com
```

```yaml
web_servers:
  hosts:
    www[1:5].example.com
```
:::

在定义主机的序列范围时，同时可以指定步幅（序列号之间的增量）：

::: code-group
```ini [ini 格式主机清单]
[webservers]
www[1:5:2].example.com
```

```yaml [yaml 格式主机清单]
web_servers:
  hosts:
    www[1:5:2].example.com
```
:::

上面的示例将使子域 `www1`、`www3`、`www5`匹配，但不匹配 `www0`、`www2`，因为步幅（增量）是每步 2 个单位。

对于数字模式，可以根据需要包含或删除前导零。还可以定义字母范围：

:::code-group

```ini
[databases]
db-[a:f].example.com
```

```yaml
databases:
  hosts:
    db-[a:f].example.com
```
:::

## 传递多个主机清单源

可以通过从命令行提供多个清单参数或通过配置文件来同时定位多个主机清单源（目录、动态清单脚本或清单插件支持的文件），比如对生成和测试环境同时执行某项命令。

```bash
ansible all -i src/stage.yml -i src/prod.yml -m ping
```

> 这样的做法能将不同环境的主机清单记录到不同的配置文件中

## 变量

Ansible 可以在主机清单中存储与特定主机或组相关的变量值，方便对不同的主机进行配置。

### 主机变量

在主机清单中可以轻松的将变量分配给单个主机，比如：

::: code-group
```ini
[web]
host1 http_port=80 maxRequestsPerChild=808
host2 http_port=443 maxRequestsPerChild=909
```

```yaml
web:
  hosts:
    host1:
      http_port: 80
      maxRequestsPreChild: 808
    host2:
      http_port: 443
      maxRequestsPreChild: 909
```
:::

以上针对不同的主机配置了指定的 `http_port` 和 `maxRequestsPreChild` 变量。

SSH连接的变量也可以作为宿主变量使用：

```ini
[web]
ubuntu ansible_connection=ssh ansible_host=ubuntu ansible_port=22 ansible_user=root ansible_ssh_private_key_file=~/.ssh/id_rsa
centos ansible_connection=ssh ansible_host=centos ansible_port=22 ansible_user=root ansible_ssh_private_key_file=~/.ssh/id_rsa
```

[更多 ansible 连接参数配置查看这里](https://docs.ansible.com/ansible/latest/inventory_guide/intro_inventory.html?q=ansible_connection&check_keywords=yes&area=default#connecting-to-hosts-behavioral-inventory-parameters)

#### 主机别名

可以使用主机变量在清单中定义别名，比如下面的示例将主机定义一个别名 **`jumper`**

::: code-group
```ini
jumper ansible_port=22 ansible_host=127.0.0.1
```

```yaml
ungrouped:
  hosts:
    jumper:
      ansible_port: 22
      ansible_host: 127.0.0.1
```
:::

### 组变量

如果一个组中的所有主机共享一个或多个变量值，`.ini` 的配置可以使用 `:vars`，`.yml` 的配置可以使用 `vars` 将该变量应用于整个组。


::: code-group
```ini {5-9}
[web]
centos ansible_host=centos
ubuntu ansible_host=ubuntu

[web:vars]
ansible_connection=ssh
ansible_user=root
ansible_port=22
ansible_ssh_private_key_file=~/.ssh/id_rsa
```

```yaml {8-12}
web:
  hosts:
    ubuntu:
      ansible_host: ubuntu
    centos:
      ansible_host: centos

  vars:
     ansible_user: root
     ansible_connection: ssh
     ansible_port: 22
     ansible_ssh_private_key_file: ~/.ssh/id_rsa
```
:::

组变量是一次将变量应用于多个主机的便捷方式。然而，在执行之前，Ansible 总是将组变量（包括主机变量）展平到主机级别。

如果主机是多个组的成员，Ansible 会从所有这些组中读取变量值，如果给不同组中的同一个变量分配不同的值，Ansible 会[根据内部规则选择使用哪个值进行合并](https://docs.ansible.com/ansible/latest/inventory_guide/intro_inventory.html#how-we-merge)。

