import{_ as s,c as a,o as n,N as l}from"./chunks/framework.3e506893.js";const d=JSON.parse('{"title":"script 模块","description":"","frontmatter":{},"headers":[],"relativePath":"module/script.md","lastUpdated":1678945456000}'),p={name:"module/script.md"},o=l(`<h1 id="script-模块" tabindex="-1">script 模块 <a class="header-anchor" href="#script-模块" aria-label="Permalink to &quot;script 模块&quot;">​</a></h1><p><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/script_module.html" target="_blank" rel="noreferrer">script 模块</a>传输后在远程节点上运行本地脚本。</p><p>相比 <a href="./shell.html">shell 模块</a> 而言，script 模块功能更加强大，管理机机器拥有一个执行脚本，就可以使用 script 模块在所有被管理机器上运行。</p><h2 id="常用参数" tabindex="-1">常用参数 <a class="header-anchor" href="#常用参数" aria-label="Permalink to &quot;常用参数&quot;">​</a></h2><table><thead><tr><th>参数名</th><th>说明</th></tr></thead><tbody><tr><td><code>creates</code></td><td>仅当远程节点上不存在creates配置的文件时才运行脚本</td></tr><tr><td><code>free_from</code></td><td>参数值可以输入任何系统命令，实现远程管理</td></tr><tr><td><code>removes</code></td><td>仅当远程节点上存在removes配置的文件时才运行脚本</td></tr></tbody></table><p>更多参数可以使用命令 <code>ansible-doc -s script</code> 获取更多使用相关的文档或者<a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/script_module.html#parameters" target="_blank" rel="noreferrer">查看官方文档</a>。</p><h2 id="一些示例" tabindex="-1">一些示例 <a class="header-anchor" href="#一些示例" aria-label="Permalink to &quot;一些示例&quot;">​</a></h2><h3 id="执行本地脚本" tabindex="-1">执行本地脚本 <a class="header-anchor" href="#执行本地脚本" aria-label="Permalink to &quot;执行本地脚本&quot;">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 在本机预准备执行脚本</span></span>
<span class="line"><span style="color:#FFCB6B;">cat</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/tmp/ansible-script.sh</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#C3E88D;"> &#39;</span><span style="color:#89DDFF;">EOL</span><span style="color:#C3E88D;">&#39;</span></span>
<span class="line"><span style="color:#C3E88D;">echo $(hostname -I) &gt; /tmp/ansible-script.log</span></span>
<span class="line"><span style="color:#C3E88D;">echo $(uptime) &gt;&gt; /tmp/ansible-script.log</span></span>
<span class="line"><span style="color:#C3E88D;">echo $(free -m) &gt;&gt; /tmp/ansible-script.log</span></span>
<span class="line"><span style="color:#89DDFF;">EOL</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 添加可执行权限</span></span>
<span class="line"><span style="color:#FFCB6B;">chmod</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">+x</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/tmp/ansible-script.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 远程执行</span></span>
<span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/tmp/ansible-script.sh</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 使用shell模块检查输出 </span></span>
<span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">shell</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">cat /tmp/ansible-script.log</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h3 id="远程安装nginx" tabindex="-1">远程安装nginx <a class="header-anchor" href="#远程安装nginx" aria-label="Permalink to &quot;远程安装nginx&quot;">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 在本机预准备执行脚本</span></span>
<span class="line"><span style="color:#82AAFF;">echo</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">yum install -y nginx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/tmp/ansible-script.sh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 远程执行</span></span>
<span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/tmp/ansible-script.sh</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 使用shell模块检查是否安装成功</span></span>
<span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">shell</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">nginx -v</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div>`,11),t=[o];function e(c,r,i,y,C,D){return n(),a("div",null,t)}const h=s(p,[["render",e]]);export{d as __pageData,h as default};