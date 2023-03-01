# command 模块

[command 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/command_module.html)在目标上执行简单命令。

command 模块在临时命令模式中的默认模块，相当于默认添加了 `-m command` 参数。

命令不能使用变量比如`$HOME`，同时不能使用特殊字符比如 `|` 或 `&` 等字符，否则会出现无法识别，如果需要使用特殊字符可以考虑是用 `shell` 模块。

## 常用选项

| 选项参数    | 选项说明                              |
|---------|-----------------------------------|
| chdir   | 在执行命令前进入到指定目录                     |
| creates | 定义一个文件是否存在，如果不存在则运行相应命令，存在则跳过执行   |
| removes | 定义一个文件是否存在，如果存在则运行相应命令，如果不存在则跳过执行 |

更多选项可以[查看这里](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/command_module.html#parameters)。

## 一些实例

- 查看被控服务器主机名

    ```bash [ansible ad-hoc]
    ansible web -i ./inventory.ini -m command -a "hostname"
    ansible web -i ./inventory.ini -a "hostname" # 这个命令和上面的效果一致
    ```

- 查看被控服务器内存

    ```bash
    ansible web -i ./inventory.ini -a "free -m"
    ```

- 被控服务器创建文件

    ```bash
    ansible web -i ./inventory.ini -a "touch /opt/ansible.txt"
    ansible web -i ./inventory.ini -a "touch ansible.txt chdir=/opt"
    ```

- 查看被控服务器文件

    ```bash
    ansible web -i ./inventory.ini -a "cat /opt/ansible.txt"
    ```

- 查看被控服务器负载

    ```bash
    ansible web -i ./inventory.ini -a "uptime"
    ```

- 创建 `test` 用户

    ```bash
    ansible web -i ./inventory.ini -a "useradd test"
    ```

- 删除 `test` 用户
    ```bash
    ansible web -i ./inventory.ini -a "userdel -r test"
    ```

- 打包备份 `/var/log` 文件并放到 `/opt` 目录下

    ```bash
    ansible web -i ./inventory.ini \
                -a "tar -zcvf /opt/log.tar.gz /var/log chdir=/"
    ```
  > **注意：** 备份文件的文件夹是否存在


- 打包备份 `/var/log` 文件并放到不存在目录 `/backup` 目录下

  ```bash
  # 1. 执行下面的命令会抛出 /backup 目录不存在的错误
  ansible web -i inventory.ini \
              -a "tar zcf /backup/log.tar.gz var/log chdir=/"

  # 2. 使用 removes 参数，保证目录存在时才执行命令
  ansible web -i inventory.ini \
              -a "tar zcf /backup/log.tar.gz var/log chdir=/ removes=/backup"

  # 3. 先创建出目录，在执行备份命令
  ansible web -i inventory.ini \
              -a "mkdir -p /backup"
  ansible web -i inventory.ini \
              -a "tar zcf /backup/log.tar.gz var/log chdir=/"
  ```