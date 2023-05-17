import{_ as s,c as a,o as n,O as l}from"./chunks/framework.e51d172d.js";const d=JSON.parse('{"title":"roles 角色","description":"","frontmatter":{},"headers":[],"relativePath":"guide/roles.md","lastUpdated":1684290866000}'),p={name:"guide/roles.md"},e=l(`<h1 id="roles-角色" tabindex="-1">roles 角色 <a class="header-anchor" href="#roles-角色" aria-label="Permalink to &quot;roles 角色&quot;">​</a></h1><p>Ansible的roles功能也叫做角色，它是一种让多个playbook协同工作的实现方法。</p><p>roles将剧本中的 <code>vars</code> 变量、<code>handlers</code>、<code>tasks</code> 任务、模块及处理器都进行了拆分，分别放置于各自目录然后进行引用的一种机制。</p><p>通常一些复杂场景才会使用roles，让代码复用度更高。</p><h2 id="快速了解roles" tabindex="-1">快速了解roles <a class="header-anchor" href="#快速了解roles" aria-label="Permalink to &quot;快速了解roles&quot;">​</a></h2><p>ansible-galaxy 命令可以连接 galaxy.ansible.com 下载已经编排好的 roles。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible-galaxy</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">list</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 列出已安装的角色</span></span>
<span class="line"><span style="color:#FFCB6B;">ansible-galaxy</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">geerlingguy.redis</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 安装角色</span></span>
<span class="line"><span style="color:#FFCB6B;">ansible-galaxy</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">remove</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">geerlingguy.redis</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 删除角色</span></span></code></pre></div><p>安装好 roles 后可以看到在相应的目录中会生成一个以角色名命名的目录，并且还有许多子目录和yml文件，这些都是构成roles的成员。</p><blockquote><p>复制一份角色目录就会被Ansible自动识别成一个新的角色。</p></blockquote><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight has-focused-lines has-highlighted-lines"><code><span class="line has-focus highlighted"><span style="color:#FFCB6B;">ansible-galaxy</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">geerlingguy.redis</span><span style="color:#A6ACCD;">  </span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Starting galaxy role install process</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># - changing role geerlingguy.redis from 1.8.0 to unspecified</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># - downloading role &#39;redis&#39;, owned by geerlingguy</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># - downloading role from https://github.com/geerlingguy/ansible-role-redis/archive/1.8.0.tar.gz</span></span>
<span class="line has-focus highlighted"><span style="color:#676E95;font-style:italic;"># - extracting geerlingguy.redis to /root/.ansible/roles/geerlingguy.redis </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># - geerlingguy.redis (1.8.0) was installed successfully</span></span></code></pre></div><h2 id="手动创建-roles" tabindex="-1">手动创建 roles <a class="header-anchor" href="#手动创建-roles" aria-label="Permalink to &quot;手动创建 roles&quot;">​</a></h2><ol><li><p>创建roles目录，保持和playbook同级，然后在roles目录中创建以角色命名的目录，如 <code>nginx</code>、<code>mysql</code>、<code>php</code></p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">mkdir</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">roles/{nginx,mysql,php}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># roles</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># ├── mysql</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># ├── nginx</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># └── php</span></span></code></pre></div></li><li><p>在每个角色目录中分别创建 <code>files</code>、<code>handlers</code>、<code>tasks</code>（必须）、<code>templates</code>、<code>vars</code>等目录。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">mkdir</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">roles/{nginx,mysql,php}/{handlers,tasks,template,vars,files}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># roles</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># ├── mysql</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># │   ├── files</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># │   ├── handlers</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># │   ├── tasks</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># │   ├── template</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># │   └── vars</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># ├── nginx</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># │   ├── files</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># │   ├── handlers</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># │   ├── tasks</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># │   ├── template</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># │   └── vars</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># └── php</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#     ├── files</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#     ├── handlers</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#     ├── tasks</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#     ├── template</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#     └── vars</span></span></code></pre></div></li><li><p>各目录约定</p><ul><li><code>roles/$project/</code>：project是真实项目名称，如 <code>nginx</code>、<code>mysql</code>、<code>php</code></li><li><code>files</code>：存放由 <code>copy</code> 或 <code>script</code> 等模块调用的文件，如网页文件。</li><li><code>template/</code>：template模块会自动在此目录中寻找jinja2模板文件</li><li><code>tasks/</code>：该目录必须存在，定义任务，该目录中需要包含 <code>main.yml</code> 文件</li><li><code>handlers/</code>：应包含一个 <code>main.yml</code> 文件，用于定义此角色用到的 handlers</li><li><code>vars/</code>：应包含一个 <code>main.yml</code> 文件，用于定义此角色用到的变量</li></ul></li></ol><h2 id="创建nginx角色" tabindex="-1">创建nginx角色 <a class="header-anchor" href="#创建nginx角色" aria-label="Permalink to &quot;创建nginx角色&quot;">​</a></h2><h3 id="创建基础目录" tabindex="-1">创建基础目录 <a class="header-anchor" href="#创建基础目录" aria-label="Permalink to &quot;创建基础目录&quot;">​</a></h3><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/etc/ansible/roles/</span></span>
<span class="line"><span style="color:#FFCB6B;">mkdir</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-p</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx/{handlers,tasks,templates,vars}</span></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># .</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># ├── handlers</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># ├── tasks</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># ├── templates</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># └── vars</span></span></code></pre></div><h3 id="创建变量文件-vars-main-yml" tabindex="-1">创建变量文件 vars/main.yml <a class="header-anchor" href="#创建变量文件-vars-main-yml" aria-label="Permalink to &quot;创建变量文件 vars/main.yml&quot;">​</a></h3><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># vars/main.yml</span></span>
<span class="line"><span style="color:#F07178;">http_port</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span></span>
<span class="line"><span style="color:#F07178;">user</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">www</span></span>
<span class="line"><span style="color:#F07178;">group</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">www</span></span></code></pre></div><h3 id="创建配置文件的-template-nginx-conf-j2" tabindex="-1">创建配置文件的 template/nginx.conf.j2 <a class="header-anchor" href="#创建配置文件的-template-nginx-conf-j2" aria-label="Permalink to &quot;创建配置文件的 template/nginx.conf.j2&quot;">​</a></h3><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight has-focused-lines"><code><span class="line has-focus"><span style="color:#A6ACCD;">user {{ user }};  </span></span>
<span class="line"><span style="color:#A6ACCD;">worker_processes auto;</span></span>
<span class="line"><span style="color:#A6ACCD;">error_log /var/log/nginx/error.log notice;</span></span>
<span class="line"><span style="color:#A6ACCD;">pid /run/nginx.pid;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.</span></span>
<span class="line"><span style="color:#A6ACCD;">include /usr/share/nginx/modules/*.conf;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">events {</span></span>
<span class="line"><span style="color:#A6ACCD;">    worker_connections 1024;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">http {</span></span>
<span class="line"><span style="color:#A6ACCD;">    log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">                      &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">                      &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    access_log  /var/log/nginx/access.log  main;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    sendfile            on;</span></span>
<span class="line"><span style="color:#A6ACCD;">    tcp_nopush          on;</span></span>
<span class="line"><span style="color:#A6ACCD;">    keepalive_timeout   65;</span></span>
<span class="line"><span style="color:#A6ACCD;">    types_hash_max_size 4096;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    include             /etc/nginx/mime.types;</span></span>
<span class="line"><span style="color:#A6ACCD;">    default_type        application/octet-stream;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    # Load modular configuration files from the /etc/nginx/conf.d directory.</span></span>
<span class="line"><span style="color:#A6ACCD;">    # See http://nginx.org/en/docs/ngx_core_module.html#include</span></span>
<span class="line"><span style="color:#A6ACCD;">    # for more information.</span></span>
<span class="line"><span style="color:#A6ACCD;">    include /etc/nginx/conf.d/*.conf;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    server {</span></span>
<span class="line has-focus"><span style="color:#A6ACCD;">        listen       {{ http_port }}; </span></span>
<span class="line has-focus"><span style="color:#A6ACCD;">        listen       [::]:{{ http_port }}; </span></span>
<span class="line"><span style="color:#A6ACCD;">        server_name  _;</span></span>
<span class="line"><span style="color:#A6ACCD;">        root         /usr/share/nginx/html;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        # Load configuration files for the default server block.</span></span>
<span class="line"><span style="color:#A6ACCD;">        include /etc/nginx/default.d/*.conf;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        error_page 404 /404.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">        location = /404.html {</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        error_page 500 502 503 504 /50x.html;</span></span>
<span class="line"><span style="color:#A6ACCD;">        location = /50x.html {</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h3 id="建立tasks文件-写明需要执行的任务" tabindex="-1">建立tasks文件，写明需要执行的任务 <a class="header-anchor" href="#建立tasks文件-写明需要执行的任务" aria-label="Permalink to &quot;建立tasks文件，写明需要执行的任务&quot;">​</a></h3><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-ouPar" id="tab-uerVPYU" checked="checked"><label for="tab-uerVPYU">tasks/main.yml</label><input type="radio" name="group-ouPar" id="tab-KUdasOR"><label for="tab-KUdasOR">tasks/group.yml</label><input type="radio" name="group-ouPar" id="tab-Ac-3SpM"><label for="tab-Ac-3SpM">tasks/user.yml</label><input type="radio" name="group-ouPar" id="tab-9Aiwo6Y"><label for="tab-9Aiwo6Y">tasks/install.yml</label><input type="radio" name="group-ouPar" id="tab-65f5xDw"><label for="tab-65f5xDw">tasks/config.yml</label><input type="radio" name="group-ouPar" id="tab-TRrMVZh"><label for="tab-TRrMVZh">tasks/start.yml</label></div><div class="blocks"><div class="language-yaml active"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">---</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># author: curder</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">include_tasks</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">group.yml</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">include_tasks</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">user.yml</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">include_tasks</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install.yml</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">include_tasks</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">config.yml</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">include_tasks</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">start.yml</span></span></code></pre></div><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">---</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># author: curder</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Create a nginx group.</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">group</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{{ group }}</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#F07178;">system</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">yes</span></span></code></pre></div><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">---</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># author: curder</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Create a nginx user.</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">user</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{{ user }}</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">group</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{{ group }}</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">shell</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/sbin/nologin</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">create_home</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">no</span></span></code></pre></div><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">---</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># author: curder</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Install nginx package</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">yum</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">state</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">installed</span></span></code></pre></div><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">---</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># author: curder</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Copy nginx template file</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src=nginx.conf.j2 dest=/etc/nginx/conf/nginx.conf</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">notify</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Restart nginx</span></span></code></pre></div><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">---</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># author: curder</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Start nginx service</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">service</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">state</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">started</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">enabled</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">yes</span></span></code></pre></div></div></div><h3 id="建立-handlers-文件-handlers-main-yml" tabindex="-1">建立 handlers 文件 <code>handlers/main.yml</code> <a class="header-anchor" href="#建立-handlers-文件-handlers-main-yml" aria-label="Permalink to &quot;建立 handlers 文件 \`handlers/main.yml\`&quot;">​</a></h3><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">Restart nginx</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 名字需要和task中的notify保持一致</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">service</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">state</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restarted</span></span></code></pre></div><h3 id="调用角色-nginx-roles-yml" tabindex="-1">调用角色 nginx_roles.yml <a class="header-anchor" href="#调用角色-nginx-roles-yml" aria-label="Permalink to &quot;调用角色 nginx_roles.yml&quot;">​</a></h3><p>建立playbook用于调用角色，这个playbook文件需要和roles目录平级</p><div class="language-yaml"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">---</span></span>
<span class="line"><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">hosts</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">remote_user</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">root</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">roles</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">role</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx</span><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;"># 指定角色名称</span></span></code></pre></div><p>使用 <code>ansible-playbook</code> 调用：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible-playbook</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-C</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">nginx_roles.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># 正式运行前可以先使用 -C 参数进行测试</span></span></code></pre></div><h3 id="文件和目录关系" tabindex="-1">文件和目录关系 <a class="header-anchor" href="#文件和目录关系" aria-label="Permalink to &quot;文件和目录关系&quot;">​</a></h3><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">.</span></span>
<span class="line"><span style="color:#A6ACCD;">├── nginx</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── handlers</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   └── main.yml</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── tasks</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   ├── config.yml</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   ├── group.yml</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   ├── install.yml</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   ├── main.yml</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   ├── start.yml</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   └── user.yml</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── templates</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   └── nginx.conf.j2</span></span>
<span class="line"><span style="color:#A6ACCD;">│   └── vars</span></span>
<span class="line"><span style="color:#A6ACCD;">│       └── main.yml</span></span>
<span class="line"><span style="color:#A6ACCD;">└── nginx_roles.yml</span></span></code></pre></div>`,30),o=[e];function t(c,r,i,y,C,A){return n(),a("div",null,o)}const h=s(p,[["render",t]]);export{d as __pageData,h as default};
