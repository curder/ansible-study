# service 模块

[service 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/service_module.html)用于管理被管理端主机的服务。

## 常用参数

| 参数名       | 参数类型      | 默认值 | 可选值                                                      | 说明        |
|-----------|-----------|-----|----------------------------------------------------------|-----------|
| `name`    | `string`  |     |                                                          | 管理的服务的名称  |
| `state`   | `string`  |     | `reloaded`<br/>`restarted`<br />`started`<br />`stopped` | 需要执行的操作   |
| `enabled` | `boolean` |     | `false`<br />`true`                                      | 是否需要开机自启动 |

更多参数可以使用命令 `ansible-doc -s service` 获取更多使用相关的文档或者[查看官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/service_module.html#parameters)。


## 示例

使用 service 模块管理服务时需要保证对应的服务已经正确安装到了被管理机器。

### 启动服务

使用 service 模块启动 Nginx 服务，如果当前没有启动。

```bash
ansible all -i src/inventory.yml -m service -a "name=nginx state=started"

ansible all -i src/inventory.yml -m shell -a "ps -ef|grep nginx" # 查看进程状态
```

### 停止服务

使用 service 模块暂停 Nginx 服务，如果当前是启动状态。

```bash
ansible all -i src/inventory.yml -m service -a "name=nginx state=stopped"

ansible all -i src/inventory.yml -m shell -a "ps -ef|grep nginx" # 查看进程状态
```

### 重启服务

使用 service 模块重启 Nginx 服务，如果当前是启动状态则重启Nginx，如果是没有启动的状态则启动它。

```bash
ansible all -i src/inventory.yml -m service -a "name=nginx state=restarted"

ansible all -i src/inventory.yml -m shell -a "ps -ef|grep nginx" # 查看进程状态
```

### 重载服务

使用 service 模块重载 Nginx 配置。

```bash
ansible all -i src/inventory.yml -m service -a "name=nginx state=reloaded"

ansible all -i src/inventory.yml -m shell -a "ps -ef|grep nginx" # 查看进程状态
```


### 开机自启动

使用 service 模块设置 Nginx 服务开机自启动。


```bash
ansible all -i src/inventory.yml -m service -a "name=nginx enabled=true"

ansible all -i src/inventory.yml -m shell -a "systemctl list-unit-files |grep nginx" # 查看服务是否开机自启动
```
