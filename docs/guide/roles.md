# roles 角色

Ansible的roles功能也叫做角色，它是一种让多个playbook协同工作的实现方法。

roles将剧本中的 `vars` 变量、`handlers`、`tasks` 任务、模块及处理器都进行了拆分，分别放置于各自目录然后进行引用的一种机制。

通常一些复杂场景才会使用roles，让代码复用度更高。

## 快速了解roles

ansible-galaxy 命令可以连接 galaxy.ansible.com 下载已经编排好的 roles。

```bash
ansible-galaxy list  # 列出已安装的角色
ansible-galaxy install geerlingguy.redis  # 安装角色
ansible-galaxy remove geerlingguy.redis  # 删除角色
```

安装好 roles 后可以看到在相应的目录中会生成一个以角色名命名的目录，并且还有许多子目录和yml文件，这些都是构成roles的成员。

> 复制一份角色目录就会被Ansible自动识别成一个新的角色。

```bash {1,7}
ansible-galaxy install geerlingguy.redis  // [!code focus]

# Starting galaxy role install process
# - changing role geerlingguy.redis from 1.8.0 to unspecified
# - downloading role 'redis', owned by geerlingguy
# - downloading role from https://github.com/geerlingguy/ansible-role-redis/archive/1.8.0.tar.gz
# - extracting geerlingguy.redis to /root/.ansible/roles/geerlingguy.redis // [!code focus]
# - geerlingguy.redis (1.8.0) was installed successfully
```

## 手动创建 roles

1. 创建roles目录，保持和playbook同级，然后在roles目录中创建以角色命名的目录，如 `nginx`、`mysql`、`php`

    ```bash
    mkdir -p roles/{nginx,mysql,php}

    # roles
    # ├── mysql
    # ├── nginx
    # └── php
    ```

2. 在每个角色目录中分别创建 `files`、`handlers`、`tasks`（必须）、`templates`、`vars`等目录。

    ```bash
    mkdir -p roles/{nginx,mysql,php}/{handlers,tasks,template,vars,files}

    # roles
    # ├── mysql
    # │   ├── files
    # │   ├── handlers
    # │   ├── tasks
    # │   ├── template
    # │   └── vars
    # ├── nginx
    # │   ├── files
    # │   ├── handlers
    # │   ├── tasks
    # │   ├── template
    # │   └── vars
    # └── php
    #     ├── files
    #     ├── handlers
    #     ├── tasks
    #     ├── template
    #     └── vars
    ```

3. 各目录约定

    - `roles/$project/`：project是真实项目名称，如 `nginx`、`mysql`、`php`
    - `files`：存放由 `copy` 或 `script` 等模块调用的文件，如网页文件。
    - `template/`：template模块会自动在此目录中寻找jinja2模板文件
    - `tasks/`：该目录必须存在，定义任务，该目录中需要包含 `main.yml` 文件
    - `handlers/`：应包含一个 `main.yml` 文件，用于定义此角色用到的 handlers
    - `vars/`：应包含一个 `main.yml` 文件，用于定义此角色用到的变量

## 创建nginx角色

### 创建基础目录

```bash
cd /etc/ansible/roles/
mkdir -p nginx/{handlers,tasks,templates,vars}
cd nginx

# .
# ├── handlers
# ├── tasks
# ├── templates
# └── vars
```

### 创建变量文件 vars/main.yml

```yaml
# vars/main.yml
http_port: 80
user: www
group: www
```

### 创建配置文件的 template/nginx.conf.j2

```text
user {{ user }};  // [!code focus]
worker_processes auto;
error_log /var/log/nginx/error.log notice;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
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
        listen       {{ http_port }}; // [!code focus]
        listen       [::]:{{ http_port }}; // [!code focus]
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

### 建立tasks文件，写明需要执行的任务 

::: code-group

```yaml [tasks/main.yml]
---
# author: curder

- include_tasks: group.yml
- include_tasks: user.yml
- include_tasks: install.yml
- include_tasks: config.yml
- include_tasks: start.yml
```

```yaml [tasks/group.yml]
---
# author: curder


- name: Create a nginx group.
  group: 
   name: "{{ group }}"
   system: yes
```

```yaml [tasks/user.yml]
---
# author: curder


- name: Create a nginx user.
  user: 
    name: "{{ user }}"
    group: "{{ group }}"
    shell: "/sbin/nologin"
    create_home: no
```

```yaml [tasks/install.yml]
---
# author: curder


- name: Install nginx package
  yum: 
    name: nginx
    state: installed
```

```yaml [tasks/config.yml]
---
# author: curder


- name: Copy nginx template file
  template: src=nginx.conf.j2 dest=/etc/nginx/conf/nginx.conf
  notify: Restart nginx
```

```yaml [tasks/start.yml]
---
# author: curder


- name: Start nginx service
  service: 
    name: nginx
    state: started
    enabled: yes
```
:::

### 建立 handlers 文件 `handlers/main.yml`

```yaml
- name: Restart nginx # 名字需要和task中的notify保持一致
  service: 
    name: nginx
    state: restarted
```

### 调用角色 nginx_roles.yml

建立playbook用于调用角色，这个playbook文件需要和roles目录平级

```yaml
---
- hosts: all
  remote_user: root
  roles:
   - role: nginx  # 指定角色名称
```

使用 `ansible-playbook` 调用：

```bash
ansible-playbook -C nginx_roles.yml # 正式运行前可以先使用 -C 参数进行测试
```

### 文件和目录关系

```text
.
├── nginx
│   ├── handlers
│   │   └── main.yml
│   ├── tasks
│   │   ├── config.yml
│   │   ├── group.yml
│   │   ├── install.yml
│   │   ├── main.yml
│   │   ├── start.yml
│   │   └── user.yml
│   ├── templates
│   │   └── nginx.conf.j2
│   └── vars
│       └── main.yml
└── nginx_roles.yml
```