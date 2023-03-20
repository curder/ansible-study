# systemd 模块

[systemd 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/systemd_module.html) 用于管理系统开机是否自启动，开启、关闭、查看状态或重启服务管理。

## 常用参数

| 参数名             | 参数类型      | 默认值     | 可选值                                                       | 说明                                                  |
|-----------------|-----------|---------|-----------------------------------------------------------|-----------------------------------------------------|
| `name`          | `string`  |         |                                                           | 服务名，例如`crond.service`，最好带上后缀`.service`              |
| `state`         | `string`  |         | `reloaded`<br />`restarted`<br />`started`<br />`stopped` | 需要执行的操作                                             |
| `enabled`       | `boolean` |         | `false`<br />`true`                                       | 是否需要开机自启动                                           |
| `daemon_reload` | `boolean` | `false` | `flase`<br />`true`                                       | 在执行任何其它操作之前运行 `daemon-reload`，以确保 `systemd` 已读取任何更改 |

更多参数可以使用命令 `ansible-doc -s systemd` 获取更多使用相关的文档或者[查看官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/systemd_module.html#parameters)。

## 启动服务

使用 systemd 模块的 `name` 和 `state=started` 参数。

```bash
ansible all -i src/inventory.yml -m systemd -a "name=nginx state=started"
```

## 停止服务

使用 systemd 模块的 `name` 和 `state=stopped` 参数。

```bash
ansible all -i src/inventory.yml -m systemd -a "name=nginx state=stopped"
```

## 重启服务

使用 systemd 模块的 `name` 、`state=stopped` 和 `daemon_reload=true` 参数。

```bash
ansible all -i src/inventory.yml -m systemd -a "name=crond state=started daemon_reload=true"
```

## 重载服务

使用 systemd 模块的 `name` 和 `state=reloaded` 参数。

```bash
ansible all -i src/inventory.yml -m systemd -a "name=nginx state=reloaded"
```

## 开机自启动

使用 systemd 模块的 `name`、`state=started` 和 `enabled=true` 参数。

```bash
ansible all -i src/inventory.yml -m systemd -a "name=nginx state=started enabled=true"
```