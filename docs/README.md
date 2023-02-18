# Ansible 学习

## Ansible 是什么

Ansible 是一个自动化的运维工具，可以部署远程主机。

这里的远程主机可以是远程虚拟机或物理机，也可以是本地主机。

Ansible 通过 SSH 协议实现管理节点和远程节点之间的通信。

理论上来说，只要管理员通过 SSH 登录到一台远程主机上的能做的操作，都可以通过 Ansible 自动化操作，比如批量复制、批量删除、批量修改、批量查看、批量安装、重启、更新等等。

## 为什么需要 ansible

- 批量部署、批量执行命令
- 统一配置、模版管理
- 批量手机被管理主机信息
- 批量分发文件


## ansible 特点

Ansible 的编排引擎可以出色的完成配置管理、流程控制、资源部署等多种操作。Ansible 无需安装客户端软件，管理简便、功能强大、便于维护。

Ansible 基于 Python 开发，由主要的 [paramiko](https://www.paramiko.org/) 和 [PyYAML](https://pyyaml.org/) 关键模块构建。

- 安装部署简单，学习曲线平坦
- 管理主机便捷，支持多台主机并行管理
- 无需单独在被管理主机上安装客户端软件，无需占用其他端口，仅利用SSH服务工作
- 远程执行安装，轻松对执行内容进行审计、评估、重写
- 能够立即管理远程主机，无需实现安装任何客户端
- 也可以使用其他除 Python 之外的语言编写模块
- 允许使用非 root 账号
- 不需要安装服务端，不需要开启守护进程
- 社区活跃


Ansible gitHub 地址：[github.com/ansible/ansible](https://github.com/ansible/ansible)

官方文档地址：[docs.ansible.com/ansible/latest](https://docs.ansible.com/ansible/latest)