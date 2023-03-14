# shell 模块

[shell 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/shell_module.html)功能：在目标上执行 shell 命令。

> **注意：** shell 模块可以识别特殊字符。

## 一些实例

- 过滤 SSH 进程信息 

  ```bash
  ansible all -i src/inventory.yml -m shell -a "ps -ef |grep ssh"
  ```

- 获取服务器时间并写入到文件

  ```bash
  ansible all -i src/inventory.yml -m shell -a "date '+%F %T'> /tmp/date.log"

  # 查看结果
  ansible all -i src/inventory.yml -m shell -a "cat /tmp/date.log" 
  ```

- 执行复杂命令
    ```bash
    1. 创建文件夹 
    2. 创建bash脚本文件，查看主机名
    3. 赋予脚本可执行权限
    4. 执行脚本
    ansible all -i src/inventory.yml -m shell -a "mkdir -p /tmp/test; echo hostname > /tmp/test/hostname; chmod +x /tmp/test/hostname; /tmp/test/hostname; warn=false"
    ```

