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
ansible all -m ping
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

## 组织主机和组变量

上面都是将主机或租变量存储在主机清单文件中，在实际使用 ansible 时 也允许单独将主机或组变量存储到外部文件以帮助更轻松地组织变量值。

同时还可以在主机和组变量文件中使用列表和哈希数据，这是在主清单文件中无法做到的。

主机和组变量文件使用 Yaml 语法。有效的文件扩展名包括 `.yml`、`.yaml`、`.json` 或无文件扩展名的文件。如果不熟悉 YAML，请[参阅 YAML 语法](https://curder.github.io/yaml-study/guide/rules.html)。

Ansible 通过搜索相对于 inventory 主机清单文件或 playbook 剧本文件的路径来加载主机和组变量文件。如果主机清单文件 `/etc/ansible/hosts` 包含名为 `foosball` 的主机，该主机属于两个组 `raleigh` 和 `webservers`，则该主机将在以下位置使用 YAML 文件中的变量：

```
/etc/ansible/group_vars/raleigh # 可以选择'.yml', '.yaml', or '.json' 结尾
/etc/ansible/group_vars/webservers
/etc/ansible/host_vars/foosball
```

比如 `raleigh` 组的变量在 `/etc/ansible/group_vars/raleigh` 文件中的内容为：

```yaml
---
ntp_server: acme.example.org
database_server: storage.example.org
```

还可以创建以组或主机命名的目录。Ansible 将按字典顺序读取这些目录中的所有文件。`raleigh` 组更加精细的配置文件列表的示例：

```yaml
/etc/ansible/group_vars/raleigh/db_settings
/etc/ansible/group_vars/raleigh/cluster_settings
```

`raleigh` 组中的所有主机都可以使用这些文件中定义的变量。

同时也推荐将清单文件和变量保存在 git 等版本管理工具中是跟踪清单和主机变量更改的方式。


## 主机清单设置示例

### 每个环境一个主机清单

如果需要管理多个环境，有时最好只为每个主机清单定义一个环境的主机。这样当实际上想要更新一些开发服务器时，就很难意外更改生产环境中节点的状态。


对于上面提到的示例，可以有一个 `inventory_test` 文件：

```ini
[dbservers]
db01.test.example.com
db02.test.example.com

[appservers]
app01.test.example.com
app02.test.example.com
app03.test.example.com
```

该文件仅包含属于“测试”环境的主机。在另一个名为的文件中定义“线上”机器 `inventory_prod`：

```yaml
[dbservers]
db01.staging.example.com
db02.staging.example.com

[appservers]
app01.staging.example.com
app02.staging.example.com
app03.staging.example.com
```

要将应用到测试环境中的所有 `appservers` 分组下的服务器时，可以使用以下命令：

```bash
ansible -i inventory_test -l appservers
```

### 按功能分组

```yaml
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
```

按照服务器功能进行分组，将不同功能的服务器放置到对应组。

### 按位置分组

其他任务可能集中在某个主机所在的位置。假设 `db01.test.example.com` 和 `app01.test.example.com` 位于 `cn_shenzhen`，而 `db02.test.example.com` 位于 `cn_beijing`：

```ini
[cn_shenzhen]
db01.test.example.com
app01.test.example.com

[cn_beijing]
db02.test.example.com
```

实际上在使用时候可能会混合上面的所有主机组设置，因为可能需要在某一天更新特定数据中心的所有节点，而在另一天更新所有应用程序服务器，无论它们位于何处。

```bash
ansible -l cn_henzheng # 选择指定地区的节点
```