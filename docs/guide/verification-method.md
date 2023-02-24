# 认证方式

安全认证分为两种：
- 第一种是：密码认证，但是密码是明文配置在主机清单配置文件中，考虑到安全性问题，不推荐使用。
- 第二种是：SSH Key 秘钥对验证，安全性相对明文来说较高，推荐使用。

## 密码认证

| 参数                 | 参数类型 | 参数说明             |
|--------------------|------|------------------|
| `ansible_host`     | 主机地址 | 被管理服务器的IP地址      |
| `ansible_port`     | 主机端口 | 被管理服务器开放的SSH端口   |
| `ansible_user`     | 主机用户 | 被管理服务器SSH用户      |
| `ansible_password` | 主机密码 | 被管理服务器SSH用户对应的密码 |

更多 ansible 连接参数参考[官方地址](https://docs.ansible.com/ansible/latest/inventory_guide/intro_inventory.html#connecting-to-hosts-behavioral-inventory-parameters)。

比如在主机清单中添加以上配置：

::: code-group
```ini
[web]
centos ansible_host=10.211.55.4 ansible_user=root ansible_password=a ansible_port=22
ubuntu ansible_host=10.211.55.5 ansible_user=root ansible_password=a ansible_port=22
```

```yaml
web:
  hosts:
    centos:
      ansible_host: 10.211.55.4
      ansible_user: root
      ansible_password: a
      ansible_port: 22
    ubuntu:
     ansible_host: 10.211.55.5
     ansible_user: root
     ansible_password: a
     ansible_port: 22
```
:::

::: details 或者使用变量

:::code-group 

```ini
[web]
centos ansible_host=10.211.55.4
ubuntu ansible_host=10.211.55.5

[web:vars]
ansible_user=root
ansible_password=a
ansible_port=22
```

```yaml
web:
  hosts:
    centos:
      ansible_host: 10.211.55.4
    ubuntu:
     ansible_host: 10.211.55.5

  vars:
    ansible_user: root
    ansible_password: a
    ansible_port: 22
```

:::

使用 ansible 临时命令模式执行测试：

```bash
ansible web -i inventory.ini -a 'hostname'
ansible web -i inventory.yml -a 'hostname'
```

::: details sshpass错误处理
如果在执行上面的命令时，抛出 `to use the 'ssh' connection type with passwords or pkcs11_provider, you must install the sshpass program` 的错误。

针对不同的操作系统，有不同的解决方案：

- **MacOS**
    ```bash
    brew install https://raw.githubusercontent.com/kadwanev/bigboybrew/master/Library/Formula/sshpass.rb

    # 如果通过上面的方式无法一条命令完成安装，可以使用下面的方式通过源代码方式安装
    wget https://sourceforge.net/projects/sshpass/files/latest/download/sshpass/1.10/sshpass-1.10.tar.gz
    tar xvf sshpass-1.10.tar.gz && cd sshpass-1.10
    ./configure
    make && make install
    ```

- **CentOS**
    ```bash
    yum install sshpass
    ```

- **Ubuntu**
    ```bash
    apt install sshpass
    ```
:::

## 密钥对认证
