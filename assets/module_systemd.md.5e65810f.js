import{_ as s,c as a,o as e,N as o}from"./chunks/framework.3e506893.js";const h=JSON.parse('{"title":"systemd 模块","description":"","frontmatter":{},"headers":[],"relativePath":"module/systemd.md","lastUpdated":1679311691000}'),t={name:"module/systemd.md"},l=o('<h1 id="systemd-模块" tabindex="-1">systemd 模块 <a class="header-anchor" href="#systemd-模块" aria-label="Permalink to &quot;systemd 模块&quot;">​</a></h1><p><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/systemd_module.html" target="_blank" rel="noreferrer">systemd 模块</a> 用于管理系统开机是否自启动，开启、关闭、查看状态或重启服务管理。</p><h2 id="常用参数" tabindex="-1">常用参数 <a class="header-anchor" href="#常用参数" aria-label="Permalink to &quot;常用参数&quot;">​</a></h2><table><thead><tr><th>参数名</th><th>参数类型</th><th>默认值</th><th>可选值</th><th>说明</th></tr></thead><tbody><tr><td><code>name</code></td><td><code>string</code></td><td></td><td></td><td>服务名，例如<code>crond.service</code>，最好带上后缀<code>.service</code></td></tr><tr><td><code>state</code></td><td><code>string</code></td><td></td><td><code>reloaded</code><br><code>restarted</code><br><code>started</code><br><code>stopped</code></td><td>需要执行的操作</td></tr><tr><td><code>enabled</code></td><td><code>boolean</code></td><td></td><td><code>false</code><br><code>true</code></td><td>是否需要开机自启动</td></tr><tr><td><code>daemon_reload</code></td><td><code>boolean</code></td><td><code>false</code></td><td><code>flase</code><br><code>true</code></td><td>在执行任何其它操作之前运行 <code>daemon-reload</code>，以确保 <code>systemd</code> 已读取任何更改</td></tr></tbody></table><p>更多参数可以使用命令 <code>ansible-doc -s systemd</code> 获取更多使用相关的文档或者<a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/systemd_module.html#parameters" target="_blank" rel="noreferrer">查看官方文档</a>。</p><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><h3 id="启动服务" tabindex="-1">启动服务 <a class="header-anchor" href="#启动服务" aria-label="Permalink to &quot;启动服务&quot;">​</a></h3><p>使用 systemd 模块的 <code>name</code> 和 <code>state=started</code> 参数。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">systemd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name=nginx state=started</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h3 id="停止服务" tabindex="-1">停止服务 <a class="header-anchor" href="#停止服务" aria-label="Permalink to &quot;停止服务&quot;">​</a></h3><p>使用 systemd 模块的 <code>name</code> 和 <code>state=stopped</code> 参数。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">systemd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name=nginx state=stopped</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h3 id="重启服务" tabindex="-1">重启服务 <a class="header-anchor" href="#重启服务" aria-label="Permalink to &quot;重启服务&quot;">​</a></h3><p>使用 systemd 模块的 <code>name</code> 、<code>state=stopped</code> 和 <code>daemon_reload=true</code> 参数。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">systemd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name=crond state=started daemon_reload=true</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h3 id="重载服务" tabindex="-1">重载服务 <a class="header-anchor" href="#重载服务" aria-label="Permalink to &quot;重载服务&quot;">​</a></h3><p>使用 systemd 模块的 <code>name</code> 和 <code>state=reloaded</code> 参数。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">systemd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name=nginx state=reloaded</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h3 id="开机自启动" tabindex="-1">开机自启动 <a class="header-anchor" href="#开机自启动" aria-label="Permalink to &quot;开机自启动&quot;">​</a></h3><p>使用 systemd 模块的 <code>name</code>、<code>state=started</code> 和 <code>enabled=true</code> 参数。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">systemd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name=nginx state=started enabled=true</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div>',21),n=[l];function p(c,d,r,y,C,i){return e(),a("div",null,n)}const m=s(t,[["render",p]]);export{h as __pageData,m as default};
