# cron 模块

[cron 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/cron_module.html) 用于管理 cron.d 和 crontab 条目。

## 常用参数

| 参数名        | 说明                                                          |
|------------|-------------------------------------------------------------|
| `name`     | 此参数用于设置计划任务的名称，计划任务的名称会在注释中显示                               |
| `minute`   | 设置计划任务中分钟设定位的值，比如设定位的值为5，即`minute=5`，当不使用此参数时，分钟设定位的值默认为`*` |
| `hour`     | 设置计划任务中小时设定位的值，比如设定位的值为1，即`hour=1`， 当不使用此参数时，小时设定位的值默认为`*`  |
| `day`      | 设置计划任务中日设定位的值，当不使用此参数时，日设定位的值默认为`*`                         |
| `month`    | 设置计划任务中月设定位的值，当不使用此参数时，月设定位的值默认为`*`                         |
| `weekday`  | 设置计划任务中周几设定位的值，当不使用此参数时，周几设定位的值默认为`*`                       |
| `user`     | 设置当前计划任务属于哪个用户，当不使用此参数时，默认为管理员用户                            |
| `job`      | 指定计划的任务中需要实际执行的命令或者脚本，比如`echo test`命令                       |
| `state`    | 当计划任务有名称时可以根据名称修改或删除对应的任务，当删除计划任务时需要将 `state` 的值设置为`absent` |
| `disabled` | 是否应在 crontab 中禁用（注释掉）计划任务，仅在 `state=present` 时有效            |
| `backup`   | 如果设置，则在修改之前创建 crontab 的备份。此模块在 `backup_file` 变量中返回备份的位置     |

更多参数可以使用命令 `ansible-doc -s cron` 获取更多使用相关的文档或者[查看官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/cron_module.html#parameters)。


## 一些示例

### 添加 ntpdate 定时任务

**要求：** 添加每5分钟执行一次和阿里云服务器时间同步的定时任务。

> **注意：** 如果是 Ubuntu 系统，默认没有安装 Cron 服务，通过 `apt install cron` 安装。

在定时任务中这样编写：`*/5 * * * * ntpdate -u ntp.aliyum.com`

需要用到 `name`、`minute` 和 `job` 参数。

```bash
ansible all -i src/inventory.yml -m cron -a "name='ntp aliyun' minute='*/5' job='ntpdate -u ntp.aliyum.com'"

ansible all -i src/inventory.yml -m shell -a "crontab -l"
```

### 添加每分钟定时任务

cron 模块在不指定任何时间规则时候，默认为每分钟执行。

```bash
ansible all -i src/inventory.yml -m cron -a "name='minute job' job='echo "helloworld" >> /tmp/ansible-cron.log'"

ansible all -i src/inventory.yml -a "cat /tmp/ansible-cron.log"
```

### 修改定时任务

cron 模块在修改定时任务时需要提供 `name`、`job` 等参数。

```bash
ansible all -i src/inventory.yml -m cron -a "name='minute job' job='echo "helloworld" >> /tmp/ansible-cron.log'"

# 将上面的定时任务修改为 每天的23:30执行一次
ansible all -i src/inventory.yml -m cron -a "name='minute job' job='echo "helloworld" >> /tmp/ansible-cron.log' minute=30 hour=23"

ansible all -i src/inventory.yml -m shell -a "crontab -l" 
```

### 删除定时任务

使用cron模块删除定时任务时，只能指定 `name` 进行删除。

需要用到 `name` 和 `state=absent` 参数。

```bash
ansible all -i src/inventory.yml -m cron -a "name='ntp aliyun' state=absent"

ansible all -i src/inventory.yml -m shell -a "crontab -l"
```

