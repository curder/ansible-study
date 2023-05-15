import{_ as s,c as a,o as e,O as l}from"./chunks/framework.e51d172d.js";const D=JSON.parse('{"title":"lineinfile 模块","description":"","frontmatter":{},"headers":[],"relativePath":"module/lineinfile.md","lastUpdated":1682043561000}'),o={name:"module/lineinfile.md"},t=l(`<h1 id="lineinfile-模块" tabindex="-1">lineinfile 模块 <a class="header-anchor" href="#lineinfile-模块" aria-label="Permalink to &quot;lineinfile 模块&quot;">​</a></h1><p><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/lineinfile_module.html" target="_blank" rel="noreferrer">lineinfile 模块</a>用于管理文本文件中的行。</p><p>该模块用于确保一个特定的行在一个文件中或者使用一个正则表达式替换一个现有的行。</p><ul><li>如果想要改变文件中相似的多行，可以使用 replace 模块。</li><li>如果想要插入、更新、删除一个行块，可以使用 blockinfile 模块。</li></ul><h2 id="常用参数" tabindex="-1">常用参数 <a class="header-anchor" href="#常用参数" aria-label="Permalink to &quot;常用参数&quot;">​</a></h2><table><thead><tr><th>参数名</th><th>是否必须</th><th>参数类型</th><th>默认值</th><th>说明</th></tr></thead><tbody><tr><td><code>path</code></td><td>必须</td><td><code>path</code>/<code>string</code></td><td></td><td>要修改的文件，也可以使用 <code>dest</code>、<code>destfile</code>、<code>name</code></td></tr><tr><td><code>regexp</code></td><td>否</td><td><code>string</code></td><td></td><td>用于搜索文件中的每一行的正则表达式。对于 <code>state=present</code> 所匹配的行中的最后一行会被替换；对于 <code>state=present</code> 会删除所有匹配的行</td></tr><tr><td><code>state</code></td><td>否</td><td><code>string</code></td><td><code>present</code></td><td>用于设置 新增或替换一行，还是删除行</td></tr><tr><td><code>group</code></td><td>否</td><td><code>string</code></td><td></td><td>设置文件/目录的所属组</td></tr><tr><td><code>owner</code></td><td>否</td><td><code>string</code></td><td></td><td>设置文件/目录的所属</td></tr><tr><td><code>line</code></td><td>否</td><td><code>string</code></td><td></td><td>要插入或者替换的行。如果设置了backrefs参数，那么line中可以包含位置分组或命名分组，lineinfile模块会使用regexp捕获的分组填充它们</td></tr><tr><td><code>mode</code></td><td>否</td><td></td><td></td><td>设置文件权限，模式实际上是八进制数字（如<code>0644</code>），少了前面的零可能会有意想不到的结果。从版本1.8开始，可以将模式指定为符号模式（例如 <code>u+rwx</code> 或 <code>u=rw,g=r,o=r</code>）</td></tr><tr><td><code>create</code></td><td>否</td><td><code>boolean</code></td><td><code>no</code></td><td>与state=present一起使用。如果指定了这个参数，当要修改的文件不存在的时候，会创建它。否则会报错。</td></tr></tbody></table><p>更多参数可以使用命令 <code>ansible-doc -s lineinfile</code> 获取更多使用相关的文档或者<a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/lineinfile_module.html#parameters" target="_blank" rel="noreferrer">查看官方文档</a>。</p><h2 id="一些示例" tabindex="-1">一些示例 <a class="header-anchor" href="#一些示例" aria-label="Permalink to &quot;一些示例&quot;">​</a></h2><h3 id="文件存在则添加行" tabindex="-1">文件存在则添加行 <a class="header-anchor" href="#文件存在则添加行" aria-label="Permalink to &quot;文件存在则添加行&quot;">​</a></h3><p>往 <code>/etc/hosts</code> 里添加一行 <code>127.0.0.1 curder.com</code>（多次执行，不会重复添加），示例如下：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">lineinfile</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">path=/etc/hosts line=&#39;127.0.0.1 curder.com&#39;</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h3 id="修改匹配行" tabindex="-1">修改匹配行 <a class="header-anchor" href="#修改匹配行" aria-label="Permalink to &quot;修改匹配行&quot;">​</a></h3><p>确保 SELinux 设置为禁用模式</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">lineinfile</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">path=/etc/selinux/config regexp=&#39;^SELINUX=&#39; line=SELINUX=disabled</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h3 id="删除匹配行" tabindex="-1">删除匹配行 <a class="header-anchor" href="#删除匹配行" aria-label="Permalink to &quot;删除匹配行&quot;">​</a></h3><p>确保 wheel 组不在 sudoers 配置中</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">lineinfile</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">path=/etc/sudoers regexp=&#39;^%wheel&#39; state=absent</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h3 id="匹配行前或后添加内容" tabindex="-1">匹配行前或后添加内容 <a class="header-anchor" href="#匹配行前或后添加内容" aria-label="Permalink to &quot;匹配行前或后添加内容&quot;">​</a></h3><p>假如有 <code>/etc/httpd.conf</code> 文件内容如下：</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Listen 127.0.0.1:80</span></span>
<span class="line"><span style="color:#A6ACCD;">Listen 80</span></span>
<span class="line"><span style="color:#A6ACCD;">Port</span></span></code></pre></div><h4 id="在匹配行前添加行" tabindex="-1">在匹配行前添加行 <a class="header-anchor" href="#在匹配行前添加行" aria-label="Permalink to &quot;在匹配行前添加行&quot;">​</a></h4><p>在文件的 <code>Listen 80</code> 前面添加一行 <code>Listen 8080</code>，示例如下：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">lineinfile</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">path=/etc/httpd.conf insertbefore=&#39;Listen 80&#39; line=&#39;Listen 8080&#39;</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h4 id="在匹配行后添加" tabindex="-1">在匹配行后添加 <a class="header-anchor" href="#在匹配行后添加" aria-label="Permalink to &quot;在匹配行后添加&quot;">​</a></h4><p>在 <code>Port</code> 后面添加一行 <code>just for test.</code>，示例如下：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">lineinfile</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">path=/etc/httpd.conf insertafter=&#39;Port&#39; line=&#39;just for test.&#39;</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h3 id="修改文件内容及权限" tabindex="-1">修改文件内容及权限 <a class="header-anchor" href="#修改文件内容及权限" aria-label="Permalink to &quot;修改文件内容及权限&quot;">​</a></h3><p>假如服务器上 <code>/etc/hosts</code> 文件内容如下：</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4</span></span>
<span class="line"><span style="color:#A6ACCD;">::1         localhost localhost.localdomain localhost6 localhost6.localdomain6</span></span></code></pre></div><p>将以 <code>127.0.0.1</code> 开头的行替换为 <code>127.0.0.1 localhost</code>，并将文件的属主和属组都修改为 <code>root</code>，权限改为 <code>644</code>，如下：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">lineinfile</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">path=/etc/hosts regexp=&#39;^127\\.0\\.0\\.1&#39; line=&#39;127.0.0.1 localhost&#39; owner=root group=root mode=&#39;0644&#39;</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h3 id="删除一行内容" tabindex="-1">删除一行内容 <a class="header-anchor" href="#删除一行内容" aria-label="Permalink to &quot;删除一行内容&quot;">​</a></h3><p>假如服务器上 <code>/etc/hosts</code> 文件内容如下：</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4</span></span>
<span class="line"><span style="color:#A6ACCD;">::1         localhost localhost.localdomain localhost6 localhost6.localdomain6</span></span></code></pre></div><p>删除以 <code>::1</code> 开头的行：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">lineinfile</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">path=/etc/hosts regexp=&#39;^::1&#39; state=absent</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h3 id="存在匹配行时修改否则添加" tabindex="-1">存在匹配行时修改否则添加 <a class="header-anchor" href="#存在匹配行时修改否则添加" aria-label="Permalink to &quot;存在匹配行时修改否则添加&quot;">​</a></h3><p>示例原文件 <code>/tmp/test.txt</code> 内容如下：</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"># %wheel   ALL=(ALL)   ALL</span></span></code></pre></div><p>匹配以 <code>%wheel</code> 开头的行，匹配到，则执行替换，未匹配，则添加。因为原文件中，没有以 <code>%wheel</code> 开头的行，所以会添加一行：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">lineinfile</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">path=/tmp/test.txt regexp=&#39;^%wheel&#39; line=&#39;%wheel  ALL=(ALL)       NOPASSWD: ALL&#39;</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><p>执行完上面的命令后，得到修改后的文件是：</p><div class="language-txt"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"># %wheel  ALL=(ALL)       NOPASSWD: ALL</span></span>
<span class="line"><span style="color:#A6ACCD;">%wheel  ALL=(ALL)       NOPASSWD: ALL</span></span></code></pre></div>`,43),n=[t];function p(c,r,d,i,C,y){return e(),a("div",null,n)}const A=s(o,[["render",p]]);export{D as __pageData,A as default};