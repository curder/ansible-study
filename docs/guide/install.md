# 安装 Ansible

ansible 仅需要在控制节点安装，针对主流的操作系统，它的安装也相对简单。

比如使用 MacOS 系统可以使用 [Homebrew](https://brew.sh/index_zh-cn)提供的 `brew` 命令进行安装；使用 CentOS 操作系统可以使用 `yum` 命令进行安装；使用 Ubuntu 操作系统的话可以使用 `apt` 命令安装。

## MacOS

```bash
brew install ansible
```

## CentOS

```bash
sudo yum install epel-release
sudo yum install ansible
```

## Ubuntu

```bash
sudo apt update
sudo apt install software-properties-common
sudo add-apt-repository --yes --update ppa:ansible/ansible
sudo apt install ansible
```

## Python3

针对上面的操作中系统，除了可以使用对应的命令安装 ansible之外，也可以通过 Python3 提供的 `pip` 命令进行安装。

```bash
python3 -m venv venv # 使用 python3 在当前目录创建python虚拟环境
source ./venv/bin/activate # 激活环境
./venv/bin/ansible --version 查看 ansible 版本信息
```

这样的话也可以将 ansible 安装到特定的目录。

更多操作系统安装方式可以参考[官方文档](https://docs.ansible.com/ansible/latest/installation_guide/index.html)。