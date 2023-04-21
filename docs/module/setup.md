# setup 模块

[setup 模块](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/setup_module.html) 用于收集远程主机的一些基本信息。


## 常用参数

**`filter`** 参数：用于进行条件过滤。如果设置则仅返回匹配过滤条件的信息。

  - `ansible_all_ipv4_addresses` 仅显示ipv4的信息
  - `ansible_devices` 仅显示磁盘设备信息
  - `ansible_distribution` 显示是什么系统，例：centos,suse等
  - `ansible_distribution_major_version` 显示是系统主版本
  - `ansible_distribution_version` 仅显示系统版本
  - `ansible_machine` 显示系统类型，例：32位，还是64位
  - `ansible_eth0` 仅显示eth0的信息
  - `ansible_hostname` 仅显示主机名
  - `ansible_kernel` 仅显示内核版本
  - `ansible_lvm` 显示lvm相关信息
  - `ansible_memtotal_mb` 显示系统总内存
  - `ansible_memfree_mb` 显示可用系统内存
  - `ansible_memory_mb` 详细显示内存情况
  - `ansible_swaptotal_mb` 显示总的swap内存
  - `ansible_swapfree_mb` 显示swap内存的可用内存
  - `ansible_mounts` 显示系统磁盘挂载情况
  - `ansible_processor` 显示cpu个数(具体显示每个cpu的型号)
  - `ansible_processor_vcpus` 显示cpu个数(只显示总的个数)

## 一些示例

### 获取主机地址

```bash
ansible all -i src/inventory.yml -m setup -a "filter=ansible_all_ipv4_addresses"
```

### 获取主机内存信息

```bash
ansible all -i src/inventory.yml -m setup -a "filter=ansible_memory_mb"
```

### 获取主机名

```bash
ansible all -i src/inventory.yml -m setup -a "filter=ansible_hostname"
```

### 获取操作系统类型

```bash
ansible all -i src/inventory.yml -m setup -a "filter=ansible_distribution"
```