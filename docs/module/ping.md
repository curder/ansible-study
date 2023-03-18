# ping 模块

[`ping`](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/ping_module.html#ansible-collections-ansible-builtin-ping-module****) 是一个简单的测试模块，这个模块总是在成功响应时返回 `pong`。

## 常用参数

| 参数    | 参数类型   | 默认值 | 说明  |
|-------|--------|--|-----|
| `data` | `string` |  `pong` | ping 返回值要返回的数据<br />如果此参数设置为`crash`，模块将引发异常    |

## 一些示例

### 使用默认参数

ping 模块不增加参数时，如果链接正常则响应为 `pong`。

```bash
ansible all -i src/inventory.yml -m ping
```

### 自定义响应字符串

ping 模块使用 `data` 来指定返回值要返回的数据。

```bash
ansible all -i src/inventory.yml -m ping -a "data=OK"
```

> 如果传递的 `data` 值是 `carsh` 时，会抛出异常的错误。