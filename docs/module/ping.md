# ping 模块

[`ping`](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/ping_module.html#ansible-collections-ansible-builtin-ping-module****) 是一个简单的测试模块，这个模块总是在成功响应时返回 `pong`。


```bash
# 对主机清单 inventory.ini 中的所有主机执行 ping 命令
ansible web -i ./inventory.ini -m ping
```