# 临时命令模式 ad-hoc

ad-hoc 模式下使用 `ansible` 命令行工具在一个或多个托管节点上自动执行单个任务。 临时命令既快速又简单，缺点是不可重复使用。

使用临时命令需要先掌握如何构建主机清单。

## 为什么要使用临时命令模式

临时命令非常适合很少重复的任务。例如如果想在假期关闭实验室中的所有机器，可以在 Ansible 中执行一个快速的单行代码，而无需编写 playbook 剧本。

临时命令格式如下所示：

```bash
absible [pattern] -m [module] -a "[module options]"
```
- `pattern` 为主机组名
- `-m` 为指定模块；`module` 为模块名
- `-a` 指定模块执行的动作；`module options` 批量执行的操作



https://docs.ansible.com/ansible/latest/command_guide/intro_adhoc.html