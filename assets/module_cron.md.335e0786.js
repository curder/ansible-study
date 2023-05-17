import{_ as s,c as a,o,O as n}from"./chunks/framework.e51d172d.js";const A=JSON.parse('{"title":"cron 模块","description":"","frontmatter":{},"headers":[],"relativePath":"module/cron.md","lastUpdated":1680851521000}'),l={name:"module/cron.md"},e=n(`<h1 id="cron-模块" tabindex="-1">cron 模块 <a class="header-anchor" href="#cron-模块" aria-label="Permalink to &quot;cron 模块&quot;">​</a></h1><p><a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/cron_module.html" target="_blank" rel="noreferrer">cron 模块</a> 用于管理 cron.d 和 crontab 条目。</p><h2 id="常用参数" tabindex="-1">常用参数 <a class="header-anchor" href="#常用参数" aria-label="Permalink to &quot;常用参数&quot;">​</a></h2><table><thead><tr><th>参数名</th><th>说明</th></tr></thead><tbody><tr><td><code>name</code></td><td>此参数用于设置计划任务的名称，计划任务的名称会在注释中显示</td></tr><tr><td><code>minute</code></td><td>设置计划任务中分钟设定位的值，比如设定位的值为5，即<code>minute=5</code>，当不使用此参数时，分钟设定位的值默认为<code>*</code></td></tr><tr><td><code>hour</code></td><td>设置计划任务中小时设定位的值，比如设定位的值为1，即<code>hour=1</code>， 当不使用此参数时，小时设定位的值默认为<code>*</code></td></tr><tr><td><code>day</code></td><td>设置计划任务中日设定位的值，当不使用此参数时，日设定位的值默认为<code>*</code></td></tr><tr><td><code>month</code></td><td>设置计划任务中月设定位的值，当不使用此参数时，月设定位的值默认为<code>*</code></td></tr><tr><td><code>weekday</code></td><td>设置计划任务中周几设定位的值，当不使用此参数时，周几设定位的值默认为<code>*</code></td></tr><tr><td><code>user</code></td><td>设置当前计划任务属于哪个用户，当不使用此参数时，默认为管理员用户</td></tr><tr><td><code>job</code></td><td>指定计划的任务中需要实际执行的命令或者脚本，比如<code>echo test</code>命令</td></tr><tr><td><code>state</code></td><td>当计划任务有名称时可以根据名称修改或删除对应的任务，当删除计划任务时需要将 <code>state</code> 的值设置为<code>absent</code></td></tr><tr><td><code>disabled</code></td><td>是否应在 crontab 中禁用（注释掉）计划任务，仅在 <code>state=present</code> 时有效</td></tr><tr><td><code>backup</code></td><td>如果设置，则在修改之前创建 crontab 的备份。此模块在 <code>backup_file</code> 变量中返回备份的位置</td></tr></tbody></table><p>更多参数可以使用命令 <code>ansible-doc -s cron</code> 获取更多使用相关的文档或者<a href="https://docs.ansible.com/ansible/latest/collections/ansible/builtin/cron_module.html#parameters" target="_blank" rel="noreferrer">查看官方文档</a>。</p><h2 id="一些示例" tabindex="-1">一些示例 <a class="header-anchor" href="#一些示例" aria-label="Permalink to &quot;一些示例&quot;">​</a></h2><h3 id="添加-ntpdate-定时任务" tabindex="-1">添加 ntpdate 定时任务 <a class="header-anchor" href="#添加-ntpdate-定时任务" aria-label="Permalink to &quot;添加 ntpdate 定时任务&quot;">​</a></h3><p><strong>要求：</strong> 添加每5分钟执行一次和阿里云服务器时间同步的定时任务。</p><blockquote><p><strong>注意：</strong> 如果是 Ubuntu 系统，默认没有安装 Cron 服务，通过 <code>apt install cron</code> 安装。</p></blockquote><p>在定时任务中这样编写：<code>*/5 * * * * ntpdate -u ntp.aliyum.com</code></p><p>需要用到 <code>name</code>、<code>minute</code> 和 <code>job</code> 参数。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">cron</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name=&#39;ntp aliyun&#39; minute=&#39;*/5&#39; job=&#39;ntpdate -u ntp.aliyum.com&#39;</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">shell</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">crontab -l</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h3 id="添加每分钟定时任务" tabindex="-1">添加每分钟定时任务 <a class="header-anchor" href="#添加每分钟定时任务" aria-label="Permalink to &quot;添加每分钟定时任务&quot;">​</a></h3><p>cron 模块在不指定任何时间规则时候，默认为每分钟执行。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">cron</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name=&#39;minute job&#39; job=&#39;echo </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">helloworld</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> &gt;&gt; /tmp/ansible-cron.log&#39;</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">cat /tmp/ansible-cron.log</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h3 id="修改定时任务" tabindex="-1">修改定时任务 <a class="header-anchor" href="#修改定时任务" aria-label="Permalink to &quot;修改定时任务&quot;">​</a></h3><p>cron 模块在修改定时任务时需要提供 <code>name</code>、<code>job</code> 等参数。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">cron</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name=&#39;minute job&#39; job=&#39;echo </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">helloworld</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> &gt;&gt; /tmp/ansible-cron.log&#39;</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 将上面的定时任务修改为 每天的23:30执行一次</span></span>
<span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">cron</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name=&#39;minute job&#39; job=&#39;echo </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">helloworld</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;"> &gt;&gt; /tmp/ansible-cron.log&#39; minute=30 hour=23</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">shell</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">crontab -l</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div><h3 id="删除定时任务" tabindex="-1">删除定时任务 <a class="header-anchor" href="#删除定时任务" aria-label="Permalink to &quot;删除定时任务&quot;">​</a></h3><p>使用cron模块删除定时任务时，只能指定 <code>name</code> 进行删除。</p><p>需要用到 <code>name</code> 和 <code>state=absent</code> 参数。</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">cron</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">name=&#39;ntp aliyun&#39; state=absent</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">ansible</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">all</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">src/inventory.yml</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-m</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">shell</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-a</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">crontab -l</span><span style="color:#89DDFF;">&quot;</span></span></code></pre></div>`,22),t=[e];function p(c,r,C,y,d,D){return o(),a("div",null,t)}const h=s(l,[["render",p]]);export{A as __pageData,h as default};