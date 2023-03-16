# script 模块

[script 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/script_module.html)传输后在远程节点上运行本地脚本。

相比 [shell 模块](shell.md) 而言，script 模块功能更加强大，管理机机器拥有一个执行脚本，就可以使用 script 模块在所有被管理机器上运行。

## 常用参数

| 参数名         | 说明                           |
|-------------|------------------------------|
| `creates`   | 仅当远程节点上不存在creates配置的文件时才运行脚本 |
| `free_from` | 参数值可以输入任何系统命令，实现远程管理         |
| `removes`   | 仅当远程节点上存在removes配置的文件时才运行脚本  |

更多参数可以使用命令 `ansible-doc -s script` 获取更多使用相关的文档或者[查看官方文档](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/script_module.html#parameters)。

## 一些示例

### 执行本地脚本

```bash
# 在本机预准备执行脚本
cat > /tmp/ansible-script.sh << 'EOL'
echo $(hostname -I) > /tmp/ansible-script.log
echo $(uptime) >> /tmp/ansible-script.log
echo $(free -m) >> /tmp/ansible-script.log
EOL

# 添加可执行权限
chmod +x /tmp/ansible-script.sh

# 远程执行
ansible all -i src/inventory.yml -m script -a "/tmp/ansible-script.sh"

# 使用shell模块检查输出 
ansible all -i src/inventory.yml -m shell -a "cat /tmp/ansible-script.log"
```

### 远程安装nginx

```bash
# 在本机预准备执行脚本
echo 'yum install -y nginx' > /tmp/ansible-script.sh

# 远程执行
ansible all -i src/inventory.yml -m script -a "/tmp/ansible-script.sh"

# 使用shell模块检查是否安装成功
ansible all -i src/inventory.yml -m shell -a "nginx -v"
```