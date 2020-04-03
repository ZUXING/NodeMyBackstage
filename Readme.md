<h1>NodeSQL</h1>
<p>暂且把这个个人项目叫<b>NodeSQL</b>吧，我还没想到更好的名字。</p>
<p>这是一个基于koa2、mysql的后台框架，它允许用户直接在浏览器的URL输入栏来操作MySQL数据库，并且将返回的JSON数组显示在浏览器上。同样，因为所有的MySQL指令都在URL上，我们还可以通过Axios异步请求数据库的内容。</p>

<h2>新版本特性</h2>
<p>忽略favicon.ico文件的请求。</p>
<p>新增DROP DATABASE和INSERT INTO语句</p>

<h2>安装</h2>
<p>直接复制下来，从命令行输入npm install就可以。如果复制后还有node_module文件夹，请删除。一定不要改动项目结构，但是部分文件需要你修改，便于连接你的数据库。</p>
<ul>
  <li>./app.js ->此项目的端口号，切记不能和数据库的端口号一样，默认是1019。</li>
  <li>./js/db_connect.js ->这里面需要你填写连接数据库的用户名、密码、地址、端口号等</li>
</ul>
<p>安装完成以后，输入node app.js即可启动。</p>

<h2>使用</h2>
<p>假设你的MySQL服务器地址是http://127.0.0.1:3306，刚刚部署的项目地址是http://127.0.0.1:1019。</p>
<p>直接执行SQL语句：http://127.0.0.1:1019/runsql/你的SQL语句</p>
<p>查询数据库：http://127.0.0.1:1019/SHOW%20DATABASES</p>
  <p><h3>为什么是SHOW%20而不是SHOW空格</h3>
  当你在地址栏输入中文，或者一些符号的时候，它们会被浏览器自动转义为URL形式。所以你不用担心%20这样的东西混入进去。
  你直接输入SHOW DATABASES，它会自动转义的。</p><p></p>

<p>新建数据库：http://127.0.0.1:1019/CREATE%20DATABASE%20数据库名</p>
<p>查询某个数据库的表：http://127.0.0.1:1019/数据库名</p>
<p>添加新的表：http://127.0.0.1:1019/数据库名/CREATE%20TABLE%20表名(列名、参数等)</p>
<p>执行Select语句：http://127.0.0.1:1019/数据库名/SELECT语句...</p>
<p>执行DROP DATABASE语句：http://127.0.0.1:1019/DROP%20DATABASE%20表名</p>
<p>DROP TABLE语句支持IF EXISTS子句</p>

  <p><h3>注意</h3>
  执行上面的Select语句时，一定要有WHERE子句，哪怕没有什么WHERE条件也要WHERE 1。</p><p></p>

  <p><h3>关于一条SQL语句的最大长度</h3>
  SQL本身没有限制长度，URL地址也没有限制长度，但是各大浏览器中URL输入框却是有限制的，所以保险起见，一条SQL语句不要超过800字符，或者地址字数不要超过1000字符。</p><p></p>

<p>目前只做了这么多，也没有足够的测试，对于用户的错误输入有duang掉的可能。欢迎大家多多提意见和建议。这个项目有空就一直更新，没空的话也不要催，主人目前正在专心准备考研。欢迎大家加好友（QQ：1992599855，邮箱：[zuxingv@foxmail.com](mailto:zuxingv@foxmail.com)），自己复制一份拿去改着玩也行。</p>
