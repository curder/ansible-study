# Ansible 学习

## Ansible 是什么

Ansible 是一个自动化的运维工具，可以部署远程主机。

这里的远程主机可以是远程虚拟机或物理机，也可以是本地主机。

Ansible 通过 SSH 协议实现远程节点和管理节点之间的通信。

理论上来说，只要管理员通过 SSH 登录到一台远程主机上的能做的操作，使用 Ansible 都可以做到。

它有如下特点：

- 拥有模块化的设计，Ansible 能够调用特定的模块来完成待定的任务，本身是核心组件，短小精悍; 海量的模块让我们能快速完成对远程主机的批量操作
- Ansible的部署比较简单，无需在远程主机安装客户端
- 支持 playbook 剧本模式，连续任务按先后顺序完成

github地址：[github.com/ansible/ansible](https://github.com/ansible/ansible)