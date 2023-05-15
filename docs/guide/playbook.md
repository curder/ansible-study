# playbook 剧本

[Ansible Playbooks](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_intro.html) 提供了一种可重复、可重用、简单的配置管理和多机部署系统，非常适合部署复杂的应用程序。

剧本由有序列表中的一个或多个"剧本"组成，每个 play 执行 playbook 总体目标的一部分，运行一个或多个任务，每个任务调用一个 Ansible 模块。


## 核心元素

- **Hosts** 执行的远程主机列表
- **Tasks** 任务集
- **Variables** 内置变量或自定义变量在playbook中调用
- **Templates** 模板，可替换模板文件中的变量并实现一些简单逻辑的文件
- **Handlers** 和 **Notify** 结合使用，由特定条件触发的操作， 满足条件方才执行，否则不执行
- **Tags** 指定某条任务执行，用于选择运行 playbook 中的部分代码

### hosts 组件

playbook中的每一个play的目的都是为了让特定主机以某个指定的用户身份执行任务。hosts用于指定要执行指定任务的主机，须要先定义在主机清单中。

```yaml
- hosts: web_servers
```

### remote_user 组件

可用于 Host 和 Task 中，也可以通过指定使用 sudo 的方式在远程主机上执行任务，其可用于play全局或某任务；此外，甚至可以在sudo时使用sudo_user 指定sudo时切换的用户。

```yaml
- hosts: web_servers
  remote_user: root
  
  tasks:
    - name: test connection
      ping:
```

### task 列表和 action 组件

playbook 的主体部分就是各种任务列表，任务列表中有一个或多个任务，每个任务按次序逐个在主机清单中匹配的主机上执行。

任务的目的是使用指定的模块参数执行，而在模块参数中可以使用变量。

每个任务都应该有对应的名称，用于执行结果的输出。如果没提供名称，则运行结果将用于输出。

**任务格式：**

- action: module arguments
- module：arguments （推荐）

```yaml
---
- hosts: web_servers
  remote_user: root
  tasks:
    - name: install http server
      yum: name=nginx
    - name: start http server
      service: name=nginx state=started enabled=yes
```

## playbook 命令

格式：

```bash
ansible-playbook <filename.yml> ... [options] 
```

常见选项

```text
-C --check      # 仅检测，不执行
--list-hosts    # 列出待运行任务的主机
--list-tasks    # 列出任务
--list-tags     # 列出标签
--limit 主机列表 # 只针对主机列表中的指定主机执行任务
-v, -vv, -vvv   # 显示过程信息
```

## 一些示例

### 创建 MySQL 用户

```yaml
---
- hosts: db_servers
  remote_user: root
  gather_facts: false

  tasks:
    - name: create group
      group: name=mysql system=yes gid=306
    - name: create user
      user: name=mysql shell=/sbin/nologin system=yes group=mysql uid=306 create_home=no
```

### 安装 Nginx

```yaml
---
- hosts: web_servers
  remote_user: root
  gather_facts: false

  tasks:
    - name: add nginx group
      group: name=nginx state=present
    - name: add nginx user
      user: name=nginx state=present group=nginx
    - name: install nginx
      yum: name=nginx state=present
    - name: start nginx
      service: name=nginx state=started enabled=yes
```

### 卸载 Nginx

```yaml
---
- hosts: web_servers
  remote_user: root
  gather_facts: false

  tasks:
    - name: uninstall nginx
      yum: name=nginx state=absent autoremove=yes
    - name: remove nginx user
      user: name=nginx state=absent
    - name: remove nginx group
      group: name=nginx state=absent
    - name: remove config files
      file: name=/etc/nginx state=absent
```

## handlers 和 notify

**handlers（触发器）:** 定义一些任务列表，与之前剧本中task没有关系，只有资源发送变化才会采取一定的操作

**notify:** notify中调用handler中定义的操作

```yaml
---
- hosts: web_servers
  remote_user: root
  gather_facts: false

  tasks:
    - name: add nginx group
      group: name=nginx state=present
    - name: add nginx user
      user: name=nginx state=present group=nginx
    - name: install nginx
      yum: name=nginx state=present
    - name: add custom config
      copy: src=conf/nginx.conf dist=/etc/nginx/nginx.conf
      notify: restart nginx
    - name: start nginx
      service: name=nginx state=started enabled=yes

  handlers:
    - name: restart nginx
      service: name=nginx state=restarted
```

::: details `config/nginx.conf`

```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log notice;
pid /run/nginx.pid;

include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    keepalive_timeout   65;
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    server {
        listen       8080;
        server_name  _;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }
}
```
:::


## tags 组件

在剧本文件中，可以利用 tags 组件，为特定任务指定标签，当在执行剧本时，可以只执行特定 tags 的
任务,而非整个playbook文件。

```yaml {16}
---
- hosts: web_servers
  remote_user: root
  gather_facts: false

  tasks:
    - name: add nginx group
      group: name=nginx state=present
    - name: add nginx user
      user: name=nginx state=present group=nginx
    - name: install nginx
      yum: name=nginx state=present
    - name: add custom config
      copy: src=conf/nginx.conf dist=/etc/nginx/nginx.conf
      notify: restart nginx
      tags: config  // [!code focus]
    - name: start nginx
      service: name=nginx state=started enabled=yes

  handlers:
    - name: restart nginx
      service: name=nginx state=restarted
```

则可以通过使用 `-t` 参数指定对应标签的任务，比如：`ansible-playbook -t config install-nginx.yml`。


## 使用变量

变量名命名要求：仅能由字母、数字和下划线组成，且只能由字母开头

**变量定义：**

```
variable=value

# 比如：
http_port=80
```

**变量调用：**

通过 `{{ variable_name }}` 调用变量，且建议变量名前后添加空格。

**变量来源：**

1. setup 模块的 facts 远程主机的所有变量都可以直接调用
2. 通过命令行指定变量，优先级高
    ```bash
    ansible-playbook -e variable=value
    ```
   > 使用 `-e` 参数指定变量
3. 在 playbook 中定义
    ```yaml
    vars:
      - var1: value1
      - var2: value2
    ```
4. 独立的 yml 变量文件中定义

### 使用setup中的变量

```yaml
---
- hosts: all
  remote_user: root
  gather_facts: true

  tasks:
    - name: create empty file
      file: path=/tmp/{{ ansible_nodename }}.log state=touch owner=root mode=0600
```

### 命令行中定义变量

```yaml
# var.yml
- hosts: web_servers
  remote_user: root
  gather_facts: false

  tasks:
     - name: install package
       yum: name={{ package_name }} state=present
```

```bash
ansible-playbook -e package_name=nginx var.yml
```

### playbook 文件中定义变量

```yaml
# var.yml
---
- hosts: web_servers
  remote_user: root
  gather_facts: false
  vars:
     - user_name: user1
     - group_name: group1

  tasks:
     - name: create group
       group: name={{ group_name }} state=present
     - name: create user
       user: name={{ user_name }} group={{ group_name }} state=present
```

```bash
ansible-playbook -e "user_name=curder" var.yml
```

### 单独 yml 文件中定义变量

::: code-group
```yaml [webserver-log.yml]
---
- hosts: all
  remote_user: root
  gather_facts: false
  vars_files:
     - vars.yml
  
  tasks:
    - name: create httpd log
      file: name=/tmp/{{ var1 }}.log state=touch
    - name: create nginx log
      file: name=/tmp/{{ var2 }}.log state=touch
```

```yaml [vars.yml]
---
var1: httpd
var2: nginx
```
:::

### 主机清单文件中定义变量

在主机清单文件中定义变量[可以参考这里](./intro-inventory.md#变量)。