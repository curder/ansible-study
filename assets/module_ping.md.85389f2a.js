import{_ as a,c as s,o as e,N as o}from"./chunks/framework.bf75d690.js";const b=JSON.parse('{"title":"ping 模块","description":"","frontmatter":{},"headers":[],"relativePath":"module/ping.md","lastUpdated":1679118273000}'),n={name:"module/ping.md"},t=o(`<h1 id="ping-模块" tabindex="-1">ping 模块 <a class="header-anchor" href="#ping-模块" aria-label="Permalink to &quot;ping 模块&quot;">​</a></h1><p><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/ping_module.html#ansible-collections-ansible-builtin-ping-module****" target="_blank" rel="noreferrer"><code>ping</code></a> 是一个简单的测试模块，这个模块总是在成功响应时返回 <code>pong</code>。</p><h2 id="常用参数" tabindex="-1">常用参数 <a class="header-anchor" href="#常用参数" aria-label="Permalink to &quot;常用参数&quot;">​</a></h2><table><thead><tr><th>参数</th><th>参数类型</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td><code>data</code></td><td><code>string</code></td><td><code>pong</code></td><td>ping 返回值要返回的数据<br>如果此参数设置为<code>crash</code>，模块将引发异常</td></tr></tbody></table><h2 id="一些示例" tabindex="-1">一些示例 <a class="header-anchor" href="#一些示例" aria-label="Permalink to &quot;一些示例&quot;">​</a></h2><h3 id="使用默认参数" tabindex="-1">使用默认参数 <a class="header-anchor" href="#使用默认参数" aria-label="Permalink to &quot;使用默认参数&quot;">​</a></h3><p>ping 模块不增加参数时，如果链接正常则响应为 <code>pong</code>。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ping</span></span>
<span class="line"></span></code></pre></div><h3 id="自定义响应字符串" tabindex="-1">自定义响应字符串 <a class="header-anchor" href="#自定义响应字符串" aria-label="Permalink to &quot;自定义响应字符串&quot;">​</a></h3><p>ping 模块使用 <code>data</code> 来指定返回值要返回的数据。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ping</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">data=OK</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><blockquote><p>如果传递的 <code>data</code> 值是 <code>carsh</code> 时，会抛出异常的错误。</p></blockquote>`,12),l=[t];function p(c,r,i,d,h,C){return e(),s("div",null,l)}const u=a(n,[["render",p]]);export{b as __pageData,u as default};
