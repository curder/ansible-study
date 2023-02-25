# 认证方式

安全认证分为两种：
- 第一种是：密码认证，但是密码是明文配置在主机清单配置文件中，考虑到安全性问题。**不推荐使用**
- 第二种是：SSH Key 秘钥对验证，安全性相对明文来说较高。**推荐使用**

不管是密码认证还是SSH Key 密钥对验证方式，建议在控制节点服务器上通过 SSH 命令连接一次，检查是否能正确连通。

```bash
ssh server_username@host # 输入命令后回车输入服务器密码

ssh server_username@host -i ~/.ssh/id_rsa # 输入命令后回车连接到服务器
```

::: details 连接指纹确认注意事项

第一次在控制节点服务器连接到被控制的服务器时都会提示是否需要进行指纹确认，输入 `y` 确认即可。

这样的话连接的指纹信息被计入到了控制节点服务器的 `~/.ssh/known_hosts` 文件中。

如果不想将指纹信息记录到 `~/.ssh/known_hosts` 文件中，可以在 ansible 的默认的配置文件 `/etc/ansible/ansible.cfg` 中进行配置：

```ini
host_key_checking = False
```

这样配置好之后下次再使用 ansible 连接服务器时就不会记录指纹信息到 `~/.ssh/known_hosts` 文件中。
:::


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

使用密钥对认证需要将控制节点上生成的密钥对的公钥分发到待管理的机器上。

在操作的时候，可以直接使用服务器最高权限的 `root` 用户，为了安全下面以新建一个操作用户 `ansible` 用户，密码为 `123456` 做演示。

### 建立管理用户

**以下命令需要在所有机器上执行，包括控制端服务器和被控制端服务器。**

```bash
# 添加用户
useradd ansible

# CentOS
## 将用户添加到 wheel 组并设置免密执行 sudo 命令
usermod -aG wheel ansible
sed -i 's/# %wheel/%wheel/g' /etc/sudoers

# Ubuntu
## 将用户设置免密执行 sudo 命令
echo "ansible  ALL=(ALL:ALL) NOPASSWD: ALL" >> /etc/sudoers
```

::: warning 请注意
上面命令中没有给新建的 `ansible` 用户设置登陆的密码，那么要使用该用户登陆服务器时只能使用私钥进行授权登陆。
:::

### 生成密钥对

在控制端服务器生成密钥对即可。

```bash
su - ansible # 切换不到 ansible 用户

ssh-keygen -t rsa -f ~/.ssh/id_rsa
```

- `-t` 自定义密钥对类型，默认是 `rsa`
- `-f` 自定义密钥对存储内容和文件名，默认是 `~/.ssh/id_rsa`

上面的命令会生成两个文件，密钥文件 `~/.ssh/id_rsa` 和 公钥文件 `~/.ssh/id_rsa.pub`。

其中私钥文件 `~/.ssh/id_rsa` 是无论如何也不应该暴露给其他服务器或者人。

而公钥文件 `~/.ssh/id_rsa.pub` 是需要分发到被控制服务器上的。

### 分发公钥

1. 在控制端服务器登陆 `ansible` 用户，拿到**控制端服务器**的公钥内容 `~/.ssh/id_rsa.pub`
2. 粘贴到**被控制端服务器**的 `~/.ssh/authorized_keys` 内（注意用户是 ansible）

**值得注意的是：** 被控制端的 `~/.ssh` 文件夹的权限是 `700`，而 `~/.ssh/authorized_keys` 文件的权限是 `600`。

以上是针对被控制端服务器的 `ansible` 用户密码没有设置的情况。

::: details 给被控制端服务器的 `ansible` 用户设置密码应该怎么做？ 
1. 在控制端服务器登陆 ansible
2. 执行 `ssh-copy-id` 命令
  ```bash
  # 执行完下面的命令后输入密码即可
  ssh-copy-id ansible@centos
  ssh-copy-id ansible@ubuntu
  ```
:::

### 验证

通过上面一系列的配置后，使用下面的命令可以免密快速登陆到被控制服务器上。

```bash
ssh ansible@centos
ssh ansible@ubuntu
```
