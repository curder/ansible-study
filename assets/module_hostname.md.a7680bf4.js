import{_ as a,c as e,o as s,O as o}from"./chunks/framework.e51d172d.js";const y=JSON.parse('{"title":"hostname 模块","description":"","frontmatter":{},"headers":[],"relativePath":"module/hostname.md","lastUpdated":1681143297000}'),t={name:"module/hostname.md"},n=o('<h1 id="hostname-模块" tabindex="-1">hostname 模块 <a class="header-anchor" href="#hostname-模块" aria-label="Permalink to &quot;hostname 模块&quot;">​</a></h1><p><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/hostname_module.html" target="_blank" rel="noreferrer">hostname 模块</a>用于管理主机名。</p><p>hostname 模块支持大多数操作系统/发行版。</p><h2 id="常用参数" tabindex="-1">常用参数 <a class="header-anchor" href="#常用参数" aria-label="Permalink to &quot;常用参数&quot;">​</a></h2><table><thead><tr><th>参数名</th><th>是否必须</th><th>默认值</th><th>选项</th><th>说明</th></tr></thead><tbody><tr><td><code>name</code></td><td>是</td><td></td><td></td><td>主机名称</td></tr><tr><td><code>use</code></td><td>否</td><td></td><td><code>alpine</code>、<code>debian</code>、<code>freebsd</code>、<code>generic</code>、<code>macos</code>、<code>macosx</code>、<code>darwin</code>、<code>openbsd</code>、<code>openrc</code>、<code>redhat</code>、<code>sles</code>、<code>solaris</code>、<code>systemd</code></td><td>使用指定策略来更新主机名</td></tr></tbody></table><p>更多参数可以使用命令 <code>ansible-doc -s hostname</code> 获取更多使用相关的文档或者<a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/hostname_module.html" target="_blank" rel="noreferrer">查看官方文档</a>。</p><h2 id="一些示例" tabindex="-1">一些示例 <a class="header-anchor" href="#一些示例" aria-label="Permalink to &quot;一些示例&quot;">​</a></h2><h3 id="设置主机名" tabindex="-1">设置主机名 <a class="header-anchor" href="#设置主机名" aria-label="Permalink to &quot;设置主机名&quot;">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hostname</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name=centos</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h3 id="设置主机名时指定策略" tabindex="-1">设置主机名时指定策略 <a class="header-anchor" href="#设置主机名时指定策略" aria-label="Permalink to &quot;设置主机名时指定策略&quot;">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">hostname</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name=centos use=systemd</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div>',11),l=[n];function c(r,d,p,h,i,m){return s(),e("div",null,l)}const b=a(t,[["render",c]]);export{y as __pageData,b as default};