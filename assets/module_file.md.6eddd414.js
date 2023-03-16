import{_ as s,c as a,o as l,N as o}from"./chunks/framework.bf75d690.js";const A=JSON.parse('{"title":"file 模块","description":"","frontmatter":{},"headers":[],"relativePath":"module/file.md","lastUpdated":1678879244000}'),e={name:"module/file.md"},n=o(`<h1 id="file-模块" tabindex="-1">file 模块 <a class="header-anchor" href="#file-模块" aria-label="Permalink to &quot;file 模块&quot;">​</a></h1><p><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/file_module.html" target="_blank" rel="noreferrer">file 模块</a> 用于管理文件和文件属性。</p><p>主要用于目标机器创建文件、目录，以及对目标机器上的文件、目录的权限进行修改。</p><h2 id="常用参数" tabindex="-1">常用参数 <a class="header-anchor" href="#常用参数" aria-label="Permalink to &quot;常用参数&quot;">​</a></h2><table><thead><tr><th>参数名</th><th>是否必须</th><th>默认值</th><th>选项</th><th>说明</th></tr></thead><tbody><tr><td><code>path</code></td><td>是</td><td></td><td></td><td>远程被管理文件或目录的路径</td></tr><tr><td><code>src</code></td><td>否</td><td></td><td></td><td>要链接到的文件的路径，只有在 <code>state=link</code> 或者 <code>state=hard</code> 时才有效</td></tr><tr><td><code>owner</code></td><td>否</td><td></td><td></td><td>远程被管理的文件或者目录所属用户</td></tr><tr><td><code>group</code></td><td>否</td><td></td><td></td><td>远程被管理的文件或者目录所属组</td></tr><tr><td><code>mode</code></td><td>否</td><td></td><td></td><td>生成的文件系统对象应具有的权限，比如 <code>0644</code> 或者 <code>0600</code></td></tr><tr><td><code>recurse</code></td><td>否</td><td><code>false</code></td><td><code>true</code><br> <code>false</code></td><td>递归地在目录内容上设置指定的文件属性，仅允许当 <code>state=directory</code> 是使用</td></tr><tr><td><code>state</code></td><td>否</td><td><small>默认是文件的当前状态（如果存在）<br>如果 <code>recurse=yes</code> 则为目录，否则为文件。</small></td><td><code>absent</code><br><code>directory</code><br><code>file</code><br><code>hard</code><br><code>link</code><br><code>touch</code></td><td><code>directory</code> 创建目录<br><code>link</code> 符号链接将被创建或更改<br><code>touch</code> 创建空文件</td></tr></tbody></table><p>更多参数可以使用命令 <code>ansible-doc -s file</code> 获取更多使用相关的文档或者<a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/file_module.html" target="_blank" rel="noreferrer">查看官方文档</a>。</p><h2 id="一些示例" tabindex="-1">一些示例 <a class="header-anchor" href="#一些示例" aria-label="Permalink to &quot;一些示例&quot;">​</a></h2><h3 id="远程创建文件" tabindex="-1">远程创建文件 <a class="header-anchor" href="#远程创建文件" aria-label="Permalink to &quot;远程创建文件&quot;">​</a></h3><p>使用 file 模块的 <code>state=touch</code> 和 <code>path</code> 参数。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">file</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">path=/tmp/ansible-file.txt state=touch</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 查看文件状态</span></span>
<span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">shell</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ls -l /tmp/ansible-file.txt</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><h3 id="远程创建目录" tabindex="-1">远程创建目录 <a class="header-anchor" href="#远程创建目录" aria-label="Permalink to &quot;远程创建目录&quot;">​</a></h3><p>使用 file 模块的 <code>state=directory</code> 和 <code>path</code> 参数。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">file</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">path=/tmp/ansible-file state=directory</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 查看目录状态</span></span>
<span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">shell</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ls -ld /tmp/ansible-file*</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><h3 id="创建软连接" tabindex="-1">创建软连接 <a class="header-anchor" href="#创建软连接" aria-label="Permalink to &quot;创建软连接&quot;">​</a></h3><p>使用 file 模块在远程被管理的机器上指定源文件创建软连接。使用 <code>src</code>、<code>dest</code> 和 <code>state=link</code> 参数。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">file</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">src=/etc/hosts dest=/tmp/hosts state=link</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 查看文件状态</span></span>
<span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">shell</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ls -l /tmp/hosts</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><blockquote><p><code>src</code> 参数需要配合 <code>state=link</code> 或 <code>state=hard</code> 使用才能生效。</p></blockquote><h3 id="设定文件权限" tabindex="-1">设定文件权限 <a class="header-anchor" href="#设定文件权限" aria-label="Permalink to &quot;设定文件权限&quot;">​</a></h3><p>使用 file 模块的 <code>state=touch</code>、<code>path</code>、<code>owner</code>、<code>group</code> 和 <code>mode</code> 参数。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">file</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">path=/tmp/ansible-file.txt state=touch owner=www group=www mode=0777</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 注意需要保证 www 用户和用户组在远程服务器上存在</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 查看文件状态</span></span>
<span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">shell</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ls -ld /tmp/ansible-file*</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span></code></pre></div><ul><li><code>owner</code> 修改文件或目录属主</li><li><code>group</code> 修改文件或目录属组</li><li><code>mode</code> 修改文件或目录权限</li></ul>`,21),t=[n];function p(c,r,d,C,i,y){return l(),a("div",null,t)}const h=s(e,[["render",p]]);export{A as __pageData,h as default};
